const origin=String(process.env.DEPLOYMENT_URL||'').replace(/\/$/,'');
if(!origin){
  console.error('DEPLOYMENT_URL is required, for example: DEPLOYMENT_URL=https://example.com npm run smoke:deploy');
  process.exit(1);
}

const failures=[];
async function request(path,{accept='*/*',expected=200}={}){
  const url=`${origin}${path}`;
  try{
    const response=await fetch(url,{headers:{Accept:accept},redirect:'follow',signal:AbortSignal.timeout(10000)});
    if(response.status!==expected)failures.push(`${path}: expected HTTP ${expected}, received ${response.status}`);
    return response;
  }catch(error){
    failures.push(`${path}: could not reach ${url} (${error.message})`);
    return null;
  }
}

const home=await request('/',{accept:'text/html'});
if(home){
  const body=await home.text();
  if(!body.includes('id="root"'))failures.push('/: production HTML does not contain the React root element.');
  if(!String(home.headers.get('content-type')||'').includes('text/html'))failures.push('/: expected an HTML content type.');
  for(const header of ['content-security-policy','x-content-type-options','referrer-policy'])if(!home.headers.get(header))failures.push(`/: missing security header ${header}.`);
}

const robots=await request('/robots.txt',{accept:'text/plain'});
if(robots){const body=await robots.text();if(!body.includes('Sitemap:'))failures.push('/robots.txt: sitemap declaration is missing.');if(!body.includes('Disallow: /admin'))failures.push('/robots.txt: private admin routes are not excluded.');}

const sitemap=await request('/sitemap.xml',{accept:'application/xml'});
if(sitemap){const body=await sitemap.text();if(!body.includes('<urlset'))failures.push('/sitemap.xml: invalid or missing urlset.');if(!body.includes(`${origin}/jobs`))failures.push('/sitemap.xml: public jobs page is missing.');}

const health=await request('/api/health',{accept:'application/json'});
if(health){const body=await health.json().catch(()=>null);if(body?.status!=='ok')failures.push('/api/health: response does not report status=ok.');}

await request('/api/__rbsc_smoke_missing__',{accept:'application/json',expected:404});
const spa=await request('/__rbsc_smoke_404__',{accept:'text/html'});
if(spa){const body=await spa.text();if(!body.includes('id="root"'))failures.push('SPA fallback: unknown browser routes are not returning the application shell.');}

if(failures.length){
  console.error(`Deployment smoke test failed against ${origin}:\n${failures.map((item)=>`- ${item}`).join('\n')}`);
  process.exit(1);
}
console.log(`Deployment smoke test passed against ${origin}. HTML serving, security headers, SEO endpoints, API health, API 404 handling, and SPA fallback are responding correctly.`);
