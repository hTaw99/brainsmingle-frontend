# frontend-tanstack

A [TanStack Start](https://tanstack.com/start) application with file-based routing, server-aware data fetching, and a typed API layer.

## Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) + [React](https://react.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (file routes under `src/routes`)
- **Data:** [TanStack Query](https://tanstack.com/query) with SSR integration (`@tanstack/react-router-ssr-query`)
- **HTTP:** [Axios](https://axios-http.com/) (`src/api/request`)
- **i18n:** [Intlayer](https://intlayer.org/) + [react-intlayer](https://intlayer.org/doc/packages/react-intlayer) (`src/contents`, `intlayer.config.ts`)
- **UI:** [Tailwind CSS](https://tailwindcss.com/) v4, [shadcn/ui](https://ui.shadcn.com/) (`src/components/ui`)
- **Analytics:** [PostHog](https://posthog.com/) (optional, via env)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (version pinned in `package.json`)

## Setup

```bash
pnpm install
cp .env-example .env.local
```

Edit `.env.local` and set at least `VITE_API_URL` to your backend base URL.

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `pnpm dev`     | Dev server (port 3000)         |
| `pnpm build`   | Production build               |
| `pnpm preview` | Preview production build         |
| `pnpm test`    | Run Vitest                     |
| `pnpm lint`    | ESLint                         |
| `pnpm format`  | Prettier check                 |
| `pnpm check`   | Format write + ESLint with fix |

## Environment variables

| Variable            | Required | Description                                      |
| ------------------- | -------- | ------------------------------------------------ |
| `VITE_API_URL`      | Yes\*    | Backend API origin (see `.env-example`)          |
| `VITE_POSTHOG_KEY`  | No       | PostHog project API key                          |
| `VITE_POSTHOG_HOST` | No       | PostHog host (e.g. EU cloud or self-hosted)      |

\*Required for API calls against a real backend.

## Project layout

- `src/routes` — File-based routes; `{-$locale}` segment handles Intlayer locale URLs.
- `src/api` — API modules and Axios client / interceptors.
- `src/contents` — Intlayer content dictionaries.
- `src/components` — Shared UI; `ui/` holds shadcn primitives.
- `src/integrations` — TanStack Query provider, PostHog, devtools wiring.

## shadcn components

Add components with the latest CLI (see [shadcn docs](https://ui.shadcn.com/docs/cli)):

```bash
pnpm dlx shadcn@latest add button
```

## Learn more

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Intlayer](https://intlayer.org/doc)
