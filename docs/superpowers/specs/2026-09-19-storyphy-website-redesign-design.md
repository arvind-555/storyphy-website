# Storyphy Website Redesign: Experience & Conversion Plan

Status: draft v3 (all open questions answered). Scope: sub-project 1 (brand, UX, storytelling, page flow). Infra (Next.js + Supabase), PhonePe checkout, and the B2B lead system get their own specs, but their UX is defined here so design and build line up.

Placeholders: image slots are `[IMG-xx]`, video slots are `[VID-xx]`, prices are `[PRICE]`. All are filled in later.

## Decisions locked in

| Topic | Decision |
|---|---|
| Preview | **No preview on the website.** The site sells with product videos and sample pages. The team designs the book after the order and shares the digital preview by WhatsApp/email for approval. |
| Prices | Placeholders (`[PRICE]`) everywhere. Owner edits later. |
| Customers | 500+ customers served (true, can be shown). **No ratings exist yet**: no star ratings or "4.9" anywhere (remove from the current site too). |
| Guarantee | Public promise is only: **you see the preview and approve it before we print.** Internally we make the design once; the site never mentions a redesign limit, and never promises unlimited redesigns. No refund promise in site copy until the owner defines refund terms. |
| Preview timing | Preview sent within **24 hours** of payment (photos received). |
| School minimum | **No MOQ.** Do not mention a minimum order anywhere. |
| Founding-school offer | **Yes**, included in the schools page. |
| Schools | **No school served yet.** No school logos or school testimonials. First school deals expected within a week; add them as they close. |
| Language | English only. |
| Delivery | 7-10 days (counted from preview approval, as in the current FAQ). |
| Samples | A sample book exists (use for photos/videos) and a school sample kit exists. |
| B2B | Lead capture only (quote form). |
| D2C | Full online checkout with PhonePe. |
| Stack | Next.js on Vercel + Supabase. |

---

## 1. Strategy

### 1.1 Who is buying

| Audience | Who | Real motivation | Biggest fear |
|---|---|---|---|
| D2C parent | Mothers 27-40, urban India | "My child feels special." A gift that is not another toy. | Photo misuse, a cheap-looking product, wrong name spelling, late delivery, paying for something they haven't seen |
| D2C gifter | Grandparents, aunts/uncles, friends | "I need a birthday gift that shows I thought about them." | Getting it wrong, delivery missing the date |
| B2B decision-maker | Preschool owner/coordinator | Differentiate the school, parent delight, annual-day/graduation keepsake | Child safety/consent, parent complaints, per-child effort, budget, trying an unproven vendor |

### 1.2 Positioning

Storyphy turns a child into the hero of a premium hardcover storybook, handled with care from photo to doorstep. Personalized for delight, trustworthy for parents, easy for schools.

- Emotional promise: *"Your child sees themselves as the hero."*
- Rational promise: *"You approve the preview before we print. Safe photo handling. Delivered in 7-10 days across India."*

### 1.3 The key persuasion problem (and how we solve it)

Because there is no preview on the site, the visitor cannot see *their* book before paying. The site has to make up for that with:

1. **Videos and real product shots** that make the book feel tangible (flip-through, unboxing, a child's reaction).
2. **A sample book you can "look inside"** (real spreads, zoomable), so the quality is proven even if their own child isn't shown yet.
3. **A loud, specific approval promise** at every decision point: "You see your child's full book and approve it before printing. Nothing is printed until you say yes."
4. **500+ families as proof**, with real photos and short videos from customers.
5. **Low-friction ordering**: a short details form, then pay, then we take over.

### 1.4 Buyer psychology, mapped to design decisions

| Principle | What the buyer feels | How the site uses it |
|---|---|---|
| **Social proof** | "People like me did this and were happy." | "500+ families" up front, named parent stories, customer photos and videos, real parent stories per book (no star ratings yet). |
| **Risk reversal** | "What if it's wrong or I don't like it?" | Approval-before-print promise, photo-privacy promise, secure PhonePe payment. |
| **Tangibility (substitute for preview)** | "I can't see it, so I doubt it." | Product videos, sample-book flip-through, close-ups of paper and binding, size-in-hand shots. |
| **Self-relevance** | "This is about *my* child." | Name field early ("Enter your child's name"), copy that uses the child's name, sample "Aarav's Book" style covers. |
| **Gift anxiety** | "Will it arrive on time?" | Occasion picker, delivery-date guidance ("Order by X to arrive by Y"), gift note and gift wrap. |
| **Reciprocity** | Free value builds goodwill. | Free printable (name-tracing sheet, bedtime routine card) for an email; reading-benefits blog. |
| **Authority** | "These people know children." | Reading-benefits section, print-quality specs; educator quotes only when real and permissioned. |
| **Anchoring** | Price is judged against a reference. | Standard vs Premium vs Bundle with the middle option highlighted, using `[PRICE]` placeholders for now. |
| **Loss aversion (ethical)** | "This moment passes." | "Ages 2-6 is when they love being the hero." Only real seasonal deadlines. No fake countdowns. |
| **Paradox of choice** | Too many options stalls decisions. | Max 6 collections, one primary CTA per screen, a short "Help me choose" helper. |
| **Peak-end rule** | People remember the peak and the end. | The peak is the preview reveal (handled by the team on WhatsApp); the end is a warm unboxing card and packaging. |
| **Commitment / consistency** | Small yeses lead to a big yes. | Step 1 of ordering is only the child's name. Progress bar. |

Rule: no dark patterns. No fake scarcity, no fake reviews, no pre-ticked upsells.

---

## 2. Design language

- **Palette (from the logo):** deep purple (~#5B3A8E), teal (~#1A8FA3), warm gold (~#F0A92E), plus soft lavender and cream. Purple = brand and CTA, teal = secondary/trust, gold = sparkle/highlight only. Confirm exact hexes from the logo file.
- **Typography:** rounded, friendly display face for headlines (matches the wordmark), readable humanist sans for body. Large headlines, short lines.
- **Imagery (Hooray-Heroes-like energy with trust):**
  - Vibrant hero with fanned book covers and a joyful child, on a soft radial burst in brand colors.
  - Real lifestyle photography in trust sections, and real photos of the sample book.
  - Short looping product videos.
  - Logo sparkles as small accents only.
- **Motion:** gentle and purposeful. Fix the current scroll-reveal issue that leaves blank gaps: lower threshold, shorter duration, and content visible without JS.
- **Voice:** warm, confident, parent-to-parent. Short sentences. Say what happens next at every step.
- **Mobile first:** most traffic will come from Instagram/WhatsApp on phones. Sticky bottom CTA, thumb-reach buttons, UPI-first payment, videos that autoplay muted and load fast.

---

## 3. Sitemap

```
/                      Home (D2C-first, with a clear "For Schools" path)
/books                 All collections
/books/[slug]          Product page (per collection)
/order/[slug]          Order form (child details + photo upload)
/cart, /checkout       Checkout (PhonePe)
/order/[id]/status     Confirmation + status tracking
/gifts                 Occasion-led landing
/schools               B2B landing
/schools/quote         Quote request form
/how-it-works          Process + safety
/reviews               Parent stories, photos, videos
/blog                  Reading benefits, gifting guides
/about                 Founder story, mission
/faq, /privacy, /terms, /shipping-returns
```

Top nav: **Books · Gifts · How it works · For Schools · Reviews**, plus a persistent **Order a Book** button. English only.

---

## 4. Homepage: section-by-section

Order follows the buying journey: attention, desire, understanding, proof, doubt removal, action.

### 4.1 Announcement bar
"You approve your child's book before we print. Delivered across India in 7-10 days."

### 4.2 Hero
- Headline: **"Every child deserves to be the hero of their own story."**
- Sub: one sentence on personalized premium hardcover.
- Primary CTA **Order Their Book**; secondary **Watch how it looks** (opens the product video); text link **Ordering for a school?**
- Visual: `[IMG-01]` fanned covers + joyful child; `[IMG-02]` mobile crop. Optionally `[VID-01]` a 10-15s looping hero video.
- Trust strip under the hero: "500+ families" · "Photos handled securely" · "You approve before print" · "7-10 day delivery".

### 4.3 Product video (tangibility)
A prominent 30-60s video: unboxing, flipping pages, a child spotting their name, the book in a parent's hands. Captions on (many watch muted). `[VID-02]`.

### 4.4 Collections
Six cards max: Alphabet Adventure, Bedtime Stories, Adventure, Birthday, Christmas, plus "Coming soon: notify me". Each card: cover image, age range, one-line hook, `[PRICE]`, **View book** button. Images `[IMG-04..08]`.

### 4.5 How it works (reduce uncertainty, and sets the no-preview expectation honestly)
1. Choose a book and share your child's details (2 min)
2. Pay securely
3. We design your book and send you a full preview on WhatsApp/email
4. You approve, we print, and it arrives in 7-10 days
Highlight step 3: "Nothing is printed until you say yes." Visuals `[IMG-09..12]`.

### 4.6 The emotional "why"
Story-led block: *"The moment they find themselves in the story."* with a delighted-child photo `[IMG-13]`, then a compact benefits grid (vocabulary, confidence, bonding, bedtime routine, screen-free, reluctant readers). Icons `[IMG-14..17]`.

### 4.7 Look inside a sample book
Real sample book spreads as an interactive flip-through, plus quality callouts (hardcover, paper, size, finish). Short close-up videos of paper/binding `[VID-03]`. Images `[IMG-18..23]`. Clearly labeled "Sample book" so no one expects it to be their child's.

### 4.8 Social proof (500+ families)
- "Loved by 500+ families" headline.
- 3-4 named parent stories with photo (use only real, permissioned ones; replace the current placeholders as real ones come in).
- Customer photo/video wall `[IMG-24..31]`, `[VID-04..06]` for short parent/child reaction clips.
- No star ratings or review counts until real reviews exist. Use "500+ families" and real parent stories instead.

### 4.9 Gifting strip
"Gifting? Pick an occasion": Birthday, Christmas, New sibling, Grandparent gift, Back to school. Notes on gift wrap, note card, ship-to-recipient, and the order-by date for delivery. `[IMG-32..36]`.

### 4.10 For schools band
*"Preschool or school? Give every child their own book."* Keepsake for annual day/graduation, parent delight, we handle the photos with consent forms. CTA **Get a school quote** and **Request a sample kit**. `[IMG-37]`. No school logos yet.

### 4.11 Trust and safety
"Your child's photos, handled with care": what we collect, who sees it, how long we keep it, how to delete it. Plain language. `[IMG-38]`.

### 4.12 FAQ
Top objections first: "Can I see my book before it's printed?" (yes, on WhatsApp/email, and you approve), safety of photos, what if I don't like it, delivery time, gift delivery, payment methods, personalized-item returns.

### 4.13 Final CTA + free printable
Repeat the primary CTA. Offer a free printable for an email (reciprocity).

### 4.14 Footer
Contact, WhatsApp, Instagram, policies, payment icons (UPI, cards), secure-payment note.

**Persistent:** sticky header CTA; mobile bottom bar (Order · WhatsApp); floating WhatsApp button.

---

## 5. Ordering flow (no on-site preview)

The old idea of a live personalizer with preview is removed. Ordering is a short details form, because the team designs the book.

**Steps (progress bar, one topic per screen):**
1. **Child's name** (spelling confirm) and age.
2. **About your child:** pronoun/gender, nickname, favorite things (optional, feeds the story).
3. **Photo upload:** clear photo guidance (good light, face visible), consent tick, privacy note. Also allow "Send photos later on WhatsApp".
4. **Dedication message** and who it's from.
5. **Choose format and gift options** (Standard/Premium `[PRICE]`, gift wrap, note card).
6. **Review order and pay** via PhonePe.

**After paying, the expectation is set on screen and by message:** we design your book, send the preview within 24 hours, you approve, we print.

**Design rules:**
- Sample-book visuals on the side of the form so it still feels like a product, not a form.
- Save progress; "Continue on WhatsApp" as an alternative to filling a long form.
- Specific, kind validation ("Did you mean Aarav?").
- Repeat the guarantee near the pay button: "You approve the preview before print."

**Risk to manage:** paying before seeing the preview is a bigger ask. Mitigations: the approve-before-print promise, 500+ family proof, and a WhatsApp chat option before paying. If conversion is low at payment, a fallback is to charge a small deposit first and the balance after approval (can be tested later).

---

## 6. Product page (per collection)

1. Gallery + video: cover, open spreads, size-in-hand, packaging. `[IMG-40..45]`, `[VID-07]`.
2. Title, age range, `[PRICE]`, delivery estimate (7-10 days after approval). No star ratings until real reviews exist.
3. Primary CTA **Order this book**; secondary **Order as a gift**.
4. "Why kids love it": three lines.
5. Look-inside flip-through of the sample book.
6. What's included: hardcover, dedication page, gift-ready packaging.
7. Customer photos/reviews for this book.
8. Add-ons: sibling book, gift wrap, note card (not pre-ticked).
9. Micro-FAQ: approval, photos, delivery, returns.
10. Sticky mobile CTA.

---

## 7. Pricing

All prices are placeholders: `[PRICE-STANDARD]`, `[PRICE-PREMIUM]`, `[PRICE-BUNDLE]`, `[PRICE-SHIPPING]`, plus school tiers `[PRICE-SCHOOL-TIER-1/2/3]`. The layout supports Standard/Premium/Bundle with the middle option highlighted; the owner sets the numbers and can collapse to one option if preferred.

Offers must be real and honestly time-bound.

---

## 8. Checkout and payment (PhonePe)

- **Guest checkout**, no forced account. Phone number is the identity.
- Single page: contact, shipping address (PIN auto-fills city/state), delivery note, gift note, summary, payment.
- **PhonePe PG methods:** UPI first (intent on mobile), cards, netbanking, wallets.
- Trust cues at payment: lock icon, "Secure payment by PhonePe", method logos, and a reminder: "You'll approve the preview before we print."
- Order summary shows the book cover thumbnail and child's name.
- **Failure handling:** keep the order details, clear retry with another method, WhatsApp help link.
- **After payment:** confirmation page with order number and next-steps timeline. Email + WhatsApp confirmation.

Technical notes for the later spec: server-side order creation, webhook verification of PhonePe callbacks, order state machine (created, paid, awaiting photos, in design, preview sent, approved, printing, shipped, delivered), private photo storage with a retention policy, and an internal admin view for the team to run this (list orders, upload preview, mark status).

---

## 9. Post-purchase journey

1. Instant: confirmation page + WhatsApp/email.
2. Within 24h: "We've got your details" and a request for missing photos if any.
3. Preview sent (within 24 hours of payment and photos) on WhatsApp/email with a single clear **Approve** / **Request changes** action.
4. Approved: printing, then shipped with tracking, delivered in 7-10 days.
5. Day after delivery: ask for a photo/short video and a review (best source of social proof).
6. Later: birthday reminder, sibling upsell, referral code.

Unboxing (peak-end): thank-you card and gift-ready packaging. Since previews are manual, the team needs a simple internal checklist/admin to keep the promise at scale.

---

## 10. Schools (B2B) flow

No school has been served yet, so the page must lower the risk of being the first. Same brand, calmer institutional tone.

1. **Hero:** *"A keepsake every child in your school will treasure."* CTA **Get a school quote**, secondary **Request a sample kit**. `[IMG-50]`
2. **Why schools choose us:** parent delight, annual-day/graduation keepsake, stands out from other schools, low admin (we handle the work).
3. **How it works for schools:** quote, consent forms and photo collection handled by us (with a simple template), preview shared with the coordinator, batch printing, delivery to school in 7-10 days.
4. **Safety and consent:** parental consent, secure photo handling, deletion after delivery.
5. **Options:** classroom edition, graduation edition, teacher-gift edition. Tier prices `[PRICE-SCHOOL-TIER-x]` by quantity.
6. **Sample kit:** photos and a short video of the school sample kit. `[IMG-51..53]`, `[VID-08]`. Request form for a physical kit.
7. **Founding-school offer:** a "founding schools" pilot with a special rate or perk (`[FOUNDING-OFFER]`, owner sets the details), limited to the first few schools, to turn the lack of references into an advantage. Must be real and honestly limited.
8. **Proof, honestly:** use the **500+ families** number and parent testimonials, not school logos. Add school logos and quotes the moment the first schools close (the layout reserves a slot that stays hidden until then).
9. **FAQ:** timelines, consent, payment terms/invoice, GST.
10. **Quote form:** school name, city, contact person and role, approx. number of children, occasion and target date, phone/email. Confirmation says when a human replies and offers WhatsApp.

Leads go to email/WhatsApp now and into the database once Supabase is in place.

---

## 11. Image and video asset list

| ID | Where | What |
|---|---|---|
| IMG-01/02 | Home hero | Fanned covers + joyful child; desktop and mobile |
| IMG-04..08 | Collections | One cover per collection |
| IMG-09..12 | How it works | Four step visuals |
| IMG-13..17 | Why reading | Delighted child; four benefit icons |
| IMG-18..23 | Look inside | Sample-book spreads; paper/binding close-ups |
| IMG-24..31 | Social proof | Customer/lifestyle photos |
| IMG-32..36 | Gifting | Occasion tiles |
| IMG-37 | Schools band | Classroom with books |
| IMG-38 | Trust | Privacy/shield illustration |
| IMG-40..45 | Product pages | Gallery set per book |
| IMG-50..53 | Schools page | Classroom, teacher, graduation, sample kit |
| VID-01 | Hero | 10-15s looping brand clip |
| VID-02 | Home | 30-60s product video (unboxing + flip-through + reaction) |
| VID-03 | Look inside | Paper, binding, size-in-hand close-ups |
| VID-04..06 | Social proof | Short parent/child reaction clips |
| VID-07 | Product pages | Per-book flip-through |
| VID-08 | Schools | School sample kit walkthrough |
| Brand | Global | Logo on light and dark, favicon, OG/share image, sparkle icon set |

Since the sample book exists, most product imagery and videos can be shot of the real sample first; AI-generated images fill gaps (hero, occasions, icons). Any real child photo needs signed consent.

Video guidance: host on a video service or Vercel Blob/Cloudflare Stream with compressed MP4/WebM; poster images; captions; muted autoplay only for short hero loops; lazy-load everything below the fold.

---

## 12. Trust and compliance checklist

- Show "500+ customers/families" (verified). Show a rating or review count only when real.
- No claims about schools served. Add them when they exist.
- Photo policy: purpose, retention, deletion on request; parental consent in the order form and for schools.
- Legal pages: Privacy, Terms, Shipping, Returns. Define the approval and refund policy for personalized items precisely, without advertising a redesign limit.
- Children's data: India's DPDP Act requires verifiable parental consent and restricts tracking/targeting children. Review with a lawyer before launch.
- Payments: PhonePe merchant onboarding/KYC, GST invoicing.
- Accessibility: contrast on purple/teal/gold, captions on videos, alt text, keyboard nav.
- Performance: optimized images and video, LCP under 2.5s on mid-range Android.

---

## 13. Success metrics

Primary: visitor to order-form-start rate, form completion, checkout conversion, payment success rate, preview-approval rate, video play rate and watch time.
Secondary: school quote and sample-kit requests per month, average order value, bundle attach rate, repeat/referral orders, review/UGC submissions.
Baselines in month one, then A/B test hero copy, video placement, price presentation, and the payment-before-preview vs deposit approach.

---

## 14. Phasing

1. **Design phase (this spec):** approve the flow, then design key screens (home, product, order form, checkout, schools) with placeholders.
2. **Foundation:** Next.js + Supabase, design system components, content model, video hosting.
3. **Commerce:** order form, cart, PhonePe checkout, order pipeline + internal admin for previews/status.
4. **B2B:** schools page, quote form, sample-kit request, lead storage.
5. **Growth:** blog/SEO, reviews wall, referral, abandoned-cart recovery.

---

## 15. Remaining details for the owner (not blocking the design)

1. Refund terms for the policy page (owner decides whether any refund is offered and how it is worded).
2. Founding-school offer details.
3. Real prices, shipping charge, and the founding-school rate.
4. Exact hex codes of the logo colors.
