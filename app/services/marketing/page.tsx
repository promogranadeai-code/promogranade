import { Megaphone } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetail } from "@/components/services/ServiceDetail";

export const metadata = {
  title: "Marketing — Promogranade",
};

export default function MarketingPage() {
  return (
    <>
      <ServiceDetail
        eyebrow="Services — Marketing"
        title="Marketing."
        description="End-to-end growth. Social, paid, creative, video, and the SEO/GEO/AEO playbook that gets you found by people and AI alike. One studio for everything from the first ad creative to the long-term content engine."
        icon={<Megaphone className="h-9 w-9" />}
        groups={[
          {
            label: "Marketing Services",
            intro:
              "Six disciplines that work together — strategy, creative, distribution and measurement under one roof. Pick what you need or hand us the whole funnel.",
            items: [
              {
                title: "Social Media Marketing",
                blurb:
                  "Instagram, Facebook, and WhatsApp campaigns. Content calendars, community management, paid promotion, and DM-driven funnels — all under one roof.",
                tags: ["Instagram", "Facebook", "WhatsApp"],
              },
              {
                title: "Performance Marketing",
                blurb:
                  "Paid acquisition that earns its keep. Google Ads, Meta Ads, LinkedIn — full-funnel measurement, conversion tracking, every rupee accounted for.",
                tags: ["Google Ads", "Meta Ads", "LinkedIn"],
              },
              {
                title: "Designing",
                blurb:
                  "Brand identity, ad creative, marketing collateral, social tiles. Visuals that don't just look good — they convert, scale across formats, and stay on-brand.",
                tags: ["Brand", "Ads", "Collateral"],
              },
              {
                title: "Video Editing",
                blurb:
                  "Short-form, long-form, ads, reels. Cuts, color, sound, motion graphics. An editor plus strategist on every project — built for the platform you're shipping to.",
                tags: ["Reels", "Ads", "Motion"],
              },
              {
                title: "AI Video Creation",
                blurb:
                  "Generative video for scale. AI avatars, voice clones, batch ad variants, faceless content engines — produce in days what used to take months.",
                tags: ["AI avatars", "Voice cloning", "Batch"],
              },
              {
                title: "SEO / GEO / AEO",
                blurb:
                  "Get found by humans, get cited by AI. Technical SEO, content engines, and the new playbook for generative and answer-engine optimization (ChatGPT, Perplexity, Gemini, AI Overviews).",
                tags: ["SEO", "GEO", "AEO"],
              },
            ],
          },
        ]}
      />
      <Footer />
    </>
  );
}
