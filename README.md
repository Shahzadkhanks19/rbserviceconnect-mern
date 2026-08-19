# RB Service Connect

RB Service Connect is a full-stack recruitment and hiring-operations platform rebuilt from the original RB Service Connect website as a modern MERN application. It provides separate public, candidate, recruiter, and administrator experiences while keeping job discovery, hiring workflows, communication, placements, optional career services, payments, promotion, trust and safety, and platform operations in one system.

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
- Shared custom form/control primitives

### Server
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication with HTTP-only cookies
- Socket.IO realtime messaging
- Helmet, CORS, and API rate limiting
- Resend transactional email and email verification
- Cloudinary resume and message-attachment storage
- Razorpay order/payment verification for supported paid flows

## Product areas

### Public recruitment website
- Live MongoDB-backed job marketplace
- URL-backed keyword, location, category, work-mode, experience, and sorting filters
- Job details and application availability
- Company directory and company details with platform verification state
- Candidate and employer information pages
- About, Contact, FAQ, Privacy, Terms, Cookies, and Accessibility pages
- SEO-aware public metadata and private-route `noindex` handling
- Responsive navigation, footer, and scroll-to-top experience

### Candidate workspace
- Candidate profile, experience, skills, and job preferences
- Resume upload, replacement, and removal
- Saved jobs
- Applications and hiring-status tracking
- Job alerts
- Interviews and invitation responses
- Realtime recruiter messaging with attachments, typing indicators, unread/read state, archive/restore, blocking, and reporting
- In-app notifications and Safety Center
- Recruiter discoverability, resume visibility, messaging, and privacy controls
- Placement confirmation, salary/joining reconciliation, disputes, and first-salary confirmation
- Optional Career Programme enrollment, service-progress tracking, withdrawal, and post-placement fee preferences
- Candidate billing, verified Razorpay payments, installments, and receipts where applicable
- Explicitly labelled portfolio AutoPay simulation; it is not a real bank/card/UPI mandate

### Recruiter workspace
- Company profile and employer identity management
- Job creation, editing, publishing, pausing, reviewing, and closing
- Application deadlines and hiring lifecycle controls
- Applicant pipeline
- Candidate search with candidate privacy enforcement
- Talent pools
- Interview scheduling and updates
- Realtime candidate messaging with safety controls
- Notifications and recruiter settings
- Placement/hire confirmation and salary/joining reconciliation
- Optional paid job promotion for additional marketplace visibility; promotion does not guarantee applications, interviews, or hires

### Administration
- Platform overview and operational analytics
- Recruiter account approvals and suspension
- User account management
- Company verification/moderation
- Job moderation and application oversight
- Contact-enquiry management
- Trust-and-safety report moderation with documented outcomes
- Placement reconciliation, disputes, fee waiver, and cancellation operations
- Career Programme enrollment/service administration
- Billing and installment reconciliation
- Razorpay transaction/refund operations where supported
- Promotion-payment and lifecycle administration
- Portfolio AutoPay simulation monitoring
- Audit activity log
- Platform registration, recruiter-approval, maintenance, and support-message settings

## Important account lifecycle

Candidate and recruiter accounts must verify ownership of their email address before sign-in. Verification links expire after 24 hours and can be resent from the verification page.

Recruiters can additionally require administrator approval depending on the `requireRecruiterApproval` platform setting. Email verification and recruiter approval are separate controls: email verification confirms inbox ownership, while recruiter approval controls access to recruiter workspace features.

In local development, if Resend is not configured, verification links are written to the server console instead of being delivered by email. Production deployments should configure a valid Resend API key and verified sender.

## Repository structure

```text
client/   React/Vite application
server/   Express/MongoDB API and Socket.IO server
scripts/  Repository-level quality and UI audits
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

`JWT_SECRET` must be at least 32 characters. Resend, Cloudinary, and Razorpay variables are required when exercising their respective email, upload, and payment features.

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

The repository-level check runs the custom UI audit, client and server ESLint with zero warnings allowed, and the production build. The UI audit rejects browser-default dialogs/selects and unstyled native text controls so application surfaces stay aligned with the shared design system.

## Security and trust notes

- Authentication uses HTTP-only cookies.
- Candidate and recruiter accounts require email verification before sign-in.
- Recruiter access may additionally require administrator approval.
- Candidate, recruiter, and admin APIs are role protected.
- Recruiter candidate discovery respects candidate privacy settings.
- Realtime conversation rooms verify participant ownership server-side.
- Messaging includes blocking/reporting controls and an administrative moderation workflow.
- Payment flows supported by Razorpay are verified server-side before platform state is updated.
- Authentication and public submission routes have dedicated rate limits.
- Production startup validates required environment configuration.
- Private dashboard/auth routes are excluded from search-engine indexing.
- Company verification, recruiter approval, paid promotion, and moderation states are separate platform concepts and should not be presented as guarantees of hiring quality or outcomes.

## Product integrity notes

- Career Programmes are optional services and must not be described as guaranteeing employment.
- Paid job promotion changes marketplace visibility only; it does not guarantee applications, interviews, or hires.
- The AutoPay experience currently present in the portfolio is a simulation and must not be represented as an active recurring bank/card/UPI mandate.
- Illustrative interface previews and sample metrics should be clearly identified as examples rather than live platform activity.

## Asset policy

The original RB Service Connect branding is the visual source of truth. Raster website assets should use WebP wherever practical; original vector assets should remain SVG when available.
