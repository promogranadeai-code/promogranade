# SEO automation for promogranade.com

How Promogranade runs end-to-end SEO without an SEO team:
**OpenSEO** (open-source Ahrefs/Semrush replacement) for data, **Claude Code**
for analysis and drafting, **this repo's CI** for technical checks, and **one
trained team member** who decides, edits and approves. We don't use Ahrefs or Semrush.

- Operator guide (start here if you're the person running SEO): [`TRAINING.md`](./TRAINING.md)
- Weekly routine: run `/seo-weekly` in Claude Code (monthly report: `/seo-weekly monthly`)
- OpenSEO reference for Claude: `.claude/skills/openseo/SKILL.md`
- Full pipeline playbook for Claude: `.claude/skills/seo-automation/SKILL.md`

---

## 1. OpenSEO — the data layer

[every-app/open-seo](https://github.com/every-app/open-seo) (MIT, actively
released — v0.1.12 on 2026-10-08). It covers keyword research, rank tracking,
competitor insights, backlinks, site audits, AI visibility (ChatGPT, Gemini,
Claude, Perplexity) and Google Search Console. Its Claude Code plugin brings an
MCP server plus 12 ready-made SEO skills, including a beginner `seo-coach` and
an `seo-audit` written so a non-expert can act on it.

**Install (once per person, inside Claude Code):**

```text
/plugin marketplace add every-app/open-seo
/plugin install openseo@openseo
/mcp            # log in to OpenSEO if not prompted
```

Then run `/openseo:seo-project-setup` once for the promogranade.com project.

**Hosted vs self-hosted**

| | Hosted (recommended to start) | Self-hosted |
|---|---|---|
| Cost | $10/month incl. $10 usage credits; +28% on data costs | Data at cost via your own DataForSEO account (min top-up $50) |
| Setup | Sign up, install plugin | Docker (localhost only, no login) or Cloudflare free plan + Cloudflare Access |
| Team access | Organisation + invites | Cloudflare Access users |
| Good for | Us now | When monthly data spend is large enough that 28% matters |

Self-hosting details are in the `openseo` skill and the upstream
`docs/SELF_HOSTING_*.md` files.

## 2. What's wired into this repo

| Piece | File | What it does |
|---|---|---|
| PR gate | `.github/workflows/seo-audit.yml` → `lighthouse` | Builds the site and runs Lighthouse on 7 key pages. SEO < 90 **fails** the PR; performance, accessibility and best-practices warn. |
| Weekly live audit | same workflow → `live-site` (Mondays + manual) | lychee checks every link on every sitemap page; Unlighthouse scans the whole live site. Reports are saved as workflow artifacts. |
| Lighthouse config | `seo/lighthouserc.json` | Pages and score budgets. Add new page types here. |
| Link-check ignores | `.lycheeignore` | Social hosts that block bots (LinkedIn, Instagram, wa.me…). |
| Claude skills | `.claude/skills/{seo-weekly,openseo,seo-automation}` | Weekly routine, OpenSEO reference, full pipeline playbook. |

Already in the site code: dynamic `app/sitemap.ts`, `app/robots.ts` (AI crawlers
allowed), `public/llms.txt`, FAQPage schema on service pages.

**Baseline (2026-10-14).** SEO 100 on all 28 pages. Accessibility 96–100.
Mobile performance: home **36**, other pages 64–81. Desktop: 80–96, but the home
page failed its performance audit (WebGL hero + intro animation); that is the
biggest technical fix. Links: 0 broken across 27 pages.

## 3. End-to-end pipeline

| Stage | Tool | Human step |
|---|---|---|
| Strategy & setup | `/openseo:seo-project-setup`, `/openseo:competitive-landscape` | **Approve goals and competitors** |
| Research | `/openseo:keyword-research`, Search Console (inside OpenSEO) | Skim |
| Plan | `/openseo:keyword-clustering` → page list | **Choose pages** |
| Create & optimise | Claude Code drafts pages/meta/schema into `lib/blog.ts` / `lib/services-data.ts` on a PR | **Edit for voice + real experience** |
| Technical | This repo's CI + `/openseo:seo-audit` monthly | Don't merge red PRs |
| Publish | PR → Vercel preview → merge (sitemap updates automatically) | Merge |
| Off-page | `/openseo:link-prospecting` (prospects + drafts) | **Personalise and send** |
| Local | `/openseo:local-seo` (if we target a city) | GBP verification, reviews |
| AI visibility (GEO/AEO) | `/openseo:ai-prompt-research`, `/openseo:ai-visibility-audit`, AI tracking in OpenSEO | Act on 1–3 changes |
| Track & report | `/seo-weekly`, `/seo-weekly monthly` (rank tracker + Search Console) | Check before sending |

## 4. Costs

- OpenSEO hosted: $10/month (includes $10 of data credits). Routine weekly work
  for one site usually fits; heavy research or daily AI tracking costs more.
  The app shows estimates before AI-visibility checks.
- Claude Code: existing plan.
- Free: Google Search Console, GitHub Actions CI.

## 5. Optional add-ons (only if a need appears)

- [claude-seo](https://github.com/AgriciDaniel/claude-seo): deeper technical,
  schema and hreflang audits and PDF reports.
- [marketingskills](https://github.com/coreyhaines31/marketingskills):
  programmatic SEO and site-architecture planning.
- [changedetection.io](https://github.com/dgtlmoon/changedetection.io): alerts
  for brand mentions and lost links.
- [SEOnaut](https://github.com/StJudeWasHere/seonaut) or
  [siteone-crawler](https://github.com/janreges/siteone-crawler): if we start
  auditing many client sites.

## 6. What still needs a human

- **Relationship link building and PR.** AI finds prospects and drafts emails;
  a person personalises and sends them. Mass outreach burns the domain.
- **Strategy and priorities.** Which services and markets matter to revenue.
- **Real experience (E-E-A-T).** Client results, original examples, named
  authors. Unedited AI drafts get demoted by Google.
- **Google Business Profile verification and genuine reviews.**
- **Google penalties or manual actions.** Escalate immediately.
- **AI-visibility numbers are trends, not exact counts.**
