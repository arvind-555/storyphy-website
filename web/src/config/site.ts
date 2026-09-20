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
