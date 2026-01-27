# International TAMU Corporation (ITC) - Frontend

A production-grade Next.js frontend for the International TAMU Corporation website, a cultural/NGO community organization.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Authentication**: JWT-based (frontend token management)

## Features

### Public Pages
- **Home** (`/`) - Hero section, stats, mission, events preview, news preview
- **About** (`/about`) - Organization info, mission, vision, history, team
- **Events** (`/events`) - Events listing with status badges
- **Events Detail** (`/events/[id]`) - Individual event details with registration
- **News** (`/news`) - News/blog listing
- **News Detail** (`/news/[slug]`) - Individual article with social sharing
- **Gallery** (`/gallery`) - Photo & video gallery with lightbox
- **Contact** (`/contact`) - Contact form with validation
- **Donate** (`/donate`) - Donation page (Stripe placeholder)

### Admin Dashboard
- **Login** (`/admin/login`) - Secure admin authentication
- **Dashboard** (`/admin/dashboard`) - Stats overview and quick actions
- **Posts Management** (`/admin/posts`) - CRUD for news/blog posts
- **Events Management** (`/admin/events`) - CRUD for events
- **Gallery Management** (`/admin/gallery`) - Media upload and management

### Key Features
- SEO optimized with metadata and OpenGraph tags
- Fully responsive (mobile-first design)
- Accessible (semantic HTML, ARIA attributes)
- Route protection via middleware
- Reusable UI component library
- Clean API client with auth interceptors

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── donate/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── news/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── admin/              # Admin dashboard
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── login/
│   │   ├── posts/
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/             # Header, Footer, Sidebar
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── api.ts              # API client
│   ├── auth.ts             # Auth utilities
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript types
└── middleware.ts           # Route protection
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ITC_Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.itc.org
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=International TAMU Corporation
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## API Integration

The frontend expects a REST API with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user

### Posts
- `GET /posts` - List posts (public)
- `GET /posts/:slug` - Get post by slug (public)
- `GET /posts/recent` - Get recent posts (public)
- `GET /admin/posts` - List all posts (admin)
- `POST /admin/posts` - Create post (admin)
- `PUT /admin/posts/:id` - Update post (admin)
- `DELETE /admin/posts/:id` - Delete post (admin)

### Events
- `GET /events` - List events (public)
- `GET /events/:id` - Get event by ID (public)
- `GET /events/upcoming` - Get upcoming events (public)
- `GET /admin/events` - List all events (admin)
- `POST /admin/events` - Create event (admin)
- `PUT /admin/events/:id` - Update event (admin)
- `DELETE /admin/events/:id` - Delete event (admin)

### Gallery
- `GET /gallery` - List gallery items (public)
- `GET /gallery/albums` - List albums (public)
- `POST /admin/gallery` - Add gallery item (admin)
- `DELETE /admin/gallery/:id` - Delete gallery item (admin)

### Contact
- `POST /contact` - Submit contact form (public)

### Dashboard
- `GET /admin/dashboard/stats` - Get dashboard statistics (admin)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://api.itc.org` |
| `NEXT_PUBLIC_SITE_URL` | Frontend site URL | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_NAME` | Site name for SEO | `International TAMU Corporation` |

## UI Components

The project includes a comprehensive UI component library:

- **Button** - Multiple variants (primary, secondary, outline, ghost, danger)
- **Input** - Form input with label, error, and icon support
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Card** - Content container with variants
- **Modal** - Dialog/modal component
- **Badge** - Status indicators
- **Alert** - Notification messages
- **Loading** - Spinner and skeleton components

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```ts
colors: {
  primary: { /* warm orange tones */ },
  secondary: { /* burgundy tones */ },
  accent: { /* golden tones */ },
}
```

### Fonts

The project uses:
- **Inter** - Body text (sans-serif)
- **Playfair Display** - Headings (serif)

## Future Enhancements

- [ ] Stripe payment integration for donations
- [ ] Dark mode support
- [ ] Newsletter subscription
- [ ] Event registration system
- [ ] Member portal
- [ ] Multi-language support

## License

This project is proprietary and confidential.

---

Built with Next.js and Tailwind CSS
