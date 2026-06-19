# Project Context: pmigov

> Auto-reference context for Claude. Not a slash command.

---

## Project Overview

**pmigov** — A full-stack TypeScript monorepo application built with the Better-T-Stack.

---

## Monorepo Structure

```
pmigov/
├── apps/
│   └── web/                    # TanStack Start SSR app (port 3001)
│       ├── src/
│       │   ├── routes/          # File-based routing
│       │   │   ├── _auth/       # Protected layout (redirect to /login if no session)
│       │   │   │   ├── route.tsx
│       │   │   │   └── dashboard.tsx
│       │   │   ├── api/
│       │   │   │   ├── auth/$.ts    # Better Auth handler
│       │   │   │   └── rpc/$.ts     # oRPC + OpenAPI handler
│       │   │   ├── index.tsx
│       │   │   └── login.tsx
│       │   ├── components/      # App-specific components
│       │   ├── functions/       # createServerFn server functions
│       │   │   └── get-user.ts
│       │   ├── lib/
│       │   │   └── auth-client.ts   # Better Auth browser client
│       │   ├── middleware/
│       │   │   └── auth.ts          # authMiddleware for server fns
│       │   └── utils/
│       │       └── orpc.ts          # oRPC client + createQueryClient
│       └── vite.config.ts
├── packages/
│   ├── api/                    # oRPC server
│   │   └── src/
│   │       ├── index.ts         # publicProcedure + protectedProcedure
│   │       ├── context.ts       # createContext (session from request)
│   │       └── routers/
│   │           └── index.ts     # appRouter (register all procedures here)
│   ├── auth/                   # Better Auth setup
│   │   └── src/index.ts         # createAuth() + auth singleton
│   ├── db/                     # Drizzle ORM + schema
│   │   └── src/
│   │       ├── index.ts         # createDb() + db singleton
│   │       └── schema/
│   │           ├── index.ts     # export * from all schema files
│   │           └── auth.ts      # Better Auth tables
│   ├── env/                    # T3 env validation
│   │   └── src/
│   │       ├── server.ts        # DATABASE_URL, BETTER_AUTH_SECRET, etc.
│   │       └── web.ts           # VITE_* client vars
│   ├── ui/                     # Shared shadcn/ui components
│   │   └── src/
│   │       ├── components/      # Button, Input, Label, etc.
│   │       └── styles/globals.css
│   └── config/                 # Shared TypeScript config
```

---

## Key Patterns

### Adding a new API procedure
1. Write procedure in `packages/api/src/routers/domain.ts`
2. Register in `packages/api/src/routers/index.ts` → `appRouter`
3. Client: `useQuery(orpc.domain.action.queryOptions())`

### Adding a protected page
1. Create `apps/web/src/routes/_auth/page-name.tsx`
2. Use `createFileRoute("/_auth/page-name")`
3. Session via `Route.useRouteContext()`

### Auth in server functions
```ts
const myFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context.session // guaranteed non-null
  })
```

### Error codes
```ts
throw new ORPCError("UNAUTHORIZED")   // no session
throw new ORPCError("FORBIDDEN")      // no permission
throw new ORPCError("NOT_FOUND")      // missing resource
throw new ORPCError("BAD_REQUEST")    // invalid input
throw new ORPCError("INTERNAL_SERVER_ERROR")
```

### DB transaction
```ts
await db.transaction(async (tx) => {
  const [a] = await tx.insert(tableA).values({...}).returning()
  await tx.insert(tableB).values({ aId: a.id }).returning()
})
```

---

## Dev Commands

| Command | What it does |
|---------|-------------|
| `bun run dev` | Start web app on port 3001 |
| `bun run db:start` | Start PostgreSQL Docker container |
| `bun run db:push` | Push schema (dev only, no migration files) |
| `bun run db:generate` | Generate migration SQL files |
| `bun run db:migrate` | Run migrations (production safe) |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run check` | Biome lint + format check |
| `bun run fix` | Biome auto-fix |
| `bun run check-types` | TypeScript noEmit check |
| `bun run build` | Build all apps |

---

## Important Env Vars (`apps/web/.env`)

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/pmigov
BETTER_AUTH_SECRET=<32+ chars>
BETTER_AUTH_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001
NODE_ENV=development
```

---

## Import Aliases (apps/web)

```ts
import { ... } from "@/components/..."     // apps/web/src/components/
import { ... } from "@/utils/..."          // apps/web/src/utils/
import { ... } from "@/lib/..."            // apps/web/src/lib/
import { ... } from "@/functions/..."      // apps/web/src/functions/
import { ... } from "@pmigov/ui/components/button"   // shared UI
import { ... } from "@pmigov/api/..."      // API types
import { ... } from "@pmigov/db/schema"    // DB schema
```
