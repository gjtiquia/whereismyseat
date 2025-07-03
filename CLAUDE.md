# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Where Is My Seat" is a wedding/event seating finder application built with Astro, TypeScript, and Tailwind CSS. Guests enter an invite code to access their event and search for their table assignment.

## Commands

```bash
pnpm dev       # Start development server at localhost:4321
pnpm build     # Build production site to ./dist/
pnpm preview   # Preview production build locally
pnpm start     # Run production server (Node.js)
pnpm install   # Install dependencies
```

Note: If you encounter Sharp image processing errors, run `pnpm add sharp` manually.

## Architecture

### Guest Flow
1. Guest enters invite code on home page (`src/pages/index.astro`)
2. Code is validated against global data from Backblaze B2
3. Guest is redirected to event page to search for their name
4. Guest finds their table assignment and can view table details

### Host Flow
1. Host registers for an account (`src/pages/register.astro`)
2. Host logs in to access dashboard (`src/pages/login.astro`)
3. Host views their events on dashboard (`src/pages/dashboard.astro`)
4. Host can create new events (`src/pages/events/new.astro`)
5. Host can edit existing events (`src/pages/e/[eventSlug]/edit.astro`)

### Key Components

**Data Layer** (`src/scripts/`):
- `config.ts`: TypeScript types for GlobalData, EventData, GuestData, TableData
- `db.ts`: Fetches JSON data from Backblaze B2 cloud storage
- No traditional database - uses JSON configuration files

**Page Structure** (`src/pages/`):

Guest Pages:
- `/` - Home page with invite code entry
- `/invite/[inviteCode]` - Validates invite code and redirects to event
- `/e/[eventSlug]` - Event page with guest name search
- `/e/[eventSlug]/landing` - Event landing page
- `/e/[eventSlug]/seating-plan` - Visual seating plan view
- `/e/[eventSlug]/t/[tableSlug]` - Table details with image

Host Pages:
- `/register` - Host registration page
- `/login` - Host login page
- `/dashboard` - Host dashboard showing all events
- `/events/new` - Create new event
- `/e/[eventSlug]/edit` - Edit existing event

**Client-Side Logic**:
- `event-home-page.ts`: Implements guest search/filter functionality with vanilla JavaScript

**API Routes** (`src/pages/api/`):
- `/api/register` - Host registration endpoint
- `/api/login` - Host authentication endpoint
- `/api/logout` - Host logout endpoint
- `/api/events` - Create and list events
- `/api/events/[eventId]` - Update and delete specific events
- `/api/events/[eventSlug]` - Get event by slug

### Data Storage

Production data is stored on Backblaze B2:
- Global data: `https://f005.backblazeb2.com/file/s3-gjt-io/whereismyseat/global.json`
- Event data: `https://f005.backblazeb2.com/file/s3-gjt-io/whereismyseat/{eventSlug}.json`

Local development can use files in the `data/` directory:
- `data/global.json` - Contains invite codes mapping to event slugs
- `data/test-event.json` - Sample event data for local testing

These JSON files follow the TypeScript schemas defined in `src/scripts/config.ts`:
- `GlobalData` - Contains array of `InviteData` (inviteCode → eventSlug mapping)
- `EventData` - Contains eventSlug, array of `GuestData`, and array of `TableData`
- `GuestData` - Contains displayName, aliases array, and tableId
- `TableData` - Contains tableId and imageUrl

## Development Notes

- All dynamic pages and API endpoints require `export const prerender = false` for SSR
- Pages that need SSR include: authentication pages, dashboard, API routes, and any page checking cookies
- Tailwind CSS v4 is configured via `@tailwindcss/vite`
- TypeScript strict mode is enabled
- The decorative gradient background is implemented in `Layout.astro`
- Mobile-first responsive design throughout
- Authentication is handled via API routes with session management
- Form styling follows consistent Tailwind patterns (gradient backgrounds, rounded inputs, etc.)
- All API endpoints include proper error handling for invalid JSON requests

## Common Issues

- **Build Permission Error**: If you encounter `EACCES: permission denied, mkdir '/home/.../.config/astro'` during build, this is a sandbox/environment permission issue. The build process may need to be run with appropriate permissions or in a different environment.
- **POST Request Error**: If you see "POST requests are not available for static endpoints", ensure the page/API route has `export const prerender = false` in the frontmatter.

## Security Considerations

The current authentication implementation uses:
- Plain text password storage (should be hashed in production)
- File-based data storage with JSON files
- Cookie-based sessions without CSRF protection
- No rate limiting on authentication endpoints

These are suitable for development but require hardening for production use.