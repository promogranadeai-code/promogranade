---
name: openseo
description: Reference for OpenSEO (github.com/every-app/open-seo), Promogranade's SEO data tool and open-source Ahrefs/Semrush replacement — setup (hosted vs self-hosted), Claude Code plugin + MCP, the 12 built-in SEO skills, MCP tools, costs, and gotchas. Use whenever a task needs keyword, SERP, competitor, backlink, rank-tracking, Search Console, local-SEO or AI-visibility data, or when setting OpenSEO up.
---

# OpenSEO reference

**What this skill is:** everything learned about OpenSEO on 2026-10-14 (read from
its source at v0.1.12), so nobody has to re-research it. OpenSEO = keyword
research, rank tracking, competitor insights, backlinks, site audits, AI
visibility and Google Search Console in one tool, with an MCP server + 12 agent
skills for Claude Code. Data comes from DataForSEO (pay-as-you-go). MIT licensed.
Promogranade has **no Ahrefs/Semrush** — OpenSEO is the data layer.

---

## Setup

**Hosted (what we use to start)** — openseo.so, $10/month incl. $10 usage
credits; free signup gets $0.50 credits. The hosted service adds 28% on top of
DataForSEO cost. Team accounts/invites supported. Nothing to run.

```text
# inside Claude Code, once per person
/plugin marketplace add every-app/open-seo
/plugin install openseo@openseo
/reload-plugins          # if the installer says so
/mcp                     # approve the OpenSEO login if not prompted
```

Plugin = hosted MCP `https://app.openseo.so/mcp` + all 12 skills.
Update: `/plugin marketplace update openseo` → `/plugin update openseo@openseo` → `/reload-plugins`.
Headless/CI: Settings → API keys in the app, then
`claude mcp add --transport http --scope user openseo https://app.openseo.so/mcp --header "Authorization: Bearer oseo_..."`.

**Self-hosted (later, to drop the 28% markup)**
- Needs a DataForSEO account: $1 free credit, **minimum top-up $50**.
  Env `DATAFORSEO_API_KEY` = the *Base64* credential from app.dataforseo.com/api-access
  (base64 of `email:password`) — not the login/password pair.
- Docker: `cp .env.example .env`, set the key, `docker compose up -d`, open
  `http://localhost:3001`. Runs `AUTH_MODE=local_noauth` (no login!) and binds to
  127.0.0.1 — never expose without your own auth proxy. Image `ghcr.io/every-app/open-seo`.
  MCP = `http://localhost:3001/mcp`. Telemetry off: `OPENSEO_TELEMETRY_DISABLED=1`.
- Cloudflare (recommended for teams, free plan): `docs/SELF_HOSTING_CLOUDFLARE.md`
  in the repo; uses Cloudflare Access (`TEAM_DOMAIN`, `POLICY_AUD`); MCP at
  `https://<worker-host>/mcp` and needs Access "Managed OAuth" enabled.
- Optional env: `OPENROUTER_API_KEY` (in-app AI agent + prompt suggestions),
  `GOOGLE_CLIENT_ID/SECRET` + `BETTER_AUTH_SECRET` (Search Console),
  `CONTEXT_API_KEY` (JS rendering in site audits — Docker has no browser;
  not needed for our statically-rendered Next.js pages).
- The Claude Code plugin always points at the hosted MCP; self-hosters add their
  own MCP URL instead of / in addition to the plugin.

## The 12 skills (plugin form `/openseo:<name>`)

| Skill | Use it for |
|---|---|
| `seo-project-setup` | **Run first.** Saves business, goals, positioning, competitors, key pages to shared project context; connects Search Console |
| `seo-coach` | Beginner-friendly guide: explains, picks the next workflow. Spends no credits unless asked |
| `seo-audit` | Crawl + rankings + GSC → 1–3 highest-impact fixes, written for non-experts |
| `keyword-research` | Opportunities from seed topics (volume, difficulty, CPC, intent, SERP) |
| `keyword-clustering` | Group keywords → pages; spots cannibalization |
| `competitive-landscape` | Who wins the market, which content/backlink patterns work |
| `competitor-analysis` | Deep dive on one competitor |
| `link-prospecting` | Link prospects, contact paths, outreach drafts |
| `local-seo` | Google Business Profile audit, local competitors, Maps rank grid |
| `ai-prompt-research` | What people ask ChatGPT in our market + which sites get cited (~$0.25/keyword) |
| `ai-visibility-audit` | 1–3 changes most likely to get us cited in AI answers |
| `seo-report` | Internal: every skill saves its result as an HTML report in the project's Reports page |

## Behaviours worth knowing

- Project context (`get_project_context` / `update_project_context`) is free shared
  memory used by every skill; skills reuse research-log results < 30 days old
  instead of re-buying data. Check `list_reports` before re-running anything.
- Free (no credits): project context, reports, saved keywords, rank-tracker reads,
  Search Console reads, site-audit result reads. Credits: keyword/SERP/backlink
  lookups, AI answers, audits' data pulls. The app shows a cost estimate before
  AI-visibility checks.
- `get_serp_results` rank counts every SERP block — count organic listings yourself.
- Domain traffic/keyword counts are provider *estimates*; use Search Console for real clicks.
- AI-visibility tracking: ChatGPT & Gemini from consumer sites; Claude & Perplexity
  via API (pricier). Treat results as trends.

## Not covered by OpenSEO (use the rest of the stack)

Writing/publishing content and fixing code (Claude Code in this repo), Lighthouse
/ Core Web Vitals gates and broken links (`.github/workflows/seo-audit.yml`),
actually sending outreach (a human), GBP verification and reviews (a human).
See the `seo-automation` skill and `seo/README.md`.
