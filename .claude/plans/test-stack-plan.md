# Plan: Add Vitest + Playwright Test Stack

## Context

The prague-lunch-bot project has zero test infrastructure. The user wants to adopt the test stack from review-orbit (Vitest + Playwright), adapted for this simpler project. Unit tests will cover scraper parsing logic; E2E tests will cover the interactive HTML pages (language switching, menu rendering, navigation, slideshow).

## Step 1: Install Dependencies

```bash
npm install -D vitest @playwright/test serve
npx playwright install chromium
```

- `vitest` — unit test runner
- `@playwright/test` — E2E framework
- `serve` — static file server for E2E tests (serves `tests/e2e/.dist/`)

## Step 2: Create `vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});
```

- `globals: true` — matches review-orbit convention (`describe`/`it`/`expect` without imports)
- No `happy-dom` needed — scrapers are pure Node.js (cheerio/axios)
- Co-located test files (`src/**/*.test.ts`)

## Step 3: Create `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html"], ["github"]] : "html",
  use: {
    baseURL: "http://localhost:3333",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npx serve tests/e2e/.dist -l 3333 --no-clipboard",
    url: "http://localhost:3333",
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
  globalSetup: "./tests/e2e/global-setup.ts",
});
```

- Single browser (chromium) — simple static site
- Port 3333 to avoid conflicts
- `globalSetup` prepares test dist folder with fixture data

## Step 4: Create E2E Global Setup (`tests/e2e/global-setup.ts`)

Prepares a `.dist/` folder by:
1. Reading `template/index.html` and `template/presentation.html`
2. Replacing `{{HASH}}` → `"test"` and `{{NAMEDAY}}` → `"Test Name"`
3. Copying processed HTML + `tests/fixtures/menus.json` + assets into `tests/e2e/.dist/`

This avoids running the full scraping pipeline for E2E tests — we use fixture data.

## Step 5: Create `tests/fixtures/menus.json`

Representative fixture with 2 restaurants, each having soups, vegetarian items, items with/without descriptions. Both `cz` and `en` keys. Structure matches `menuPage.ts` output.

## Step 6: Update Config Files

**`tsconfig.json`** — Add `"types": ["vitest/globals"]` for TS awareness of test globals. Remove `rootDir: "src"`, add `include: ["src/**/*", "tests/**/*"]` so test files outside `src/` compile.

**`package.json`** — Add scripts:
```json
"test": "vitest",
"test:unit": "vitest run",
"test:e2e": "npx playwright test",
"test:e2e:ui": "npx playwright test --ui"
```

**`.gitignore`** — Add:
```
tests/e2e/.dist
playwright-report
test-results
```

## Step 7: Write E2E Tests

**`tests/e2e/index.spec.ts`** — Main page tests:
- Renders page title and header
- Renders restaurant cards from fixture data
- Displays soup (🥣) and vegetarian (🌿) emojis
- Displays prices in Kč format
- Renders jump-to-restaurant navigation links (`#restaurant-links a`)
- Jump link scrolls to correct card (URL hash changes)
- Language switch CZ→EN re-renders menus in English (`#btn-en` click → `?lang=en`)
- `?lang=en` URL param shows English menus directly
- CZ button highlighted by default (`bg-amber-200` class)
- Item descriptions shown when present

**`tests/e2e/presentation.spec.ts`** — Slideshow tests:
- Renders slide indicator (`1 / N`)
- First slide visible, second hidden (`active-slide` class)
- Name day text rendered (`{{NAMEDAY}}` replaced)
- Auto-rotates after 15 seconds
- Progress bar decreases over time

## Step 8: Write First Unit Test — `src/scrappers/menicka.test.ts`

The menicka scraper is used by 3 restaurants (Diego, Gastro Karlín, Peter's pub) — highest value.

**Mocking strategy:**
- `vi.mock("../utils/axios")` — return HTML fixture from `tests/fixtures/html/menicka-diego.html`
- `vi.mock("../utils/dayjs")` — freeze "today" to match the date in the HTML fixture

**Test cases:**
- Parses soups and main meals correctly
- Extracts prices as numbers
- Marks soups with `isSoup: true`
- Extracts descriptions from regex groups
- Throws "menu not found" when date doesn't match

**HTML fixture:** Capture a real response from menicka.cz and save as UTF-8 (mock will encode to windows-1250 buffer to preserve the real iconv decode path).

## Step 9: Write Additional Unit Tests (one per scraper)

- `src/scrappers/fuelBistro.test.ts` — tests `fixCase` + price regex + vegetarian detection
- `src/scrappers/dvorekKarlin.test.ts` — tests buffer parsing
- `src/scrappers/pivokarlin.test.ts` — tests complex regex parsing
- `src/scrappers/jidlovice.test.ts` — tests JSON API parsing
- `src/scrappers/protiProudu.test.ts` — tests date matching

Each follows the same pattern: mock axios with HTML fixture, mock dayjs, assert parsed `MenuItem[]`.

## Files to Create

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration |
| `playwright.config.ts` | Playwright configuration |
| `tests/e2e/global-setup.ts` | Prepares test dist folder |
| `tests/e2e/index.spec.ts` | Main page E2E tests |
| `tests/e2e/presentation.spec.ts` | Slideshow E2E tests |
| `tests/fixtures/menus.json` | Mock menu data for E2E |
| `tests/fixtures/html/*.html` | Saved HTML responses for scraper tests |
| `src/scrappers/menicka.test.ts` | Unit test (covers 3 restaurants) |
| `src/scrappers/fuelBistro.test.ts` | Unit test |
| `src/scrappers/dvorekKarlin.test.ts` | Unit test |
| `src/scrappers/pivokarlin.test.ts` | Unit test |
| `src/scrappers/jidlovice.test.ts` | Unit test |
| `src/scrappers/protiProudu.test.ts` | Unit test |

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add devDependencies + test scripts |
| `tsconfig.json` | Add vitest/globals types, adjust include |
| `.gitignore` | Add test artifacts |

## Verification

1. `npm run test:unit` — all scraper unit tests pass
2. `npm run test:e2e` — all E2E tests pass (global-setup builds .dist, serve starts, Playwright runs)
3. `npm run test:e2e:ui` — opens Playwright UI for interactive debugging
