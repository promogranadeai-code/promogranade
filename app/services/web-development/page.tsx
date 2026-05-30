import { Code2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetail } from "@/components/services/ServiceDetail";

export const metadata = {
  title: "Web Development — Promogranade",
};

export default function WebDevelopmentPage() {
  return (
    <>
      <ServiceDetail
        eyebrow="Services — Web Development"
        title="Web Development."
        description="Custom websites and bespoke web applications. We build on the platforms that fit your stage — from no-code stores to fully custom SaaS, dashboards that act, and ERP systems built around your operations."
        icon={<Code2 className="h-9 w-9" />}
        groups={[
          {
            label: "Websites",
            intro:
              "Marketing sites, e-commerce stores, blogs, and lead-generation funnels. Built on the platform that matches your budget, content team, and growth plans.",
            items: [
              {
                title: "WordPress",
                blurb:
                  "Powerful CMS-driven sites. Blogs, content sites, lead-gen funnels. Easy to update, thousands of plugins, fast to launch and easy for non-technical teams to manage.",
                tags: ["CMS", "Blogs", "Lead-gen"],
              },
              {
                title: "Shopify",
                blurb:
                  "Hosted e-commerce that just works. Themes, payments, shipping, and an app ecosystem for whatever else you need — perfect for D2C brands moving fast.",
                tags: ["E-commerce", "D2C", "Themes"],
              },
              {
                title: "WooCommerce",
                blurb:
                  "Self-hosted e-commerce on top of WordPress. Full control of your data, no platform fees, and infinitely customizable for sellers with specific needs.",
                tags: ["WordPress", "Self-hosted", "Custom"],
              },
              {
                title: "Custom Coded",
                blurb:
                  "Hand-built in Next.js or your stack of choice. Fastest, most flexible, most defensible. Built for scale, SEO, and integrations that off-the-shelf platforms can't handle.",
                tags: ["Next.js", "Performance", "Scale"],
              },
            ],
          },
          {
            label: "Web Applications",
            intro:
              "Beyond brochure sites. Real product engineering — auth, database, payments, dashboards, integrations. Engineered to ship and built to scale.",
            items: [
              {
                title: "Custom Web Application",
                blurb:
                  "SaaS platforms, marketplaces, internal tools. Auth, database, payments, dashboards — engineered end to end with TypeScript, Postgres, and modern infra.",
                tags: ["SaaS", "Marketplaces", "Internal tools"],
              },
              {
                title: "Agentic Dashboards",
                blurb:
                  "Dashboards that act, not just display. AI agents embedded into your operational interfaces — reasoning over data, deciding what to do next, executing across systems.",
                tags: ["LLM", "Agents", "Realtime"],
              },
              {
                title: "ERP Softwares",
                blurb:
                  "Enterprise resource planning built around your operations — inventory, finance, HR, procurement. One platform, your processes, no off-the-shelf compromises.",
                tags: ["Inventory", "Finance", "Ops"],
              },
            ],
          },
        ]}
      />
      <Footer />
    </>
  );
}
