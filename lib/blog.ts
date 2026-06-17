export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  categoryColor: string; // CSS gradient for card thumbnail
  date: string;
  dateISO: string;
  read: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  featured: boolean;
  content: BlogSection[];
};

export const posts: BlogPost[] = [
  // ──────────────────────────────────────────────────────────────
  {
    slug: "ai-agents-business-2025",
    title: "AI Agents in 2025: How Autonomous Systems Are Replacing Entire Business Functions",
    category: "AI",
    categoryColor: "linear-gradient(135deg,#e0142c 0%,#7a0014 100%)",
    date: "June 2025",
    dateISO: "2025-06-01",
    read: "8 min",
    featured: true,
    excerpt:
      "Autonomous AI agents are no longer a research topic — they're running pipelines, closing tickets, and drafting proposals in production today. Here's what the architecture looks like.",
    metaDescription:
      "Learn how AI agents are transforming business operations in 2025. Discover multi-agent orchestration, real-world use cases, and how to deploy autonomous AI systems that replace manual workflows.",
    keywords: [
      "AI agents 2025", "autonomous AI systems", "AI business automation",
      "multi-agent orchestration", "LangGraph agents", "AI workflow automation",
      "business AI deployment", "agentic AI",
    ],
    content: [
      {
        heading: "The Shift From AI Tools to AI Agents",
        body: `For the past three years, businesses adopted AI as a co-pilot — a smarter autocomplete that helped people work faster. In 2025, that model is giving way to something fundamentally different: AI agents that plan, act, observe feedback, and correct themselves without a human in the loop.\n\nThe difference matters enormously. A tool responds to a prompt. An agent receives a goal, breaks it into steps, executes those steps across multiple systems, checks whether the outcome matched the intention, and retries if it didn't. The practical implication: an agent can own an entire business function end-to-end, not just accelerate part of it.`,
      },
      {
        heading: "What Agents Can Do That Traditional Software Cannot",
        body: `Traditional software is deterministic. It does exactly what you programmed it to do, no more. AI agents are goal-directed. Give an agent a target — "qualify every inbound lead and schedule a call if they match our ICP" — and it figures out the steps itself.\n\nThis makes agents uniquely suited to tasks that require judgment: reading unstructured data, deciding what matters, picking the right action from a range of options, and adapting when something unexpected happens. A rule-based automation breaks the moment a vendor changes their API. An agent reads the error, infers what changed, and finds an alternative path.`,
      },
      {
        heading: "Real-World Use Cases Running in Production",
        body: `The most impactful agent deployments we see at Promogranade fall into four categories:\n\n**Lead qualification and outreach**: An agent monitors inbound form fills, enriches contact data, scores leads against your ICP, drafts personalised first-touch emails, and updates your CRM — all within seconds of submission.\n\n**Customer support triage**: Instead of routing every ticket to a human, an agent reads the ticket, searches the knowledge base, resolves standard issues automatically, and escalates complex ones with a full context summary already written.\n\n**Research and synthesis**: Competitors published new pricing. A market changed. An agent monitors sources, extracts what's relevant, and delivers a summarised brief to your team each morning.\n\n**Internal data retrieval**: Employees waste hours hunting across Notion, Slack, and spreadsheets. An agent with access to all three surfaces the right answer in one query.`,
      },
      {
        heading: "The Architecture Behind a Production Agent",
        body: `Most production agent systems share a common structure: an orchestrator (which holds the goal and manages the plan), a set of tools (which give the agent access to external systems), a memory layer (which stores state across steps), and an observation loop (which feeds feedback back into the agent's reasoning).\n\nLangGraph has emerged as the framework of choice for complex, stateful agent workflows because it lets you define the control flow explicitly. You decide which nodes run in parallel, which decisions branch, and where human-in-the-loop checkpoints sit. Claude claude-haiku-4-5 handles the reasoning cheaply; GPT-4o handles the rare tasks that need multimodal input. Vector databases like Pinecone or Supabase pgvector store the long-term memory.`,
      },
      {
        heading: "When Not to Use an Agent",
        body: `Agents introduce latency, cost, and non-determinism. For a task with a fixed input and a fixed output — parsing an invoice into structured JSON, for example — a fine-tuned model or a simple rule is faster, cheaper, and more reliable.\n\nUse an agent when: the task requires multiple steps, the path between input and output isn't fully predictable, or the task spans multiple systems that need to be coordinated. Don't use an agent when a simple API call, a regex, or a lookup table will do the job.`,
      },
      {
        heading: "Getting Started With AI Agents for Your Business",
        body: `The highest-ROI starting point is almost always the task that your team does most repetitively and most grudgingly. Map the steps: what data does it need, what systems does it touch, what decision does it make? That map is your agent design.\n\nAt Promogranade we've built production agents for SaaS companies, e-commerce brands, and professional services firms. If you have a process you'd like to automate — or you're not sure where to start — reach out to us at hello@promogranade.com. We'll tell you within one call whether agents are the right fit.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "geo-aeo-seo-2025-guide",
    title: "SEO Is Dead. Long Live GEO and AEO: How to Get Cited by ChatGPT and Perplexity",
    category: "SEO",
    categoryColor: "linear-gradient(135deg,#1a1a1a 0%,#3d0008 100%)",
    date: "June 2025",
    dateISO: "2025-06-05",
    read: "6 min",
    featured: true,
    excerpt:
      "Search is no longer a list of ten blue links. It's a generated answer — and if your content isn't structured to be cited by AI, you're invisible to a growing share of the market.",
    metaDescription:
      "Traditional SEO is being overtaken by GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization). Learn how to rank on ChatGPT, Perplexity, and Google AI Overviews in 2025.",
    keywords: [
      "GEO SEO 2025", "generative engine optimization", "answer engine optimization",
      "rank on ChatGPT", "Perplexity SEO", "Google AI Overview optimization",
      "AEO strategy", "SEO 2025", "AI search ranking",
    ],
    content: [
      {
        heading: "The Search Engine Is No Longer a Search Engine",
        body: `When someone types a question into Google today, they often see an AI-generated answer before they see a single link. On ChatGPT, Perplexity, and Claude, there are no links at all — just answers, with citations. The question that defines your visibility in 2025 is not \"do I rank on page one?\" but \"does the AI cite my content when a relevant question is asked?\"\n\nThis requires a different discipline: Generative Engine Optimization (GEO) for platforms like Perplexity and Google's AI Overviews, and Answer Engine Optimization (AEO) for conversational AI like ChatGPT and Claude. Both require producing content structured the way AI models retrieve and synthesize information — not the way PageRank evaluated links.`,
      },
      {
        heading: "How Generative AI Picks What to Cite",
        body: `AI models retrieve content in two ways: they reference it from training data (if your content was crawled before the model's cutoff), or they retrieve it in real time via search grounding (if the platform supports live web access, like Perplexity or Google AI Mode).\n\nFor training-data citations, the factors that matter most are: authority (do other authoritative sources link to you?), specificity (does your content directly answer a well-formed question?), and density (is the answer contained within one clean passage, or spread across five pages?). For real-time retrieval, technical SEO still matters — you need to be indexable, fast, and structured.`,
      },
      {
        heading: "The Five Structural Changes That Drive GEO Performance",
        body: `**1. Answer-first writing**: Lead every section with the direct answer. AI models extract the first cleanly-stated answer to a question and use it as the citation. The context can follow.\n\n**2. Question-format headings**: Rewrite your H2s and H3s as questions your customer would type. \"What is a RAG pipeline?\" outperforms \"RAG Pipeline Overview\" because it pattern-matches the query.\n\n**3. Concise, standalone passages**: Each paragraph should make one complete point. AI chunking algorithms split at paragraph breaks — a paragraph that assumes the reader has read the one before it will be extracted without its context and will read as incomplete.\n\n**4. Schema markup**: FAQ, HowTo, Article, and BreadcrumbList schemas signal to Google's parser what type of content each block is. Structured data dramatically increases the probability of an AI Overview snippet.\n\n**5. Topical authority over keyword density**: A site that thoroughly covers one topic outperforms a site that weakly covers many. Build ten deep, interlinked articles on your core topic before expanding.`,
      },
      {
        heading: "AEO: Getting Into ChatGPT's Answers",
        body: `ChatGPT's web-browsing and Bing integration means it can surface recent content — but the majority of its answers come from training. To appear in training data citations, you need content that was indexed, widely-read, and referenced by other authoritative sources before the training cutoff.\n\nFor real-time AEO on Bing/ChatGPT, the strategy converges with GEO: answer questions directly, structure content clearly, and build the domain authority that earns citations from adjacent authoritative sources.`,
      },
      {
        heading: "Measuring GEO and AEO Performance",
        body: `Traditional keyword rankings don't capture GEO/AEO performance. Supplement them with: manual spot-checks on Perplexity, ChatGPT, and Google AI Mode for your target queries; brand mention tracking (who is citing you?); and zero-click impression data from Google Search Console. If AI Overviews are triggering for your queries but not citing your content, that's the gap to close — and the content revision to prioritise.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "workflow-automation-business-growth",
    title: "Why Every Growing Business Needs Workflow Automation — And How to Start",
    category: "Automation",
    categoryColor: "linear-gradient(135deg,#e0142c 0%,#111 100%)",
    date: "May 2025",
    dateISO: "2025-05-15",
    read: "5 min",
    featured: true,
    excerpt:
      "Your team is spending 30% of their time on tasks a machine could do in seconds. Workflow automation isn't a luxury — it's the highest-ROI investment a growing business can make.",
    metaDescription:
      "Learn how workflow automation with n8n, Make.com, and Zapier can save your business 20+ hours per week. A practical guide to automating repetitive business processes and scaling without headcount.",
    keywords: [
      "workflow automation 2025", "n8n automation", "business process automation",
      "Make.com workflows", "Zapier alternatives", "automate business processes",
      "no-code automation", "business efficiency", "scale without hiring",
    ],
    content: [
      {
        heading: "The Hidden Cost of Manual Workflows",
        body: `Every time a team member manually copies data from one system to another, chases an email thread for an approval, or reformats a report that gets generated on the same schedule every week — that's time and money leaving your business.\n\nThe average knowledge worker spends 4.5 hours per week on tasks that could be automated. Across a team of ten, that's 45 hours — more than one full-time employee — dedicated to friction rather than value. Workflow automation reclaims that time and reinvests it where humans genuinely add value: decision-making, client relationships, and creative work.`,
      },
      {
        heading: "What Workflow Automation Actually Means in 2025",
        body: `Workflow automation connects the tools you already use — your CRM, email, project management, invoicing, messaging — and tells them how to talk to each other without a human in the middle.\n\nn8n gives you full control with self-hosting and custom nodes. Make.com (formerly Integromat) offers a powerful visual interface for complex branching logic. Zapier handles the simple, high-volume glue between 5,000+ apps. And for workflows that involve AI decisions — routing a support ticket, scoring a lead, summarising a document — custom integrations with Claude or GPT-4 plug directly into the pipeline.`,
      },
      {
        heading: "The Workflows That Deliver the Fastest ROI",
        body: `**Lead capture to CRM**: A form submission on your website fires a webhook, enriches the lead's data, scores it against your ICP, creates a deal in your CRM, and sends a personalised email — all before your team opens their laptop in the morning.\n\n**Invoice and payment workflows**: A deal closes in your CRM → an invoice is generated in Zoho Books → the client receives it → a follow-up reminder fires at 7 and 14 days if unpaid → payment confirmation triggers project kickoff in your PM tool.\n\n**Content distribution**: Publish a blog post → it's automatically shared to LinkedIn, Instagram, and your newsletter, with channel-appropriate copy written by an AI node in the workflow.\n\n**Internal reporting**: Every Monday at 8 AM, a workflow pulls data from your ad accounts, CRM, and analytics, formats it into a Google Sheet, and sends a Slack message with the key numbers highlighted.`,
      },
      {
        heading: "How to Identify What to Automate First",
        body: `The best automation candidates share three traits: they happen frequently (at least weekly), they follow a consistent pattern (the same input always triggers the same actions), and they're low-stakes enough that an error can be caught and corrected without major damage.\n\nSpend 20 minutes writing down every recurring task your team does that a 12-year-old could follow from a printed instruction sheet. That list is your automation backlog. Rank it by frequency × time-per-instance and start at the top.`,
      },
      {
        heading: "Building Automations That Last",
        body: `The most common automation failure is building a fragile pipeline that breaks the moment an upstream app changes its API or a field is renamed. Robust automations have error handling — they catch failures, notify the right person, and pause rather than silently corrupt data.\n\nAt Promogranade we build automation infrastructure that includes monitoring, alerts, and documentation so your team can maintain and extend it without our involvement. If you're ready to eliminate the manual glue in your business, reach out at hello@promogranade.com.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "nextjs-vs-wordpress-2025",
    title: "Next.js vs WordPress in 2025: Which Platform Will Actually Scale Your Business?",
    category: "Development",
    categoryColor: "linear-gradient(135deg,#111 0%,#e0142c 80%)",
    date: "May 2025",
    dateISO: "2025-05-02",
    read: "7 min",
    featured: false,
    excerpt:
      "Both platforms can power a successful business website. The decision comes down to your growth trajectory, technical team, and how much you value ownership vs convenience.",
    metaDescription:
      "Comprehensive Next.js vs WordPress comparison for business websites in 2025. Understand the performance, SEO, cost, and scalability differences to make the right choice for your business.",
    keywords: [
      "Next.js vs WordPress 2025", "best website platform 2025", "WordPress alternatives",
      "Next.js for business", "headless CMS 2025", "website platform comparison",
      "WordPress performance 2025", "custom web development",
    ],
    content: [
      {
        heading: "The Context That Changes Everything",
        body: `WordPress powers 43% of the web. Next.js powers the fastest-growing generation of digital products. Both are legitimate choices — but for very different types of businesses at very different stages.\n\nThe right question isn't \"which is better?\" but \"which is better for my specific situation right now?\" And the answer depends on five factors: team capability, content velocity, performance requirements, integration complexity, and growth trajectory.`,
      },
      {
        heading: "Where WordPress Still Wins",
        body: `WordPress remains the best choice when your team is non-technical and needs to manage content independently, when your budget is constrained and a template-based approach is sufficient, when your site is primarily editorial — lots of posts, pages, and media — and when you need to move quickly without engineering involvement.\n\nWith Elementor, Gutenberg, or a well-configured theme, a marketing team can build and launch a professional site in days. The plugin ecosystem (20,000+ options) means most integrations are a one-click install away. For a local business, a portfolio, or an early-stage startup's marketing site, WordPress is often the pragmatic choice.`,
      },
      {
        heading: "Where Next.js Outperforms",
        body: `Next.js shines in four scenarios:\n\n**Performance at scale**: Server-side rendering, static generation, and edge delivery mean Next.js sites consistently score 95+ on Core Web Vitals. WordPress sites, even heavily optimised ones, rarely sustain those scores under real-world conditions.\n\n**Complex integrations**: When your site needs to connect to a custom CRM, pull live product data from multiple sources, or render user-specific content, Next.js gives you the full power of Node.js and React without fighting against a CMS's constraints.\n\n**SaaS and app-like experiences**: If your \"website\" includes a customer dashboard, an onboarding flow, or a real-time feature, Next.js is the natural choice — it's an application framework, not a content management system.\n\n**Long-term cost of ownership**: A well-built Next.js codebase is cheaper to maintain than a heavily-pluginned WordPress installation that needs constant security updates, plugin conflicts resolved, and database optimisations.`,
      },
      {
        heading: "The SEO Reality in 2025",
        body: `WordPress and Next.js are equally capable of excellent SEO — but they get there differently. WordPress leans on plugins (Yoast, Rank Math) that abstract the meta-tag, sitemap, and schema work. Next.js requires you to implement these explicitly, which means higher upfront effort but more control and no dependency on plugin authors maintaining compatibility.\n\nCore Web Vitals — which Google uses as a ranking signal — tend to favour Next.js when both platforms are built thoughtfully. LCP, CLS, and FID scores are consistently better on statically-generated or server-rendered Next.js pages than on WordPress pages serving equivalent content.`,
      },
      {
        heading: "The Decision Framework",
        body: `Use WordPress if: you don't have a development team, you need to launch in weeks, your site is primarily content-driven, and your traffic is under 100k monthly visitors.\n\nUse Next.js if: performance is a competitive differentiator, you need custom application logic, your team includes developers, or you're building something that will evolve significantly over the next two years.\n\nUse Shopify if: you're primarily an e-commerce business and you need the full commerce stack with minimal custom development.\n\nAt Promogranade we build all three — and we help clients choose the right platform before writing a line of code. The 30-minute scoping conversation that happens before a project almost always saves months of rework.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "rag-pipelines-business-guide",
    title: "RAG Pipelines Explained: Give Your AI Access to Your Company's Entire Knowledge Base",
    category: "AI",
    categoryColor: "linear-gradient(135deg,#e0142c 0%,#4a0010 100%)",
    date: "April 2025",
    dateISO: "2025-04-18",
    read: "9 min",
    featured: false,
    excerpt:
      "A base language model knows nothing about your products, your customers, or your processes. RAG pipelines fix that — here's how they work and when to use them.",
    metaDescription:
      "Complete guide to RAG (Retrieval-Augmented Generation) pipelines for businesses in 2025. Learn how to build AI systems that access your proprietary data, documents, and knowledge base accurately.",
    keywords: [
      "RAG pipeline 2025", "retrieval augmented generation", "AI knowledge base",
      "custom AI system", "business AI", "vector database", "Pinecone RAG",
      "enterprise AI search", "AI document retrieval",
    ],
    content: [
      {
        heading: "The Problem With Out-of-the-Box AI",
        body: `Every foundation model — Claude, GPT-4, Gemini — was trained on public internet data. It knows about the world up to its training cutoff. It knows nothing about your pricing, your client contracts, your internal processes, or your product roadmap.\n\nThis is fine for general tasks. It's a fundamental limitation for anything where accuracy about your specific business matters. A customer support bot that hallucinates your return policy doesn't save time — it creates liability.`,
      },
      {
        heading: "What RAG Actually Does",
        body: `Retrieval-Augmented Generation (RAG) solves the knowledge problem without retraining the model. The approach: before answering a question, the system searches your proprietary documents for the most relevant passages, injects those passages into the model's context window, and then asks the model to answer based only on what was retrieved.\n\nThe model's general reasoning capability remains intact. But its answers are now grounded in your data, not hallucinated from thin air. The retrieval step is what makes RAG fundamentally different from prompt-stuffing: instead of hardcoding context, you retrieve the specific information relevant to each specific query.`,
      },
      {
        heading: "The Technical Architecture",
        body: `A production RAG pipeline has four stages:\n\n**1. Ingestion**: Your documents (PDFs, Word files, Notion pages, Confluence articles, web pages) are parsed, cleaned, and split into chunks of ~300-500 tokens.\n\n**2. Embedding**: Each chunk is passed through an embedding model (OpenAI's text-embedding-3-large, Cohere's embed-v3, or open-source alternatives) which converts it into a vector — a list of numbers that represents its semantic meaning.\n\n**3. Storage**: The vectors are stored in a vector database (Pinecone, Supabase pgvector, Weaviate, Qdrant). Each vector is linked to the original text chunk and metadata (source document, date, section).\n\n**4. Retrieval and generation**: At query time, the user's question is embedded in the same vector space. The system retrieves the top-k most semantically similar chunks, injects them into the prompt with the question, and the model generates a grounded answer.`,
      },
      {
        heading: "Advanced Patterns That Separate Good RAG From Great RAG",
        body: `Basic RAG — embed, retrieve, generate — produces unreliable results on complex queries. Production-grade RAG adds several layers:\n\n**Hybrid search**: Combine vector similarity (semantic) with BM25 keyword search. Semantic search finds conceptually relevant passages; keyword search finds exact term matches. Hybrid retrieval consistently outperforms either approach alone.\n\n**Re-ranking**: After retrieving the top 20 candidates, a cross-encoder re-ranks them by relevance to the specific query. This dramatically reduces the noise that reaches the model.\n\n**HyDE (Hypothetical Document Embedding)**: Generate a hypothetical answer to the query first, embed that, and retrieve based on the hypothetical. Counterintuitively, this often retrieves more relevant passages than embedding the raw question.\n\n**Metadata filtering**: Filter retrieved chunks by date, source, document type, or any other metadata before they reach the model. This prevents outdated information from contaminating the context.`,
      },
      {
        heading: "When RAG Is — and Isn't — the Right Approach",
        body: `RAG is right when: your knowledge base changes frequently (so fine-tuning would be constantly outdated), you need to cite sources, you need accurate retrieval of specific facts or figures, and your documents are too numerous to fit in a context window.\n\nRAG is not right when: the task requires the model to learn a new reasoning pattern (use fine-tuning), the knowledge base is small enough to fit entirely in context (use a system prompt), or the queries are so diverse that retrieval quality will be inconsistent.\n\nIf you're considering a RAG implementation for your business — customer support, internal knowledge search, document Q&A — we'd be happy to scope it with you.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "meta-ads-vs-google-ads-2025",
    title: "Meta Ads vs Google Ads in 2025: Where Your Marketing Budget Will Work Harder",
    category: "Marketing",
    categoryColor: "linear-gradient(135deg,#e0142c 0%,#8b0000 100%)",
    date: "April 2025",
    dateISO: "2025-04-05",
    read: "6 min",
    featured: false,
    excerpt:
      "Both platforms have delivered exceptional results for specific business models. The mistake is treating them as interchangeable. Here's the framework for deciding where to put your budget.",
    metaDescription:
      "Meta Ads vs Google Ads in 2025: a practical comparison of ROAS, targeting, creative requirements, and best use cases. Learn which advertising platform will deliver better ROI for your business.",
    keywords: [
      "Meta Ads vs Google Ads 2025", "Facebook Ads 2025", "Google Ads ROAS",
      "digital advertising ROI", "best ad platform 2025", "performance marketing",
      "social ads vs search ads", "Meta advertising strategy", "Google Ads strategy",
    ],
    content: [
      {
        heading: "The Fundamental Difference You Need to Understand",
        body: `Google Ads captures demand. Meta Ads creates demand. This one distinction should drive most of your allocation decisions.\n\nWhen someone searches \"buy accounting software for small business\", they've already decided they want accounting software. Google puts your ad in front of a person who is actively looking for your category. Your job is to convince them to choose you over the alternatives.\n\nMeta shows your ad to people who were not thinking about accounting software thirty seconds ago. You're interrupting them. Your job is first to make them care about the problem, then to offer your solution. These are fundamentally different creative and messaging challenges.`,
      },
      {
        heading: "When Google Ads Wins",
        body: `Google Search Ads deliver the best results when: your category has active, measurable search demand; your product or service has a short consideration cycle (people search, they buy quickly); your targeting can be precise through keyword selection; and your margins support a cost-per-click model.\n\nHigh-performing Google categories in 2025: legal services, home services (plumbing, HVAC, pest control), SaaS with clear category keywords, local professional services, and high-intent e-commerce queries.\n\nGoogle's AI Max campaigns have significantly changed performance in 2025 — they use broad match with audience signals and smart bidding to find conversions that exact-match keyword campaigns miss. For most advertisers who haven't tested AI Max, it's the highest-impact change available right now.`,
      },
      {
        heading: "When Meta Ads Win",
        body: `Meta Ads outperform when: your product creates an emotional response (fashion, fitness, lifestyle, food); your target audience is defined by demographic or interest signals rather than search intent; you're launching a new product category that people don't yet know they want; or you need to reach large volumes of people at a lower cost-per-impression.\n\nMeta's Advantage+ Shopping campaigns have become the default starting point for e-commerce in 2025. Feed them creative, let the algorithm optimise audience and placement, and spend your time on what it can't automate: the creative itself.\n\nFor B2B, LinkedIn often outperforms Meta — but Meta can work well for B2B if you're willing to target by job title and industry and accept higher CPMs in exchange for intent-qualified audiences.`,
      },
      {
        heading: "The Budget Allocation Framework",
        body: `For most businesses, the answer isn't either/or — it's sequencing and proportion.\n\nIf you're early-stage with limited budget: Start with Google Search for bottom-funnel, high-intent queries. Prove the unit economics first. Add Meta to build awareness and retarget your site visitors once you have data.\n\nIf you're scaling with proven unit economics: Roughly 60/40 toward whichever platform is your primary converter, with the other platform doing awareness and retargeting. Test new creatives on Meta; harvest search intent on Google.\n\nIf you're a large brand building for the long term: Treat Meta as your brand channel (broad reach, storytelling, video) and Google as your performance channel (direct response, bottom-funnel). Hold both accountable to different metrics.`,
      },
      {
        heading: "The Creative Reality Nobody Talks About Enough",
        body: `The platform you choose matters less than the creative you run on it. The #1 reason Meta campaigns fail is bad creative — not wrong audience, not wrong bid strategy, bad creative. The #1 reason Google campaigns fail is wrong keyword intent or weak landing pages.\n\nBefore debating platform allocation, audit your creative and landing pages. The best-allocated budget in the world won't save an ad that stops the scroll for the wrong reason or a landing page that fails to convert.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "social-media-marketing-2025-playbook",
    title: "Social Media Marketing in 2025: What Actually Works (And What's Just Noise)",
    category: "Marketing",
    categoryColor: "linear-gradient(135deg,#111 0%,#e0142c 100%)",
    date: "March 2025",
    dateISO: "2025-03-20",
    read: "7 min",
    featured: false,
    excerpt:
      "Posting consistently and hoping for the best is not a strategy. Here's how high-performing brands approach social media in 2025 — and what separates them from the noise.",
    metaDescription:
      "Complete social media marketing guide for 2025. Learn platform-specific strategies for Instagram, LinkedIn, and YouTube that drive real business results, not just vanity metrics.",
    keywords: [
      "social media marketing 2025", "Instagram marketing strategy",
      "LinkedIn B2B marketing", "YouTube marketing 2025", "social media strategy",
      "content marketing 2025", "social media ROI", "organic social media growth",
    ],
    content: [
      {
        heading: "Why Most Social Media Strategies Fail",
        body: `Most brands approach social media as a broadcasting channel — they publish what they want to say, in the format they find easiest to produce, on the schedule that fits their content calendar. Then they wonder why engagement is declining and follower growth has plateaued.\n\nPlatform algorithms are not interested in your content calendar. They're optimising for the time users spend on the platform. If your content makes people stop, watch, and engage — the algorithm amplifies it. If it doesn't, it withers. The entire game is understanding what your specific audience finds worth pausing for, and producing that consistently.`,
      },
      {
        heading: "Platform-Specific Reality in 2025",
        body: `**Instagram**: Reels continue to dominate reach, but the bar has risen significantly. Static carousels with genuine education or strong visual storytelling still perform well in the feed. Stories drive community and retention rather than reach. The brands winning on Instagram in 2025 are doing one of two things: obsessively consistent visual identity, or fast-moving reactive content that shows personality.\n\n**LinkedIn**: The platform has undergone a significant shift toward creator content — individuals outperform company pages by a factor of ten on most metrics. If you're B2B, your best LinkedIn strategy is empowering your team (especially your founders and senior practitioners) to build personal audiences. Document-style posts and short-form video are currently the highest-performing formats.\n\n**YouTube**: YouTube is the one platform where long-form content still wins — but only if the content genuinely delivers on its title. Shorts have become a meaningful discovery channel, and many channels now use a hub-and-spoke model: Shorts drive awareness, long-form content converts viewers into subscribers.`,
      },
      {
        heading: "The Content Architecture That Actually Drives Results",
        body: `High-performing social media programs in 2025 are built around a content architecture, not a posting schedule.\n\nAt the top is your cornerstone content: one piece of deeply researched, high-value content per month (a long YouTube video, a detailed LinkedIn document, a comprehensive Instagram carousel). This establishes credibility and attracts the algorithm's long-term trust.\n\nBelow that are distribution pieces: shorter clips, quotes, and reformatted highlights from the cornerstone content, distributed across channels throughout the month.\n\nBelow that are reactive pieces: timely content responding to industry news, trends, or audience questions. These capture short-term reach and show the algorithm that your account is active and engaged.`,
      },
      {
        heading: "Community Over Audience",
        body: `The metric that matters most in 2025 is not followers or reach — it's the ratio of replies and shares to total impressions. These signals indicate that your content is sparking conversation and being passed between people. Platforms weight these signals heavily because they indicate genuine value delivery.\n\nBuilding community means: responding to every comment in the first hour, asking genuine questions in your posts, featuring your audience in your content, and being consistently present rather than publishing and disappearing.`,
      },
      {
        heading: "Measurement: What to Track and What to Ignore",
        body: `Ignore: impressions, reach, likes, follower count. These are vanity metrics that don't correlate with business outcomes.\n\nTrack: saves per post (indicates utility), shares per post (indicates resonance), link clicks and conversions (indicates commercial intent), direct messages from content (indicates warm leads), and comments per post (indicates community strength).\n\nAt Promogranade, we run social media programs that tie every content decision to a metric that connects to business outcomes. If you want a social strategy that drives pipeline, not just performance reports, let's talk.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "shopify-vs-custom-ecommerce-2025",
    title: "Shopify vs Custom Development: The E-Commerce Decision That Changes Your Ceiling",
    category: "Development",
    categoryColor: "linear-gradient(135deg,#0f0f0f 0%,#e0142c 100%)",
    date: "June 2025",
    dateISO: "2025-06-10",
    read: "6 min",
    featured: true,
    excerpt:
      "Shopify can take you from zero to your first million. It's what comes after that tells the real story. Here's exactly when to build custom and when Shopify still wins.",
    metaDescription:
      "Shopify vs custom e-commerce development in 2025: an honest comparison of cost, speed, flexibility, and long-term scalability to help you pick the right platform for your business.",
    keywords: [
      "Shopify vs custom development", "e-commerce platform 2025", "headless commerce",
      "Shopify limitations", "custom e-commerce build", "Shopify Hydrogen", "WooCommerce alternative",
    ],
    content: [
      {
        heading: "The Real Question Isn't Platform — It's Ceiling",
        body: `Every e-commerce business hits a ceiling at some point. The platform you choose determines where that ceiling is and how expensive it is to break through it.\n\nShopify is a remarkable product. It solves a genuinely hard problem — payments, inventory, checkout, tax, shipping — and makes it accessible to non-technical founders. The trade-off is that Shopify's ceiling is defined by Shopify's priorities, not yours. When your business needs something outside those priorities, you're either waiting for an app or working around the constraint.`,
      },
      {
        heading: "Where Shopify Is the Correct Answer",
        body: `Shopify is the right choice for most e-commerce businesses at most stages. It wins when: your catalogue is standard (products with variants, not complex configurators), you're a team of one to ten and can't afford a dedicated engineering resource, you need to launch fast and prove demand before investing in infrastructure, and your gross margins support Shopify's transaction fees.\n\nShopify Hydrogen — Shopify's React-based headless framework — has also closed much of the performance gap with custom builds. A Hydrogen storefront with Shopify as the backend gives you excellent Core Web Vitals, a headless architecture, and the full Shopify commerce stack beneath it.`,
      },
      {
        heading: "When Custom Development Changes the Equation",
        body: `Four scenarios make custom development not just viable but necessary:\n\n**Complex product configuration**: Bespoke furniture, custom-fitted clothing, professional equipment with interdependent options. Shopify's variant system breaks at ~100 variants per product. A custom configurator, connected to a real-time inventory or manufacturing API, handles unlimited complexity.\n\n**Multi-channel inventory**: If you're selling across a retail network, wholesale partners, and direct-to-consumer simultaneously, with a single inventory pool, Shopify's native tools and even its best third-party apps reach their limits. A custom OMS and a headless storefront connected to it is the right architecture.\n\n**Proprietary checkout logic**: Subscription bundles with complex upgrade/downgrade paths, B2B net terms and purchase orders, or region-specific checkout flows with local payment methods often require logic that Shopify's checkout extensibility can't support without significant workarounds.\n\n**Margin pressure at scale**: At $10M+ GMV, Shopify's transaction fees and app subscriptions add up to a meaningful cost. The break-even on a custom platform moves closer as revenue grows.`,
      },
      {
        heading: "The Architecture We Recommend for Most Growing Brands",
        body: `For brands doing £500k-£5M GMV who want flexibility without a full custom build, the sweet spot is Shopify as the commerce engine (checkout, payments, inventory) with a Next.js headless frontend. You get Shopify's conversion-optimised checkout and payment reliability, combined with a custom frontend that lets you implement any design, animation, or UX pattern without constraint.\n\nThis architecture also future-proofs the migration: if you outgrow Shopify's backend, the frontend stays as-is and you swap the data source.`,
      },
      {
        heading: "Making the Decision",
        body: `The question to ask is not "which platform is better?" but "what does my business need to do in the next 18 months that my current platform can't support?" If you're operating inside Shopify's capabilities, stay on Shopify and invest in creative and marketing instead of engineering. If you're actively fighting the platform to do what your business needs, that friction compounds — and the right time to rebuild is before the pain becomes critical.\n\nAt Promogranade we build both. If you're not sure which path is right for your next stage, a 30-minute conversation with our team will tell you.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "ai-content-strategy-2025",
    title: "AI Content at Scale: How Smart Brands Are Publishing 10x More Without Losing Their Voice",
    category: "AI",
    categoryColor: "linear-gradient(135deg,#e0142c 0%,#0a0a0a 100%)",
    date: "June 2025",
    dateISO: "2025-06-14",
    read: "5 min",
    featured: true,
    excerpt:
      "The brands winning at content in 2025 aren't writing more — they're building smarter pipelines. Here's how to use AI to scale content production without the output sounding like everyone else.",
    metaDescription:
      "How to use AI tools like Claude and GPT-4 to scale content marketing in 2025 while preserving brand voice. A practical guide to AI content pipelines for marketing teams.",
    keywords: [
      "AI content marketing 2025", "scale content with AI", "AI writing tools",
      "Claude content strategy", "brand voice AI", "content pipeline automation",
      "AI blog writing", "content marketing strategy 2025",
    ],
    content: [
      {
        heading: "Why Most AI Content Looks the Same",
        body: `Open any AI-written article from 2024 and you can recognise it within two sentences. The tells are consistent: an opening that restates the title, a numbered list where none was needed, a closing paragraph that summarises everything already said, and zero specific opinions or data that couldn't have been generated from the same three Wikipedia articles.\n\nThis isn't a capability limitation — it's a prompt limitation. Untrained use of AI writing tools produces generic output because generic prompts produce generic outputs. The brands doing this well are not using AI differently; they're using it with far more specificity, constraint, and editorial process around it.`,
      },
      {
        heading: "The Three Layers of a Good AI Content Pipeline",
        body: `**Layer 1 — The voice document**: Before any AI writes anything, it needs a detailed brief on your brand's voice. Not "professional but approachable" — every brand says that. Specific: sentences start with the subject, never with participle clauses. We never use the word "leverage." We cite specific numbers when we have them and say "we don't have data on this" when we don't. We take positions. The more specific the constraint document, the more distinctive the output.\n\n**Layer 2 — The research input**: AI doesn't know what you know. Feed it your proprietary data, your client examples, your specific methodology, and your opinions before asking it to write. The output becomes distinctive because the input is distinctive.\n\n**Layer 3 — Human editorial**: AI drafts at speed; humans add judgment. The pipeline is AI for first draft and structure, human editor for voice, specificity, and positions that require genuine expertise. The ratio depends on content type: for SEO-driven informational content, 70% AI / 30% human. For thought leadership, 30% AI / 70% human.`,
      },
      {
        heading: "The Content Types That AI Handles Best",
        body: `AI is significantly better than average at certain content types and significantly worse at others.\n\nBest: SEO-optimised informational content (how-to guides, comparison articles, FAQ pages), content repurposing (turning a long article into LinkedIn posts, email newsletters, and social captions), structured data extraction (turning transcripts or research into structured summaries), and first-draft generation when given detailed outlines.\n\nWorst: Genuine thought leadership that requires a defensible position based on experience, content that requires current real-world examples, anything that depends on relationships or institutional knowledge, and long-form narrative writing that needs a consistent authorial voice across thousands of words.`,
      },
      {
        heading: "The Measurement Framework That Keeps Quality Honest",
        body: `AI content pipelines drift toward mediocrity without measurement. Track two things: editorial quality score (does every published piece pass a checklist of voice, specificity, and value standards?) and downstream performance (do AI-assisted pieces perform as well as fully human-written pieces on the metrics that matter — time on page, backlinks, leads generated?).\n\nIf AI-assisted pieces underperform on any metric, that's the signal to increase the human editorial layer on that content type. The goal is output that performs; AI is a means to that end, not the end itself.`,
      },
      {
        heading: "Building Your Own Pipeline",
        body: `The practical starting point: take your three best-performing pieces of content and use them to train your AI voice document. Identify every stylistic choice in those pieces — sentence length patterns, how you handle data, your stance on common industry debates, your specific vocabulary. Build that into a system prompt.\n\nThen run three AI-assisted pieces through your normal editorial process and measure how long the editorial round takes. If it's taking longer than writing from scratch, the research input layer needs more work. If it's flowing fast and the quality is holding, you've found your pipeline.\n\nAt Promogranade we build content pipelines for our clients that include AI drafting, brand-voice prompts, and performance measurement built in. If you want to scale your content without scaling your headcount, let's talk.`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  {
    slug: "building-saas-product-2025",
    title: "Building a SaaS Product in 2025: The Architecture, Stack, and Decisions That Matter",
    category: "Engineering",
    categoryColor: "linear-gradient(135deg,#1a1a1a 0%,#3d0008 80%)",
    date: "March 2025",
    dateISO: "2025-03-05",
    read: "10 min",
    featured: false,
    excerpt:
      "The decisions you make in the first sprint of a SaaS product determine whether you can move fast two years later or whether you're firefighting technical debt instead of shipping features.",
    metaDescription:
      "Complete technical guide to building a SaaS product in 2025. Covers architecture decisions, recommended tech stack, database design, authentication, billing, and scaling strategies.",
    keywords: [
      "build SaaS product 2025", "SaaS development stack", "custom web application",
      "SaaS architecture 2025", "Next.js SaaS", "SaaS tech stack",
      "Supabase SaaS", "SaaS boilerplate 2025", "custom software development",
    ],
    content: [
      {
        heading: "The Decisions That Compound",
        body: `Building a SaaS product is not primarily a technical challenge — it's a decision-making challenge. The choices you make in the first few weeks about data architecture, authentication, multi-tenancy, and infrastructure will compound over the life of the product. Good decisions give you room to move. Bad decisions become the reason you're rewriting your auth system eighteen months in while your competitors are shipping new features.\n\nThis guide covers the decisions that matter most — the ones where a wrong call is expensive to reverse.`,
      },
      {
        heading: "The 2025 Stack That Lets You Move Fast Without Breaking",
        body: `The stack that consistently delivers the best combination of speed-to-market and long-term maintainability in 2025:\n\n**Frontend**: Next.js 15 (App Router) with TypeScript. The App Router's Server Components dramatically reduce client-side JavaScript. TypeScript catches errors that cost a week to debug at runtime.\n\n**Backend**: Next.js API Routes for simple endpoints, Hono or Express for complex API layers. For complex event-driven logic, consider Inngest or Trigger.dev rather than a roll-your-own queue.\n\n**Database**: Supabase (Postgres + Auth + Storage + Realtime in one service) for most SaaS use cases. It eliminates four separate infrastructure decisions and lets two engineers build what used to need a five-person team.\n\n**Payments**: Stripe. Not because of brand recognition but because their webhook reliability and subscription management API are genuinely best-in-class.\n\n**Deployment**: Vercel for the frontend; Railway or Render for any long-running services. Both abstract the infrastructure complexity that used to require a DevOps engineer.`,
      },
      {
        heading: "Multi-Tenancy: The Decision That Haunts You If You Get It Wrong",
        body: `Multi-tenancy — the mechanism by which multiple customers share your infrastructure while keeping their data isolated — is the most consequential early architecture decision in SaaS.\n\nYou have three options:\n\n**Schema-per-tenant**: Each customer gets their own database schema. Maximum isolation, complex migrations, higher infrastructure cost at scale.\n\n**Database-per-tenant**: Maximum isolation and simplest queries, but impractical above a few hundred customers due to connection limits and cost.\n\n**Row-level security (RLS)**: All tenants share a schema; a tenant_id column on every table, enforced by Postgres Row Level Security policies. This is the right default for most SaaS products. Supabase implements RLS natively and makes it straightforward to enforce at the database level rather than the application level.\n\nChoose RLS with Supabase unless you're in a regulated industry (healthcare, finance) that requires physical data isolation.`,
      },
      {
        heading: "Authentication: Do Not Build It Yourself",
        body: `Authentication is the most-exploited attack surface in SaaS applications. It's also a fully solved problem with off-the-shelf solutions that are more secure than anything a small team will build from scratch.\n\nSupabase Auth handles: email/password, magic links, OAuth (Google, GitHub, LinkedIn, etc.), MFA, session management, and Row Level Security integration. It takes a day to implement and handles security updates automatically.\n\nIf you need enterprise SSO (SAML, SCIM, directory sync), add WorkOS or Clerk on top. Don't delay launching to build SAML support — charge for it later and add it when a customer asks.`,
      },
      {
        heading: "Launching, Iterating, and Knowing When to Refactor",
        body: `The biggest mistake early-stage SaaS companies make is over-engineering before they've validated that anyone will pay for the product. The second biggest mistake is under-engineering to the point where iteration becomes impossible once they've proven the market.\n\nThe balance: be opinionated about your data model and multi-tenancy from day one (these are expensive to change), and be pragmatic about everything else. Use managed services. Don't build what you can buy. Refactor when a specific piece of the system is actively slowing you down — not preventively.\n\nAt Promogranade we've built SaaS products from zero to their first hundred paying customers and from a hundred to their first enterprise deal. The architecture advice is always the same: start simpler than you think you should, and move fast enough that the right refactor presents itself naturally.`,
      },
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────

/** The five most recent featured posts for the home page preview */
export const featuredPosts = posts.filter(p => p.featured).slice(0, 5);

/** All posts sorted newest first */
export const allPosts = [...posts].sort(
  (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

/** Category colour map for badges */
export const categoryColors: Record<string, string> = {
  AI: "#e0142c",
  SEO: "#c0392b",
  Automation: "#e0142c",
  Development: "#e0142c",
  Marketing: "#e0142c",
  Engineering: "#e0142c",
};
