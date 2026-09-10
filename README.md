# BSMA Case

A dark, moonlit home for BSMA’s art and custom phone cases. Browse the gallery, choose a painting or upload your own image, save a draft, and check out with Stripe.

Artwork titles and images come from [BSMA’s portfolio](https://walkthroughs-decide-801498.framer.app/). The collection lives in `src/config/artworks.ts`; owner-supplied poetry lives in `src/config/poems.ts`. Images are served from the original portfolio CDN. Choosing a gallery piece reuses that image instead of uploading another original.

## Run it locally

1. Copy `.env.example` to `.env` and fill in your PostgreSQL, Auth.js, Stripe, and Resend credentials.
2. Install packages with `npm install`.
3. Apply the database schema with `npx prisma db push`.
4. Start the app with `npm run dev`, then open [http://localhost:3000](http://localhost:3000).

Uploads require an `UPLOADTHING_TOKEN` from the UploadThing dashboard. Add it to `.env` before testing the case customizer.

Use `npx tsc --noEmit --incremental false` and `npm run lint` for checks while developing. Stop the dev server before `npm run build` because both use `.next`.

Search and sharing metadata use the production URL in `src/lib/utils.ts`. The site includes artwork URLs, a sitemap, a moon favicon, and a generated sharing poster at `/opengraph-image`.

## Google login

Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to `https://phonekainy.vercel.app` on Vercel, then add `NEXTAUTH_SECRET`. To enable Google login, create Google OAuth credentials with these redirect URIs:

```text
http://localhost:3000/api/auth/callback/google
https://phonekainy.vercel.app/api/auth/callback/google
```
