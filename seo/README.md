# SEO automation for promogranade.com

How Promogranade runs end-to-end SEO (technical, on-page, off-page, GEO/AEO,
tracking) with open-source tools + Claude Code instead of an SEO team.
Research date: 2026-10-14 — stars/activity were checked on GitHub that day.

**What's already wired into this repo**

| Piece | File | What it does |
|---|---|---|
| PR gate | `.github/workflows/seo-audit.yml` → `lighthouse` job | Builds the site, runs Lighthouse on 7 key templates. SEO < 90 **fails** the PR; performance / accessibility / best-practices warn. |
| Weekly live audit | same workflow → `live-site` job (Mondays + manual) | lychee checks every link on every sitemap URL; Unlighthouse scans the whole live site. Reports land in workflow artifacts. |
| Lighthouse config | `seo/lighthouserc.json` | URLs + score budgets. Add new page templates here. |
| Link-check ignores | `.lycheeignore` | Social hosts that block bots (LinkedIn, Instagram, wa.me…). |
| MCP template | `seo/mcp.example.json` | DataForSEO (keywords, SERP, backlinks, ranks) + Google Search Console servers for Claude Code. |
| Claude Code skill | `.claude/skills/seo-automation/SKILL.md` | The operating playbook Claude follows for every SEO task. |

Already in the site code: dynamic `app/sitemap.ts`, `app/robots.ts` (AI crawlers
allowed), `public/llms.txt`, FAQPage schema on service pages.

**Baseline (local Lighthouse, 2026-10-14)** — SEO 100 on all 7 templates,
accessibility 96–100, best-practices 100. Performance: home **36**, others 64–81.
The home page (WebGL hero + intro animation) is the biggest technical-SEO
opportunity. Link check: 27 pages, 81 unique URLs, 0 broken.

---

## The stack

### Install once per machine (Claude Code plugins / skills)

```bash
# Audit brain: technical, on-page, schema, GEO, local, backlinks, drift, PDF reports
/plugin marketplace add AgriciDaniel/claude-seo        # inside Claude Code, then /plugin install

# Strategy, site architecture, programmatic SEO, ai-seo skills
npx skills add coreyhaines31/marketingskills -a claude-code

# Content pipeline: /research, /write, /optimize, /performance-review
git clone https://github.com/TheCraigHewitt/seomachine ~/tools/seomachine
```

### MCP servers (data access for Claude)

Copy the entries from `seo/mcp.example.json` into your `~/.claude.json` (or a
local, git-ignored `.mcp.json`) and set:

- `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` — dataforseo.com, pay-as-you-go.
- `GSC_CREDENTIALS_PATH` — a Google Cloud service-account JSON that has been
  added as a user on the promogranade.com Search Console property.

Never commit credentials.

### Full stack by stage

| Stage | What gets automated | Tools | Human step |
|---|---|---|---|
| 1. Research | Keywords, competitor gaps, SERP intent, GSC quick wins | DataForSEO MCP (or self-hosted [open-seo](https://github.com/every-app/open-seo)), GSC MCP, seomachine `/research-*`, claude-seo `/seo cluster` | Skim |
| 2. Plan | Topic clusters, site architecture, calendar, briefs | marketingskills `content-strategy` / `site-architecture` / `programmatic-seo`, claude-seo `content-brief` | **Approve strategy** |
| 3. Create | Draft blog posts / service copy with citations | seomachine `/write`, [gpt-researcher](https://github.com/assafelovic/gpt-researcher) for facts | **Expert + brand edit** |
| 4. Optimize | Titles/meta, internal links, schema, GEO citability | seomachine `/optimize`, claude-seo `/seo page` `schema` `geo`, [schema-dts](https://github.com/google/schema-dts) | Spot-check |
| 5. Technical | Crawl, Core Web Vitals, broken links, indexability | **This repo's CI** (Lighthouse CI, lychee, Unlighthouse); optional [siteone-crawler](https://github.com/janreges/siteone-crawler) / [SEOnaut](https://github.com/StJudeWasHere/seonaut) | None — CI gates |
| 6. Publish | PR → Vercel preview → merge; sitemap/llms.txt regenerate | Claude Code + GitHub; Next.js `sitemap.ts`; IndexNow/GSC sitemap ping ([seo-monster](https://github.com/avansaber/seo-monster)) | Approve PR |
| 7. Off-page | Link-gap prospects, unlinked mentions, lost links, outreach drafts | DataForSEO backlinks / open-seo, [changedetection.io](https://github.com/dgtlmoon/changedetection.io) or [huginn](https://github.com/huginn/huginn), optional [Mautic](https://github.com/mautic/mautic) for sending | **Relationships, every send** |
| 8. Track & report | Rankings, GSC trends, AI share-of-voice, monthly report | open-seo or [SerpBear](https://github.com/towfiqi/serpbear), GSC MCP, [elmo](https://github.com/elmohq/elmo) (AI visibility), claude-seo PDF reports | Review |

### Core 10 (least overlap)

1. [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) — MIT. Audit brain.
2. [TheCraigHewitt/seomachine](https://github.com/TheCraigHewitt/seomachine) — MIT. Content pipeline (swap its WordPress publish step for "edit `lib/blog.ts` + open PR").
3. [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — MIT. Strategy / architecture / programmatic SEO.
4. [every-app/open-seo](https://github.com/every-app/open-seo) — MIT, needs DataForSEO. Self-hosted Semrush/Ahrefs alternative incl. backlinks + rank tracking. (Or just the [DataForSEO MCP](https://github.com/dataforseo/mcp-server-typescript).)
5. [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) — MIT. Search Console data for Claude.
6. [harlan-zw/unlighthouse](https://github.com/harlan-zw/unlighthouse) + [GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) — wired into CI.
7. [lycheeverse/lychee](https://github.com/lycheeverse/lychee) — wired into CI.
8. [google/schema-dts](https://github.com/google/schema-dts) — typed JSON-LD.
9. [elmohq/elmo](https://github.com/elmohq/elmo) — MIT, self-hosted AI-visibility tracking (ChatGPT, AI Overviews, Perplexity, Gemini, Claude…).
10. [dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io) — Apache-2.0. Mentions / link-loss / competitor monitoring.

Optional: [geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) (deeper GEO audit),
[geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) (llms.txt + citation tracking),
[advertools](https://github.com/eliasdabbas/advertools) (log-file analysis if Vercel log drains are enabled),
[firecrawl](https://github.com/firecrawl/firecrawl) (AGPL — competitor page scraping).

Avoided: repos that are fronts for a paid hosted connector (Ryze open-seo-mcp-skills),
scrape Ahrefs against ToS (cnych/seo-mcp), or are stale (storm, seo-audits-toolkit,
llmstxt-generator). Star counts on 2026-era SEO/GEO repos are inflated — judge by activity.

### Minimum running costs

- Claude Code plan (already have).
- DataForSEO — pay-as-you-go; covers keywords, SERP, backlinks, rank tracking.
- LLM API keys for the AI-visibility tracker (small monthly spend).
- Free but needs setup: Google Cloud project for GSC, GA4, PageSpeed/CrUX.
- If you already pay for Ahrefs or Semrush, their MCP connectors replace DataForSEO.

## What still needs a human (be honest with clients about this)

- **Link building & digital PR** — no OSS tool owns a backlink index, and
  relationships with editors/journalists can't be automated. AI finds prospects
  and drafts emails; a person approves and sends. Mass automated outreach burns
  the sending domain.
- **Strategy & prioritisation** — which markets, which pages matter to revenue.
- **Real E-E-A-T** — first-hand experience, original data, named experts.
  Unedited AI drafts are exactly what Google's helpful-content systems demote.
- **Brand voice and factual / legal sign-off.**
- **Local SEO groundwork** — Google Business Profile verification, genuine reviews.
- **Algorithm updates, penalties, manual actions.**
- **AI-visibility numbers are directional** — LLM answers vary per user/session.

Realistic target: one person spending a few hours a week approving Claude's
output, instead of an SEO team.
