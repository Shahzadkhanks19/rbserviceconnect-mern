# RB Service Connect — Production Deployment

The production server is configured to serve the built Vite client, the Express API, and Socket.IO from the same origin. This avoids cross-domain cookie and realtime complexity and is the recommended deployment shape for the current project.

## Runtime

Use Node.js 20.19+ (Node 22 or 24 LTS/current is also suitable), a managed MongoDB database, HTTPS, and persistent environment variables. The application listens on `PORT` and serves the frontend, `/api/*`, and `/socket.io/*` from the same process after the client has been built.

## Install and build

From the repository root:

```bash
npm run install:all
npm run deploy:build
```

`deploy:build` runs the UI audit, API wiring audit, zero-warning ESLint checks, and the production Vite build. Do not deploy if it fails.

## Production environment

Create `server/.env` or configure these values in the hosting provider:

```text
NODE_ENV=production
PORT=5000
MONGODB_URI=<production MongoDB connection string>
JWT_SECRET=<random secret at least 48 characters>
CLIENT_URL=https://your-domain.example

RESEND_API_KEY=<production Resend API key>
EMAIL_FROM=RB Service Connect <noreply@your-verified-domain.example>

CLOUDINARY_CLOUD_NAME=<cloud name>
CLOUDINARY_API_KEY=<api key>
CLOUDINARY_API_SECRET=<api secret>

# Configure these only when Razorpay payment features are enabled.
RAZORPAY_KEY_ID=<key id>
RAZORPAY_KEY_SECRET=<key secret>
RAZORPAY_WEBHOOK_SECRET=<webhook secret>

# Bootstrap only when the first admin still needs to be created.
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_FIRST_NAME=RB
ADMIN_LAST_NAME=Admin
ADMIN_SYNC_PASSWORD=false
```

Production startup intentionally fails when core email or Cloudinary configuration is incomplete so the deployed site cannot silently launch with broken verification, resume upload, or message-attachment flows.

## Start

```bash
npm run deploy:start
```

The server serves `client/dist` automatically in production, including SPA route fallback. Hashed Vite assets receive long immutable caching while `index.html` is revalidated.

## Reverse proxy / HTTPS

Place the Node service behind an HTTPS reverse proxy such as Nginx, Caddy, Cloudflare, or the hosting provider's managed proxy. Proxy normal HTTP traffic and WebSocket upgrades to the same Node port. Do not route `/socket.io` to a different service.

Example Nginx location:

```nginx
location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## Provider configuration

Build command:

```text
npm run install:all && npm run deploy:build
```

Start command:

```text
npm run deploy:start
```

Health check:

```text
/api/health
```

## Post-deployment verification

After DNS/HTTPS and environment variables are active:

```bash
API_BASE_URL=https://your-domain.example/api npm run smoke:api
```

Then manually verify one candidate signup/email verification, one recruiter signup/approval path, resume upload, message attachment upload, realtime messaging, and Razorpay sandbox/live configuration if payments are enabled.

## Production checklist

- `npm run deploy:build` passes.
- MongoDB network access and credentials are production-safe.
- `CLIENT_URL` exactly matches the HTTPS public origin.
- JWT secret is unique and at least 48 characters.
- Resend sender domain is verified.
- Cloudinary credentials are production credentials.
- Razorpay webhook URL points to `https://your-domain.example/api/webhooks/razorpay` when payments are enabled.
- Admin bootstrap password is removed/rotated after the intended admin exists.
- HTTPS proxy supports WebSocket upgrades.
- `/api/health` returns HTTP 200.
- `npm run smoke:api` passes against the deployed origin.
- Unknown public routes render the 404 UI and are `noindex`.
- `/error`, auth pages, and all private workspaces are `noindex`.
