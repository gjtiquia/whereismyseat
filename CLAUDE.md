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

### Data Flow
1. Guest enters invite code on home page (`src/pages/index.astro`)
2. Code is validated against global data from Backblaze B2
3. Guest is redirected to event page to search for their name
4. Guest finds their table assignment and can view table details

### Key Components

**Data Layer** (`src/scripts/`):
- `config.ts`: TypeScript types for GlobalData, EventData, GuestData, TableData
- `db.ts`: Fetches JSON data from Backblaze B2 cloud storage
- No traditional database - uses JSON configuration files

**Page Structure** (`src/pages/`):
- `/` - Home page with invite code entry
- `/invite/[inviteCode]` - Validates invite code and redirects to event
- `/e/[eventSlug]` - Event page with guest name search
- `/e/[eventSlug]/t/[tableSlug]` - Table details with image

**Client-Side Logic**:
- `event-home-page.ts`: Implements guest search/filter functionality with vanilla JavaScript

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

- All pages use SSR (`export const prerender = false`) for dynamic content
- Tailwind CSS v4 is configured via `@tailwindcss/vite`
- TypeScript strict mode is enabled
- The decorative gradient background is implemented in `Layout.astro`
- Mobile-first responsive design throughout