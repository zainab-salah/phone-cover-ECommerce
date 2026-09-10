# Custom Phone Case Store

A small e-commerce app for creating a custom phone case, paying with Stripe, and tracking orders from a private dashboard.

## Run it locally

1. Copy `.env.example` to `.env` and fill in your PostgreSQL, Kinde, Stripe, and Resend credentials.
2. Install packages with `npm install`.
3. Apply the database schema with `npx prisma db push`.
4. Start the app with `npm run dev`, then open [http://localhost:3000](http://localhost:3000).
