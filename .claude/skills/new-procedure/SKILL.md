# Skill: Scaffold a New oRPC Procedure

Invoke when the user says: "add a new API endpoint", "create a procedure", "add oRPC route", "I need an API for X".

---

## Step 1 — Gather Requirements

If not provided in the request, ask:
1. Procedure name (e.g. `createPost`, `getUserProfile`)
2. Public or protected?
3. Input shape (what data does it receive?)
4. Return shape (what does it return?)
5. Does it need DB access? Which table(s)?

---

## Step 2 — Determine Router File

- If a matching domain router exists in `packages/api/src/routers/` → add to it
- If new domain (e.g. first `post.*` procedure) → create `packages/api/src/routers/posts.ts`
- Always register the router in `packages/api/src/routers/index.ts`

---

## Step 3 — Write the Procedure

### Protected mutation template:
```ts
// packages/api/src/routers/example.ts
import { ORPCError } from "@orpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@pmigov/db"
import { exampleTable } from "@pmigov/db/schema"

import { protectedProcedure } from "../index"

const createExampleInput = z.object({
  name: z.string().min(1).max(100),
})

export const exampleRouter = {
  create: protectedProcedure
    .input(createExampleInput)
    .handler(async ({ input, context }) => {
      const [result] = await db
        .insert(exampleTable)
        .values({ name: input.name, userId: context.session.user.id })
        .returning()
      if (!result) throw new ORPCError("INTERNAL_SERVER_ERROR")
      return result
    }),
}
```

### Protected query template:
```ts
  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .handler(async ({ input, context }) => {
      const result = await db.query.exampleTable.findFirst({
        where: (t, { and, eq }) =>
          and(eq(t.id, input.id), eq(t.userId, context.session.user.id)),
      })
      if (!result) throw new ORPCError("NOT_FOUND")
      return result
    }),
```

### Public query template:
```ts
  list: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(100).default(20) }))
    .handler(async ({ input }) => {
      return db.select().from(exampleTable).limit(input.limit)
    }),
```

---

## Step 4 — Register in appRouter

```ts
// packages/api/src/routers/index.ts
import { exampleRouter } from "./example"

export const appRouter = {
  ...existingRouters,
  example: exampleRouter,  // add this
}
```

---

## Step 5 — Verify

```bash
bun run check-types
```

Fix any type errors before declaring done.

---

## Step 6 — Show Client Usage

Print how to use it from the web app:

```tsx
// Query:
const { data } = useQuery(orpc.example.list.queryOptions())

// Mutation:
const { mutate } = useMutation(orpc.example.create.mutationOptions())
mutate({ name: "Hello" })

// Invalidate after mutation:
queryClient.invalidateQueries({ queryKey: orpc.example.list.key() })
```

---

## Conventions Checklist

- [ ] `protectedProcedure` for user-owned data
- [ ] `userId` from `context.session.user.id` — never from input
- [ ] `ORPCError` for all errors
- [ ] `.input()` with Zod for all mutations
- [ ] `.returning()` after insert/update
- [ ] No `console.log`
- [ ] Ownership filter on queries: `eq(table.userId, context.session.user.id)`
- [ ] Multi-step writes in `db.transaction()`
