import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wrench, Sparkles, Workflow as WorkflowIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Footer } from "@/components/layout/Footer";
import { arcadeCategories, getArcadeCategory, type ArcadeCategory } from "@/lib/arcade-data";

const ICONS: Record<ArcadeCategory["id"], typeof Wrench> = {
  tools: Wrench,
  prompts: Sparkles,
  workflows: WorkflowIcon,
};

export function generateStaticParams() {
  return arcadeCategories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = getArcadeCategory(categoryId);
  if (!category) return {};
  return {
    title: category.label,
    description: category.pageIntro,
    alternates: { canonical: `/arcade/${category.id}` },
    openGraph: {
      title: `${category.label} — Arcade — Promogranade`,
      description: category.pageIntro,
      type: "website",
      url: `https://promogranade.com/arcade/${category.id}`,
    },
  };
}

export default async function ArcadeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = getArcadeCategory(categoryId);
  if (!category) notFound();

  const Icon = ICONS[category.id];

  return (
    <>
      <PageHero
        eyebrow={`Arcade · ${category.label}`}
        title={category.label === "Tools" ? "The everyday kit." : category.label === "Prompts" ? "How we steer the model." : "How work gets stitched together."}
        description={category.pageIntro}
      />

      <section className="section-a relative overflow-hidden py-20 lg:py-32">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href="/arcade"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] hover:text-[var(--accent)] transition-colors mb-12"
          >
            <ArrowLeft className="h-3 w-3" />
            All of Arcade
          </Link>

          <div className="flex items-center gap-4 mb-14">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-[0_8px_24px_-8px_rgba(220,20,40,0.6)] shrink-0">
              <Icon className="h-6 w-6" />
            </span>
            <p className="font-display text-3xl md:text-4xl font-black tracking-tight">
              {category.label}
            </p>
          </div>

          {/* Item grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <div
                key={item.name}
                className="group relative rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-6 overflow-hidden hover:border-[var(--accent)]/50 transition-colors duration-300"
              >
                <p className="font-display text-lg font-bold tracking-tight mb-2">
                  {item.name}
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--section-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Other categories */}
          <div className="mt-20 border-t border-[color:var(--section-border)] pt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-6">
              Explore the rest of Arcade
            </p>
            <div className="flex flex-wrap gap-3">
              {arcadeCategories
                .filter((c) => c.id !== category.id)
                .map((c) => (
                  <Link
                    key={c.id}
                    href={`/arcade/${c.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--section-border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
