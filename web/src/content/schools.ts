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
