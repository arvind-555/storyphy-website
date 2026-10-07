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
