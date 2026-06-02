import { NextRequest } from "next/server";

/* ─────────────────────────────────────────────────────────
   Rule-based knowledge base — always works, zero API key.
   If ANTHROPIC_API_KEY is set, Claude answers anything
   that doesn't match a rule.
───────────────────────────────────────────────────────── */

const WA = "https://wa.me/919511784952?text=Hi%20Promogranade%2C%20I%27d%20like%20to%20talk%20about%20a%20project.";

type Rule = { match: string[]; reply: string };

const RULES: Rule[] = [
  /* ── Greetings ── */
  {
    match: ["hello", "hi", "hey", "hiya", "howdy", "good morning", "good evening", "sup", "what's up"],
    reply: "Hey! 👋 Great to have you here. I'm Promo, Promogranade's assistant. You can ask me about our services, team, pricing, or how to get started — or just pick one of the suggestions below.",
  },

  /* ── What is Promogranade / About ── */
  {
    match: ["what is promogranade", "who is promogranade", "about promogranade", "about you", "who are you", "tell me about", "what do you do", "who made this", "company"],
    reply: "Promogranade is a premium full-service digital agency — a senior team of designers, engineers, and growth marketers. We build web applications, ship AI automations, and run growth engines for ambitious businesses. Founded by Abhinandan Jain, we treat every launch like our own product and own the outcome end to end.",
  },

  /* ── All services ── */
  {
    match: ["services", "what do you offer", "offerings", "what can you do", "capabilities", "what you build", "work you do"],
    reply: `We offer 8 focused services:\n\n1. 🌐 Website Development — WordPress, Shopify, Next.js\n2. ⚙️ Custom Applications — SaaS, ERP, Dashboards\n3. 🤖 AI Agentic Development — LangGraph, Claude, Multi-agent\n4. 📈 SEO / GEO / AEO — Search + AI engine optimisation\n5. 📱 Social Media Marketing — Instagram, LinkedIn, YouTube\n6. 📣 Meta & Google Ads — Performance campaigns\n7. 🔄 Workflow Automation — n8n, Make.com, Zapier\n8. 🧠 Custom AI Systems — RAG pipelines, fine-tuning, LLMs\n\nWant details on any specific service?`,
  },

  /* ── Website / Web dev ── */
  {
    match: ["website", "web development", "wordpress", "shopify", "next.js", "landing page", "web design", "web app", "webpage"],
    reply: "Our Website Development service covers everything from conversion-focused WordPress and Shopify stores to fully custom Next.js builds. Every site we deliver is pixel-perfect, lightning-fast, and built to grow. We handle design, development, and launch. Interested? Drop us a message at hello@promogranade.com.",
  },

  /* ── Custom apps / SaaS ── */
  {
    match: ["custom app", "saas", "erp", "dashboard", "application", "platform", "software", "web app", "bespoke"],
    reply: "We engineer bespoke web apps, SaaS platforms, ERP systems, and agentic dashboards — built exactly to your specification. From architecture to deployment, we own the full stack. Every build is production-grade, scalable, and maintainable.",
  },

  /* ── AI / Agents ── */
  {
    match: ["ai", "artificial intelligence", "agent", "langgraph", "claude", "multi-agent", "llm", "chatbot", "automation ai", "intelligent"],
    reply: "Our AI Agentic Development team builds intelligent agents that plan, act, and self-correct — from single-model tools to full multi-agent orchestration using LangGraph, Claude API, and custom frameworks. We also build Custom AI Systems: RAG pipelines, fine-tuned models, vector databases, and production inference layers.",
  },

  /* ── SEO ── */
  {
    match: ["seo", "geo", "aeo", "search engine", "google ranking", "organic", "rank", "optimisation", "optimization"],
    reply: "Our SEO / GEO / AEO service gets you found by people and AI alike. We cover traditional search optimisation, generative engine optimisation (GEO for ChatGPT/Gemini), and answer engine optimisation (AEO for voice/featured snippets). Results compound month over month.",
  },

  /* ── Social media ── */
  {
    match: ["social media", "instagram", "linkedin", "youtube", "content", "community", "social", "tiktok"],
    reply: "Our Social Media Marketing team handles content strategy, creative production, and community management across every platform that matters — Instagram, LinkedIn, YouTube, and more. We grow audiences that convert.",
  },

  /* ── Ads / Performance ── */
  {
    match: ["ads", "meta", "facebook", "google ads", "paid", "ppc", "performance", "campaign", "roas", "advertising"],
    reply: "We run performance campaigns on Meta (Facebook/Instagram) and Google with sharp audience targeting, rigorous A/B testing, and spend that scales with results. Our focus is always ROAS — we don't just run ads, we optimise for revenue.",
  },

  /* ── Workflow automation ── */
  {
    match: ["workflow", "automation", "n8n", "make.com", "zapier", "integrate", "automate", "manual work", "no-code"],
    reply: "Our Workflow Automation service uses n8n, Make.com, Zapier, and custom integrations to eliminate manual work from your business — running 24/7 without supervision. From CRM automations to complex multi-step pipelines, we build it and maintain it.",
  },

  /* ── Pricing ── */
  {
    match: ["price", "pricing", "cost", "how much", "rate", "budget", "fee", "charge", "quote", "estimate"],
    reply: "We price per project rather than hourly — this keeps us focused on outcomes, not hours. Pricing depends on scope, complexity, and timeline. The best next step is a free scoping call where we understand your needs and give you a clear quote. Email us at hello@promogranade.com or WhatsApp +91 95117 84952.",
  },

  /* ── Timeline / how long ── */
  {
    match: ["how long", "timeline", "duration", "time", "deadline", "when", "turnaround", "delivery"],
    reply: "Timelines vary by project: a landing page can be live in 1–2 weeks; a full SaaS or AI system typically takes 6–12 weeks. We give you a clear timeline after the scoping call and stick to it. Want to discuss your project? Reach us at hello@promogranade.com.",
  },

  /* ── Start a project / get started ── */
  {
    match: ["start", "get started", "begin", "kick off", "hire", "work together", "collaborate", "project", "engage", "onboard"],
    reply: `Starting is simple — just reach out:\n\n📧 Email: hello@promogranade.com\n💬 WhatsApp: +91 95117 84952\n\nWe reply within one business day. Expect a few questions before a quote — we scope properly before we commit. Available Mon–Sat, 10 AM–8 PM IST.`,
  },

  /* ── Contact ── */
  {
    match: ["contact", "reach", "email", "whatsapp", "phone", "call", "message", "get in touch", "talk to", "speak"],
    reply: `Here's how to reach us:\n\n📧 Email: hello@promogranade.com\n💬 WhatsApp: +91 95117 84952\n📸 Instagram: @promogranade\n💼 LinkedIn: Abhinandan Jain\n\nAvailable Monday to Saturday, 10 AM – 8 PM IST. We reply to every message.`,
  },

  /* ── Founder / team ── */
  {
    match: ["founder", "ceo", "abhinandan", "jain", "team", "who runs", "behind", "people", "staff"],
    reply: "Promogranade was founded by Abhinandan Jain. The team is a tight-knit group of senior designers, engineers, and marketers — no junior handoffs. You work directly with the people building your product. You can connect with Abhinandan on LinkedIn at linkedin.com/in/abhinandanjain-dubai.",
  },

  /* ── Location / where ── */
  {
    match: ["location", "where", "based", "city", "country", "office", "india", "remote", "dubai"],
    reply: "Promogranade works remotely and serves clients globally. The team is based in India and available Mon–Sat, 10 AM–8 PM IST. We've worked with clients across the UK, UAE, US, and India.",
  },

  /* ── Technologies / stack ── */
  {
    match: ["technology", "tech stack", "tools", "framework", "react", "typescript", "python", "database"],
    reply: "Our tech stack includes Next.js, React, TypeScript, Node.js, Python, PostgreSQL, Supabase, and Vercel for web. For AI, we use LangGraph, Claude API, OpenAI, RAG pipelines, and vector databases. For automations: n8n, Make.com, and Zapier.",
  },

  /* ── Testimonials / portfolio ── */
  {
    match: ["portfolio", "work", "case study", "example", "previous", "client", "testimonial", "past"],
    reply: "We've built products across industries — SaaS platforms, e-commerce stores, AI-powered tools, and growth campaigns. Head over to the About page for our story and team, or Services for a full breakdown of what we build. Want to discuss your specific use case? Email us at hello@promogranade.com.",
  },

  /* ── Thanks / bye ── */
  {
    match: ["thank", "thanks", "cheers", "bye", "goodbye", "great", "perfect", "awesome", "helpful"],
    reply: "Glad I could help! 😊 If you're ready to get started or have more questions, we're always reachable at hello@promogranade.com or WhatsApp +91 95117 84952. Talk soon!",
  },
];

/* ── Intent matcher ── */
function matchRule(text: string): string | null {
  const lower = text.toLowerCase();
  for (const rule of RULES) {
    if (rule.match.some((kw) => lower.includes(kw))) return rule.reply;
  }
  return null;
}

/* ── Claude system prompt (used only when API key is present) ── */
const SYSTEM = `You are Promo, the AI assistant for Promogranade — a premium full-service digital agency.

COMPANY: Senior team of designers, engineers, and marketers. Founded by Abhinandan Jain.

SERVICES: Website Development (WordPress/Shopify/Next.js), Custom Applications (SaaS/ERP), AI Agentic Development (LangGraph/Claude), SEO/GEO/AEO, Social Media Marketing, Meta & Google Ads, Workflow Automation (n8n/Make.com/Zapier), Custom AI Systems (RAG/fine-tuning).

CONTACT: hello@promogranade.com | WhatsApp +91 95117 84952 | Mon–Sat 10AM–8PM IST | LinkedIn: abhinandanjain-dubai | Instagram: @promogranade.

RULES: Be warm and concise (2–3 sentences). For pricing say "contact us for a free scoping call". Never invent facts.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage: string = messages[messages.length - 1]?.content ?? "";

    /* 1. Try rule-based first — instant, free, always works */
    const ruleReply = matchRule(lastMessage);
    if (ruleReply) return Response.json({ content: ruleReply });

    /* 2. If API key is available, fall through to Claude for open-ended questions */
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: SYSTEM,
          messages,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.content?.[0]?.text;
        if (content) return Response.json({ content });
      }
    }

    /* 3. Final fallback */
    return Response.json({
      content:
        "That's a great question! For anything specific, our team is the best resource — email hello@promogranade.com or WhatsApp +91 95117 84952 and we'll get back to you within one business day.",
    });
  } catch (err) {
    console.error("Chat error:", err);
    return Response.json({
      content:
        "Something went wrong on my end. You can always reach us at hello@promogranade.com or WhatsApp +91 95117 84952.",
    });
  }
}
