# SEO operator training — for a team member with no SEO background

You don't need to become an SEO expert. OpenSEO + Claude Code do the research,
audits, analysis and first drafts. **Your job is to decide, edit, approve and
send.** This guide gets you there in four weeks, then gives you a weekly routine
of about 2 hours.

---

## Who does what

| OpenSEO + Claude do | You do |
|---|---|
| Pull Google Search Console, rankings, keyword and competitor data | Approve the plan (does this fit our business?) |
| Audit the site, find the 1–3 fixes that matter | Merge the PR after checking the preview |
| Research keywords, group them into page ideas | Choose which pages we create |
| Draft new pages, rewrite titles/meta, add schema | Edit drafts: add real experience, examples, our voice |
| Find link prospects and draft outreach emails | Personalise and send emails, build relationships |
| Track AI-visibility (ChatGPT, Gemini…) | Act on the 1–3 suggested changes |
| Write the monthly report | Sanity-check it before it goes to the founder |
| CI blocks pages that break SEO basics | Nothing — just don't merge red PRs |

## Day 0 — setup (with a developer, ~1 hour)

1. Sign up at openseo.so (team plan, $10/month incl. $10 credits). Ask to be
   invited to the Promogranade organisation.
2. Install Claude Code, open this repo, then in Claude Code:
   `/plugin marketplace add every-app/open-seo` →
   `/plugin install openseo@openseo` → `/mcp` (log in to OpenSEO).
3. Get "Full" user access to Google Search Console for promogranade.com
   (the founder adds you). Connect it in OpenSEO → project → Integrations.
4. Run `/openseo:seo-project-setup` and answer its questions: what we sell, who
   our customers are, competitors, most important pages. This is saved and
   reused by every other command — take it seriously.

## Weeks 1–4 — learn by doing

Each week: run the command, read the report it saves (OpenSEO → Reports), and
ask `/openseo:seo-coach` to explain anything unclear. The coach is free.

| Week | Run | Learn these ideas | You're done when you can… |
|---|---|---|---|
| 1 | `/openseo:seo-coach`, then `/openseo:seo-audit` | Impressions, clicks, CTR, position, indexing, why page speed matters | Explain the top 3 audit findings to a colleague |
| 2 | `/openseo:keyword-research` with 3 seed topics from our services, then `/openseo:keyword-clustering` | Search volume, keyword difficulty (KD), search intent, one page per cluster | Pick 3 page ideas and justify each with data |
| 3 | `/openseo:competitor-analysis` on our closest competitor; have Claude draft one page from week 2 into a PR | Content gaps, E-E-A-T (real experience beats generic text) | Edit an AI draft so it sounds like us and has a real example |
| 4 | `/openseo:link-prospecting`, `/openseo:ai-prompt-research`, then `/seo-weekly` | Backlinks, referring domains, AI citations | Send 5 personalised outreach emails; run a full weekly routine alone |

## Weekly routine (Mondays, ~2 hours)

1. In Claude Code run **`/seo-weekly`** (20 min of Claude working, you read).
2. Review its 1–3 actions. Say no to anything that doesn't fit the business.
3. Review PRs it opened: open the Vercel preview, read the page, edit the copy,
   merge only when CI is green.
4. Send the outreach emails it drafted (edit each one first).
5. First Monday of the month: **`/seo-weekly monthly`** → check the report →
   send it to the founder.

## Simple decision rules

- **Keyword worth a page?** Matches a service we sell + intent is "looking for a
  provider/solution" + KD under ~30 to start. Volume matters less than fit.
- **One topic = one page.** If two pages target the same keyword, merge them
  (the clustering report flags this as "cannibalisation").
- **Quick wins first.** A page sitting at position 5–20 with lots of impressions
  improves faster than a new page.
- **Never publish an AI draft unedited.** Add something only we can say: a client
  result, a screenshot, a process we really use, a named author.
- **Never mass-send emails.** 5–10 personal emails a week beat 500 templates.
- **Spending credits.** Commands show/estimate cost. Anything over ~$5 at once →
  check with the founder. The monthly $10 usually covers routine work.
- **Red CI = don't merge.** Ask a developer.

## Mini glossary

- **Impressions** — times we appeared in Google results. **Clicks** — visits from them.
- **CTR** — clicks ÷ impressions. Low CTR at a good position = rewrite the title/meta.
- **Position** — average rank in Google. 1–10 = page 1.
- **KD (keyword difficulty)** — 0–100, how hard to rank. Lower is easier.
- **Intent** — what the searcher wants: learn (informational), compare, or buy/hire.
- **Backlink / referring domain** — another site linking to us / number of unique sites doing so.
- **Schema (JSON-LD)** — hidden labels that tell Google what a page is (FAQ, article…).
- **Core Web Vitals** — Google's page-speed and stability scores; CI checks these.
- **GEO / AEO** — being mentioned or cited in AI answers (ChatGPT, Gemini, Google AI Overviews).
- **Indexing** — whether Google has stored the page at all. Not indexed = invisible.

## When to escalate

Traffic drops > 30% in a week, a "manual action" email from Google Search
Console, pages disappearing from the index, or CI red for more than a day →
tell a developer and the founder the same day.
