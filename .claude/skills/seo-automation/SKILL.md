---
name: seo-automation
description: End-to-end SEO playbook for promogranade.com (and client Next.js sites) — technical audits, on-page optimization, content pipeline, off-page/link work, GEO/AEO and reporting, using the open-source stack chosen on 2026-10-14. Use for any SEO, GEO, AEO, Lighthouse, Core Web Vitals, broken-link, schema, keyword, backlink or rank-tracking task.
---

# SEO automation playbook

**What this skill is:** the operating manual for doing *complete* SEO on this
Next.js site with Claude Code + open-source tools instead of an SEO team.
It says which tool handles each stage (research → plan → create → optimize →
technical → publish → off-page → report), what is already automated in CI,
the commands to run, and where a human must approve. Full research, repo links
and costs: `seo/README.md`.

---

## 1. Already automated in this repo (don't rebuild)

- `.github/workflows/seo-audit.yml`
  - `lighthouse` job (every PR + push to main): `npm run build`, then
    `npx -y @lhci/cli@0.15.1 autorun --config=seo/lighthouserc.json`.
    SEO < 0.9 fails; perf/a11y/best-practices only warn.
  - `live-site` job (Mondays 03:17 UTC + manual dispatch): lychee on every
    sitemap URL of https://promogranade.com + `unlighthouse-ci` full-site scan.
    Reports are uploaded as artifacts.
- `.lycheeignore` — bot-blocking social hosts. Add hosts here, don't loosen `--accept`.
- `app/sitemap.ts`, `app/robots.ts` (AI crawlers allowed), `public/llms.txt`,
  FAQPage JSON-LD on service pages. Blog posts live in `lib/blog.ts`, services in
  `lib/services-data.ts` — new pages there appear in the sitemap automatically.
- **Before touching Next.js code** read `node_modules/next/dist/docs/` (AGENTS.md:
  this Next.js version has breaking changes).

## 2. Run the audits locally

```bash
npm ci && npm run build
# Lighthouse on key templates (in the cloud sandbox add the Chromium path):
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  npx -y @lhci/cli@0.15.1 autorun --config=seo/lighthouserc.json
# Scores: node -e 'for(const r of require("./.lighthouseci/reports/manifest.json"))console.log(r.url,r.summary)'

# Broken links across every page (server must be running: npm run start &)
curl -s localhost:3000/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' \
  | sed 's#https://promogranade.com#http://localhost:3000#' > /tmp/urls.txt
lychee --no-progress --accept '200..=299,403,429' --exclude 'promogranade\.com' $(cat /tmp/urls.txt)
```

Gotchas learned the hard way:
- `npx unlighthouse --version` starts the interactive UI and hangs — only call
  the `unlighthouse-ci` bin (`npx -y -p unlighthouse@0.19.1 unlighthouse-ci --site URL`).
- The cloud sandbox can't reach promogranade.com or social hosts → exclude them
  locally; CI on GitHub can reach them.
- DataForSEO MCP env vars are `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` (not USERNAME).
- GSC MCP is `uvx mcp-gsc@0.1.0` with `GSC_CREDENTIALS_PATH` = service-account JSON
  (also supports `GSC_OAUTH_CLIENT_SECRETS_FILE`).

Baseline 2026-10-14: SEO 100 everywhere; home performance 36 (WebGL hero + intro),
others 64–81; 0 broken links across 27 pages.

## 3. Stage-by-stage workflow

| Stage | Do this | Tool |
|---|---|---|
| Research | Keyword volumes/difficulty, competitor gaps, SERP intent; GSC queries ranking 5–20 with high impressions = quick wins | DataForSEO MCP or open-seo; GSC MCP; seomachine `/research`, `/research-serp`, `/research-gaps`; claude-seo `/seo cluster` |
| Plan | Cluster → pillar/spoke map → brief per page | marketingskills `content-strategy`, `site-architecture`, `programmatic-seo`; claude-seo `content-brief` |
| Create | Draft into `lib/blog.ts` (or service data) with sources | seomachine `/write`; gpt-researcher for fact-heavy posts |
| Optimize | Title ≤ 60 chars, meta ≤ 155, one H1, internal links to 2–3 service pages, JSON-LD (Article/FAQPage/BreadcrumbList), quotable answer-first paragraphs for GEO | seomachine `/optimize`; claude-seo `/seo page`, `/seo schema`, `/seo geo` |
| Technical | Let CI gate it; for regressions open the Lighthouse artifact and fix LCP/CLS/TBT at the source | CI + Unlighthouse report |
| Publish | Branch → PR → Vercel preview → human merges. Sitemap/llms.txt update from data; update `public/llms.txt` when services change | git + GitHub MCP |
| Off-page | Competitor link gap → prospect list; unlinked brand mentions → reclamation emails; lost links → recovery. **Draft only; a human sends** | DataForSEO backlinks / Ahrefs connector; changedetection.io / huginn |
| Report | Monthly: GSC clicks/impressions/CTR trends, rank movers, AI share-of-voice, CWV, actions next month | GSC MCP, SerpBear/open-seo, elmo, claude-seo PDF report |

Install the Claude Code side once per machine — commands in `seo/README.md` → "The stack".
MCP template: `seo/mcp.example.json` (never commit real credentials).

## 4. Human-only (always flag, never fake)

Strategy sign-off, expert/brand edit of drafts (E-E-A-T), sending any outreach
email, relationship link building / PR, Google Business Profile verification
and reviews, penalty recovery. AI-visibility numbers are trends, not facts.
