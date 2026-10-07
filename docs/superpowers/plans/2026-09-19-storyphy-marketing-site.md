# Storyphy Marketing Site (Foundation + Design System + Pages) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the redesigned Storyphy marketing site (home, schools, school quote form) as a Next.js app in `web/`, with a design system, placeholder slots for images/videos/prices, and tests that enforce the spec's copy rules.

**Architecture:** A new Next.js (App Router, TypeScript, Tailwind) app lives in `web/` on branch `redesign-next`; the legacy `index.html` stays untouched and live until cutover. Page content lives in typed data files under `src/content/`, rendered by small section components. Images, videos and prices are placeholder components/constants that are swapped later without touching layout code.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, Vitest + React Testing Library (jsdom), next/font (Fredoka + Nunito).

**Spec:** `docs/superpowers/specs/2026-09-19-storyphy-website-redesign-design.md`

**Out of scope (separate plans):** order form, cart, PhonePe checkout, Supabase, admin, blog, reviews page, legal pages (owner supplies text). Until the order flow exists, every "Order" CTA opens WhatsApp with a prefilled message.

## Global Constraints

- English only.
- Delivery promise: "7-10 days", counted from preview approval.
- Preview is sent within 24 hours of payment; the only public guarantee is "you see the preview and approve it before we print". Never mention a redesign limit, unlimited redesigns, or a refund.
- Social proof: "500+ families" only. No star ratings, no "4.9", no "rated", no review counts.
- No school logos, no claims of schools served, no minimum order quantity (no MOQ) anywhere.
- All prices are placeholders such as `[PRICE-STANDARD]`; no real amounts.
- Contact: WhatsApp 917892129651, phone +91 78921 29651, email storyphy25@gmail.com, Instagram https://www.instagram.com/storyphyy.
- Palette (from logo, single source in `globals.css`): purple #5B3A8E, teal #1A8FA3, gold #F0A92E.
- Content must be visible without JavaScript (no scroll-reveal that hides content).
- Mobile first; sticky bottom CTA on mobile.
- No dark patterns: no fake scarcity, no countdowns, no pre-ticked upsells.

---

## File Structure

```
web/
  vitest.config.mts, vitest.setup.ts
  public/logo.jpg                      copied from links/LOGO-STORYPHY.jpg (1600x708)
  src/app/layout.tsx                   fonts, metadata, header/footer chrome
  src/app/globals.css                  Tailwind + design tokens
  src/app/page.tsx                     home, composes sections
  src/app/schools/page.tsx             schools landing
  src/app/schools/quote/page.tsx       quote form page
  src/config/site.ts                   contact, nav, whatsappLink()
  src/content/home.ts                  home copy/data
  src/content/schools.ts               schools copy/data
  src/content/copy-rules.test.ts       enforces Global Constraints on all copy
  src/lib/quote.ts                     validateQuote(), buildQuoteMessage()
  src/components/ui/                   Button, Section, SectionHeading
  src/components/media/                ImageSlot, VideoSlot
  src/components/chrome/               Header, MobileNav, Footer, StickyMobileBar, WhatsAppFab
  src/components/home/                 one file per home section
  src/components/schools/              schools sections + QuoteForm
```

---

### Task 1: Scaffold the Next.js app and test harness

**Files:**
- Create: `web/` (via create-next-app), `web/vitest.config.mts`, `web/vitest.setup.ts`, `web/public/logo.jpg`
- Modify: `web/package.json` (scripts)

**Interfaces:**
- Produces: `npm test` (Vitest, jsdom, `@/` alias, jest-dom matchers), `npm run build`, `npm run lint`.

- [ ] **Step 1: Create the branch and app**

```bash
cd /d/storyphy_website
git switch -c redesign-next
npx create-next-app@latest web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```
Expected: `web/` created with `src/app/page.tsx`.

- [ ] **Step 2: Install test dependencies**

```bash
cd web
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths
cp ../links/LOGO-STORYPHY.jpg public/logo.jpg
```

- [ ] **Step 3: Add Vitest config**

`web/vitest.config.mts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

`web/vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add the test script**

In `web/package.json` `"scripts"` add: `"test": "vitest run"`.

- [ ] **Step 5: Verify build works**

Run: `cd web && npm run build`
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
cd /d/storyphy_website
git add web docs .gitignore
git commit -m "chore: scaffold Next.js app with Vitest in web/"
```

---

### Task 2: Design tokens, fonts, base layout

**Files:**
- Modify: `web/src/app/globals.css` (replace), `web/src/app/layout.tsx` (replace)

**Interfaces:**
- Produces Tailwind classes: `bg-brand-purple`, `text-brand-purple`, `bg-brand-purple-soft`, `bg-brand-teal`, `bg-brand-teal-soft`, `bg-brand-gold`, `bg-brand-cream`, `text-ink`, `text-ink-soft`, `border-line`, `font-display`, `font-sans`.

- [ ] **Step 1: Replace `globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --color-brand-purple: #5b3a8e;
  --color-brand-purple-dark: #452a6e;
  --color-brand-purple-soft: #f3edff;
  --color-brand-teal: #1a8fa3;
  --color-brand-teal-soft: #e6f6f9;
  --color-brand-gold: #f0a92e;
  --color-brand-gold-soft: #fff4d9;
  --color-brand-cream: #fffdf9;
  --color-ink: #241a3a;
  --color-ink-soft: #5a5470;
  --color-line: #e6dcff;
  --font-display: var(--font-fredoka), ui-rounded, system-ui, sans-serif;
  --font-sans: var(--font-nunito), system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-brand-cream);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 2: Replace `layout.tsx`** (chrome is added in Task 6)

```tsx
import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Storyphy - Personalized storybooks where your child is the hero",
  description:
    "Premium personalized hardcover storybooks. You approve the preview before we print. Delivered across India in 7-10 days.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Replace `page.tsx` with a token smoke page**

```tsx
export default function Home() {
  return (
    <div className="p-8">
      <h1 className="font-display text-4xl text-brand-purple">Storyphy</h1>
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `cd web && npm run build`
Expected: succeeds, no unknown-class or font errors.

- [ ] **Step 5: Commit**

```bash
git add web/src/app
git commit -m "feat: add brand design tokens and fonts"
```

---

### Task 3: Site config and copy-rules test

**Files:**
- Create: `web/src/config/site.ts`, `web/src/config/site.test.ts`, `web/src/content/copy-rules.test.ts`

**Interfaces:**
- Produces: `site` (constants), `nav`, `orderHref`, `whatsappLink(message?: string): string`, `orderMessage(bookTitle?: string): string`.

- [ ] **Step 1: Write the failing config test**

`web/src/config/site.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { whatsappLink, orderMessage, site } from "./site";

describe("whatsappLink", () => {
  it("links to the business number without a message", () => {
    expect(whatsappLink()).toBe("https://wa.me/917892129651");
  });
  it("url-encodes a prefilled message", () => {
    expect(whatsappLink("Hi & hello")).toBe(
      "https://wa.me/917892129651?text=Hi%20%26%20hello",
    );
  });
});

describe("orderMessage", () => {
  it("mentions the book when given", () => {
    expect(orderMessage("Bedtime Stories")).toContain("Bedtime Stories");
  });
  it("has a generic fallback", () => {
    expect(orderMessage()).toContain("order");
  });
});

describe("site", () => {
  it("states the delivery window", () => {
    expect(site.deliveryDays).toBe("7-10");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && npx vitest run src/config/site.test.ts`
Expected: FAIL, cannot resolve `./site`.

- [ ] **Step 3: Implement `site.ts`**

```ts
export const site = {
  name: "Storyphy",
  tagline: "Dream. Read. Repeat.",
  whatsappNumber: "917892129651",
  phoneDisplay: "+91 78921 29651",
  phoneHref: "tel:+917892129651",
  email: "storyphy25@gmail.com",
  instagram: "https://www.instagram.com/storyphyy",
  deliveryDays: "7-10",
  customerCount: "500+",
} as const;

export const nav = [
  { label: "Books", href: "/#collections" },
  { label: "Gifts", href: "/#gifts" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For Schools", href: "/schools" },
  { label: "Families", href: "/#families" },
] as const;

export const orderHref = "/#collections";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function orderMessage(bookTitle?: string): string {
  return bookTitle
    ? `Hi Storyphy! I'd like to order the "${bookTitle}" book for my child.`
    : "Hi Storyphy! I'd like to order a personalized book for my child.";
}
```

- [ ] **Step 4: Write the copy-rules test**

`web/src/content/copy-rules.test.ts`:
```ts
import { describe, it, expect } from "vitest";

const modules = import.meta.glob(
  ["./*.ts", "!./*.test.ts", "../config/*.ts", "!../config/*.test.ts"],
  { eager: true },
);

const corpus = JSON.stringify(Object.values(modules));

const forbidden: [string, RegExp][] = [
  ["star ratings / 4.9", /4\.9|\brated\b|\bratings?\b|★|⭐/i],
  ["minimum order", /\bMOQ\b|minimum (order|quantity)/i],
  ["redesign / revision limits", /redesign|revision|unlimited|until you (love|are happy)/i],
  ["refund promise", /refund|money[- ]back/i],
  ["school-served claims", /(schools?|preschools?) (we've|we have) (served|worked)|trusted by \d+ (pre)?schools?/i],
  ["fake urgency", /only \d+ left|hurry|countdown|ends (tonight|today)/i],
];

describe("copy rules from the spec", () => {
  it("scans at least the site config", () => {
    expect(Object.keys(modules).length).toBeGreaterThan(0);
  });

  it.each(forbidden)("has no %s", (_name, pattern) => {
    expect(corpus).not.toMatch(pattern);
  });

  it("uses no real price amounts", () => {
    expect(corpus).not.toMatch(/₹\s?\d|Rs\.?\s?\d|INR\s?\d/);
  });
});
```

- [ ] **Step 5: Run both tests**

Run: `cd web && npm test`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/config web/src/content
git commit -m "feat: add site config and copy-rules test"
```

---

### Task 4: UI primitives (Button, Section, SectionHeading)

**Files:**
- Create: `web/src/components/ui/Button.tsx`, `Button.test.tsx`, `Section.tsx`, `Section.test.tsx`

**Interfaces:**
- Produces:
  - `Button({ href?, variant?: "primary"|"secondary"|"ghost"|"onDark", size?: "md"|"lg", className?, children, onClick?, type? })`. With `href`: internal paths render `next/link`; `http(s):`, `mailto:`, `tel:` render `<a>` (http(s) gets `target="_blank" rel="noopener noreferrer"`). Without `href`: `<button>`.
  - `Section({ id?, tone?: "cream"|"lavender"|"white"|"purple"|"teal", className?, children })` renders `<section>` with an inner max-width container.
  - `SectionHeading({ eyebrow?, title, body?, center?, onDark? })` renders eyebrow, `<h2>`, body.

- [ ] **Step 1: Write failing tests**

`Button.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders an internal link", () => {
    render(<Button href="/schools">For Schools</Button>);
    const el = screen.getByRole("link", { name: "For Schools" });
    expect(el).toHaveAttribute("href", "/schools");
    expect(el).not.toHaveAttribute("target");
  });
  it("opens external links safely", () => {
    render(<Button href="https://wa.me/1">Chat</Button>);
    const el = screen.getByRole("link", { name: "Chat" });
    expect(el).toHaveAttribute("target", "_blank");
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("does not open tel/mailto in a new tab", () => {
    render(<Button href="tel:+911">Call</Button>);
    expect(screen.getByRole("link", { name: "Call" })).not.toHaveAttribute("target");
  });
  it("renders a button without href", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute("type", "button");
  });
});
```

`Section.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Section, SectionHeading } from "./Section";

describe("Section", () => {
  it("renders children inside a section with the id", () => {
    const { container } = render(
      <Section id="gifts"><p>hello</p></Section>,
    );
    expect(container.querySelector("section#gifts")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders eyebrow, h2 and body", () => {
    render(<SectionHeading eyebrow="THE PROCESS" title="How it works" body="Four steps" />);
    expect(screen.getByText("THE PROCESS")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "How it works" })).toBeInTheDocument();
    expect(screen.getByText("Four steps")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/ui`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `Button.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal";

const variants: Record<Variant, string> = {
  primary: "bg-brand-purple text-white hover:bg-brand-purple-dark shadow-md",
  secondary: "bg-white text-brand-teal border-2 border-brand-teal hover:bg-brand-teal-soft",
  ghost: "text-brand-purple hover:bg-brand-purple-soft",
  onDark: "bg-white text-brand-purple hover:bg-brand-gold-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  type = "button",
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href) {
    if (/^https?:/.test(href)) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    if (/^(mailto|tel):/.test(href)) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Implement `Section.tsx`**

```tsx
import type { ReactNode } from "react";

type Tone = "cream" | "lavender" | "white" | "purple" | "teal";

const tones: Record<Tone, string> = {
  cream: "bg-brand-cream text-ink",
  lavender: "bg-brand-purple-soft text-ink",
  white: "bg-white text-ink",
  purple: "bg-brand-purple text-white",
  teal: "bg-brand-teal text-white",
};

export function Section({
  id,
  tone = "cream",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20`}>
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 ${className}`.trim()}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = true,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  onDark?: boolean;
}) {
  const align = center ? "text-center mx-auto" : "";
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${align}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-bold uppercase tracking-widest ${
            onDark ? "text-brand-gold" : "text-brand-teal"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight md:text-4xl">{title}</h2>
      {body && (
        <p className={`mt-3 text-base md:text-lg ${onDark ? "text-white/85" : "text-ink-soft"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `cd web && npx vitest run src/components/ui`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/ui
git commit -m "feat: add Button, Section and SectionHeading"
```

---

### Task 5: Media placeholder components

**Files:**
- Create: `web/src/components/media/ImageSlot.tsx`, `ImageSlot.test.tsx`, `VideoSlot.tsx`, `VideoSlot.test.tsx`

**Interfaces:**
- Produces:
  - `ImageSlot({ id: string, label: string, alt: string, src?: string, aspect?: string, className?: string, priority?: boolean })`. No `src`: dashed placeholder with `data-slot={id}`, shows `id` and `label`, `role="img"`, `aria-label={alt}`. With `src`: `next/image` filling a relatively positioned box (`aspect` is a Tailwind class such as `aspect-[4/3]`, default `aspect-[4/3]`).
  - `VideoSlot({ id: string, label: string, title: string, src?: string, poster?: string, captionsSrc?: string, className?: string })`. No `src`: placeholder with a play icon and `data-slot={id}`. With `src`: `<video controls playsInline preload="metadata">`.
- Owner swaps media later by passing `src` from content files; layout code never changes.

- [ ] **Step 1: Write failing tests**

`ImageSlot.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageSlot } from "./ImageSlot";

describe("ImageSlot", () => {
  it("renders a labelled placeholder without src", () => {
    render(<ImageSlot id="IMG-01" label="Hero covers" alt="Fanned storybook covers" />);
    const el = screen.getByRole("img", { name: "Fanned storybook covers" });
    expect(el).toHaveAttribute("data-slot", "IMG-01");
    expect(el).toHaveTextContent("IMG-01");
    expect(el).toHaveTextContent("Hero covers");
  });
  it("renders a real image with src", () => {
    render(<ImageSlot id="IMG-01" label="x" alt="Covers" src="/media/hero.jpg" />);
    expect(screen.getByAltText("Covers")).toBeInTheDocument();
  });
});
```

`VideoSlot.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VideoSlot } from "./VideoSlot";

describe("VideoSlot", () => {
  it("renders a placeholder without src", () => {
    const { container } = render(<VideoSlot id="VID-02" label="Unboxing" title="Watch the book" />);
    expect(container.querySelector('[data-slot="VID-02"]')).toBeInTheDocument();
    expect(screen.getByText("Watch the book")).toBeInTheDocument();
  });
  it("renders a video element with src", () => {
    const { container } = render(
      <VideoSlot id="VID-02" label="x" title="Watch" src="/media/a.mp4" poster="/media/a.jpg" />,
    );
    const v = container.querySelector("video");
    expect(v).toHaveAttribute("src", "/media/a.mp4");
    expect(v).toHaveAttribute("poster", "/media/a.jpg");
    expect(v).toHaveAttribute("controls");
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/media`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `ImageSlot.tsx`**

```tsx
import Image from "next/image";

export function ImageSlot({
  id,
  label,
  alt,
  src,
  aspect = "aspect-[4/3]",
  className = "",
  priority = false,
}: {
  id: string;
  label: string;
  alt: string;
  src?: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-3xl ${aspect} ${className}`.trim()}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      data-slot={id}
      className={`flex flex-col items-center justify-center gap-1 rounded-3xl border-2 border-dashed border-brand-purple/40 bg-gradient-to-br from-brand-purple-soft to-brand-teal-soft p-4 text-center ${aspect} ${className}`.trim()}
    >
      <span className="text-xs font-bold tracking-widest text-brand-purple">{id}</span>
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  );
}
```

- [ ] **Step 4: Implement `VideoSlot.tsx`**

```tsx
export function VideoSlot({
  id,
  label,
  title,
  src,
  poster,
  captionsSrc,
  className = "",
}: {
  id: string;
  label: string;
  title: string;
  src?: string;
  poster?: string;
  captionsSrc?: string;
  className?: string;
}) {
  if (src) {
    return (
      <video
        className={`aspect-video w-full rounded-3xl bg-ink ${className}`.trim()}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
      >
        {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
      </video>
    );
  }
  return (
    <div
      data-slot={id}
      className={`flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-brand-purple/40 bg-gradient-to-br from-brand-purple to-brand-teal p-6 text-center text-white ${className}`.trim()}
    >
      <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-brand-purple">
        ▶
      </span>
      <span className="font-display text-xl">{title}</span>
      <span className="text-xs tracking-widest text-white/80">
        {id} · {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `cd web && npx vitest run src/components/media`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/media
git commit -m "feat: add ImageSlot and VideoSlot placeholders"
```

---

### Task 6: Site chrome (Header, MobileNav, Footer, sticky bar, WhatsApp button)

**Files:**
- Create: `web/src/components/chrome/Header.tsx`, `MobileNav.tsx`, `MobileNav.test.tsx`, `Footer.tsx`, `Footer.test.tsx`, `StickyMobileBar.tsx`, `WhatsAppFab.tsx`
- Modify: `web/src/app/layout.tsx`

**Interfaces:**
- Consumes: `nav`, `site`, `orderHref`, `whatsappLink`, `orderMessage` from `@/config/site`; `Button` from `@/components/ui/Button`.
- Produces: `Header()`, `MobileNav()` (client; toggles a menu with `aria-expanded`), `Footer()`, `StickyMobileBar()`, `WhatsAppFab()`.

- [ ] **Step 1: Write failing tests**

`MobileNav.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MobileNav } from "./MobileNav";

describe("MobileNav", () => {
  it("is closed initially and toggles open and closed", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "For Schools" })).not.toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "For Schools" })).toHaveAttribute("href", "/schools");

    await user.click(toggle);
    expect(screen.queryByRole("link", { name: "For Schools" })).not.toBeInTheDocument();
  });
});
```

`Footer.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows real contact details", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /storyphy25@gmail.com/ })).toHaveAttribute("href", "mailto:storyphy25@gmail.com");
    expect(screen.getByRole("link", { name: /\+91 78921 29651/ })).toHaveAttribute("href", "tel:+917892129651");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute("href", "https://www.instagram.com/storyphyy");
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", expect.stringContaining("https://wa.me/917892129651"));
  });
  it("mentions secure payment", () => {
    render(<Footer />);
    expect(screen.getByText(/secure payments/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/chrome`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `MobileNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-brand-purple hover:bg-brand-purple-soft"
      >
        <span aria-hidden className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
      </button>
      {open && (
        <nav
          id="mobile-menu"
          className="absolute left-0 right-0 top-full border-b border-line bg-white px-4 py-4 shadow-lg"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-bold text-ink hover:bg-brand-purple-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Implement `Header.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { nav, orderHref } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Link href="/" aria-label="Storyphy home">
          <Image src="/logo.jpg" alt="Storyphy - Dream. Read. Repeat." width={160} height={71} priority />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-ink-soft hover:text-brand-purple">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={orderHref} size="md">Order a Book</Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Implement `Footer.tsx`**

```tsx
import Link from "next/link";
import { nav, site, whatsappLink } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-white">Storyphy</p>
          <p className="mt-1 text-sm tracking-widest text-brand-gold">DREAM · READ · REPEAT</p>
          <p className="mt-4 text-sm">
            Personalized storybooks where every child is the hero. Made with love in India.
          </p>
        </div>
        <div>
          <p className="mb-3 font-bold text-white">Explore</p>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold text-white">Contact us</p>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><a href={site.phoneHref} className="hover:text-white">{site.phoneDisplay}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp us</a></li>
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        Secure payments · UPI, cards and netbanking · © {new Date().getFullYear()} Storyphy. Made with love in India.
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Implement `StickyMobileBar.tsx` and `WhatsAppFab.tsx`**

`StickyMobileBar.tsx`:
```tsx
import { orderHref, orderMessage, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <Button href={orderHref} size="md" className="flex-1">Order a Book</Button>
      <Button href={whatsappLink(orderMessage())} variant="secondary" size="md" className="flex-1">
        WhatsApp
      </Button>
    </div>
  );
}
```

`WhatsAppFab.tsx`:
```tsx
import { whatsappLink } from "@/config/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Storyphy! I have a question.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-lg hover:scale-105 md:flex"
    >
      <span aria-hidden>💬</span>
    </a>
  );
}
```

- [ ] **Step 7: Wire chrome into `layout.tsx`**

Replace the `<body>` line so the full file reads:
```tsx
import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { StickyMobileBar } from "@/components/chrome/StickyMobileBar";
import { WhatsAppFab } from "@/components/chrome/WhatsAppFab";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Storyphy - Personalized storybooks where your child is the hero",
  description:
    "Premium personalized hardcover storybooks. You approve the preview before we print. Delivered across India in 7-10 days.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="pb-20 md:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Run tests and build**

Run: `cd web && npm test && npm run build`
Expected: all PASS, build succeeds.

- [ ] **Step 9: Commit**

```bash
git add web/src
git commit -m "feat: add header, footer, mobile nav, sticky bar and WhatsApp button"
```

---

### Task 7: Home content data, Hero, trust strip, product video

**Files:**
- Create: `web/src/content/home.ts`, `web/src/components/home/Hero.tsx`, `Hero.test.tsx`, `ProductVideo.tsx`

**Interfaces:**
- Consumes: `Button`, `ImageSlot`, `VideoSlot`, `Section`/`SectionHeading`, `site`, `orderHref`, `whatsappLink`.
- Produces (from `@/content/home`): `hero`, `collections`, `howItWorks`, `whyReading`, `lookInside`, `parentStories`, `occasions`, `schoolsBand`, `safety`, `faq`, `finalCta`. Tasks 8-9 add nothing to this file; every export is defined here in Step 3 so later tasks only import.

- [ ] **Step 1: Write the failing Hero test**

`Hero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("shows the headline and primary CTA", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /hero of their own story/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Order Their Book" })).toHaveAttribute("href", "/#collections");
  });
  it("routes schools to /schools", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /ordering for a school/i })).toHaveAttribute("href", "/schools");
  });
  it("shows the four trust points with 500+ families", () => {
    render(<Hero />);
    expect(screen.getByText("500+ families")).toBeInTheDocument();
    expect(screen.getByText("You approve before we print")).toBeInTheDocument();
    expect(screen.getByText("Photos handled securely")).toBeInTheDocument();
    expect(screen.getByText("Delivered in 7-10 days")).toBeInTheDocument();
  });
  it("has the hero image slot", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('[data-slot="IMG-01"]')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/home/Hero.test.tsx`
Expected: FAIL, module not found.

- [ ] **Step 3: Create `src/content/home.ts`**

```ts
export const hero = {
  eyebrow: "Personalized storybooks for ages 2-8",
  headline: "Every child deserves to be the hero of their own story.",
  sub: "A premium hardcover storybook made for your child, handled with care from their photo to your doorstep.",
  primaryCta: "Order Their Book",
  secondaryCta: "Watch how it looks",
  schoolsLink: "Ordering for a school?",
  trust: [
    { icon: "👨‍👩‍👧", text: "500+ families" },
    { icon: "🔒", text: "Photos handled securely" },
    { icon: "✅", text: "You approve before we print" },
    { icon: "🚚", text: "Delivered in 7-10 days" },
  ],
} as const;

export const productVideo = {
  eyebrow: "See it in real life",
  title: "This is what arrives at your door",
  body: "Unboxing, flipping the pages, and the moment a child finds their own name in the story.",
} as const;

export type Collection = {
  slug: string;
  title: string;
  ages: string;
  hook: string;
  price: string;
  imageId: string;
  comingSoon?: boolean;
};

export const collections: Collection[] = [
  { slug: "alphabet-adventure", title: "Alphabet Adventure", ages: "Ages 2-6", hook: "26 magical pages: one letter, one adventure at a time.", price: "[PRICE-STANDARD]", imageId: "IMG-04" },
  { slug: "bedtime-stories", title: "Bedtime Stories", ages: "Ages 3-7", hook: "Dreamy tales that wind down the day, with your child as the sleepy hero.", price: "[PRICE-STANDARD]", imageId: "IMG-05" },
  { slug: "adventure-collection", title: "Adventure Collection", ages: "Ages 4-8", hook: "Jungles, oceans and mountains: your child explores them all.", price: "[PRICE-STANDARD]", imageId: "IMG-06" },
  { slug: "birthday-edition", title: "Birthday Edition", ages: "Gift special", hook: "The most memorable birthday gift: a book that is entirely about them.", price: "[PRICE-STANDARD]", imageId: "IMG-07" },
  { slug: "christmas-edition", title: "Christmas Edition", ages: "Festive special", hook: "Santa, elves and magic, with your child as the star of Christmas night.", price: "[PRICE-STANDARD]", imageId: "IMG-08" },
  { slug: "more-coming", title: "More collections", ages: "Coming soon", hook: "New themes and stories are in the works.", price: "", imageId: "IMG-08", comingSoon: true },
];

export const howItWorks = {
  eyebrow: "How it works",
  title: "Four simple steps",
  body: "We handle the hard part. You just share a few details.",
  steps: [
    { icon: "📝", title: "Share your child's details", body: "Pick a book and tell us your child's name, age and photo. It takes about 2 minutes." },
    { icon: "🔒", title: "Pay securely", body: "Pay with UPI, card or netbanking. Your photos stay private." },
    { icon: "🎨", title: "Get your preview in 24 hours", body: "We design your book and send a full preview on WhatsApp or email." },
    { icon: "📦", title: "Approve, and it's on its way", body: "Nothing is printed until you say yes. Then it arrives in 7-10 days." },
  ],
  promise: "Nothing is printed until you say yes.",
} as const;

export const whyReading = {
  eyebrow: "Why it matters",
  title: "The moment they find themselves in the story",
  body: "When children see themselves as the hero, reading stops being a task and becomes an adventure.",
  items: [
    { icon: "📚", title: "Better vocabulary", body: "They pick up new words while enjoying a story about themselves." },
    { icon: "🧠", title: "Boosts creativity", body: "Seeing themselves in imaginative worlds helps them dream bigger." },
    { icon: "❤️", title: "Parent-child bond", body: "Reading together creates memories that last a lifetime." },
    { icon: "🎓", title: "Early learning", body: "Builds language, confidence and communication for school." },
    { icon: "🌙", title: "Calmer bedtimes", body: "A screen-free ritual children look forward to every night." },
    { icon: "😊", title: "Reluctant readers, hooked", body: "Children love books when they are the hero." },
  ],
} as const;

export const lookInside = {
  eyebrow: "Look inside",
  title: "Real pages, real quality",
  body: "This is our sample book. Yours is made the same way, with your child's name and photo.",
  specs: [
    { icon: "📖", label: "Premium hardcover" },
    { icon: "🖨️", label: "Full-colour print on every page" },
    { icon: "🎁", label: "Gift-ready packaging" },
    { icon: "✍️", label: "Dedication page for your message" },
  ],
  slotIds: ["IMG-18", "IMG-19", "IMG-20", "IMG-21"],
} as const;

export const parentStories = {
  eyebrow: "500+ families",
  title: "Loved by 500+ families",
  body: "Real reactions from real readers.",
  stories: [
    { quote: "[PARENT-QUOTE-1]", name: "[PARENT-NAME-1]", detail: "[CHILD-AGE, CITY]", imageId: "IMG-24" },
    { quote: "[PARENT-QUOTE-2]", name: "[PARENT-NAME-2]", detail: "[CHILD-AGE, CITY]", imageId: "IMG-25" },
    { quote: "[PARENT-QUOTE-3]", name: "[PARENT-NAME-3]", detail: "[CHILD-AGE, CITY]", imageId: "IMG-26" },
  ],
} as const;

export const occasions = {
  eyebrow: "Gifting",
  title: "The gift they'll keep forever",
  body: "Pick an occasion. We can add a gift note and deliver straight to the recipient.",
  items: [
    { icon: "🎂", title: "Birthday", body: "A book that is all about the birthday star." },
    { icon: "🎄", title: "Christmas", body: "Santa, elves and magic, with them at the centre." },
    { icon: "👶", title: "New sibling", body: "Welcome the little one, together." },
    { icon: "👵", title: "From grandparents", body: "A keepsake that says 'I thought of you'." },
    { icon: "🎒", title: "Back to school", body: "A confidence boost for a big new chapter." },
  ],
  note: "Gift note and gift-ready packaging available.",
} as const;

export const schoolsBand = {
  eyebrow: "For schools",
  title: "Preschool or school? Give every child their own book.",
  bullets: [
    "A keepsake for annual day or graduation",
    "Delighted parents, and a school that stands out",
    "We handle photos and consent forms, so it's easy for your team",
  ],
  primaryCta: "Get a school quote",
  secondaryCta: "Request a sample kit",
} as const;

export const safety = {
  eyebrow: "Safe and private",
  title: "Your child's photos, handled with care",
  body: "We treat every photo the way we'd want ours treated.",
  points: [
    "We use photos only to create your child's book.",
    "Only our small design team can see them.",
    "You can ask us to delete them any time on WhatsApp or email.",
    "Payments are processed securely. We never see your card details.",
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "Questions? We've got answers",
  items: [
    { q: "Can I see my book before it's printed?", a: "Yes. Within 24 hours of your order we send a full preview on WhatsApp or email. Nothing is printed until you approve it." },
    { q: "Are my child's photos safe?", a: "Yes. We use photos only to make your book, only our design team sees them, and we delete them whenever you ask." },
    { q: "How long does delivery take?", a: "Your book arrives in 7-10 days after you approve the preview." },
    { q: "Do you deliver across India?", a: "Yes, we deliver to all major cities and towns across India." },
    { q: "Can I order it as a gift?", a: "Of course. Add a gift note and gift-ready packaging, and we can deliver directly to the recipient." },
    { q: "How do I pay?", a: "Pay securely with UPI, cards or netbanking." },
    { q: "Which ages are the books for?", a: "Our books are made for children aged 2-8, though children of every age love seeing themselves in a story." },
    { q: "I have another question.", a: "Message us on WhatsApp and a real person will reply." },
  ],
} as const;

export const finalCta = {
  title: "Ready to make them the hero?",
  body: "Choose a book, share a few details, and we'll take it from here.",
  primaryCta: "Order Their Book",
  secondaryCta: "Ask us on WhatsApp",
} as const;
```

- [ ] **Step 4: Implement `Hero.tsx`**

```tsx
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { hero } from "@/content/home";
import { orderHref } from "@/config/site";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-purple-soft to-brand-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 inline-block rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold text-brand-purple">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            Every child deserves to be the <span className="text-brand-purple">hero</span> of their own{" "}
            <span className="text-brand-teal">story</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={orderHref} size="lg">{hero.primaryCta}</Button>
            <Button href="#see-it" variant="secondary" size="lg">{hero.secondaryCta}</Button>
          </div>
          <p className="mt-4 text-sm">
            <a href="/schools" className="font-bold text-brand-teal underline-offset-4 hover:underline">
              {hero.schoolsLink}
            </a>
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-bold text-ink-soft">
            {hero.trust.map((t) => (
              <li key={t.text} className="flex items-center gap-2">
                <span aria-hidden>{t.icon}</span>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <ImageSlot
          id="IMG-01"
          label="Fanned book covers with a joyful child on a brand-colour burst"
          alt="Personalized Storyphy storybooks fanned out beside a happy child"
          aspect="aspect-square"
          priority
        />
      </div>
    </section>
  );
}
```
The headline is split across spans for colour; the test uses a regex on the accessible name, which concatenates the text.

- [ ] **Step 5: Implement `ProductVideo.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoSlot } from "@/components/media/VideoSlot";
import { productVideo } from "@/content/home";

export function ProductVideo() {
  return (
    <Section id="see-it" tone="white">
      <SectionHeading eyebrow={productVideo.eyebrow} title={productVideo.title} body={productVideo.body} />
      <div className="mx-auto max-w-3xl">
        <VideoSlot id="VID-02" label="30-60s unboxing, flip-through and child reaction, captions on" title="Watch the book come to life" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Run tests**

Run: `cd web && npm test`
Expected: PASS (Hero tests and the copy-rules test, which now scans `home.ts`).

- [ ] **Step 7: Commit**

```bash
git add web/src
git commit -m "feat: add home content data, hero and product video sections"
```

---

### Task 8: Collections, How it works, Why reading

**Files:**
- Create: `web/src/components/home/Collections.tsx`, `Collections.test.tsx`, `HowItWorks.tsx`, `HowItWorks.test.tsx`, `WhyReading.tsx`

**Interfaces:**
- Consumes: `collections`, `howItWorks`, `whyReading` from `@/content/home`; `whatsappLink`, `orderMessage` from `@/config/site`.
- Produces: `Collections()` (section `#collections`), `HowItWorks()` (section `#how-it-works`), `WhyReading()`.

- [ ] **Step 1: Write failing tests**

`Collections.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Collections } from "./Collections";
import { collections } from "@/content/home";

describe("Collections", () => {
  it("renders one card per collection", () => {
    render(<Collections />);
    for (const c of collections) {
      expect(screen.getByRole("heading", { name: c.title })).toBeInTheDocument();
    }
  });
  it("sends the order to WhatsApp with the book title", () => {
    render(<Collections />);
    const links = screen.getAllByRole("link", { name: "Order this book" });
    expect(links).toHaveLength(5);
    expect(links[1].getAttribute("href")).toContain(encodeURIComponent("Bedtime Stories"));
  });
  it("shows price placeholders, never a real amount", () => {
    render(<Collections />);
    expect(screen.getAllByText(/\[PRICE-STANDARD\]/).length).toBe(5);
  });
  it("has a notify-me card for coming-soon", () => {
    render(<Collections />);
    expect(screen.getByRole("link", { name: "Notify me" })).toBeInTheDocument();
  });
});
```

`HowItWorks.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("lists four ordered steps", () => {
    render(<HowItWorks />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
  it("states the approval promise and the 24 hour preview", () => {
    render(<HowItWorks />);
    expect(screen.getAllByText(/Nothing is printed until you say yes/).length).toBeGreaterThan(0);
    expect(screen.getByText(/preview in 24 hours/i)).toBeInTheDocument();
  });
  it("is anchored as #how-it-works", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector("section#how-it-works")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/home/Collections.test.tsx src/components/home/HowItWorks.test.tsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `Collections.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { collections } from "@/content/home";
import { orderMessage, whatsappLink } from "@/config/site";

export function Collections() {
  return (
    <Section id="collections" tone="cream">
      <SectionHeading
        eyebrow="Our books"
        title="Pick the story they'll love"
        body="Every book is personalized with your child's name and photo."
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <li key={c.slug} className="flex flex-col rounded-3xl border border-line bg-white p-4 shadow-sm">
            <ImageSlot
              id={c.imageId}
              label={`${c.title} cover`}
              alt={`${c.title} storybook cover`}
              aspect="aspect-[4/5]"
            />
            <div className="mt-4 flex flex-1 flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">{c.ages}</p>
              <h3 className="mt-1 font-display text-2xl">{c.title}</h3>
              <p className="mt-2 flex-1 text-ink-soft">{c.hook}</p>
              {c.comingSoon ? (
                <Button
                  href={whatsappLink("Hi Storyphy! Please notify me when new collections launch.")}
                  variant="secondary"
                  className="mt-4"
                >
                  Notify me
                </Button>
              ) : (
                <>
                  <p className="mt-3 text-sm font-bold text-ink">From {c.price}</p>
                  <Button href={whatsappLink(orderMessage(c.title))} className="mt-3">
                    Order this book
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 4: Implement `HowItWorks.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { howItWorks } from "@/content/home";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="lavender">
      <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} body={howItWorks.body} />
      <ol className="grid gap-6 md:grid-cols-4">
        {howItWorks.steps.map((s, i) => (
          <li key={s.title} className="rounded-3xl bg-white p-6 text-center shadow-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-2xl text-white" aria-hidden>
              {s.icon}
            </span>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-brand-teal">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mx-auto mt-10 max-w-xl rounded-2xl bg-brand-gold-soft px-5 py-4 text-center font-bold text-ink">
        {howItWorks.promise}
      </p>
    </Section>
  );
}
```

- [ ] **Step 5: Implement `WhyReading.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageSlot } from "@/components/media/ImageSlot";
import { whyReading } from "@/content/home";

export function WhyReading() {
  return (
    <Section id="why-reading" tone="cream">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <ImageSlot
          id="IMG-13"
          label="A delighted child spotting their own name in a storybook"
          alt="A child delighted to find their own name in a storybook"
          aspect="aspect-[4/5]"
        />
        <div>
          <SectionHeading center={false} eyebrow={whyReading.eyebrow} title={whyReading.title} body={whyReading.body} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyReading.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-4">
                <span aria-hidden className="text-2xl">{item.icon}</span>
                <h3 className="mt-1 font-bold">{item.title}</h3>
                <p className="text-sm text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Run tests**

Run: `cd web && npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add web/src/components/home
git commit -m "feat: add collections, how-it-works and why-reading sections"
```

---

### Task 9: Remaining home sections (look inside, families, gifting, schools band, safety, FAQ, final CTA)

**Files:**
- Create: `web/src/components/home/LookInside.tsx`, `ParentStories.tsx`, `Gifting.tsx`, `SchoolsBand.tsx`, `Safety.tsx`, `Faq.tsx`, `FinalCta.tsx`, `sections.test.tsx`

**Interfaces:**
- Consumes: `lookInside`, `parentStories`, `occasions`, `schoolsBand`, `safety`, `faq`, `finalCta` from `@/content/home`; `Section`, `SectionHeading`, `Button`, `ImageSlot`, `VideoSlot`; `orderHref`, `whatsappLink`, `orderMessage`.
- Produces: `LookInside()`, `ParentStories()` (section `#families`), `Gifting()` (section `#gifts`), `SchoolsBand()`, `Safety()`, `Faq()`, `FinalCta()`.

- [ ] **Step 1: Write the failing tests**

`sections.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LookInside } from "./LookInside";
import { ParentStories } from "./ParentStories";
import { Gifting } from "./Gifting";
import { SchoolsBand } from "./SchoolsBand";
import { Safety } from "./Safety";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { faq } from "@/content/home";

describe("LookInside", () => {
  it("shows four sample-page slots and the close-up video slot", () => {
    const { container } = render(<LookInside />);
    expect(container.querySelectorAll('[data-slot^="IMG-"]')).toHaveLength(4);
    expect(container.querySelector('[data-slot="VID-03"]')).toBeInTheDocument();
    expect(screen.getAllByText(/sample book/i).length).toBeGreaterThan(0);
  });
});

describe("ParentStories", () => {
  it("is the #families anchor with three stories and the 500+ claim", () => {
    const { container } = render(<ParentStories />);
    expect(container.querySelector("section#families")).toBeInTheDocument();
    expect(container.querySelectorAll("blockquote")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Loved by 500+ families" })).toBeInTheDocument();
  });
});

describe("Gifting", () => {
  it("is the #gifts anchor with five occasions", () => {
    const { container } = render(<Gifting />);
    expect(container.querySelector("section#gifts")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });
});

describe("SchoolsBand", () => {
  it("links to the quote form and the sample kit", () => {
    render(<SchoolsBand />);
    expect(screen.getByRole("link", { name: "Get a school quote" })).toHaveAttribute("href", "/schools/quote");
    expect(screen.getByRole("link", { name: "Request a sample kit" })).toHaveAttribute("href", "/schools#sample-kit");
  });
  it("makes no claim about schools served", () => {
    const { container } = render(<SchoolsBand />);
    expect(container.textContent).not.toMatch(/trusted by|schools? (we've|we have)/i);
  });
});

describe("Safety", () => {
  it("lists the privacy promises", () => {
    render(<Safety />);
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(4);
  });
});

describe("Faq", () => {
  it("renders every question as a native disclosure", () => {
    const { container } = render(<Faq />);
    expect(container.querySelectorAll("details")).toHaveLength(faq.items.length);
    expect(screen.getByText("Can I see my book before it's printed?")).toBeInTheDocument();
  });
});

describe("FinalCta", () => {
  it("has an order link and a WhatsApp link", () => {
    render(<FinalCta />);
    expect(screen.getByRole("link", { name: "Order Their Book" })).toHaveAttribute("href", "/#collections");
    expect(screen.getByRole("link", { name: "Ask us on WhatsApp" })).toHaveAttribute("href", expect.stringContaining("wa.me/917892129651"));
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/home/sections.test.tsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `LookInside.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageSlot } from "@/components/media/ImageSlot";
import { VideoSlot } from "@/components/media/VideoSlot";
import { lookInside } from "@/content/home";

export function LookInside() {
  return (
    <Section id="look-inside" tone="white">
      <SectionHeading eyebrow={lookInside.eyebrow} title={lookInside.title} body={lookInside.body} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lookInside.slotIds.map((id, i) => (
          <ImageSlot
            key={id}
            id={id}
            label={`Sample book spread ${i + 1}`}
            alt={`Sample book spread ${i + 1}`}
            aspect="aspect-[4/3]"
          />
        ))}
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {lookInside.specs.map((s) => (
          <li key={s.label} className="flex items-center gap-3 rounded-2xl bg-brand-purple-soft px-4 py-3 text-sm font-bold">
            <span aria-hidden className="text-xl">{s.icon}</span>
            {s.label}
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-10 max-w-3xl">
        <VideoSlot id="VID-03" label="Paper, binding and size-in-hand close-ups" title="Feel the quality" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Implement `ParentStories.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageSlot } from "@/components/media/ImageSlot";
import { parentStories } from "@/content/home";

export function ParentStories() {
  return (
    <Section id="families" tone="lavender">
      <SectionHeading eyebrow={parentStories.eyebrow} title={parentStories.title} body={parentStories.body} />
      <ul className="grid gap-6 md:grid-cols-3">
        {parentStories.stories.map((s) => (
          <li key={s.name} className="rounded-3xl bg-white p-5 shadow-sm">
            <ImageSlot id={s.imageId} label="Real photo of the child with their book" alt="A child with their Storyphy book" aspect="aspect-[4/3]" />
            <blockquote className="mt-4 text-ink">{s.quote}</blockquote>
            <p className="mt-3 text-sm font-bold">{s.name}</p>
            <p className="text-xs text-ink-soft">{s.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 5: Implement `Gifting.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { occasions } from "@/content/home";
import { whatsappLink } from "@/config/site";

export function Gifting() {
  return (
    <Section id="gifts" tone="cream">
      <SectionHeading eyebrow={occasions.eyebrow} title={occasions.title} body={occasions.body} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {occasions.items.map((o) => (
          <li key={o.title} className="rounded-3xl border border-line bg-white p-5 text-center">
            <span aria-hidden className="text-3xl">{o.icon}</span>
            <h3 className="mt-2 font-display text-lg">{o.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{o.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-ink-soft">{occasions.note}</p>
      <div className="mt-4 text-center">
        <Button href={whatsappLink("Hi Storyphy! I'd like to order a book as a gift.")} variant="secondary">
          Order as a gift
        </Button>
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Implement `SchoolsBand.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { schoolsBand } from "@/content/home";

export function SchoolsBand() {
  return (
    <Section id="for-schools" tone="purple">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">{schoolsBand.eyebrow}</p>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">{schoolsBand.title}</h2>
          <ul className="mt-5 space-y-2 text-white/90">
            {schoolsBand.bullets.map((b) => (
              <li key={b} className="flex gap-2"><span aria-hidden>✓</span>{b}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/schools/quote" variant="onDark" size="lg">{schoolsBand.primaryCta}</Button>
            <Button href="/schools#sample-kit" variant="onDark" size="lg">{schoolsBand.secondaryCta}</Button>
          </div>
        </div>
        <ImageSlot id="IMG-37" label="Classroom of children with their books" alt="Children in a classroom holding their personalized books" aspect="aspect-[4/3]" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 7: Implement `Safety.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { safety } from "@/content/home";

export function Safety() {
  return (
    <Section id="safety" tone="white">
      <SectionHeading eyebrow={safety.eyebrow} title={safety.title} body={safety.body} />
      <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        {safety.points.map((p) => (
          <li key={p} className="flex gap-3 rounded-2xl bg-brand-teal-soft p-4 text-sm">
            <span aria-hidden>🔒</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 8: Implement `Faq.tsx`** (native `<details>`, works without JavaScript)

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/content/home";

export function Faq() {
  return (
    <Section id="faq" tone="cream">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.items.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-line bg-white p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {item.q}
              <span aria-hidden className="text-brand-purple transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 9: Implement `FinalCta.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";
import { orderHref, whatsappLink } from "@/config/site";

export function FinalCta() {
  return (
    <Section id="start" tone="teal" className="text-center">
      <h2 className="font-display text-3xl md:text-5xl">{finalCta.title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">{finalCta.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={orderHref} variant="onDark" size="lg">{finalCta.primaryCta}</Button>
        <Button href={whatsappLink()} variant="onDark" size="lg">{finalCta.secondaryCta}</Button>
      </div>
    </Section>
  );
}
```

- [ ] **Step 10: Run tests**

Run: `cd web && npm test`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add web/src/components/home
git commit -m "feat: add look-inside, families, gifting, schools band, safety, FAQ and final CTA"
```

---

### Task 10: Compose the home page and verify in a browser

**Files:**
- Modify: `web/src/app/page.tsx` (replace), `web/src/components/home/Hero.tsx` (use `next/link` for the schools link)
- Create: `web/src/app/page.test.tsx`

**Interfaces:**
- Consumes: all home section components.
- Produces: the `/` route with anchors `#see-it`, `#collections`, `#how-it-works`, `#why-reading`, `#look-inside`, `#families`, `#gifts`, `#for-schools`, `#safety`, `#faq`, `#start` (all `nav` hrefs resolve).

- [ ] **Step 1: Write the failing page test**

`web/src/app/page.test.tsx`:
```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";
import { nav } from "@/config/site";

describe("Home page", () => {
  it("has exactly one h1", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("resolves every on-page nav anchor", () => {
    const { container } = render(<Home />);
    for (const item of nav) {
      if (item.href.startsWith("/#")) {
        const id = item.href.slice(2);
        expect(container.querySelector(`#${id}`), `missing #${id}`).toBeInTheDocument();
      }
    }
  });
  it("renders sections in journey order", () => {
    const { container } = render(<Home />);
    const ids = ["see-it", "collections", "how-it-works", "look-inside", "families", "gifts", "for-schools", "safety", "faq", "start"];
    const positions = ids.map((id) => {
      const el = container.querySelector(`#${id}`);
      expect(el, `missing #${id}`).toBeInTheDocument();
      return Array.from(container.querySelectorAll("section")).indexOf(el as HTMLElement);
    });
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/app/page.test.tsx`
Expected: FAIL (smoke page has none of the sections).

- [ ] **Step 3: Replace `page.tsx`**

```tsx
import { Hero } from "@/components/home/Hero";
import { ProductVideo } from "@/components/home/ProductVideo";
import { Collections } from "@/components/home/Collections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyReading } from "@/components/home/WhyReading";
import { LookInside } from "@/components/home/LookInside";
import { ParentStories } from "@/components/home/ParentStories";
import { Gifting } from "@/components/home/Gifting";
import { SchoolsBand } from "@/components/home/SchoolsBand";
import { Safety } from "@/components/home/Safety";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductVideo />
      <Collections />
      <HowItWorks />
      <WhyReading />
      <LookInside />
      <ParentStories />
      <Gifting />
      <SchoolsBand />
      <Safety />
      <Faq />
      <FinalCta />
    </>
  );
}
```

- [ ] **Step 4: Use `next/link` in Hero**

In `Hero.tsx` add `import Link from "next/link";` and replace the `<a href="/schools" ...>...</a>` element with `<Link href="/schools" className="font-bold text-brand-teal underline-offset-4 hover:underline">{hero.schoolsLink}</Link>`.

- [ ] **Step 5: Run tests, lint and build**

Run: `cd web && npm test && npm run lint && npm run build`
Expected: all PASS.

- [ ] **Step 6: Verify visually in a browser**

Run: `cd web && npm run dev` (background), open `http://localhost:3000`.
Check at 1280px and at 375px width (mobile):
- All 12 sections render, no blank gaps, no horizontal scroll at 375px.
- Header nav on desktop; hamburger works on mobile; sticky bottom bar visible on mobile only; WhatsApp button visible on desktop only.
- "Order this book" opens WhatsApp with the book title; FAQ items expand.
- Placeholder boxes show their IDs (IMG-01, VID-02 ...).

- [ ] **Step 7: Commit**

```bash
git add web/src
git commit -m "feat: compose the home page"
```

---

### Task 11: Quote validation and message builder

**Files:**
- Create: `web/src/lib/quote.ts`, `web/src/lib/quote.test.ts`

**Interfaces:**
- Produces:
  - `type QuoteInput = { school: string; city: string; contactName: string; role: string; children: string; occasion: string; targetDate: string; phone: string; email: string }`
  - `type QuoteErrors = Partial<Record<keyof QuoteInput, string>>`
  - `validateQuote(input: QuoteInput): QuoteErrors` (empty object means valid)
  - `buildQuoteMessage(input: QuoteInput): string`
- There is no minimum order size. `children` is optional; if given it must be a whole number of at least 1.

- [ ] **Step 1: Write the failing tests**

`quote.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { validateQuote, buildQuoteMessage, type QuoteInput } from "./quote";

const valid: QuoteInput = {
  school: "Sunflower Preschool",
  city: "Pune",
  contactName: "Vandana",
  role: "Coordinator",
  children: "25",
  occasion: "Graduation day",
  targetDate: "2026-12-10",
  phone: "+91 78921 29651",
  email: "school@example.com",
};

describe("validateQuote", () => {
  it("accepts a complete valid request", () => {
    expect(validateQuote(valid)).toEqual({});
  });
  it("requires school, city, contact name and phone", () => {
    const errors = validateQuote({ ...valid, school: "", city: " ", contactName: "", phone: "" });
    expect(Object.keys(errors).sort()).toEqual(["city", "contactName", "phone", "school"]);
  });
  it("rejects a malformed phone number", () => {
    expect(validateQuote({ ...valid, phone: "12345" }).phone).toBeTruthy();
  });
  it("accepts a phone with spaces, dashes and country code", () => {
    expect(validateQuote({ ...valid, phone: "91-78921-29651" }).phone).toBeUndefined();
  });
  it("treats email as optional but validates it when present", () => {
    expect(validateQuote({ ...valid, email: "" }).email).toBeUndefined();
    expect(validateQuote({ ...valid, email: "not-an-email" }).email).toBeTruthy();
  });
  it("has no minimum order: 1 child is fine, 0 or text is not", () => {
    expect(validateQuote({ ...valid, children: "1" }).children).toBeUndefined();
    expect(validateQuote({ ...valid, children: "" }).children).toBeUndefined();
    expect(validateQuote({ ...valid, children: "0" }).children).toBeTruthy();
    expect(validateQuote({ ...valid, children: "many" }).children).toBeTruthy();
  });
});

describe("buildQuoteMessage", () => {
  it("includes the filled fields", () => {
    const msg = buildQuoteMessage(valid);
    expect(msg).toContain("Sunflower Preschool");
    expect(msg).toContain("Pune");
    expect(msg).toContain("25");
    expect(msg).toContain("Graduation day");
  });
  it("skips empty optional fields", () => {
    const msg = buildQuoteMessage({ ...valid, role: "", email: "", occasion: "" });
    expect(msg).not.toMatch(/Role:|Email:|Occasion:/);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/lib/quote.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `quote.ts`**

```ts
export type QuoteInput = {
  school: string;
  city: string;
  contactName: string;
  role: string;
  children: string;
  occasion: string;
  targetDate: string;
  phone: string;
  email: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

export function validateQuote(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!input.school.trim()) errors.school = "Please enter your school's name.";
  if (!input.city.trim()) errors.city = "Please enter your city.";
  if (!input.contactName.trim()) errors.contactName = "Please enter a contact name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(input.phone))) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }
  if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (input.children.trim() && !/^[1-9]\d*$/.test(input.children.trim())) {
    errors.children = "Please enter a whole number of children.";
  }
  return errors;
}

export function buildQuoteMessage(input: QuoteInput): string {
  const lines: [string, string][] = [
    ["School", input.school],
    ["City", input.city],
    ["Contact", input.contactName],
    ["Role", input.role],
    ["Phone", input.phone],
    ["Email", input.email],
    ["Approx. children", input.children],
    ["Occasion", input.occasion],
    ["Target date", input.targetDate],
  ];
  const body = lines
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join("\n");
  return `Hi Storyphy! We'd like a school quote.\n${body}`;
}
```

- [ ] **Step 4: Run tests**

Run: `cd web && npx vitest run src/lib/quote.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/lib
git commit -m "feat: add school quote validation and message builder"
```

---

### Task 12: Schools page and quote form

**Files:**
- Create: `web/src/content/schools.ts`, `web/src/components/schools/SchoolsPage.tsx`, `QuoteForm.tsx`, `QuoteForm.test.tsx`, `web/src/app/schools/page.tsx`, `web/src/app/schools/quote/page.tsx`
- Modify: `web/src/components/home/Faq.tsx` (accept optional content)

**Interfaces:**
- Consumes: `validateQuote`, `buildQuoteMessage`, `QuoteInput` from `@/lib/quote`; `whatsappLink`, `site`; `Section`, `SectionHeading`, `Button`, `ImageSlot`, `VideoSlot`; `faq` shape from `@/content/home`.
- Produces: `SchoolsPage()`, `QuoteForm()`, and `Faq({ content?, id? })` where `content` is `{ eyebrow: string; title: string; items: readonly { q: string; a: string }[] }` (default: the home `faq`).
- The form validates, then opens WhatsApp with the prefilled message (`window.open(url, "_blank", "noopener")`) and shows a thank-you. A `mailto:` link is the fallback. No backend yet.

- [ ] **Step 1: Write the failing QuoteForm test**

`QuoteForm.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QuoteForm } from "./QuoteForm";

describe("QuoteForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows errors and does not open WhatsApp when required fields are empty", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.click(screen.getByRole("button", { name: /send on whatsapp/i }));
    expect(screen.getByText("Please enter your school's name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid 10-digit mobile number.")).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with the details and shows thanks when valid", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.type(screen.getByLabelText(/school name/i), "Sunflower Preschool");
    await user.type(screen.getByLabelText(/city/i), "Pune");
    await user.type(screen.getByLabelText(/your name/i), "Vandana");
    await user.type(screen.getByLabelText(/mobile number/i), "7892129651");
    await user.type(screen.getByLabelText(/approx\. number of children/i), "5");
    await user.click(screen.getByRole("button", { name: /send on whatsapp/i }));
    expect(open).toHaveBeenCalledTimes(1);
    const url = String(open.mock.calls[0][0]);
    expect(url).toContain("https://wa.me/917892129651?text=");
    expect(url).toContain(encodeURIComponent("Sunflower Preschool"));
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });

  it("offers an email fallback", () => {
    render(<QuoteForm />);
    expect(screen.getByRole("link", { name: /email us instead/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:storyphy25@gmail.com"),
    );
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd web && npx vitest run src/components/schools`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `QuoteForm.tsx`**

```tsx
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
```

- [ ] **Step 4: Run the form tests**

Run: `cd web && npx vitest run src/components/schools`
Expected: PASS.

- [ ] **Step 5: Make `Faq` reusable**

Replace `web/src/components/home/Faq.tsx` with:
```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/content/home";

type FaqContent = {
  eyebrow: string;
  title: string;
  items: readonly { q: string; a: string }[];
};

export function Faq({ content = faq, id = "faq" }: { content?: FaqContent; id?: string }) {
  return (
    <Section id={id} tone="cream">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />
      <div className="mx-auto max-w-3xl space-y-3">
        {content.items.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-line bg-white p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {item.q}
              <span aria-hidden className="text-brand-purple transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Create `src/content/schools.ts`**

```ts
export const schoolsHero = {
  eyebrow: "For preschools and schools",
  title: "A keepsake every child in your school will treasure",
  body: "Give each child their own personalized storybook for annual day, graduation or any special occasion. We handle the work, so it's easy for your team.",
  primaryCta: "Get a school quote",
  secondaryCta: "Request a sample kit",
} as const;

export const schoolsWhy = {
  eyebrow: "Why schools choose Storyphy",
  title: "Delighted children, delighted parents",
  items: [
    { icon: "🎓", title: "A keepsake for the big day", body: "Perfect for annual day, graduation and farewell events." },
    { icon: "😊", title: "Parents love it", body: "Every family gets a book their child stars in." },
    { icon: "🌟", title: "Stand out", body: "Offer something no other school in your area does." },
    { icon: "🤝", title: "Easy for your team", body: "We handle photos, consent forms, design and delivery." },
  ],
} as const;

export const schoolsProcess = {
  eyebrow: "How it works for schools",
  title: "Simple from quote to classroom",
  steps: [
    { title: "Tell us about your school", body: "Send a quote request. We reply with options and pricing." },
    { title: "We handle photos and consent", body: "We share a simple consent form and collect photos securely." },
    { title: "You review the previews", body: "We design every book and share previews with your coordinator. Nothing is printed until you approve." },
    { title: "Delivered to your school", body: "Books arrive at your school in 7-10 days after approval." },
  ],
} as const;

export const schoolsSafety = {
  eyebrow: "Safety and consent",
  title: "Children's photos, treated with care",
  points: [
    "Parents consent before any photo is used.",
    "Photos are used only to create the books.",
    "Only our small design team can see them.",
    "We delete photos after delivery, or any time you ask.",
  ],
} as const;

export const schoolsOptions = {
  eyebrow: "Options",
  title: "Choose what fits your school",
  items: [
    { title: "Classroom edition", body: "The same story for every child, each with their own name and photo.", price: "[PRICE-SCHOOL-CLASSROOM]" },
    { title: "Graduation edition", body: "A farewell keepsake for children moving on to the next chapter.", price: "[PRICE-SCHOOL-GRADUATION]" },
    { title: "Teacher gift edition", body: "A thank-you book for a favourite teacher.", price: "[PRICE-SCHOOL-TEACHER]" },
  ],
} as const;

export const sampleKit = {
  eyebrow: "Sample kit",
  title: "See and feel it before you decide",
  body: "We'll send a sample kit so your team can hold the book, check the print quality and show it to parents.",
  cta: "Request a sample kit",
  ctaMessage: "Hi Storyphy! We're a school and would like a sample kit.",
} as const;

export const foundingOffer = {
  eyebrow: "Founding schools",
  title: "Be one of our first partner schools",
  body: "We're inviting a small number of schools to join as founding partners. [FOUNDING-OFFER]",
  cta: "Ask about the founding offer",
  ctaMessage: "Hi Storyphy! We're a school and would like to know about the founding schools offer.",
} as const;

export const schoolsFaq = {
  eyebrow: "FAQ",
  title: "Questions from schools",
  items: [
    { q: "How many books can we order?", a: "Any number. Tell us your class size and we'll quote for it." },
    { q: "How does consent work?", a: "We share a simple consent form for parents. Photos are used only after a parent agrees." },
    { q: "How long does it take?", a: "Books arrive at your school in 7-10 days after you approve the previews." },
    { q: "Do you provide a GST invoice?", a: "Yes. We'll share invoice and payment details with your quote." },
    { q: "Can we see a sample first?", a: "Yes. Request a sample kit and we'll send one." },
    { q: "Who do we contact?", a: "Message us on WhatsApp or send the quote form and a real person will reply." },
  ],
} as const;

export const quotePage = {
  title: "Get a school quote",
  body: "Share a few details and we'll come back with options and pricing.",
} as const;
```

- [ ] **Step 7: Create `SchoolsPage.tsx`**

```tsx
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Faq } from "@/components/home/Faq";
import { whatsappLink } from "@/config/site";
import {
  foundingOffer,
  sampleKit,
  schoolsFaq,
  schoolsHero,
  schoolsOptions,
  schoolsProcess,
  schoolsSafety,
  schoolsWhy,
} from "@/content/schools";

export function SchoolsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-teal-soft to-brand-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-teal">{schoolsHero.eyebrow}</p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">{schoolsHero.title}</h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">{schoolsHero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/schools/quote" size="lg">{schoolsHero.primaryCta}</Button>
              <Button href="#sample-kit" variant="secondary" size="lg">{schoolsHero.secondaryCta}</Button>
            </div>
          </div>
          <ImageSlot id="IMG-50" label="Teacher and children with their personalized books" alt="A teacher and children with their personalized books" aspect="aspect-[4/3]" priority />
        </div>
      </section>

      <Section tone="white">
        <SectionHeading eyebrow={schoolsWhy.eyebrow} title={schoolsWhy.title} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {schoolsWhy.items.map((i) => (
            <li key={i.title} className="rounded-3xl border border-line p-5 text-center">
              <span aria-hidden className="text-3xl">{i.icon}</span>
              <h3 className="mt-2 font-display text-lg">{i.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{i.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lavender">
        <SectionHeading eyebrow={schoolsProcess.eyebrow} title={schoolsProcess.title} />
        <ol className="grid gap-5 md:grid-cols-4">
          {schoolsProcess.steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow={schoolsSafety.eyebrow} title={schoolsSafety.title} />
        <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {schoolsSafety.points.map((p) => (
            <li key={p} className="flex gap-3 rounded-2xl bg-brand-teal-soft p-4 text-sm">
              <span aria-hidden>🔒</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow={schoolsOptions.eyebrow} title={schoolsOptions.title} />
        <ul className="grid gap-5 md:grid-cols-3">
          {schoolsOptions.items.map((o) => (
            <li key={o.title} className="rounded-3xl border border-line bg-white p-6">
              <h3 className="font-display text-xl">{o.title}</h3>
              <p className="mt-2 text-ink-soft">{o.body}</p>
              <p className="mt-3 text-sm font-bold">From {o.price} per child</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="sample-kit" tone="lavender">
        <SectionHeading eyebrow={sampleKit.eyebrow} title={sampleKit.title} body={sampleKit.body} />
        <div className="grid items-center gap-6 md:grid-cols-2">
          <VideoSlot id="VID-08" label="School sample kit walkthrough" title="What's in the sample kit" />
          <div className="grid grid-cols-3 gap-3">
            <ImageSlot id="IMG-51" label="Sample kit contents" alt="Sample kit contents" aspect="aspect-square" />
            <ImageSlot id="IMG-52" label="Sample book in hand" alt="Sample book in hand" aspect="aspect-square" />
            <ImageSlot id="IMG-53" label="Consent form and info sheet" alt="Consent form and info sheet" aspect="aspect-square" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button href={whatsappLink(sampleKit.ctaMessage)} size="lg">{sampleKit.cta}</Button>
        </div>
      </Section>

      <Section tone="purple" className="text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">{foundingOffer.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl">{foundingOffer.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">{foundingOffer.body}</p>
        <div className="mt-6">
          <Button href={whatsappLink(foundingOffer.ctaMessage)} variant="onDark" size="lg">{foundingOffer.cta}</Button>
        </div>
      </Section>

      <Faq content={schoolsFaq} id="school-faq" />

      <Section tone="teal" className="text-center">
        <h2 className="font-display text-3xl md:text-4xl">Ready to give every child their book?</h2>
        <div className="mt-6">
          <Button href="/schools/quote" variant="onDark" size="lg">Get a school quote</Button>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 8: Create the route files**

`web/src/app/schools/page.tsx`:
```tsx
import type { Metadata } from "next";
import { SchoolsPage } from "@/components/schools/SchoolsPage";

export const metadata: Metadata = {
  title: "For Schools - Storyphy personalized storybooks",
  description:
    "Give every child in your preschool or school their own personalized storybook. Easy for your team, delivered in 7-10 days.",
};

export default function Schools() {
  return <SchoolsPage />;
}
```

`web/src/app/schools/quote/page.tsx`:
```tsx
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/schools/QuoteForm";
import { quotePage } from "@/content/schools";

export const metadata: Metadata = {
  title: "Get a school quote - Storyphy",
};

export default function QuotePage() {
  return (
    <Section tone="lavender">
      <SectionHeading title={quotePage.title} body={quotePage.body} />
      <QuoteForm />
    </Section>
  );
}
```

- [ ] **Step 9: Run tests, lint and build**

Run: `cd web && npm test && npm run lint && npm run build`
Expected: all PASS. The copy-rules test now also scans `schools.ts` (no MOQ, refund, redesign, ratings or school-served claims).

- [ ] **Step 10: Verify visually**

Run: `cd web && npm run dev`. Open `/schools` and `/schools/quote` at 1280px and 375px. Submit the empty form (errors show), then a valid one (WhatsApp opens with the details). Confirm the home page's "Get a school quote" and "Request a sample kit" links land correctly (`/schools/quote`, `/schools#sample-kit`).

- [ ] **Step 11: Commit**

```bash
git add web/src
git commit -m "feat: add schools page, sample kit, founding offer and quote form"
```

---

### Task 13: Final verification and cutover checklist

**Files:**
- Create: `web/README.md` (owner fill-in checklist and cutover steps)

**Interfaces:**
- Consumes: everything above.
- Produces: a verified branch ready for the owner to review; no change to the live site until the Vercel root directory is switched.

- [ ] **Step 1: List every placeholder the owner must fill**

Run: `cd web && grep -rhoE "\[(PRICE|PARENT|FOUNDING|CHILD)[A-Z0-9, -]*\]" src/content | sort | uniq -c`
Expected: lists `[PRICE-STANDARD]`, `[PRICE-SCHOOL-CLASSROOM]`, `[PRICE-SCHOOL-GRADUATION]`, `[PRICE-SCHOOL-TEACHER]`, `[PARENT-QUOTE-1..3]`, `[PARENT-NAME-1..3]`, `[CHILD-AGE, CITY]`, `[FOUNDING-OFFER]`.

- [ ] **Step 2: Write `web/README.md`**

```markdown
# Storyphy website (Next.js)

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm test         # unit and component tests, including copy rules
    npm run build

## Fill in before launch
- Prices: search `src/content` for `[PRICE-`.
- Parent stories (real, permissioned only): `parentStories` in `src/content/home.ts`.
- Founding-school offer: `[FOUNDING-OFFER]` in `src/content/schools.ts`.
- Images and videos: each placeholder shows its ID (IMG-xx, VID-xx). Put the file in `public/media/` and pass `src` to the matching `ImageSlot` / `VideoSlot`.
- Do not add star ratings, a minimum order, school logos, or a refund/redesign promise. `src/content/copy-rules.test.ts` fails if they appear.

## Cutover (do this only when ready to go live)
1. Merge `redesign-next` into `main`.
2. In Vercel, set the project's Root Directory to `web` and Framework Preset to Next.js.
3. Redeploy and check the live site. To roll back, set the Root Directory back to the repo root; the old `index.html` is still there.
```

- [ ] **Step 3: Full verification**

Run: `cd web && npm test && npm run lint && npm run build`
Expected: all PASS. Then run `npm run start` and in a browser confirm `/`, `/schools`, `/schools/quote` load with no console errors, at 1280px and 375px, with no horizontal scroll and every nav link working.

- [ ] **Step 4: Commit**

```bash
git add web/README.md
git commit -m "docs: add owner fill-in checklist and cutover steps"
```

---

## Self-review against the spec

- Homepage sections 4.1-4.14: announcement bar is intentionally omitted here (spec allows; add later with a real offer), hero, video, collections, how it works, why, look inside, families, gifting, schools band, safety, FAQ, final CTA, footer, sticky bar, WhatsApp button are covered by Tasks 6-10.
- Ordering flow, checkout, PhonePe, Supabase, admin, blog, reviews and legal pages are out of scope (later plans); WhatsApp ordering is the interim.
- Schools page (spec section 10): covered in Task 12 (sample kit, founding offer, no logos, no MOQ, quote form as WhatsApp/email lead capture).
- Copy rules (no ratings, MOQ, redesign, refund, school-served claims, real prices) are enforced by `copy-rules.test.ts`.
- Names used across tasks are consistent: `whatsappLink`, `orderMessage`, `orderHref`, `nav`, `site`, `ImageSlot`, `VideoSlot`, `Section`, `SectionHeading`, `Button`, `Faq({ content, id })`, `validateQuote`, `buildQuoteMessage`.
