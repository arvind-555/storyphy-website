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
