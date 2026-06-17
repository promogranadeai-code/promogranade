import { PageHero } from "@/components/ui/PageHero";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "How Promogranade collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "17 June 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy."
        description={`Last updated: ${LAST_UPDATED}`}
      />
      <section className="section-a py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-10 text-base leading-relaxed text-[color:var(--section-muted)]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              1. Who we are
            </h2>
            <p>
              Promogranade ("we", "us", "our") is a studio providing web development, AI
              systems, and growth marketing services. This policy explains what information
              we collect when you visit promogranade.com, why we collect it, and how you can
              control it. Questions can be sent to hello@promogranade.com.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              2. Information we collect
            </h2>
            <p>
              We collect information you provide directly — your name, email, phone number,
              and message content — when you submit our contact form, career application
              form, or message us via WhatsApp or email. We do not require account creation
              and do not collect payment information through this site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              3. How we use your information
            </h2>
            <p>
              We use the information you submit solely to respond to your enquiry, evaluate
              a job application, or deliver a service you've requested. We do not sell your
              personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              4. Cookies and analytics
            </h2>
            <p>
              This site may use standard analytics tools to understand aggregate visitor
              behaviour (pages viewed, time on site) and to remember your theme preference
              (light or dark mode) in your browser's local storage. These do not identify
              you personally.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              5. Third-party services
            </h2>
            <p>
              Form submissions are processed through FormSubmit, a third-party form-relay
              service, solely to deliver your message to our inbox. WhatsApp links open
              Meta's WhatsApp service directly and are governed by WhatsApp's own privacy
              terms once you start that conversation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              6. Data retention
            </h2>
            <p>
              We retain enquiry and application information only as long as needed to
              respond to you or fulfil a service engagement, and delete it on request.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              7. Your rights
            </h2>
            <p>
              You can ask us at any time what information we hold about you, request a
              correction, or request deletion, by emailing hello@promogranade.com.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--sec-a-fg)] mb-3">
              8. Changes to this policy
            </h2>
            <p>
              We may update this policy as our services evolve. The "last updated" date at
              the top of this page reflects the most recent revision.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
