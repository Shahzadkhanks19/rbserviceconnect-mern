import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appFile = path.join(root, 'server', 'src', 'app.js');
const routesRoot = path.join(root, 'server', 'src', 'routes');
const clientRoot = path.join(root, 'client', 'src');

const failures = [];
const warnings = [];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function walk(dir, predicate) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(target, predicate));
    else if (!predicate || predicate(target)) files.push(target);
  }
  return files;
}

function joinRoute(base, route) {
  const cleanBase = String(base || '').replace(/\/$/, '');
  const cleanRoute = String(route || '').replace(/^\//, '');
  const joined = `${cleanBase}/${cleanRoute}`.replace(/\/{2,}/g, '/');
  return joined.length > 1 ? joined.replace(/\/$/, '') : joined;
}

function clientPath(serverPath) {
  return serverPath.startsWith('/api') ? serverPath.slice(4) || '/' : serverPath;
}

function normalizePath(value) {
  let result = String(value || '').trim();
  result = result.replace(/\$\{[^}]+\}/g, ':dynamic');
  result = result.split('?')[0].split('#')[0];
  result = result.replace(/\/{2,}/g, '/');
  if (!result.startsWith('/')) result = `/${result}`;
  if (result.length > 1) result = result.replace(/\/$/, '');
  return result;
}

function matchesRoute(candidate, route) {
  const left = normalizePath(candidate).split('/').filter(Boolean);
  const right = normalizePath(route).split('/').filter(Boolean);
  if (left.length !== right.length) return false;
  return left.every((segment, index) => {
    const other = right[index];
    return segment === other || segment.startsWith(':') || other.startsWith(':');
  });
}

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function parseServerRoutes() {
  const app = read(appFile);
  const routeImports = new Map();
  for (const match of app.matchAll(/import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]\.\/routes\/([^'"]+)['"]/g)) {
    routeImports.set(match[1], match[2]);
  }

  const mounts = new Map();
  for (const match of app.matchAll(/app\.use\(\s*['"]([^'"]+)['"]\s*,\s*([A-Za-z_$][\w$]*)\s*\)/g)) {
    const [, mount, variable] = match;
    if (routeImports.has(variable)) mounts.set(routeImports.get(variable), mount);
  }

  const routeFiles = walk(routesRoot, (file) => file.endsWith('Routes.js'));
  for (const file of routeFiles) {
    const name = path.basename(file);
    if (!mounts.has(name)) failures.push(`Server route file is not mounted in app.js: server/src/routes/${name}`);
  }

  const endpoints = [];
  for (const [fileName, mount] of mounts.entries()) {
    const file = path.join(routesRoot, fileName);
    if (!fs.existsSync(file)) {
      failures.push(`Mounted route file does not exist: server/src/routes/${fileName}`);
      continue;
    }
    const text = read(file);
    for (const match of text.matchAll(/router\.(get|post|put|patch|delete)\(\s*['"]([^'"]+)['"]/gi)) {
      endpoints.push({
        method: match[1].toUpperCase(),
        path: clientPath(joinRoute(mount, match[2])),
        source: `server/src/routes/${fileName}:${lineAt(text, match.index)}`,
      });
    }
  }

  for (const match of app.matchAll(/app\.(get|post|put|patch|delete)\(\s*['"](\/api\/[^'"]+)['"]/gi)) {
    endpoints.push({
      method: match[1].toUpperCase(),
      path: clientPath(match[2]),
      source: `server/src/app.js:${lineAt(app, match.index)}`,
    });
  }

  const seen = new Map();
  for (const endpoint of endpoints) {
    const key = `${endpoint.method} ${normalizePath(endpoint.path)}`;
    if (seen.has(key)) failures.push(`Duplicate API route: ${key} (${seen.get(key)} and ${endpoint.source})`);
    else seen.set(key, endpoint.source);
  }

  return endpoints;
}

function readQuoted(text, start) {
  const quote = text[start];
  let escaped = false;
  for (let index = start + 1; index < text.length; index += 1) {
    const char = text[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (char === quote) return { raw: text.slice(start + 1, index), end: index + 1 };
  }
  return null;
}

function callTail(text, start) {
  let parens = 1;
  let braces = 0;
  let brackets = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') { quote = char; continue; }
    if (char === '(') parens += 1;
    else if (char === ')') {
      parens -= 1;
      if (parens === 0) return text.slice(start, index);
    } else if (char === '{') braces += 1;
    else if (char === '}') braces = Math.max(0, braces - 1);
    else if (char === '[') brackets += 1;
    else if (char === ']') brackets = Math.max(0, brackets - 1);
  }
  return text.slice(start);
}

function parseClientCalls() {
  const files = walk(clientRoot, (file) => /\.(?:js|jsx)$/.test(file));
  const calls = [];
  let unresolved = 0;

  for (const file of files) {
    const text = read(file);
    let cursor = 0;
    while (cursor < text.length) {
      const start = text.indexOf('apiRequest(', cursor);
      if (start < 0) break;
      let argStart = start + 'apiRequest('.length;
      while (/\s/.test(text[argStart] || '')) argStart += 1;
      const quote = text[argStart];
      if (!['\'', '"', '`'].includes(quote)) {
        unresolved += 1;
        cursor = argStart + 1;
        continue;
      }
      const quoted = readQuoted(text, argStart);
      if (!quoted) {
        failures.push(`${path.relative(root, file)}:${lineAt(text, start)} contains an unterminated apiRequest path literal`);
        break;
      }

      let next = quoted.end;
      while (/\s/.test(text[next] || '')) next += 1;
      if (text[next] && ![',', ')'].includes(text[next])) {
        unresolved += 1;
        cursor = quoted.end;
        continue;
      }

      const tail = callTail(text, quoted.end);
      const methodMatch = tail.match(/\bmethod\s*:\s*['"](GET|POST|PUT|PATCH|DELETE)['"]/i);
      calls.push({
        method: (methodMatch?.[1] || 'GET').toUpperCase(),
        path: normalizePath(quoted.raw),
        source: `${path.relative(root, file)}:${lineAt(text, start)}`,
      });
      cursor = quoted.end;
    }
  }

  if (unresolved) warnings.push(`${unresolved} apiRequest call(s) use a variable/computed first argument and cannot be matched statically.`);
  return calls;
}

const endpoints = parseServerRoutes();
const clientCalls = parseClientCalls();

for (const call of clientCalls) {
  const connected = endpoints.some((endpoint) => endpoint.method === call.method && matchesRoute(call.path, endpoint.path));
  if (!connected) failures.push(`Client API call has no matching server route: ${call.method} ${call.path} (${call.source})`);
}

const health = endpoints.some((endpoint) => endpoint.method === 'GET' && normalizePath(endpoint.path) === '/health');
if (!health) failures.push('Missing GET /api/health endpoint.');

if (failures.length) {
  console.error(`API wiring audit failed:\n${failures.map((item) => `- ${item}`).join('\n')}`);
  if (warnings.length) console.error(`Warnings:\n${warnings.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`API wiring audit passed. ${endpoints.length} server routes discovered; ${clientCalls.length} literal/template client calls matched.`);
if (warnings.length) console.log(`API audit notes:\n${warnings.map((item) => `- ${item}`).join('\n')}`);
