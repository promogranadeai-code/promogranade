---
name: seo-weekly
description: Promogranade's weekly SEO routine for a non-expert operator — checks CI/site health, pulls Search Console and rankings via OpenSEO, picks this week's 1–3 actions, and drafts the work for human approval. Run as /seo-weekly every Monday (or /seo-weekly monthly for the monthly report).
---

# /seo-weekly — the weekly SEO routine

**What this skill is:** one command the trained (non-SEO-expert) team member runs
every Monday. Claude does the data pulls and analysis with OpenSEO + this repo's
CI, then hands back a short plan and drafts. The human only decides, edits and
approves. With the argument `monthly`, it also produces the monthly report.
Background: `openseo` skill (tool reference), `seo-automation` skill (full
pipeline), `seo/TRAINING.md` (the operator's guide).

---

## Before starting

1. Confirm OpenSEO MCP is connected (`whoami`). If not, tell the user to run
   `/plugin install openseo@openseo` and `/mcp` to log in, then stop.
2. `list_projects` → the promogranade.com project. `get_project_context` and
   `list_reports`. If the context is empty, run `/openseo:seo-project-setup`
   first and stop after it.
3. Never spend credits on research already in the research log < 30 days old.

## Steps

1. **Site health (free).** Latest run of the "SEO audit" GitHub workflow on `main`
   (PR gate + Monday live-site job): failures, broken links, Lighthouse drops.
   Anything red is action #1 — fix it in code on a branch and open a PR.
2. **What's happening in Google (free).** `get_search_console_performance`, last
   28 days vs previous 28: clicks, impressions, CTR, average position. List:
   - pages/queries that **dropped** sharply,
   - **quick wins**: queries at position 5–20 with high impressions,
   - pages with impressions but CTR far below their position's norm (title/meta rewrite).
3. **Rankings (free).** Rank-tracker latest positions; note big movers.
4. **Pick this week's 1–3 actions**, highest expected impact first. Typical:
   refresh/rewrite a quick-win page, fix a technical issue, publish one new page
   from an approved keyword cluster, one off-page task (link prospect batch or
   AI-visibility fix). Each action: why (data), effort, what the human must do.
5. **Do the work as drafts**, never live:
   - content/meta/schema changes → edit `lib/blog.ts` / `lib/services-data.ts`
     on a branch, open a PR (CI runs Lighthouse);
   - outreach → draft emails in a markdown file for the human to send;
   - anything needing credits > ~$2 → state the cost and ask first.
6. **Log it.** `update_project_context` with `appendResearchLog`:
   "Weekly <date>: <actions>. Verdict: <one line>".

## Output to the user (keep it short)

```text
SEO week of <date>
Health: ✅/⚠️ <one line>
Google: clicks <n> (<±%>), impressions <n> (<±%>), avg pos <n>
This week:
1. <action> — why — your part: <approve PR / edit draft / send 5 emails>
2. ...
Waiting on you: <links to PRs / draft files>
```

## Monthly (`/seo-weekly monthly`)

Also run `/openseo:seo-audit` (if last audit > 30 days) and, every quarter,
`/openseo:ai-visibility-audit`. Then write a one-page monthly report through
`/openseo:seo-report`: traffic trend, wins, what shipped, next month's plan.
