import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const failures=[];
const requiredFiles=[
  'DEPLOYMENT.md',
  'client/src/components/AppPreloader.jsx',
  'client/src/components/GlobalErrorBoundary.jsx',
  'client/src/components/PageSkeleton.jsx',
  'client/src/pages/public/ErrorPage.jsx',
  'client/src/pages/public/NotFoundPage.jsx',
  'server/.env.example',
];

const read=(relative)=>fs.readFileSync(path.join(root,relative),'utf8');
for(const relative of requiredFiles){if(!fs.existsSync(path.join(root,relative)))failures.push(`Missing deployment/system file: ${relative}`);}

if(fs.existsSync(path.join(root,'package.json'))){
  const pkg=JSON.parse(read('package.json'));
  for(const script of ['check','deploy:build','deploy:start','start'])if(!pkg.scripts?.[script])failures.push(`Missing root npm script: ${script}`);
  const major=Number(String(pkg.engines?.node||'').match(/(\d+)/)?.[1]||0);
  if(major<20)failures.push('Root package.json must require Node.js 20+ for the current Vite/React toolchain.');
}

if(fs.existsSync(path.join(root,'client/src/App.jsx'))){
  const app=read('client/src/App.jsx');
  if(!app.includes('fallback={<PageSkeleton/>}'))failures.push('Route-level Suspense must use PageSkeleton.');
  if(!app.includes('path="*"'))failures.push('Missing wildcard 404 route.');
  if(!app.includes('path="error"'))failures.push('Missing dedicated /error route.');
  if(!app.includes("'/error'"))failures.push('/error must be represented in route metadata/noindex handling.');
}

if(fs.existsSync(path.join(root,'client/src/main.jsx'))){
  const main=read('client/src/main.jsx');
  if(!main.includes('GlobalErrorBoundary'))failures.push('GlobalErrorBoundary is not mounted at the application root.');
}

if(fs.existsSync(path.join(root,'server/src/app.js'))){
  const serverApp=read('server/src/app.js');
  if(!serverApp.includes('express.static(clientDist'))failures.push('Production server is not serving the built client.');
  if(!serverApp.includes('Production client build is missing'))failures.push('Production server must fail clearly when client/dist is absent.');
}

if(fs.existsSync(path.join(root,'server/.env.example'))){
  const env=read('server/.env.example');
  for(const key of ['MONGODB_URI','JWT_SECRET','CLIENT_URL','RESEND_API_KEY','EMAIL_FROM','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET','ENABLE_DEMO_AUTOPAY'])if(!env.includes(`${key}=`))failures.push(`server/.env.example is missing ${key}.`);
}

const rejected=['client/public/favicon.webp','client/public/images/rb-service-connect-logo.webp'];
for(const relative of rejected)if(fs.existsSync(path.join(root,relative)))failures.push(`Rejected blue brand asset must stay removed: ${relative}`);

if(failures.length){
  console.error(`Deployment readiness audit failed:\n${failures.map((item)=>`- ${item}`).join('\n')}`);
  process.exit(1);
}
console.log('Deployment readiness audit passed. System pages, production serving, environment contract, and rejected-brand safeguards are in place.');
