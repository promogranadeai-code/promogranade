export interface ArcadeItem {
  name: string;
  description: string;
}

export interface ArcadeCategory {
  id: "tools" | "prompts" | "workflows";
  label: string;
  blurb: string;
  pageIntro: string;
  items: ArcadeItem[];
}

export const arcadeCategories: ArcadeCategory[] = [
  {
    id: "tools",
    label: "Tools",
    blurb:
      "The everyday kit. The editors, copilots, design boards and infra we reach for on every project.",
    pageIntro:
      "These are the tools running underneath every Promogranade project — from the first wireframe to the production deploy. No mystery stack, just what actually gets used and why.",
    items: [
      { name: "Cursor", description: "AI-native code editor we pair-program with for day-to-day development." },
      { name: "Claude Code", description: "Our terminal-based AI coding agent for larger refactors and multi-file changes." },
      { name: "ChatGPT", description: "Research, ideation, and quick drafting across copy and strategy." },
      { name: "GitHub Copilot", description: "Inline code completion across the team's editors." },
      { name: "Figma", description: "Where every interface gets designed, prototyped, and signed off before a line of code is written." },
      { name: "Linear", description: "Issue tracking and sprint planning — one source of truth for what's shipping next." },
      { name: "Vercel", description: "Hosting and CI/CD for every Next.js build we ship." },
      { name: "Supabase", description: "Postgres, auth, and storage for projects that need a backend fast." },
      { name: "PostgreSQL", description: "The relational database behind most of our production systems." },
      { name: "Notion", description: "Internal docs, specs, and client-facing project hubs." },
      { name: "Canva", description: "Fast, on-brand social and marketing visuals without waiting on a full design pass." },
      { name: "Wispr Flow", description: "Voice-to-text dictation we use to draft briefs, specs, and copy faster than typing." },
      { name: "Higgsfield", description: "AI image and video generation for campaign creative and ad concepts." },
      { name: "Magnific", description: "AI upscaling that turns rough generated images into client-ready, high-resolution assets." },
    ],
  },
  {
    id: "prompts",
    label: "Prompts",
    blurb:
      "Battle-tested prompt patterns we use to steer models — from research to code generation to copy.",
    pageIntro:
      "Prompting is an engineering discipline, not a guessing game. These are the patterns we default to when steering models toward reliable, reviewable output.",
    items: [
      { name: "Chain-of-thought", description: "Asking the model to reason step-by-step before answering, for fewer logic errors on complex tasks." },
      { name: "Few-shot examples", description: "Showing 2-3 examples of the desired output so the model matches format and tone exactly." },
      { name: "Role priming", description: "Framing the model with a specific persona or expertise to sharpen the quality of its answers." },
      { name: "ReAct", description: "Interleaving reasoning and tool calls so an agent can look things up mid-thought instead of guessing." },
      { name: "Self-critique", description: "Having the model review and correct its own first draft before we ever see it." },
      { name: "Plan-and-execute", description: "Splitting a task into a plan first, then executing each step separately for more reliable results." },
      { name: "Structured output", description: "Constraining responses to JSON/schema so they can be parsed directly into our systems." },
      { name: "RAG context-fill", description: "Retrieving the right documents or data first, then grounding the model's answer in them." },
      { name: "Tree-of-thought", description: "Exploring multiple reasoning paths in parallel and keeping the best one, for harder problems." },
      { name: "Reflexion", description: "Letting an agent learn from its own failed attempts within the same session before trying again." },
    ],
  },
  {
    id: "workflows",
    label: "Workflows",
    blurb:
      "How work gets stitched together — orchestration tools that turn agents and APIs into running systems.",
    pageIntro:
      "Individual tools and good prompts only go so far — these are the orchestration layers that turn them into systems which actually run unattended in production.",
    items: [
      { name: "n8n", description: "Self-hosted automation flows connecting client tools without per-task code." },
      { name: "Zapier", description: "Quick, no-code integrations for simpler automations and client handoffs." },
      { name: "Make", description: "Visual automation builder for more complex, multi-branch workflows." },
      { name: "LangChain", description: "Building blocks for chaining LLM calls, tools, and memory into one pipeline." },
      { name: "LangGraph", description: "Stateful, graph-based orchestration for multi-step AI agents that need to loop and branch." },
      { name: "Temporal", description: "Durable execution for long-running workflows that must survive crashes and retries." },
      { name: "Inngest", description: "Event-driven background jobs and queues for our Next.js backends." },
      { name: "Trigger.dev", description: "Code-first background jobs and scheduled tasks, version-controlled with the rest of the app." },
      { name: "Airflow", description: "Scheduling and monitoring data pipelines for larger reporting and analytics builds." },
      { name: "Pipedream", description: "Fast, code-level glue between APIs when no off-the-shelf integration exists." },
    ],
  },
];

export function getArcadeCategory(id: string) {
  return arcadeCategories.find((c) => c.id === id);
}
