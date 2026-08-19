import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('client/src');const violations=[];
const globalPatterns=[{name:'native <select>',regex:/<select\b/g},{name:'native checkbox/radio/date/time control',regex:/type\s*=\s*["'](?:checkbox|radio|date|datetime-local|time|month|week|color)["']/g},{name:'browser alert/confirm/prompt',regex:/\b(?:window\.)?(?:alert|confirm|prompt)\s*\(/g}];
const sharedUiRoot=path.resolve(root,'components/ui');
function lineAt(text,index){return text.slice(0,index).split('\n').length;}
function record(text,file,patterns){for(const pattern of patterns){for(const match of text.matchAll(pattern.regex))violations.push(`${path.relative(process.cwd(),file)}:${lineAt(text,match.index)} ${pattern.name}`);}}
function recordUnstyledControls(text,file){if(file.startsWith(`${sharedUiRoot}${path.sep}`))return;for(const tag of ['input','textarea']){const regex=new RegExp(`<${tag}\\b[^>]*>`,'g');for(const match of text.matchAll(regex)){const markup=match[0];const isHiddenFile=tag==='input'&&/type\s*=\s*["']file["']/.test(markup)&&/className\s*=\s*["'][^"']*\bsr-only\b/.test(markup);const isStyled=/className\s*=/.test(markup);if(!isStyled&&!isHiddenFile)violations.push(`${path.relative(process.cwd(),file)}:${lineAt(text,match.index)} unstyled native <${tag}> control`);}}
}
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(?:jsx|js)$/.test(entry.name)){const text=fs.readFileSync(file,'utf8');record(text,file,globalPatterns);recordUnstyledControls(text,file);}}}
walk(root);if(violations.length){console.error('Custom UI audit failed:\n'+violations.map((item)=>`- ${item}`).join('\n'));process.exit(1);}console.log('Custom UI audit passed. Native browser-default controls and dialogs are not allowed; text controls must use the shared primitives or explicit custom styling.');
