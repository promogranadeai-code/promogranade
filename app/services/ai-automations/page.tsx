import { Bot } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetail } from "@/components/services/ServiceDetail";

export const metadata = {
  title: "AI Automations — Promogranade",
};

export default function AiAutomationsPage() {
  return (
    <>
      <ServiceDetail
        eyebrow="Services — AI Automations"
        title="AI Automations."
        description="Automate the manual. We build everything from quick no-code workflows to custom business automation, all the way up to fully agentic systems that plan, reason, act, and self-correct across your tools."
        icon={<Bot className="h-9 w-9" />}
        tone="b"
        groups={[
          {
            label: "Automation Types",
            intro:
              "From a one-day n8n flow that saves a marketing team five hours a week, to multi-agent systems running your back office — we ship at every level of complexity.",
            items: [
              {
                title: "Make.com / n8n",
                blurb:
                  "Visual no-code automation. Connect 1000+ apps, route data, trigger emails, sync CRMs — fast to build, easy to maintain, ship in hours not weeks.",
                tags: ["No-code", "Integrations", "Quick win"],
              },
              {
                title: "Business Automation",
                blurb:
                  "Custom automations for the workflows that bleed time. Invoice processing, lead routing, report generation, internal ops — built around how your business actually runs.",
                tags: ["Back office", "Ops", "Custom"],
              },
              {
                title: "Agentic Workflow Automation",
                blurb:
                  "Beyond automation. AI agents that plan, reason, take actions across systems, recover when they fail, and learn from outcomes. The real frontier of work.",
                tags: ["Agents", "LLM", "Multi-step"],
              },
            ],
          },
        ]}
      />
      <Footer />
    </>
  );
}
