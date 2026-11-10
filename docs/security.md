# Security

## Summary

| Area | State |
| --- | --- |
| Secrets in the repository | None. `.env` is ignored; `.env.example` holds placeholders |
| Secrets in the browser bundle | None. Only the Supabase URL and publishable key, which are public by design |
| Email credentials | Server-side only, as Edge Function secrets |
| Database | No tables, views or functions in the `public` schema; no storage buckets |
| Row Level Security | Enabled on every existing table (all are Supabase-managed `storage` tables, with no policies: no access for client roles) |

## The Supabase key in the app is a public client key

The application uses `VITE_SUPABASE_PUBLISHABLE_KEY`. Its JWT payload carries
the role `anon`: it is the publishable client key that Supabase expects to be
shipped in browser code. It is not the `service_role` key and grants nothing
beyond what Row Level Security and function settings allow. No `service_role`
key appears in the code, in the repository history or in the build.

Because it is a public key, rotating it is not required. Rotation is only
needed if a privileged key (`service_role`, the Resend API key) is ever exposed.

## Database access

Inspected on 10 November 2026 with read-only catalogue queries:

- `public` schema: no tables, no views, no functions.
- `storage` schema: Supabase's own tables, all with RLS enabled and no
  policies, and no bucket created. The `anon` and `authenticated` roles
  therefore cannot read or write anything.

The application stores no data: the case study is static and the retail demo
keeps its cart in memory.

**Rule for future tables:** enable RLS when the table is created and add
explicit policies. A table in `public` without RLS is readable and writable by
anyone holding the publishable key.

## Checkout email function

`supabase/functions/send-order-confirmation` sends the demo order confirmation
through Resend.

**Previous design (removed).** The browser sent a shared secret from
`VITE_ORDER_EMAIL_SECRET` in an `x-order-secret` header. Any `VITE_*` variable
is compiled into the public JavaScript, so the secret was readable by every
visitor and protected nothing. A personal email address was also hardcoded as a
fallback recipient in the page and as the notification recipient in the
function.

**Current design.**

| Control | Where | Purpose |
| --- | --- | --- |
| No client secret | Browser | Nothing confidential is shipped to visitors |
| JWT verification (`verify_jwt = true`) | Supabase platform | Rejects calls made without the project's key |
| Origin allow-list | Function | Other websites cannot call the endpoint from a visitor's browser |
| Rate limit (3 per client and 20 overall per 10 minutes) | Function | Limits abuse of the email quota |
| Strict validation (Zod), size limits, recomputed total | Function | Rejects malformed or inconsistent orders |
| HTML escaping of every user field | Function | Prevents injection in the email body |
| Recipient and sender from server-side secrets | Function | No address in the source code |
| Generic error responses | Function | Provider errors are logged, not returned |

Server-side secrets (names only):

| Secret | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Sends the emails |
| `ORDER_NOTIFICATION_EMAIL` | No | Inbox notified of each demo order; no notification if unset |
| `ORDER_FROM_EMAIL` | No | Verified sender; defaults to Resend's test sender |
| `ALLOWED_ORIGINS` | No | Overrides the built-in list of allowed site origins |

`ORDER_EMAIL_SECRET` is no longer read and should be deleted.

**Residual risk.** A public checkout without user accounts cannot authenticate
its callers: the publishable key is public and an `Origin` header can be forged
outside a browser. The controls above bound the abuse (a few fixed-template
emails per ten minutes) rather than eliminate it. The rate limit lives in the
function's memory and resets when the instance is recycled. For a production
shop, add a CAPTCHA or authenticated users and a database-backed rate limit.

With Resend's test sender (`onboarding@resend.dev`), emails are delivered only
to the Resend account owner's own address. Set `ORDER_FROM_EMAIL` to a sender
on a verified domain to reach other recipients.

## Credentials that were exposed

| Item | Exposure | Action |
| --- | --- | --- |
| Supabase publishable key and URL | Tracked `.env` in early commits | None required (public by design) |
| `VITE_ORDER_EMAIL_SECRET` value | Compiled into published builds made before this change | Delete the secret; it is no longer accepted by the function |
| Personal email address | Source code in earlier commits | Removed from the code; it remains in Git history |
| `RESEND_API_KEY`, `service_role` key | Never in the repository or the bundle | None |

## Reporting

To report a security concern, open an issue on the repository without including
any secret value.
