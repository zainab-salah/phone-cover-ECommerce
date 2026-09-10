# Custom Phone Case Store

A small e-commerce app for creating a custom phone case, paying with Stripe, and tracking orders from a private dashboard. Customers can create an email/password account or sign in with Google when Google OAuth is configured.

## Run it locally

1. Copy `.env.example` to `.env` and fill in your PostgreSQL, Auth.js, Stripe, and Resend credentials.
2. Install packages with `npm install`.
3. Apply the database schema with `npx prisma db push`.
4. Start the app with `npm run dev`, then open [http://localhost:3000](http://localhost:3000).

Uploads require an `UPLOADTHING_TOKEN` from the UploadThing dashboard. Add it to `.env` before testing the case customizer.

## Google login

Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to `https://phonekainy.vercel.app` on Vercel, then add `NEXTAUTH_SECRET`. To enable Google login, create Google OAuth credentials with these redirect URIs:

```text
http://localhost:3000/api/auth/callback/google
https://phonekainy.vercel.app/api/auth/callback/google
```
