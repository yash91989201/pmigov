# Skill: New Page (TanStack Router)

Invoke when the user says: "add a new page", "create a route", "add a screen", "I need a page for X".

---

## Step 1 — Gather Requirements

If not provided:
1. Route path (e.g. `/projects`, `/projects/$id`)
2. Protected (requires auth) or public?
3. What data does it need? (which oRPC procedures?)
4. What actions can the user take? (mutations needed?)

---

## Step 2 — Create the Route File

**Protected page** → `apps/web/src/routes/_auth/page-name.tsx`
(auto-guarded by `/_auth/route.tsx` — no extra auth check needed)

**Public page** → `apps/web/src/routes/page-name.tsx`

For dynamic segments: `apps/web/src/routes/_auth/$id.tsx`

---

## Step 3 — Write the Page

### Protected page template:
```tsx
// apps/web/src/routes/_auth/example.tsx
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { orpc } from "@/utils/orpc"

export const Route = createFileRoute("/_auth/example")({
  component: ExamplePage,
})

function ExamplePage() {
  const { session } = Route.useRouteContext()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery(orpc.example.list.queryOptions())

  const { mutate: createItem } = useMutation({
    ...orpc.example.create.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.example.list.key() })
      toast.success("Created!")
    },
    onError: (err) => toast.error(err.message),
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong. Try refreshing.</div>
  if (!data?.length) return <div>Nothing here yet.</div>

  return (
    <div>
      <h1>Example</h1>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### With server-side prefetch (loader):
```tsx
export const Route = createFileRoute("/_auth/example")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(orpc.example.list.queryOptions()),
  component: ExamplePage,
})
```

### Dynamic route segment:
```tsx
export const Route = createFileRoute("/_auth/example/$id")({
  component: ExampleDetailPage,
})

function ExampleDetailPage() {
  const { id } = Route.useParams()
  const { data } = useQuery(orpc.example.getById.queryOptions({ id }))
  // ...
}
```

---

## Step 4 — Add to Navigation (if needed)

If the page needs a nav link, add it to `apps/web/src/components/header.tsx` or the appropriate nav component.

---

## Step 5 — Verify

```bash
bun run check-types
```

TanStack Router auto-generates `routeTree.gen.ts` on dev server start — new routes appear automatically.

---

## Conventions Checklist

- [ ] Protected pages under `_auth/` — never check session inside the component
- [ ] All 4 states: loading, error, empty, success
- [ ] `useQuery` for reads — no raw fetch or useEffect
- [ ] `useMutation` + `invalidateQueries` for writes
- [ ] Sonner `toast` for user feedback
- [ ] UI components from `@pmigov/ui/components/*`
- [ ] No hardcoded colors — use Tailwind tokens
- [ ] `key={item.id}` in lists — not array index
