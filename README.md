# Prodexa — Product Dashboard

A React + TypeScript SPA for operations users to browse, filter, and inspect products from the [dummyjson.com](https://dummyjson.com/products) API.

---

## Quick Start

```bash
npm install
npm run dev        # starts at http://localhost:5173
npm test           # run all 30 tests
npm run build      # production build
```

**Login:** any email + any password (mock auth — no real credentials required).

---

## Features

### Core
| Feature | Details |
|---|---|
| **Routing** | `/products` list · `/product/:id` detail · `/analytics` |
| **Auth** | Fake login with localStorage token; protected routes redirect to `/login` |
| **Data fetching** | TanStack Query v5; `refetchOnWindowFocus` enabled; 5 min stale, 10 min cache |
| **Pagination** | 10 products per page; page state persisted in URL |
| **Text search** | Searches title, description, brand, and category simultaneously |
| **Filters** | Category, brand, min/max price — all combinable |
| **Sort** | Newest · Oldest · Price ↑↓ · Highest rated |
| **Detail page** | Title, description, price, rating, stock, createdAt, dimensions, reviews |
| **Loading states** | 10-card skeleton grid while fetching; skeleton on detail page |
| **Error states** | `role="alert"` with retry button; refetch on demand |
| **Empty state** | Clear message with "Reset filters" action |

### Stretch Goals ✅
| Feature | Details |
|---|---|
| **Add product form** | React Hook Form + Zod validation; optimistic update; reverts on API error |
| **Brand analytics chart** | Recharts bar chart showing product count per brand (top 15) |
| **Auth mock** | Any credentials work; `localStorage` persistence survives refresh |
| **Tests** | 30 tests across 4 files (Vitest + RTL + MSW) |

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React | 18 |
| Language | TypeScript | 5 |
| Build tool | Vite | 9 |
| Routing | React Router | 7 |
| Data fetching | TanStack Query | 5 |
| UI primitives | Radix UI | latest |
| Styling | Tailwind CSS | 3 |
| Forms | React Hook Form + Zod | 7 / 3 |
| Charts | Recharts | 2 |
| Icons | Lucide React | latest |
| Toasts | Sonner | latest |
| Tests | Vitest + Testing Library + MSW | 4 / 16 / 2 |

---

## Project Structure

```
src/
├── api/             # Fetch functions (fetchAllProducts, fetchProduct, addProduct)
├── components/
│   ├── ui/          # Accessible UI primitives (Button, Card, Badge, Select, Dialog, Sheet…)
│   ├── layout/      # AppShell, Sidebar, Header (with mobile nav Sheet)
│   ├── auth/        # LoginPage, ProtectedRoute
│   ├── products/    # ProductCard, ProductGrid, ProductFilters, Pagination, ActiveFilterBadges
│   ├── product-detail/ # Image gallery, info panel, meta table, reviews list
│   ├── analytics/   # BrandChart (Recharts BarChart)
│   ├── forms/       # AddProductForm (React Hook Form + Zod)
│   └── shared/      # ErrorState, EmptyState, LoadingSkeleton, StarRating, PageTitle
├── context/         # AuthContext (fake auth, localStorage)
├── hooks/           # useAllProducts, useProduct, useAddProduct, useProductFilters
├── lib/             # utils, constants, filterProducts (pure/tested), validations (Zod)
├── pages/           # ProductsPage, ProductDetailPage, AnalyticsPage, NotFoundPage
├── providers/       # QueryProvider (QueryClient config)
├── types/           # All TypeScript interfaces
└── test/            # MSW server + handlers, fixtures, test-utils, 4 test files
```

---

## Design Decisions

### Client-side filtering over server-side pagination

The dummyjson API has no compound-filter endpoint — you cannot combine brand + category + price + text search in one request. Since the catalogue is only ~194 products (~80 KB gzipped), I fetch everything once with `limit=200`, cache it in TanStack Query (5 min stale time), and filter in-browser with the pure `filterProducts()` function.

**Trade-off:** With a real API supporting compound queries, I'd switch to server-side pagination — the `filterProducts` function is already decoupled from the data layer, so that migration would touch only `useAllProducts.ts` and add filter params to the query key.

### URL-based filter state

All filter state lives in URL search params (`?q=…&category=…&sort=…&page=2`). Filtered views are shareable and bookmarkable, and state is preserved across browser Back/Forward navigation. The `useProductFilters` hook is the single source of truth for reading and writing these params.

### Optimistic product add

`useAddProduct` follows the TanStack Query optimistic update pattern: `onMutate` prepends a fake product to the cached list, `onError` rolls back the cache and shows an error toast, `onSettled` invalidates the query to sync with the server. This gives instant feedback without waiting for the network.

### Accessibility

- Skip-to-content link at the top of every protected page
- `<ProductCard>` uses `<article aria-label>` + labelled links
- `<ErrorState>` uses `role="alert"` for immediate screen reader announcement
- `<StarRating>` uses `role="img"` + `aria-label="Rating: X out of 5"`
- All form inputs have associated `<label>` with `aria-describedby` on error messages
- Pagination buttons have `aria-label` and `aria-current="page"` on the active page
- Radix UI handles keyboard focus, ARIA, and portal management for Select, Dialog, Sheet

### Responsiveness

| Viewport | Grid | Navigation |
|---|---|---|
| Mobile (<768px) | 1 column | Sidebar in Sheet (hamburger in header) |
| Tablet (768–1024px) | 2 columns | Sheet navigation |
| Desktop (≥1024px) | 3 columns | Persistent 240px sidebar |

---

## Running Tests

```bash
npm test                     # run all tests once
npm test -- --watch          # watch mode
npm test -- --reporter=verbose  # verbose output
```

**Test files:**
- `filterProducts.test.ts` — 12 pure unit tests for filtering/sorting/pagination logic
- `ProductCard.test.tsx` — 7 rendering + accessibility tests
- `ProductDetailPage.test.tsx` — 6 integration tests (MSW mocks the API)
- `AddProductForm.test.tsx` — 4 tests (Zod validation, submit flow, no-request-on-invalid)

All tests use MSW v2 to intercept fetch calls — no actual network requests are made in tests.

---

## What I'd Do Next With More Time

1. **Server-side search** — Use `/products/search?q=` for text queries when no other filters are active, reducing initial payload size
2. **Dark mode** — The CSS variables in `index.css` already define dark values; just needs a toggle button and `document.documentElement.classList.toggle('dark')`
3. **Infinite scroll** — Replace `Pagination` with `useInfiniteQuery` for a continuous scroll experience on mobile
4. **Real auth** — Use dummyjson's `/auth/login` endpoint, store the real JWT, decode it client-side for user info
5. **E2E tests** — Playwright tests for the full login → filter → detail → add flow in a real browser
6. **PWA** — Service worker to cache the product catalogue for offline browsing
7. **Virtual list** — If the catalogue grew to 10k+ products, add `@tanstack/react-virtual` so only visible cards are in the DOM
8. **Storybook** — Isolated stories for every shared component to document props and states
9. **Filter counts** — Show how many products match each filter option before the user selects it
10. **Keyboard-navigable image gallery** — Arrow key support for the product image gallery on the detail page
