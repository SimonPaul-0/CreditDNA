# CreditDNA v2 setup

## Supabase

1. Paste the actual `sb_publishable_...` key into `supabase/config.js`. Do not put a `service_role` key in browser code.
2. In Supabase Authentication, enable Email/Password. Enable Phone OTP only after configuring an SMS provider.
3. Run `supabase/schema.sql` in the SQL Editor.
4. Create these temporary accounts in **Authentication > Users**, then assign the indicated `profiles.role` in the Table Editor:

| Role | Login identifier | Demo password | Profile fields |
|---|---|---|---|
| User | `user@creditdna.demo` | `CreditDNA!2026` | `role=user`, `upi_id=demo@upi` |
| Bank | `bank@creditdna.demo` | `CreditDNA!2026` | `role=bank`, `institution_id=CDNA-BANK-001` |
| Admin | `admin@creditdna.demo` | `CreditDNA!2026` | `role=admin` |

The browser never self-assigns Bank or Admin roles. Those must be provisioned through the Supabase dashboard or a server-side admin API.

## Demo data

Rates are explicitly marked as illustrative placeholders. Replace `public.rate_tables` with approved pricing before any external use.
