"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import { budgetOptions, serviceOptions } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

type Status = "idle" | "submitting" | "success" | "error";

type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  social: { instagram: string; facebook: string; youtube: string };
};

export default function ContactClient({ contact }: { contact: ContactInfo }) {
  const [status, setStatus] = useState<Status>("idle");

  // NOTE: This is a placeholder submit handler. Wire this up to EmailJS or
  // Resend (per the design brief) by replacing the setTimeout below with a
  // real API call, e.g. POST to an /api/contact route that sends via Resend.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  return (
    <section id="contact" className="bg-charcoal/30 py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="text-center">
          <p className="section-label">06 — Let&apos;s Create</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl lg:text-6xl">
            Ready To Tell Your Story?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Drop us a message and let&apos;s bring your vision to life.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Email Address" name="email" type="email" required />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Phone Number" name="phone" type="tel" />
                <SelectField label="Service Needed" name="service" options={serviceOptions} />
              </div>
              <SelectField label="Project Budget Range" name="budget" options={budgetOptions} />
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Project Description
                </label>
                <textarea
                  name="description"
                  rows={5}
                  className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-offwhite outline-none transition-colors focus:border-gold"
                  placeholder="Tell us about your project..."
                />
              </div>

              <MagneticButton
                as="button"
                type="submit"
                disabled={status === "submitting"}
                className="w-full justify-center rounded-full bg-gold px-8 py-4 font-mono text-xs uppercase tracking-widest2 text-ink transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </MagneticButton>

              {status === "success" && (
                <p className="font-mono text-xs text-gold">
                  Thanks — we&apos;ll be in touch shortly.
                </p>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-6 rounded-xl border border-line bg-surface p-8">
              <ContactRow icon={Phone} label="Phone" value={contact.phone} />
              <ContactRow icon={Mail} label="Email" value={contact.email} />
              <ContactRow icon={MapPin} label="Location" value={contact.address} />

              <div className="border-t border-line pt-6">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  <a href={contact.social.instagram} data-cursor-hover className="text-muted hover:text-gold">
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a href={contact.social.facebook} data-cursor-hover className="text-muted hover:text-gold">
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                  <a href={contact.social.youtube} data-cursor-hover className="text-muted hover:text-gold">
                    <YoutubeIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-muted">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-offwhite outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-muted">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-offwhite outline-none transition-colors focus:border-gold"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon strokeWidth={1.5} className="mt-0.5 h-5 w-5 text-gold" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted">{label}</p>
        <p className="text-sm text-offwhite">{value}</p>
      </div>
    </div>
  );
}
