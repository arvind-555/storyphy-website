"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { site, whatsappLink } from "@/config/site";
import { buildQuoteMessage, validateQuote, type QuoteErrors, type QuoteInput } from "@/lib/quote";

const empty: QuoteInput = {
  school: "",
  city: "",
  contactName: "",
  role: "",
  children: "",
  occasion: "",
  targetDate: "",
  phone: "",
  email: "",
};

const fields: {
  key: keyof QuoteInput;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}[] = [
  { key: "school", label: "School name", required: true },
  { key: "city", label: "City", required: true },
  { key: "contactName", label: "Your name", required: true, autoComplete: "name" },
  { key: "role", label: "Your role (optional)" },
  { key: "phone", label: "Mobile number", type: "tel", required: true, autoComplete: "tel" },
  { key: "email", label: "Email (optional)", type: "email", autoComplete: "email" },
  { key: "children", label: "Approx. number of children (optional)", type: "text" },
  { key: "occasion", label: "Occasion, e.g. annual day or graduation (optional)" },
  { key: "targetDate", label: "Target date (optional)", type: "date" },
];

export function QuoteForm() {
  const [values, setValues] = useState<QuoteInput>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateQuote(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSent(false);
      return;
    }
    window.open(whatsappLink(buildQuoteMessage(values)), "_blank", "noopener");
    setSent(true);
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("School quote request")}&body=${encodeURIComponent(buildQuoteMessage(values))}`;

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto max-w-xl space-y-4 rounded-3xl border border-line bg-white p-6 shadow-sm">
      {fields.map((f) => {
        const id = `quote-${f.key}`;
        const error = errors[f.key];
        return (
          <div key={f.key}>
            <label htmlFor={id} className="mb-1 block text-sm font-bold">
              {f.label}
              {f.required && <span aria-hidden className="text-brand-purple"> *</span>}
            </label>
            <input
              id={id}
              type={f.type ?? "text"}
              value={values[f.key]}
              autoComplete={f.autoComplete}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="w-full rounded-xl border border-line px-4 py-3 focus:outline-2 focus:outline-brand-teal"
            />
            {error && (
              <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
        );
      })}
      <Button type="submit" size="lg" className="w-full">
        Send on WhatsApp
      </Button>
      <p className="text-center text-sm">
        <a href={mailto} className="font-bold text-brand-teal hover:underline">
          Email us instead
        </a>
      </p>
      {sent && (
        <p role="status" className="rounded-2xl bg-brand-teal-soft p-4 text-center font-bold">
          Thank you! WhatsApp has opened with your details. Our team will get back to you.
        </p>
      )}
    </form>
  );
}
