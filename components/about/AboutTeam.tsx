"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";

const IconX = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconLinkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0z" />
  </svg>
);

const team = [
  {
    name: "Abhinandan Jain",
    role: "Co-founder & CEO",
    bio: "Drives strategy, client relationships, and the big picture. Abhinandan has spent years at the intersection of technology and business, helping companies move from idea to market faster than they thought possible.",
    initials: "AJ",
    accent: "#dc1428",
    skills: ["Strategy", "AI", "Growth"],
  },
  {
    name: "Tejashree Mahale",
    role: "Co-founder & Design Lead",
    bio: "Tejashree turns complex problems into clean, conversion-focused design. She leads the brand, UI, and user experience across every project — believing great design should be invisible and effective at the same time.",
    initials: "TM",
    accent: "#dc1428",
    skills: ["UI/UX", "Branding", "Research"],
  },
  {
    name: "Naman Agarwal",
    role: "Co-founder & Tech Lead",
    bio: "Naman architects the code that powers everything Promogranade ships. From full-stack web applications to AI pipelines, he brings the technical depth to turn ambitious ideas into reliable, scalable products.",
    initials: "NA",
    accent: "#dc1428",
    skills: ["Engineering", "AI/ML", "Infra"],
  },
];

export function AboutTeam() {
  return (
    <section className="section-a relative overflow-hidden py-24 lg:py-36">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-12">
          <span className="h-px w-12 bg-[color:var(--section-border)]" />
          <span>The team</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 items-end mb-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              The people who build.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              Three founders, three disciplines — every one of them still hands-on
              in the work. No account managers in the way.
            </p>
          </FadeUp>
        </div>

        {/* Team cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 overflow-hidden"
    >
      {/* hover glow */}
      <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/[0.04] transition-colors duration-500 rounded-3xl pointer-events-none" />

      {/* Avatar */}
      <div className="relative mb-6">
        <div
          className="h-20 w-20 rounded-2xl flex items-center justify-center text-white font-display font-black text-2xl select-none"
          style={{
            background: `linear-gradient(135deg, ${member.accent}, #7a0014)`,
          }}
        >
          {member.initials}
        </div>
        {/* small red dot */}
        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[var(--accent)] border-2 border-[color:var(--sec-a-bg,#fff)]" />
      </div>

      {/* Name + role */}
      <p className="font-display text-2xl font-bold tracking-tight leading-tight">
        {member.name}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-4">
        {member.role}
      </p>

      {/* Divider */}
      <div className="h-px bg-[color:var(--section-border)] mb-4" />

      {/* Bio */}
      <p className="text-sm leading-relaxed text-[color:var(--section-muted)]">
        {member.bio}
      </p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {member.skills.map((s) => (
          <span
            key={s}
            className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
