# AttentionView — Full Stack Build Plan

## 1. Backend foundation (Lovable Cloud)
- Enable Lovable Cloud (Postgres + Auth + server functions).
- Enable email/password auth **and** Google sign-in.
- Add auth pages (`/auth`) with sign-in/sign-up/Google, session-aware header, sign-out.
- Move the current home into `_authenticated/` — the whole dashboard requires login. Public `/` becomes a landing page with a sign-in CTA.

## 2. Database schema
Tables (all with RLS + grants):
- `profiles` — display name, avatar, region/niche preferences (auto-created on signup).
- `topics` — canonical topic/keyword rows (name, category/niche, platforms).
- `topic_metrics` — time-series: topic_id, platform, region, search_volume, growth_pct, attention_score, captured_at. Growth % and rankings are computed from this history, not hardcoded.
- `hashtags`, `products`, `creators`, `breakout_keywords` — same time-series pattern.
- `watchlist` — user_id + topic_id (per-user, RLS-scoped).
- `user_preferences` — saved region, niche, default timeframe.
- `chat_threads` + `chat_messages` — AI analyst conversation history per user.
- `data_refresh_log` — track when each source last refreshed.

## 3. Data ingestion via Apify (all 5 platforms)
Connect the **Apify** connector (you'll link your Apify account; Apify actor runs are billed by Apify).
Server functions call Apify actors through the Lovable connector gateway:
- **Google Trends** — `emastra/google-trends-scraper` (daily/interest/related queries).
- **YouTube** — `bernardo/youtube-scraper` (trending, search, video stats).
- **TikTok** — `clockworks/tiktok-scraper` (trending hashtags, videos, sounds).
- **Instagram** — `apify/instagram-scraper` (hashtags, reels, posts).
- **Facebook** — `apify/facebook-pages-scraper` (page/post engagement).

Scheduled refresh:
- A public server route `/api/public/refresh-data` triggers Apify runs, waits/polls, normalizes results into `topic_metrics` + related tables.
- Called on a schedule via `pg_cron` (hourly for trends, 6h for products/creators).
- Computes rolling growth % (current window vs previous window) and ranks per platform/region/niche.

## 4. Live filtering & persistence
- Region & niche dropdowns write to `user_preferences` and drive server-side queries (no more local mock filtering).
- Watchlist add/remove hits the DB; the sidebar reads the user's real saved list.
- All dashboard sections (Attention Index tabs, Community Trends, Regions, Live Feed, Audience) load via TanStack Query `useSuspenseQuery` from server functions that read the DB filtered by user prefs + timeframe.

## 5. AI Analyst chat
- Wire the sidebar chat box to Lovable AI Gateway (`openai/gpt-5.6-sol`) via a streaming `/api/chat` server route.
- System prompt gives the model access to the user's watchlist, current filters, and recent metrics so it can answer "what's rising in beauty in the US this week", "compare X vs Y", "recommend niches".
- Persist threads/messages to `chat_threads` / `chat_messages` so history survives reloads.

## 6. Rollout order
1. Enable Cloud + configure Google auth + build `/auth` and route gating.
2. Migrations for all tables + RLS + grants + seed a small set of topics/niches so the UI has something on first login.
3. Connect Apify; build server fns for each platform actor + normalization + refresh route.
4. Replace mock data reads in dashboard with server-function/TanStack Query calls (region/niche/timeframe aware).
5. Watchlist DB wiring.
6. AI chat streaming + persistence.
7. `pg_cron` schedule.

## Technical notes
- Data model prefers narrow, indexed rows over jsonb blobs so we can compute growth % / rankings in SQL.
- Apify actor runs are async — server fn kicks off run, refresh route polls and upserts. Never poll from a render path.
- `LOVABLE_API_KEY` and `APIFY_API_KEY` stay server-only.
- Growth % = `(current_period_avg - previous_period_avg) / previous_period_avg`, computed per timeframe (1D/1W/1M/3M/1Y).
- Costs to expect: Apify actor runs + Lovable AI usage. Both metered by usage.

## What stays out of scope (unless you ask)
- Payments / plans / billing pages.
- Admin panel for curating topics.
- Native mobile app.

Approve this and I'll start with step 1 (enable Cloud + auth + gated routing) and go straight through.