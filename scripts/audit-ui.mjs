import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('client/src');const violations=[];
const globalPatterns=[{name:'native <select>',regex:/<select\b/g},{name:'native checkbox/radio/date/time control',regex:/type\s*=\s*["'](?:checkbox|radio|date|datetime-local|time|month|week|color)["']/g},{name:'browser alert/confirm/prompt',regex:/\b(?:window\.)?(?:alert|confirm|prompt)\s*\(/g}];
const primitivePatterns=[{name:'raw <input> outside shared UI primitives',regex:/<input\b/g},{name:'raw <textarea> outside shared UI primitives',regex:/<textarea\b/g},{name:'native file input outside shared UI primitives',regex:/type\s*=\s*["']file["']/g}];
const sharedUiRoot=path.resolve(root,'components/ui');
function record(text,file,patterns){for(const pattern of patterns){for(const match of text.matchAll(pattern.regex)){const line=text.slice(0,match.index).split('\n').length;violations.push(`${path.relative(process.cwd(),file)}:${line} ${pattern.name}`);}}}
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(?:jsx|js)$/.test(entry.name)){const text=fs.readFileSync(file,'utf8');record(text,file,globalPatterns);if(!file.startsWith(`${sharedUiRoot}${path.sep}`))record(text,file,primitivePatterns);}}}
walk(root);if(violations.length){console.error('Custom UI audit failed:\n'+violations.map((item)=>`- ${item}`).join('\n'));process.exit(1);}console.log('Custom UI audit passed. Shared UI primitives are the only allowed location for native form controls.');
