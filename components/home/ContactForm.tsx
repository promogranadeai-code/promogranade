"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

// Google Apps Script Web App — logs every submission to a Google Sheet
// AND emails hello@promogranade.com. See scripts/contact-form-apps-script.gs
// for the script to deploy and paste the resulting /exec URL below.
const FORM_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("Name", form.name);
      fd.append("Email", form.email);
      fd.append("Phone", form.phone || "Not provided");
      fd.append("Message", form.message);

      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd });
      const json = await res.json().catch(() => ({ success: false }));

      if (res.ok && json.success) {
        setSubmitted(true);
      } else {
        setError("Couldn't send that. Please email us directly at hello@promogranade.com.");
      }
    } catch (err) {
      console.error(err);
      setError("Couldn't send that. Please email us directly at hello@promogranade.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialState);
    setSubmitted(false);
    setError(null);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 md:p-10 min-h-[220px] text-center"
      >
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white mb-5">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Message sent.
        </p>
        <p className="text-[color:var(--section-muted)] max-w-md mx-auto mb-6 text-sm">
          Thanks, {form.name.split(" ")[0] || "there"}. We&apos;ll reply within one
          business day at{" "}
          <span className="text-[var(--accent)] font-semibold">{form.email}</span>.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-[color:var(--section-border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-6 md:p-8 space-y-4"
    >
      <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-medium mb-2">
        Send us a message
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[color:var(--section-muted)]">
            Name<span className="text-[var(--accent)] ml-1">*</span>
          </span>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[color:var(--section-muted)]">
            Email<span className="text-[var(--accent)] ml-1">*</span>
          </span>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-[color:var(--section-muted)]">
          Phone (optional)
        </span>
        <input
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="+91 98765 43210"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-[color:var(--section-muted)]">
          Message<span className="text-[var(--accent)] ml-1">*</span>
        </span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us about your project..."
          className={`${inputClass} resize-none`}
        />
      </label>

      {error && (
        <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/5 px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-[var(--accent)] text-white px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <span className="inline-block h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
}

const inputClass = [
  "w-full rounded-xl px-4 py-3 text-base",
  "bg-[var(--foreground)]/[0.04] dark:bg-[var(--foreground)]/[0.06]",
  "border border-[color:var(--section-border)]",
  "outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "focus:border-[var(--accent)] focus:bg-[var(--foreground)]/[0.06]",
  "focus:shadow-[0_0_0_3px_rgba(220,20,40,0.18)]",
  "hover:bg-[var(--foreground)]/[0.05]",
  "placeholder:text-[color:var(--section-muted)]/70",
].join(" ");
