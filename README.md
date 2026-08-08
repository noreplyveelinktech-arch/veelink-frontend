# Frontend CMS

React + Vite frontend for a generic IT-training-institute CMS with a public website and admin panel.

## Requirements

- Node.js 18+
- Backend API running and reachable through `VITE_API_BASE_URL`

## Environment

Create a `.env` file in this folder:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

An example is included in `.env.example`.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Main Structure

- `src/api` - Axios client and API wrappers
- `src/components/public` - Public website UI components
- `src/components/admin` - Admin panel UI components
- `src/components/shared` - Shared reusable components
- `src/context` - Company branding, toast, and admin auth contexts
- `src/pages/public` - Public route pages
- `src/pages/admin` - Admin route pages
- `src/utils` - Helpers and page meta hook
