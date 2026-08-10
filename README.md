# Task Tracker

A Next.js MVP for organizing work into **tasks** and **categories**, with an overview dashboard, due-date notifications, search, light/dark theme, and analytics export (CSV / PDF).

Data lives in an in-memory store seeded at startup—no database or external API required. Mutations go through Server Actions; UI refreshes via path revalidation.

---

## Features

- **Tasks** — create, edit, delete; status (`todo` / `in_progress` / `done`); category assignment; optional due date/time; quick status updates from the list
- **Categories** — create, edit, delete with named colors; delete blocked while tasks still reference the category
- **Overview** — status counts, priority tasks, category progress, distribution charts, and filterable analytics
- **Notifications** — due-soon / overdue alerts in the header bell (client-persisted dismiss/dedupe state)
- **Search** — keyboard-friendly task search modal
- **Theme** — light/dark with `localStorage` preference and system fallback
- **Export** — analytics summary as CSV or PDF
- **Tests** — Vitest coverage for services and deletion rules

---

## Architecture

### High-level flow

```
Browser (RSC pages + client islands)
        │
        ▼
Server Actions  (lib/actions/*)     ← form posts, redirects, revalidatePath
        │
        ▼
Services        (lib/services/*)    ← business logic, domain errors
        │
        ▼
In-memory store (lib/data/store.ts) ← seeded tasks & categories
```

Reads are synchronous service calls from Server Components. Writes go through `"use server"` actions that validate input, call services, then `revalidatePath("/", "layout")` (and redirect where needed).

### Layer responsibilities

| Layer | Location | Role |
| --- | --- | --- |
| **Routes / pages** | `app/(app)/` | RSC pages for overview, tasks, categories |
| **UI** | `components/` | Layout shell, forms, lists, overview/analytics, theme, notifications |
| **Actions** | `lib/actions/` | Server Actions: parse `FormData`, map errors to form state, revalidate |
| **Services** | `lib/services/` | CRUD, sorting, domain errors (`TaskNotFoundError`, `CategoryInUseError`, …) |
| **Validation** | `lib/validation/` | Form + domain input rules (shared by actions and services) |
| **Rules** | `lib/rules/` | Cross-entity policies (e.g. category delete guards) |
| **Data** | `lib/data/` | Global in-memory store + seed fixtures |
| **Stats / search / export / notifications** | `lib/stats`, `lib/search`, `lib/export`, `lib/notifications` | Pure helpers for dashboard, search, downloads, due alerts |
| **Types** | `lib/types/` | `Task`, `Category`, status/color unions |

### App structure

```
app/
  layout.tsx                 # Root layout, fonts, theme bootstrap script
  (app)/
    layout.tsx               # Loads tasks/categories → AppShell
    page.tsx                 # Overview dashboard
    tasks/
      new/
      [taskId]/
      [taskId]/edit/
    categories/
      new/
      [categoryId]/
      [categoryId]/edit/
components/
  layout/                    # Sidebar, header, shell, transitions
  tasks/ | categories/ | overview/ | search/ | notifications/ | theme/ | ui/
lib/
  actions/ | services/ | validation/ | rules/ | data/ | stats/ | …
```

### Data model

**Task** — `id`, `title`, `description`, `status`, `categoryId`, `dueAt` (ISO or `null`), `createdAt`, `updatedAt`

**Category** — `id`, `name`, `color` (`blue` | `yellow` | `red` | `green` | `orange` | `purple` | `pink`)

### Persistence notes

- The store is attached to `globalThis` so it survives hot reloads in development.
- Process restarts reset data to seed values.
- Theme preference and notification dismiss/dedupe keys are stored in the browser (`localStorage`).

### Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 4**
- **Vitest** for unit tests

---

## Setup

### Prerequisites

- Node.js 20+ (recommended)
- npm (lockfile included)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Command | Description |
| --- | --- |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Vitest watch mode |

No environment variables or database setup are required for the MVP.

---

## Future improvements

Ideas beyond the current in-memory MVP:

1. **Persistent storage** — SQLite, Postgres, or similar with a real repository layer behind the existing services
2. **Auth & multi-user** — accounts, ownership of tasks/categories, session-protected routes
3. **Richer task model** — priorities as first-class fields, assignees, tags, subtasks, attachments
4. **Recurring tasks & reminders** — schedules plus optional email/push beyond the in-app bell
5. **Optimistic / realtime UI** — client cache or websocket/SSE updates when multiple sessions share data
6. **Broader test coverage** — component and Server Action integration tests; Playwright for critical flows
7. **Accessibility & i18n** — deeper a11y audits, keyboard coverage, and localization
8. **Deploy hardening** — rate limiting on mutations, structured logging, error monitoring

---

## License

Private challenge project — not published as an open-source package.
