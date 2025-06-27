# AI Job Board

A modern, AI-powered job board web application built with Next.js 15, featuring intelligent job matching, automated applicant ranking, and comprehensive employer tools.

## 🚀 Features

### For Job Seekers
- **AI-Powered Job Search**: Use natural language to describe your skills and preferences for intelligent job matching
- **Smart Notifications**: Receive daily email notifications for new job listings that match your criteria
- **Resume Management**: Upload and manage your resume with AI-generated summaries
- **Application Tracking**: Apply to jobs with optional cover letters and track application status
- **Advanced Filtering**: Filter jobs by location, experience level, job type, and more

### For Employers
- **Job Listing Management**: Create, edit, and manage job listings with rich markdown descriptions
- **Applicant Management**: View and manage applications with AI-powered applicant ranking
- **Organization Settings**: Configure notification preferences and rating thresholds
- **Featured Listings**: Highlight important positions with featured status
- **Application Analytics**: Track application counts and manage application stages

### AI Features
- **Intelligent Job Matching**: AI analyzes user preferences and job requirements for optimal matches
- **Automated Applicant Ranking**: AI evaluates applicants based on resume, cover letter, and job requirements
- **Resume Analysis**: AI generates comprehensive summaries of uploaded resumes
- **Smart Notifications**: AI filters job listings based on user preferences for personalized notifications

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router and Turbopack
- **React 19** with Server Components and Suspense
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design system
- **Radix UI** for accessible component primitives
- **React Hook Form** with Zod validation
- **MDX Editor** for rich text editing

### Backend
- **Next.js API Routes** for server-side functionality
- **Drizzle ORM** with PostgreSQL for database management
- **Inngest** for background job processing and workflows
- **Clerk** for authentication and user management
- **UploadThing** for file uploads and storage

### Database
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations
- **Database migrations** with Drizzle Kit

## 🗄️ Database Schema

### Core Entities

#### Users
- `id`: Primary key (Clerk user ID)
- `name`: User's full name
- `email`: Email address
- `imageUrl`: Profile image URL
- `createdAt`, `updatedAt`: Timestamps

#### Organizations
- `id`: Primary key (Clerk organization ID)
- `name`: Organization name
- `imageUrl`: Organization logo URL
- `createdAt`, `updatedAt`: Timestamps

#### Job Listings
- `id`: UUID primary key
- `organizationId`: Foreign key to organizations
- `title`: Job title
- `description`: Rich markdown description
- `wage`: Salary amount (optional)
- `wageInterval`: "hourly" or "yearly"
- `stateAbbreviation`, `city`: Location details
- `locationRequirement`: "in-office", "hybrid", or "remote"
- `experienceLevel`: "junior", "mid-level", or "senior"
- `type`: "internship", "part-time", or "full-time"
- `status`: "draft", "published", or "delisted"
- `isFeatured`: Boolean for featured listings
- `postedAt`: Publication timestamp
- `createdAt`, `updatedAt`: Timestamps

#### Job Applications
- `jobListingId`, `userId`: Composite primary key
- `coverLetter`: Optional markdown cover letter
- `rating`: AI-generated rating (1-5)
- `stage`: "denied", "applied", "interested", "interviewed", "hired"
- `createdAt`, `updatedAt`: Timestamps

#### User Resumes
- `userId`: Primary key
- `resumeFileUrl`: File storage URL
- `resumeFileKey`: Storage key for cleanup
- `aiSummary`: AI-generated resume summary
- `createdAt`, `updatedAt`: Timestamps

#### User Notification Settings
- `userId`: Primary key
- `newJobEmailNotifications`: Boolean for daily emails
- `aiPrompt`: Custom AI prompt for job filtering
- `createdAt`, `updatedAt`: Timestamps

#### Organization User Settings
- `userId`, `organizationId`: Composite primary key
- `newApplicationEmailNotifications`: Boolean for application emails
- `minimumRating`: Minimum rating threshold for notifications
- `createdAt`, `updatedAt`: Timestamps

## 🤖 AI Integration

### AI Services Used
- **Anthropic Claude 3.5 Sonnet**: Resume analysis and summarization
- **Google Gemini 2.0 Flash**: Job matching and applicant ranking

### AI Workflows

#### Resume Analysis
1. User uploads resume via UploadThing
2. Inngest triggers `createAiSummaryOfUploadedResume` function
3. Claude AI analyzes the resume and generates a comprehensive summary
4. Summary is stored in the database for future use

#### Job Matching
1. User provides natural language description of preferences
2. Gemini AI analyzes available job listings against user criteria
3. Returns ranked list of matching job IDs
4. Results are displayed to the user

#### Applicant Ranking
1. When a user applies to a job, Inngest triggers `rankApplication`
2. AI agent receives:
   - User's resume summary
   - Cover letter (if provided)
   - Job listing details
3. Gemini AI evaluates the match and assigns a rating (1-5)
4. Rating is stored in the database

## 📧 Email System

### Email Service
- **Resend** for transactional emails
- **React Email** for email templates
- **Inngest** for email scheduling and delivery

### Email Types

#### Daily Job Notifications
- **Trigger**: Daily cron job at 7 AM CST
- **Recipients**: Users with email notifications enabled
- **Content**: New job listings from the past 24 hours
- **AI Filtering**: Uses user's AI prompt to filter relevant jobs

#### Daily Application Notifications
- **Trigger**: Daily cron job at 7 AM CST
- **Recipients**: Organization users with application notifications enabled
- **Content**: New applications from the past 24 hours
- **Filtering**: Respects minimum rating thresholds

## 🔐 Authentication & Authorization

### Authentication
- **Clerk** for user authentication and management
- **Organization support** with role-based permissions
- **Webhook integration** for user/organization lifecycle events

### Permissions System
- **User Permissions**: Basic user operations
- **Organization Permissions**: Job listing and application management
- **Plan Features**: Subscription-based feature access

### Permission Types
- `org:job_listings:create`
- `org:job_listings:update`
- `org:job_listings:delete`
- `org:job_listings:change_status`
- `org:job_listing_applications:change_rating`
- `org:job_listing_applications:change_stage`

## 🔄 Background Processing

### Inngest Functions

#### User Management
- `clerkCreateUser`: Creates user record when Clerk user is created
- `clerkUpdateUser`: Updates user record when Clerk user is updated
- `clerkDeleteUser`: Deletes user record when Clerk user is deleted

#### Organization Management
- `clerkCreateOrganization`: Creates organization record
- `clerkUpdateOrganization`: Updates organization record
- `clerkDeleteOrganization`: Deletes organization record
- `clerkCreateOrgMembership`: Creates organization user settings
- `clerkDeleteOrgMembership`: Deletes organization user settings

#### Resume Processing
- `createAiSummaryOfUploadedResume`: Analyzes uploaded resumes with AI

#### Application Processing
- `rankApplication`: Ranks job applicants using AI

#### Email Processing
- `prepareDailyUserJobListingNotifications`: Prepares daily job notifications
- `sendDailyUserJobListingEmail`: Sends daily job notification emails
- `prepareDailyOrganizationUserApplicationNotifications`: Prepares daily application notifications
- `sendDailyOrganizationUserApplicationEmail`: Sends daily application notification emails

## 📁 File Management

### UploadThing Integration
- **Resume Uploads**: PDF files up to 8MB
- **Automatic Cleanup**: Removes old files when new ones are uploaded
- **Secure Access**: User-specific file access controls

## 🎨 UI/UX Features

### Design System
- **Custom UI Components**: Built on Radix UI primitives
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Dark Mode Support**: Theme-aware components
- **Loading States**: Skeleton components and loading spinners
- **Toast Notifications**: User feedback with Sonner

### Layout System
- **Sidebar Navigation**: Collapsible sidebar with organization switching
- **Resizable Panels**: Flexible layout system
- **Mobile Responsive**: Touch-friendly mobile interface

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Docker (for local development)

### Environment Variables
```env
# Database
DB_PASSWORD=your_db_password
DB_USER=your_db_user
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# File Uploads
UPLOADTHING_TOKEN=your_uploadthing_token

# AI Services
ANTHROPIC_API_KEY=your_anthropic_api_key
GEMINI_API_KEY=your_gemini_api_key

# Email
RESEND_API_KEY=your_resend_api_key

# Server
SERVER_URL=http://localhost:3000
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai_job_board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Using Docker
   docker-compose up -d
   
   # Or connect to your existing PostgreSQL instance
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Start Inngest (in a separate terminal)**
   ```bash
   npm run inngest
   ```

7. **Start email preview (optional)**
   ```bash
   npm run email
   ```

### Available Scripts
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:push`: Push database schema changes
- `npm run db:generate`: Generate new migrations
- `npm run db:migrate`: Run database migrations
- `npm run db:studio`: Open Drizzle Studio
- `npm run inngest`: Start Inngest development server
- `npm run email`: Start email preview server

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (clerk)/           # Clerk authentication routes
│   ├── (job-seeker)/      # Job seeker interface
│   ├── employer/          # Employer dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── sidebar/          # Sidebar components
│   └── markdown/         # Markdown components
├── features/             # Feature-based modules
│   ├── jobListings/      # Job listing functionality
│   ├── jobListingApplications/ # Application management
│   ├── organizations/    # Organization management
│   └── users/           # User management
├── services/            # External service integrations
│   ├── clerk/           # Authentication service
│   ├── inngest/         # Background processing
│   ├── resend/          # Email service
│   └── uploadthing/     # File upload service
├── drizzle/             # Database schema and migrations
├── data/               # Data layer (env, cache)
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🔧 Development

### Code Organization
- **Feature-based architecture**: Each feature is self-contained with its own components, actions, and database layer
- **Type safety**: Full TypeScript coverage with Zod validation
- **Server actions**: Form handling with server-side validation
- **Caching**: Intelligent cache invalidation with Next.js cache tags

### Testing
- **Component testing**: UI components with React Testing Library
- **Integration testing**: API routes and server actions
- **E2E testing**: Full user workflows

### Performance
- **Server components**: Reduced client-side JavaScript
- **Image optimization**: Next.js Image component
- **Database optimization**: Efficient queries with Drizzle ORM
- **Caching**: Strategic cache invalidation

## 🚀 Deployment

### Production Deployment
- **Vercel**: Recommended for Next.js applications
- **Database**: PostgreSQL on Vercel Postgres or external provider
- **Environment variables**: Configure all required environment variables
- **Inngest**: Deploy background functions to Inngest cloud

### Monitoring
- **Error tracking**: Integrate with error monitoring service
- **Performance monitoring**: Track Core Web Vitals
- **Database monitoring**: Monitor query performance
- **Email delivery**: Track email delivery rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
