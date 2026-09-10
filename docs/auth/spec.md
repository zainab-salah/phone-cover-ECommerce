# Authentication replacement

## What

Replace Kinde with Auth.js App Router authentication: email/password accounts and optional Google OAuth, using HTTP-only JWT session cookies.

## Requirements

- Existing users and orders keep their IDs and relationships.
- Registration stores a bcrypt password hash; passwords are never returned.
- Login creates an Auth.js session cookie. Invalid credentials return a generic error.
- Google OAuth appears only when its client credentials are configured.
- Checkout, order status, dashboard access, and thank-you pages use the new session.
- Password reset requests always return the same confirmation message, create a single-use token that expires after one hour, and send the reset link through Resend.
- New accounts receive a themed, single-use email verification link. Unverified signed-in users see a resendable verification banner.

## Testing

Run Prisma generation, lint, TypeScript checks, a production build, and local registration/login checks.

## Out of scope

Email verification and additional OAuth providers.
