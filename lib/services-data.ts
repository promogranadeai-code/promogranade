export interface ServiceItem {
  title: string;
  blurb: string;
  tags?: string[];
}

export interface ServiceGroup {
  label: string;
  intro?: string;
  items: ServiceItem[];
}

export interface ServicePage {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  iconKey: string;
  groups: ServiceGroup[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "website-development",
    eyebrow: "Service — 01",
    title: "Website Development",
    description:
      "We design and build conversion-focused websites that look premium, load fast, and grow with your business. Whether you need a WordPress powerhouse, a Shopify storefront, or a fully bespoke Next.js experience — every pixel is intentional and every millisecond counts.",
    iconKey: "web",
    groups: [
      {
        label: "What we build",
        intro:
          "From marketing sites and landing pages to complex multi-language platforms, we deliver production-ready websites that perform on every device.",
        items: [
          {
            title: "Marketing & Brand Sites",
            blurb:
              "Strategically designed to convert visitors into leads. Premium layouts, bold typography, and animations that make your brand unforgettable.",
            tags: ["Next.js", "GSAP", "Framer Motion"],
          },
          {
            title: "E-Commerce Stores",
            blurb:
              "Shopify storefronts and custom checkout flows built for scale — fast product pages, abandoned-cart recovery, and deep analytics integrations.",
            tags: ["Shopify", "Shopify Hydrogen", "Stripe"],
          },
          {
            title: "WordPress Platforms",
            blurb:
              "Custom themes and block editors for content teams who need editorial freedom without sacrificing speed or security.",
            tags: ["WordPress", "ACF", "WooCommerce"],
          },
          {
            title: "Landing Pages & CRO",
            blurb:
              "High-converting single-page experiences with A/B testing baked in. Every element is hypothesis-driven, tested, and iteratively improved.",
            tags: ["A/B Testing", "Analytics", "Heatmaps"],
          },
          {
            title: "Multi-language & Localisation",
            blurb:
              "Proper i18n implementation with locale-aware routing, currency switching, and culturally adapted content structures.",
            tags: ["next-intl", "Crowdin", "RTL support"],
          },
          {
            title: "Web Performance Audits",
            blurb:
              "We audit your existing site, identify Core Web Vitals bottlenecks, and implement targeted fixes that measurably improve rankings and conversions.",
            tags: ["Core Web Vitals", "Lighthouse", "CDN"],
          },
        ],
      },
      {
        label: "Our process",
        intro:
          "Great websites aren't designed in isolation. We start with your goals, your users, and your data — then build backwards.",
        items: [
          {
            title: "Discovery & Strategy",
            blurb:
              "We map your audience, competitors, and conversion funnel before touching a design tool. The strategy document becomes our shared north star.",
          },
          {
            title: "Design System First",
            blurb:
              "We build a component library before any page — tokens, typography, spacing, and colour. This means every page ships faster and stays consistent.",
          },
          {
            title: "Headless Architecture",
            blurb:
              "CMS at the back, custom front-end at the top. Your content team gets an easy editor; your users get a blazing-fast experience.",
          },
          {
            title: "Staging & QA",
            blurb:
              "Every build goes through device/browser matrix testing, Lighthouse scoring, and a structured QA checklist before we touch production.",
          },
        ],
      },
      {
        label: "Tech stack",
        intro: "We pick the right tool for the job — not the trendiest one.",
        items: [
          {
            title: "Next.js & React",
            blurb: "App Router, RSC, streaming SSR, and ISR for the fastest possible page loads with great developer ergonomics.",
            tags: ["Next.js 15+", "React 19", "TypeScript"],
          },
          {
            title: "Headless CMS",
            blurb: "Sanity, Contentful, or Payload — we choose the one that matches your editorial workflow and content complexity.",
            tags: ["Sanity", "Contentful", "Payload CMS"],
          },
          {
            title: "Edge & CDN",
            blurb: "Deployments to Vercel Edge, Cloudflare Workers, or custom infrastructure — whichever delivers the lowest TTFB globally.",
            tags: ["Vercel", "Cloudflare", "AWS"],
          },
        ],
      },
    ],
  },

  {
    slug: "custom-applications",
    eyebrow: "Service — 02",
    title: "Custom Applications",
    description:
      "Off-the-shelf software is built for the average business. You're not average. We engineer bespoke web applications, SaaS platforms, internal tools, and agentic dashboards from the ground up — scoped to your exact workflow, scaled to your exact ambition.",
    iconKey: "apps",
    groups: [
      {
        label: "What we build",
        intro:
          "Every application starts with a deep understanding of the problem. We don't start wireframing until we've mapped every edge case.",
        items: [
          {
            title: "SaaS Products",
            blurb:
              "Multi-tenant platforms with role-based access, billing integration, usage metering, and a customer-facing dashboard that makes your product feel premium.",
            tags: ["SaaS", "Stripe Billing", "Auth"],
          },
          {
            title: "ERP & Internal Tools",
            blurb:
              "Replace your spreadsheets and patched-together tools with a single, unified system built around how your team actually works.",
            tags: ["ERP", "Retool alt", "PostgreSQL"],
          },
          {
            title: "Agentic Dashboards",
            blurb:
              "AI-powered control surfaces that surface insights, trigger automations, and let your team act on data without switching context.",
            tags: ["AI", "Real-time", "WebSockets"],
          },
          {
            title: "Client Portals",
            blurb:
              "White-labelled portals where your clients can access deliverables, raise support tickets, track project milestones, and pay invoices.",
            tags: ["White-label", "Payments", "Notifications"],
          },
          {
            title: "Data Pipelines & Dashboards",
            blurb:
              "Custom analytics layers that pull from multiple data sources, transform them in real-time, and surface them as clean, actionable charts.",
            tags: ["ETL", "Recharts", "BigQuery"],
          },
          {
            title: "API Design & Integration",
            blurb:
              "RESTful and GraphQL APIs designed for extensibility, documented with OpenAPI, and versioned so integrations don't break on updates.",
            tags: ["REST", "GraphQL", "OpenAPI"],
          },
        ],
      },
      {
        label: "Architecture",
        intro: "We design for today's load and tomorrow's scale — without over-engineering.",
        items: [
          {
            title: "Microservices or Monolith",
            blurb:
              "We'll recommend the right architecture based on your team size, deployment cadence, and complexity. Most early-stage products don't need microservices — yet.",
          },
          {
            title: "Real-time Infrastructure",
            blurb:
              "WebSockets, Server-Sent Events, and Supabase Realtime for dashboards and collaboration tools that update without refresh.",
            tags: ["WebSockets", "SSE", "Supabase"],
          },
          {
            title: "Auth & Security",
            blurb:
              "JWT, OAuth 2.0, RBAC, and MFA. We design security in from day one — not bolted on at launch.",
            tags: ["Auth.js", "OAuth", "RBAC"],
          },
          {
            title: "Observability",
            blurb:
              "Structured logging, error tracking, and distributed tracing so you know exactly what's happening in production.",
            tags: ["Sentry", "Datadog", "OpenTelemetry"],
          },
        ],
      },
    ],
  },

  {
    slug: "ai-agents",
    eyebrow: "Service — 03",
    title: "AI Agentic Development",
    description:
      "The next wave of software isn't just intelligent — it acts. We build AI agents that plan, reason, use tools, and self-correct across multi-step workflows. From a single-model assistant to a full multi-agent orchestration system, we engineer AI that does the work.",
    iconKey: "agents",
    groups: [
      {
        label: "What we build",
        intro:
          "Agents are not chatbots. They complete goals, not just conversations.",
        items: [
          {
            title: "Autonomous Agents",
            blurb:
              "Goal-driven agents that break tasks into subtasks, select the right tools, execute, evaluate results, and retry on failure — without human hand-holding.",
            tags: ["LangGraph", "Claude", "Tool Use"],
          },
          {
            title: "Multi-Agent Systems",
            blurb:
              "Orchestrator-worker architectures where specialised agents collaborate: one researches, one writes, one fact-checks, one publishes.",
            tags: ["Multi-agent", "LangGraph", "Orchestration"],
          },
          {
            title: "RAG-Powered Assistants",
            blurb:
              "Retrieval-Augmented Generation systems that answer questions from your internal knowledge base — contracts, manuals, policies — with source citations.",
            tags: ["RAG", "Vector DB", "Embeddings"],
          },
          {
            title: "AI-Native Workflows",
            blurb:
              "Business processes rebuilt around AI: lead qualification, content generation pipelines, support triage, and financial analysis — all automated.",
            tags: ["n8n", "LangChain", "Claude API"],
          },
          {
            title: "Computer-Use Agents",
            blurb:
              "Agents that navigate web browsers, fill forms, extract data, and perform tasks that previously required a human at a keyboard.",
            tags: ["Computer Use", "Playwright", "Browser"],
          },
          {
            title: "Model Context Protocol",
            blurb:
              "MCP servers that give your AI agents secure, structured access to your databases, APIs, and internal tools — the new standard for agent integrations.",
            tags: ["MCP", "Anthropic", "Tool Servers"],
          },
        ],
      },
      {
        label: "The engineering stack",
        intro: "We build on battle-tested primitives, not demos.",
        items: [
          {
            title: "LangGraph & LangChain",
            blurb:
              "State machines for complex agentic workflows. Cycles, branches, human-in-the-loop checkpoints, and persistent memory across sessions.",
            tags: ["LangGraph", "LangChain", "Python"],
          },
          {
            title: "Claude & OpenAI APIs",
            blurb:
              "We're model-agnostic and select the right model for each task — Claude 4 for reasoning, Haiku for speed, GPT-4o for vision tasks.",
            tags: ["Claude", "GPT-4o", "Gemini"],
          },
          {
            title: "Vector Databases",
            blurb:
              "Pinecone, Weaviate, or pgvector for storing and retrieving embeddings at scale with sub-100ms latency.",
            tags: ["Pinecone", "Weaviate", "pgvector"],
          },
          {
            title: "Evals & Monitoring",
            blurb:
              "Systematic evaluation pipelines to measure agent accuracy, hallucination rates, and task completion — so you can iterate with confidence.",
            tags: ["Evals", "LangSmith", "Monitoring"],
          },
        ],
      },
    ],
  },

  {
    slug: "seo-geo-aeo",
    eyebrow: "Service — 04",
    title: "SEO / GEO / AEO",
    description:
      "Getting found used to mean ranking on Google. Now it means being cited by AI assistants, featured in generative overviews, and surfacing in zero-click answers. We optimise for all three — traditional search, generative engines, and AI answer systems — simultaneously.",
    iconKey: "seo",
    groups: [
      {
        label: "Search Engine Optimisation",
        intro:
          "Technical precision meets editorial quality. We don't chase algorithms — we build the kind of content that algorithms are designed to reward.",
        items: [
          {
            title: "Technical SEO Audits",
            blurb:
              "Deep crawl analysis covering Core Web Vitals, crawl budget, canonical structure, schema markup, and international hreflang implementation.",
            tags: ["Screaming Frog", "Core Web Vitals", "Schema"],
          },
          {
            title: "Keyword Strategy & Mapping",
            blurb:
              "Intent-driven keyword research that maps every page to a specific search need — from informational to transactional — with competitive gap analysis.",
            tags: ["Ahrefs", "Semrush", "Search Intent"],
          },
          {
            title: "Content Architecture",
            blurb:
              "Topic clusters, pillar pages, and internal linking structures that establish topical authority and pass ranking equity efficiently.",
            tags: ["Topic Clusters", "Internal Links", "Authority"],
          },
          {
            title: "Link Building",
            blurb:
              "Digital PR, HARO responses, and strategic partnerships that earn high-authority backlinks naturally — no link farms, ever.",
            tags: ["Digital PR", "HARO", "Backlinks"],
          },
        ],
      },
      {
        label: "Generative Engine Optimisation",
        intro:
          "ChatGPT, Perplexity, and Google AI Overviews are reshaping how people discover brands. We make sure yours gets cited.",
        items: [
          {
            title: "GEO Content Strategy",
            blurb:
              "Content structured to be retrieved and cited by large language models — factual, well-attributed, and formatted for generative summaries.",
            tags: ["GEO", "LLM Optimisation", "Structured Data"],
          },
          {
            title: "Entity Building",
            blurb:
              "Establishing your brand, products, and key people as recognised entities in knowledge graphs — increasing AI citation probability.",
            tags: ["Knowledge Graph", "Wikidata", "Entity SEO"],
          },
          {
            title: "Perplexity & ChatGPT Visibility",
            blurb:
              "Optimising your presence in AI search results through source authority signals, structured content, and reference-worthy data assets.",
            tags: ["Perplexity", "ChatGPT Search", "AI Search"],
          },
        ],
      },
      {
        label: "Answer Engine Optimisation",
        intro:
          "Zero-click is not the enemy — it's an opportunity. We get your content into featured snippets, PAA boxes, and voice answers.",
        items: [
          {
            title: "Featured Snippet Targeting",
            blurb:
              "Structured answers, definition boxes, and step-by-step content formatted to win the positions that appear above organic results.",
            tags: ["Featured Snippets", "PAA", "Structured Data"],
          },
          {
            title: "Schema Markup",
            blurb:
              "FAQ, HowTo, Article, Product, and Review schema implemented correctly — giving search engines rich signals about your content's purpose.",
            tags: ["JSON-LD", "Schema.org", "Rich Results"],
          },
          {
            title: "Voice Search Readiness",
            blurb:
              "Conversational content written to match how people ask questions verbally — capturing traffic from Siri, Alexa, and Google Assistant.",
            tags: ["Voice Search", "Natural Language", "Q&A"],
          },
        ],
      },
    ],
  },

  {
    slug: "social-media",
    eyebrow: "Service — 05",
    title: "Social Media Marketing",
    description:
      "Social media is the fastest path from unknown brand to household name — when it's done with strategy, consistency, and creative quality. We handle the full stack: content strategy, production, community management, and performance reporting across every platform that matters to your audience.",
    iconKey: "social",
    groups: [
      {
        label: "Strategy & Planning",
        intro:
          "We don't post for the sake of posting. Every piece of content serves a role in the funnel.",
        items: [
          {
            title: "Platform Audit & Strategy",
            blurb:
              "We audit your current presence, analyse competitors, and build a platform-specific strategy aligned to your business goals and audience demographics.",
            tags: ["Audit", "Competitor Analysis", "Strategy"],
          },
          {
            title: "Content Calendar",
            blurb:
              "A 30-day rolling content calendar with themes, formats, captions, and hashtag strategy — planned far enough ahead to be reactive when news breaks.",
            tags: ["Planning", "Editorial Calendar", "Themes"],
          },
          {
            title: "Brand Voice & Tone Guide",
            blurb:
              "A documented voice, tone, and visual identity guide so every post — whether written by us or your team — sounds unmistakably like your brand.",
            tags: ["Brand Voice", "Tone Guide", "Consistency"],
          },
        ],
      },
      {
        label: "Content Production",
        intro:
          "Content that stops the scroll. We produce natively for each platform — not repurposed square images on every channel.",
        items: [
          {
            title: "Short-form Video",
            blurb:
              "Reels, TikToks, and YouTube Shorts scripted, filmed (or sourced), edited, and captioned for maximum watch time and saves.",
            tags: ["Reels", "TikTok", "YouTube Shorts"],
          },
          {
            title: "Graphic Design & Carousels",
            blurb:
              "Swipe-worthy carousel posts, infographics, and branded graphic templates that maintain visual consistency while educating and entertaining.",
            tags: ["Canva Pro", "Figma", "Infographics"],
          },
          {
            title: "Copywriting & Captions",
            blurb:
              "Hooks that earn the click, bodies that hold attention, and CTAs that convert — written for each platform's native reading behaviour.",
            tags: ["Copywriting", "Hooks", "CTA"],
          },
          {
            title: "UGC & Influencer Coordination",
            blurb:
              "We identify, brief, and manage content creators who can amplify your brand authentically to audiences you can't yet reach organically.",
            tags: ["UGC", "Influencer", "Creator Briefs"],
          },
        ],
      },
      {
        label: "Community & Growth",
        intro: "Posting is 40% of the job. Engaging is the other 60%.",
        items: [
          {
            title: "Community Management",
            blurb:
              "Daily response to comments, DMs, and mentions — turning every interaction into a brand-building moment and routing serious enquiries to your team.",
            tags: ["Response Rate", "DMs", "Engagement"],
          },
          {
            title: "Growth Hacking",
            blurb:
              "Hashtag research, collaboration pods, strategic follows, and platform algorithm exploitation — ethical tactics that actually move the follower counter.",
            tags: ["Growth", "Hashtags", "Algorithm"],
          },
          {
            title: "Monthly Reporting",
            blurb:
              "Clear reports covering reach, engagement, follower growth, link clicks, and content performance — with recommendations for the next month.",
            tags: ["Analytics", "Reporting", "Insights"],
          },
        ],
      },
    ],
  },

  {
    slug: "ads",
    eyebrow: "Service — 06",
    title: "Meta & Google Ads",
    description:
      "Paid media is the fastest lever in your growth stack — when it's managed properly. We run performance campaigns on Meta and Google that find the right people, serve the right creative, and scale spend only when the numbers justify it. No vanity metrics, no inflated dashboards.",
    iconKey: "ads",
    groups: [
      {
        label: "Meta Ads",
        intro:
          "Facebook and Instagram reach 3 billion people a month. We reach the right 3,000 for your business first.",
        items: [
          {
            title: "Campaign Architecture",
            blurb:
              "Proper funnel structure — Awareness, Consideration, and Conversion campaigns with distinct creative, copy, and audience strategy at each stage.",
            tags: ["Meta Ads", "Funnel", "Campaign Structure"],
          },
          {
            title: "Audience Strategy",
            blurb:
              "Custom audiences from your CRM, Lookalike audiences from your best customers, and interest targeting layered with behavioural data for precision reach.",
            tags: ["Custom Audiences", "Lookalikes", "Retargeting"],
          },
          {
            title: "Creative Production",
            blurb:
              "Static ads, video ads, and carousels created with platform-native best practices — thumb-stopping within 1.5 seconds, message-complete without audio.",
            tags: ["Ad Creative", "Video Ads", "UGC Ads"],
          },
          {
            title: "A/B Testing Framework",
            blurb:
              "Systematic creative and copy testing across isolated variables — headline, hook, CTA, visual — so every decision is data-backed, not gut-driven.",
            tags: ["A/B Testing", "Split Testing", "CRO"],
          },
        ],
      },
      {
        label: "Google Ads",
        intro:
          "Intent-based advertising at the exact moment someone is searching for what you sell.",
        items: [
          {
            title: "Search Campaigns",
            blurb:
              "Keyword-matched text ads with tight ad groups, high Quality Scores, and negative keyword lists that prevent wasted spend on irrelevant queries.",
            tags: ["Search Ads", "Keywords", "Quality Score"],
          },
          {
            title: "Shopping & PMax",
            blurb:
              "Product feed optimisation and Performance Max campaigns for e-commerce — structured to prioritise your highest-margin products.",
            tags: ["Shopping", "PMax", "Product Feed"],
          },
          {
            title: "YouTube Ads",
            blurb:
              "In-stream and Shorts ads that build brand recall while targeting users at specific stages of the research and decision process.",
            tags: ["YouTube", "In-stream", "Brand Awareness"],
          },
          {
            title: "Retargeting & RLSA",
            blurb:
              "Remarketing Lists for Search Ads and Display retargeting that re-engage site visitors with the right message at the right bid adjustment.",
            tags: ["RLSA", "Retargeting", "Display"],
          },
        ],
      },
      {
        label: "Reporting & Optimisation",
        intro: "What gets measured gets optimised. What gets optimised gets profitable.",
        items: [
          {
            title: "Live Reporting Dashboard",
            blurb:
              "A Looker Studio dashboard connected to your ad accounts — real-time spend, ROAS, CPL, and CAC visible 24/7 without waiting for weekly reports.",
            tags: ["Looker Studio", "Real-time", "ROAS"],
          },
          {
            title: "Budget Optimisation",
            blurb:
              "Weekly bid adjustments, audience pruning, and budget reallocation to the campaigns and creatives proving the best return.",
            tags: ["Budget", "Bids", "Scaling"],
          },
          {
            title: "Conversion Tracking",
            blurb:
              "GTM setup, server-side tracking, and GA4 event configuration so you have reliable conversion data — not the broken signals Meta and Google report by default.",
            tags: ["GTM", "Server-side", "GA4"],
          },
        ],
      },
    ],
  },

  {
    slug: "workflow-automation",
    eyebrow: "Service — 07",
    title: "Workflow Automation",
    description:
      "Every repetitive task your team does manually is a tax on their creativity. We map your operations, identify the bottlenecks, and build automations that run 24/7 — connecting your tools, eliminating data entry, and letting your team focus on work that actually needs a human.",
    iconKey: "workflow",
    groups: [
      {
        label: "What we automate",
        intro:
          "If it's a rule-based process with defined inputs and outputs, it can be automated. Here's where we usually start.",
        items: [
          {
            title: "Lead & CRM Workflows",
            blurb:
              "Inbound lead routing, automatic CRM record creation, lead scoring, follow-up sequences, and deal stage triggers — all running without manual intervention.",
            tags: ["HubSpot", "Salesforce", "Lead Routing"],
          },
          {
            title: "Finance & Invoicing",
            blurb:
              "Invoice generation, payment reminders, reconciliation reports, and expense categorisation pulled from bank feeds and accounting software.",
            tags: ["Xero", "QuickBooks", "Stripe"],
          },
          {
            title: "Content Pipelines",
            blurb:
              "Social post scheduling, blog publishing workflows, newsletter assembly, and asset management — from Notion draft to published post in one click.",
            tags: ["Notion", "Buffer", "Beehiiv"],
          },
          {
            title: "Operations & HR",
            blurb:
              "Onboarding checklists, equipment procurement flows, leave approval chains, and weekly report aggregation — documented and automated.",
            tags: ["Slack", "Google Workspace", "HR"],
          },
          {
            title: "E-Commerce Operations",
            blurb:
              "Order processing, fulfilment updates, inventory alerts, return workflows, and customer notification chains that scale without headcount.",
            tags: ["Shopify", "WooCommerce", "Fulfilment"],
          },
          {
            title: "Data Sync & Reporting",
            blurb:
              "Automated data pulls from your tools — ad platforms, CRM, analytics — consolidated into a single source of truth refreshed on your schedule.",
            tags: ["Google Sheets", "BigQuery", "Dashboards"],
          },
        ],
      },
      {
        label: "The toolbox",
        intro: "We use the best tool for each automation — not just the one we know best.",
        items: [
          {
            title: "n8n",
            blurb:
              "Self-hosted, open-source automation with deep customisation. Ideal when you need complex logic, code nodes, or data privacy requirements.",
            tags: ["n8n", "Self-hosted", "Open Source"],
          },
          {
            title: "Make.com",
            blurb:
              "Visual workflow builder with 1,500+ app connectors. Perfect for teams that want to maintain automations themselves after we've built the architecture.",
            tags: ["Make.com", "No-code", "Integrations"],
          },
          {
            title: "Custom Integrations",
            blurb:
              "When no platform covers your use case, we write custom API bridges, webhook handlers, and middleware that connect anything to anything.",
            tags: ["REST APIs", "Webhooks", "Python"],
          },
          {
            title: "Zapier",
            blurb:
              "For simple, reliable triggers and actions between mainstream SaaS tools — deployed fast and easy to hand over to your ops team.",
            tags: ["Zapier", "Quick Deploy", "SaaS"],
          },
        ],
      },
    ],
  },

  {
    slug: "ai-systems",
    eyebrow: "Service — 08",
    title: "Custom AI Systems",
    description:
      "Production AI is harder than most companies expect. The demo works. The product doesn't. We close that gap — building full-stack AI systems with evaluation frameworks, fine-tuned models, vector retrieval pipelines, and the observability to know when things go wrong before your users do.",
    iconKey: "ai",
    groups: [
      {
        label: "What we build",
        intro:
          "Systems that don't just use AI — they depend on it. Built to a production standard from day one.",
        items: [
          {
            title: "RAG Pipelines",
            blurb:
              "End-to-end retrieval-augmented generation: document ingestion, chunking strategy, embedding, vector storage, hybrid search, and a generation layer with source attribution.",
            tags: ["RAG", "Vector DB", "Embeddings"],
          },
          {
            title: "Fine-tuned Models",
            blurb:
              "Domain-specific fine-tuning on proprietary data — classification, extraction, summarisation, and generation tasks that base models can't handle reliably.",
            tags: ["Fine-tuning", "LoRA", "QLoRA"],
          },
          {
            title: "AI-Powered Search",
            blurb:
              "Semantic search layers over your product catalogue, documentation, or knowledge base — replacing keyword matching with meaning-aware retrieval.",
            tags: ["Semantic Search", "Hybrid Search", "Reranking"],
          },
          {
            title: "Document Intelligence",
            blurb:
              "Structured extraction from PDFs, invoices, contracts, and forms — turning unstructured documents into validated database records automatically.",
            tags: ["OCR", "Extraction", "Validation"],
          },
          {
            title: "Recommendation Systems",
            blurb:
              "Personalised recommendation engines that improve with every interaction — content recommendations, product suggestions, and next-best-action systems.",
            tags: ["Recommendations", "Personalisation", "ML"],
          },
          {
            title: "AI Evaluation Frameworks",
            blurb:
              "Systematic evals that measure accuracy, hallucination rate, latency, and cost across model updates — so you can ship improvements with confidence.",
            tags: ["Evals", "LangSmith", "Regression Testing"],
          },
        ],
      },
      {
        label: "Infrastructure",
        intro: "AI at scale needs infrastructure that won't let you down at 3am.",
        items: [
          {
            title: "Inference Optimisation",
            blurb:
              "Prompt caching, batching, streaming, and model selection strategies that cut inference costs by 40–70% without sacrificing output quality.",
            tags: ["Prompt Caching", "Batching", "Cost Optimisation"],
          },
          {
            title: "Vector Database Architecture",
            blurb:
              "Choosing and scaling the right vector store — Pinecone, Weaviate, Qdrant, or pgvector — with proper index configuration and namespace design.",
            tags: ["Pinecone", "Qdrant", "pgvector"],
          },
          {
            title: "AI Observability",
            blurb:
              "Structured logging of every LLM call — inputs, outputs, latency, token usage, and cost — so you can debug, audit, and improve systematically.",
            tags: ["LangSmith", "Helicone", "OpenTelemetry"],
          },
          {
            title: "Model Governance",
            blurb:
              "PII detection, output filtering, guardrails, and model versioning protocols that keep your AI system compliant and your users safe.",
            tags: ["Guardrails", "PII", "Compliance"],
          },
        ],
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
