"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { Upload, Check, ChevronDown, ArrowRight } from "lucide-react";

const roles = [
  "Senior Full-Stack Engineer",
  "AI / ML Engineer",
  "Performance Marketer",
  "Brand Designer",
  "Other / Open application",
];

const experiences = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
];

interface FormState {
  name: string;
  age: string;
  contact: string;
  email: string;
  qualification: string;
  city: string;
  state: string;
  role: string;
  experience: string;
  resume: File | null;
}

const initialState: FormState = {
  name: "",
  age: "",
  contact: "",
  email: "",
  qualification: "",
  city: "",
  state: "",
  role: "",
  experience: "",
  resume: null,
};

// Submissions are POSTed to FormSubmit which forwards to this inbox.
// First-time use requires confirming the inbox once via a verification email.
const FORM_ENDPOINT = "https://formsubmit.co/promogranade.ai@gmail.com";

export function CareerForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value as FormState[K] }));

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((p) => ({ ...p, resume: file }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("Name", form.name);
      fd.append("Age", form.age);
      fd.append("Contact number", form.contact);
      fd.append("Professional email", form.email);
      fd.append("City", form.city);
      fd.append("State", form.state);
      fd.append("Qualification", form.qualification);
      fd.append("Role applied for", form.role);
      fd.append("Experience", form.experience);
      if (form.resume) fd.append("Resume", form.resume, form.resume.name);

      // FormSubmit options
      fd.append("_subject", `Career application — ${form.name} (${form.role})`);
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      fd.append("_replyto", form.email);

      // mode: "no-cors" — FormSubmit's standard endpoint doesn't return CORS
      // headers for cross-origin AJAX, but the POST still goes through.
      // We treat completion-without-throw as a successful submission.
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: fd,
        mode: "no-cors",
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        "Couldn't submit right now. Please email us at hello@promogranade.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialState);
    setSubmitted(false);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section
      id="apply"
      className="section-a relative overflow-hidden py-24 lg:py-36"
    >
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
          <span className="h-px w-12 bg-[color:var(--section-border)]" />
          <span>Apply now</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-end mb-14">
          <div className="lg:col-span-8">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em]"
            >
              Tell us about you.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-4">
            <p className="text-base leading-relaxed text-[color:var(--section-muted)]">
              Fill the form and we&apos;ll get back within one business day.
            </p>
          </FadeUp>
        </div>

        {/* Form OR success state */}
        {!submitted ? (
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-[color:var(--section-border)] bg-[var(--sec-a-bg)] backdrop-blur-xl p-6 md:p-10 space-y-9 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
          >
            {/* corner accent — subtle red glow at the top right */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-px right-12 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60"
            />

            {/* PERSONAL */}
            <Group label="Personal">
              <Field
                label="Full name"
                required
                input={
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                }
                colSpan={12}
              />

              <Field
                label="Age"
                required
                input={
                  <input
                    type="number"
                    min={15}
                    max={99}
                    required
                    value={form.age}
                    onChange={update("age")}
                    placeholder="24"
                    className={inputClass}
                  />
                }
                colSpan={4}
              />
              <Field
                label="Contact number"
                required
                input={
                  <input
                    type="tel"
                    required
                    pattern="[0-9+\-\s()]{7,}"
                    value={form.contact}
                    onChange={update("contact")}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                }
                colSpan={8}
              />

              <Field
                label="Professional email"
                required
                input={
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                }
                colSpan={12}
              />
            </Group>

            <Divider />

            {/* LOCATION */}
            <Group label="Location">
              <Field
                label="City"
                required
                input={
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={update("city")}
                    placeholder="Mumbai"
                    className={inputClass}
                  />
                }
                colSpan={6}
              />
              <Field
                label="State"
                required
                input={
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={update("state")}
                    placeholder="Maharashtra"
                    className={inputClass}
                  />
                }
                colSpan={6}
              />
            </Group>

            <Divider />

            {/* PROFESSIONAL */}
            <Group label="Professional">
              <Field
                label="Highest qualification"
                required
                input={
                  <input
                    type="text"
                    required
                    value={form.qualification}
                    onChange={update("qualification")}
                    placeholder="B.Tech, Computer Science"
                    className={inputClass}
                  />
                }
                colSpan={12}
              />

              <Field
                label="Role you're applying for"
                required
                input={
                  <SelectField
                    value={form.role}
                    onChange={update("role")}
                    options={roles}
                    placeholder="Select a role"
                  />
                }
                colSpan={7}
              />
              <Field
                label="Total experience"
                required
                input={
                  <SelectField
                    value={form.experience}
                    onChange={update("experience")}
                    options={experiences}
                    placeholder="Select"
                  />
                }
                colSpan={5}
              />
            </Group>

            <Divider />

            {/* RESUME */}
            <Group label="Resume">
              <div className="col-span-12">
                <FileUpload
                  fileRef={fileRef}
                  file={form.resume}
                  onChange={onFile}
                />
              </div>
            </Group>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/5 px-4 py-3 text-sm text-[var(--accent)]">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between border-t border-[color:var(--section-border)]">
              <p className="text-xs text-[color:var(--section-muted)] max-w-md pt-4">
                By submitting, you agree we may store and review your
                application. We reply to every applicant.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[color:var(--sec-a-fg)] hover:text-[color:var(--sec-a-bg)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="inline-block h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit application
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-10 md:p-14 text-center"
          >
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white mb-6">
              <Check className="h-6 w-6" strokeWidth={3} />
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Application received.
            </p>
            <p className="text-[color:var(--section-muted)] max-w-md mx-auto mb-8">
              Thanks, {form.name.split(" ")[0] || "there"}. We&apos;ll review and
              get back to you within one business day at{" "}
              <span className="text-[var(--accent)] font-semibold">
                {form.email}
              </span>
              .
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--section-border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Submit another application
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─────────── SUB-COMPONENTS ───────────

const inputClass = [
  // sizing + radius
  "w-full rounded-xl px-4 py-3.5 text-base",
  // a tinted field surface that reads against the frosted panel in both themes
  "bg-[var(--foreground)]/[0.04] dark:bg-[var(--foreground)]/[0.06]",
  // ring/border — slightly stronger than the section border so fields stand out
  "border border-[color:var(--section-border)]",
  // focus state: accent ring + accent border
  "outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "focus:border-[var(--accent)] focus:bg-[var(--foreground)]/[0.06]",
  "focus:shadow-[0_0_0_3px_rgba(220,20,40,0.18)]",
  // hover bumps the surface very slightly
  "hover:bg-[var(--foreground)]/[0.05]",
  // placeholder colour
  "placeholder:text-[color:var(--section-muted)]/70",
].join(" ");

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--section-muted)] mb-6">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        {label}
      </p>
      <div className="grid grid-cols-12 gap-4 md:gap-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  input,
  colSpan,
  required,
}: {
  label: string;
  input: React.ReactNode;
  colSpan: number;
  required?: boolean;
}) {
  const colClass: Record<number, string> = {
    4:  "col-span-12 md:col-span-4",
    5:  "col-span-12 md:col-span-5",
    6:  "col-span-12 md:col-span-6",
    7:  "col-span-12 md:col-span-7",
    8:  "col-span-12 md:col-span-8",
    12: "col-span-12",
  };
  return (
    <label className={`${colClass[colSpan]} flex flex-col gap-2`}>
      <span className="text-xs font-semibold text-[color:var(--section-muted)]">
        {label}
        {required && <span className="text-[var(--accent)] ml-1">*</span>}
      </span>
      {input}
    </label>
  );
}

function Divider() {
  return <div className="h-px bg-[color:var(--section-border)]" />;
}

function SelectField({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        required
        value={value}
        onChange={onChange}
        className={`${inputClass} appearance-none pr-12 cursor-pointer`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--section-muted)]"
        aria-hidden
      />
    </div>
  );
}

function FileUpload({
  fileRef,
  file,
  onChange,
}: {
  fileRef: React.RefObject<HTMLInputElement | null>;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-[color:var(--section-muted)] mb-2">
        Resume (PDF) <span className="text-[var(--accent)]">*</span>
      </p>

      <label
        htmlFor="resume-input"
        className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-dashed border-[color:var(--section-border)] bg-[var(--foreground)]/[0.03] hover:bg-[var(--foreground)]/[0.05] hover:border-[var(--accent)] transition-all duration-200 px-5 py-5 cursor-pointer"
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] shrink-0 group-hover:bg-[var(--accent)]/25 transition-colors">
          {file ? <Check className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
        </div>

        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="text-sm font-semibold truncate">{file.name}</p>
              <p className="text-xs text-[color:var(--section-muted)] mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB · Click to replace
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold">
                Click to upload your resume
              </p>
              <p className="text-xs text-[color:var(--section-muted)] mt-0.5">
                PDF only · Max 5 MB
              </p>
            </>
          )}
        </div>

        <input
          ref={fileRef}
          id="resume-input"
          type="file"
          accept="application/pdf,.pdf"
          required
          onChange={onChange}
          className="sr-only"
        />
      </label>
    </div>
  );
}
