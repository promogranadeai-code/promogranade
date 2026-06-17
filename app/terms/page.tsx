import { PageHero } from "@/components/ui/PageHero";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Promogranade website and services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "17 June 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service."
        description={`Last updated: ${LAST_UPDATED}`}
      />
      <section className="section-a py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-10 text-base leading-relaxed text-[color:var(--section-muted)]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              1. Acceptance of terms
            </h2>
            <p>
              By using promogranade.com you agree to these terms. If you don't agree,
              please don't use the site. These terms apply to the website itself; any
              services we deliver under a signed agreement are governed by that agreement,
              not this page.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              2. Use of the site
            </h2>
            <p>
              You may browse this site and use its contact, career, and chat features for
              their intended purpose — learning about our services and reaching out to us.
              You agree not to misuse the site, attempt to disrupt it, or submit false
              information through our forms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              3. Intellectual property
            </h2>
            <p>
              All content on this site — including text, design, code, and the Promogranade
              name and logo — belongs to Promogranade unless otherwise credited. You may not
              copy, reproduce, or repurpose it for commercial use without our written
              permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              4. No guarantee of outcome from site content
            </h2>
            <p>
              Blog articles, service descriptions, and case-study style content on this
              site are provided for general information. They don't constitute a binding
              quote, guarantee, or professional advice — actual project scope, timelines,
              and pricing are confirmed in a separate written proposal before work begins.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              5. Third-party links
            </h2>
            <p>
              This site links to third-party services (WhatsApp, Instagram, LinkedIn, and
              our form-processing provider). We aren't responsible for the content or
              practices of those external services once you leave promogranade.com.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              6. Limitation of liability
            </h2>
            <p>
              This site is provided "as is." We make reasonable efforts to keep it accurate
              and available but don't guarantee uninterrupted access or that it's free of
              errors.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              7. Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the site after
              a change means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              8. Contact
            </h2>
            <p>
              Questions about these terms can be sent to hello@promogranade.com.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
