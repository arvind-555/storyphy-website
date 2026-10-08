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

## Deploy (Vercel)
Project Settings > Build and Deployment: Root Directory `web`, Framework Preset Next.js, no Build Command or Output Directory overrides. To roll back to the old static site, clear the Root Directory and redeploy.
