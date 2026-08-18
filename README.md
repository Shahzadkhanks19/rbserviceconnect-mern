# RB Service Connect

RB Service Connect is a full-stack recruitment platform rebuilt from the original RB Service Connect website as a modern MERN application. It provides separate public, candidate, recruiter, and administrator experiences while keeping hiring workflows, permissions, communication, and moderation in one platform.

## Technology

### Client
- React 19
- Vite 8
- JavaScript / JSX
- Tailwind CSS 4 via `@tailwindcss/vite`
- React Router
- Framer Motion
- Lucide icons
- Socket.IO Client

### Server
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication with HTTP-only cookies
- Socket.IO realtime messaging
- Helmet, CORS, and API rate limiting
- Resend transactional email
- Cloudinary resume and message-attachment storage

## Product areas

### Public recruitment website
- Live MongoDB-backed job marketplace
- URL-backed keyword, location, category, work-mode, experience, and sorting filters
- Job details and application availability
- Verified company directory and company details
- Employer information
- About, Contact, FAQ, Privacy, Terms, Cookies, and Accessibility pages
- SEO-aware public metadata and private-route noindex handling

### Candidate workspace
- Candidate profile and job preferences
- Resume upload, replacement, and removal
- Saved jobs
- Applications and hiring-status tracking
- Job alerts
- Interviews and invitation responses
- Realtime recruiter messaging with attachments, typing indicators, and read state
- In-app notifications
- Recruiter discoverability/privacy controls

### Recruiter workspace
- Company profile
- Job creation, editing, publishing, pausing, reviewing, and closing
- Application deadlines and hiring lifecycle controls
- Applicant pipeline
- Candidate search with privacy enforcement
- Talent pools
- Interview scheduling and updates
- Realtime candidate messaging
- Notifications and recruiter settings

### Administration
- Platform overview and analytics
- Recruiter approvals
- User account management
- Company verification/moderation
- Job moderation
- Application oversight
- Contact-enquiry management
- Audit activity log
- Platform registration and approval settings

## Repository structure

```text
client/   React/Vite application
server/   Express/MongoDB API and Socket.IO server
```

## Local development

Install all dependencies from the repository root:

```bash
npm run install:all
```

Copy `server/.env.example` to `server/.env` and configure the required values. At minimum, development requires:

```text
MONGODB_URI
JWT_SECRET
CLIENT_URL=http://localhost:5173
```

`JWT_SECRET` must be at least 32 characters. Resend and Cloudinary variables are required for their respective email/upload features.

Start client and server together:

```bash
npm run dev
```

Default development addresses:
- Client: `http://localhost:5173`
- API/Socket.IO: `http://localhost:5000`

## Quality check

Run the full project check before committing or deploying:

```bash
npm run check
```

This runs:
1. Client ESLint with zero warnings allowed
2. Server ESLint with zero warnings allowed
3. Vite production build

## Security notes

- Authentication uses HTTP-only cookies.
- Candidate, recruiter, and admin APIs are role protected.
- Recruiter candidate discovery respects candidate privacy settings.
- Realtime conversation rooms verify participant ownership server-side.
- Authentication and public submission routes have dedicated rate limits.
- Production startup validates required environment configuration.
- Private dashboard/auth routes are excluded from search-engine indexing.

## Asset policy

The original RB Service Connect branding is the visual source of truth. Raster website assets should use WebP wherever practical; original vector assets should remain SVG when available.
