# Karlín Lunch — Product Concept

## Problem

Every weekday at ~11:30, ~25,000 office workers in Karlín need to answer: **"Where should I eat right now?"**

They lack:
1. **What's cooking** — today's menus across all nearby places, in one view
2. **Where's a seat** — real-time crowd levels so they don't waste their break
3. **Voucher fit** — is this lunch within my meal voucher value or am I losing money

## Product

A free web app for Karlín office workers that shows today's menus, how busy each place is, and whether it fits your meal voucher.

### Core UX

One page. No login required to browse. Open it at 11:30, decide in 30 seconds.

**Inputs (all optional, persisted in browser):**
- Group size: 1 or N
- Dietary needs: vegan toggle (expandable later)
- Meal voucher: provider + value (e.g. Pluxee 235 CZK)
- Office location: set once for distance calculation

**Sort/filter logic:**
1. Exclude restaurants with no vegan option (if toggled)
2. Prefer restaurants with dishes in voucher range (±20 CZK) — rest pushed below a divider
3. Least busy first
4. Closest first

### Main Screen

```
┌────────────────────────────────────┐
│  Karlín Lunch          Tue 11:40  │
│  [👤 3 ▾]  [🌱 Vegan]  [🎫 235]  │
├────────────────────────────────────┤
│  Best matches                      │
│                                    │
│  🟢 Dvorek Karlín                 │
│  3 min · quiet · Veggie curry 179 │
│  Svíčková 189 · Kuřecí 205       │
│                       ✓ fits 🎫   │
│                                    │
│  🟡 Fuel Bistro                   │
│  5 min · getting busy              │
│  Beyond burger 215 · Pasta 199    │
│                       ✓ fits 🎫   │
│                                    │
│  ── Outside voucher range ──       │
│                                    │
│  🟢 Asiyo                         │
│  6 min · quiet · Tofu bowl 269    │
│                    ⚠ over 🎫 +34  │
│                                    │
│  ── No vegan option today ──       │
│                                    │
│  🔴 Gastro Karlín                 │
│  4 min · packed                    │
│  Guláš 169 · Řízek 219           │
└────────────────────────────────────┘
```

### Busyness Data

**Phase 1:** Google Popular Times (scraped historical averages) — "typically 70% full at 12:00 on Tuesdays"

**Phase 2:** User crowd reports — simple button "How busy is it?" → green/yellow/red. Overlays on top of Google baseline.

**Optional:** BestTime.app API (~$100/month) for cleaner foot traffic data.

### Menu Data

**Scrapers** (existing) for restaurants that post online.

**User-submitted photos** — snap a photo of a chalkboard/paper menu, AI (vision model) extracts structured menu data. Fills gaps where no scraper exists.

### Crowdsource Features

Users can (no login for browsing, login for contributing):
- Report busyness (tap green/yellow/red)
- Upload menu photos
- Report "sold out" on a dish
- Report "new restaurant opened"

### Group Flow

Simple: the person deciding picks group size + toggles vegan. The page filters accordingly. No sharing links, no voting, no coordination — just one person making the call with the right info.

## Monetization (Later)

Keep it free. Possible future revenue:
- **Native promoted listings** — restaurants pay for top placement
- **Flash deals** — restaurants broadcast "15% off after 13:00"
- **Aggregated data sales** — demand curves, foot traffic, dish popularity
- **Restaurant analytics dashboard** — "you were #3 most visited this month"

## Market Context

- Karlín: ~25K office workers, ~40 lunch restaurants, 3.9% vacancy (growing)
- Menicka.cz: dominant but static website, no real-time data, no community
- Zomato bought and killed Lunchtime.cz — market too small for big players
- Advantage: real-time crowd data + voucher optimization = things nobody else offers

## Technology Stack

See separate discussion — targeting Next.js + Supabase + Tailwind (evalta stack).
