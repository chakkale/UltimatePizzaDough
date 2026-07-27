# Netlify → Cloudflare migration — makebetter.pizza

## ✅ CUTOVER COMPLETE (2026-07-27)

`https://makebetter.pizza/` and `https://www.makebetter.pizza/` both serve **200** from
Cloudflare Worker `makebetter-pizza`. Zone `4f9f4e4b53a7f898dd92a676869f6993`, account
`717d971f409dc48972394da2c0075e85`. All security headers verified present on the live
domain.

**Registration stays at NameCheap.** `.pizza` has a high wholesale price, so transferring
to Cloudflare Registrar was not worth it. Registrar is independent of DNS and hosting —
only the nameservers moved (to `shubhi.ns.cloudflare.com` / `zod.ns.cloudflare.com`).
The domain's `client transfer prohibited` lock is irrelevant to this: it blocks registrar
transfers, not nameserver changes. Renewal continues through NameCheap (expires
2027-03-09).

### The one thing that bit

Adding the zone to Cloudflare does **not** remove the imported Netlify records. Four
proxied `A` records (`13.52.188.95`, `52.52.192.191`) survived, so once the nameservers
flipped, Cloudflare fronted the dead Netlify origin and passed its `503` straight through —
`Server: Netlify` and `X-Nf-Request-Id` behind Cloudflare proxy IPs. They also block the
Worker custom domain attach, which fails with an undetailed API error. Delete them first.

Note these IPs differ again from both earlier captures. **Match on record type and purpose,
never on remembered IPs.**

---

## Historical

Part of moving the whole Netlify account off Netlify, which was serving
`503 {"error":"usage_exceeded"}` account-wide (2026-07-27).

First deployed and verified at **https://makebetter-pizza.dogukanatlihan.workers.dev**
(now disabled — adding `routes` without `workers_dev: true` turns the workers.dev URL off,
which is desirable: it stops a second hostname serving duplicate content).

Why this fixes it: on Cloudflare, *"Requests to static assets are free and unlimited"* and
*"There are no additional charges for data transfer (egress) or throughput (bandwidth)."*
This site is 100% static assets, so a quota outage cannot recur.

## Files added

| File | Why |
|---|---|
| `wrangler.jsonc` | Worker config: assets dir + SPA fallback |
| `public/_headers` | **Security headers.** See below — this one is easy to miss. |

Also changed:

| File | Change |
|---|---|
| `netlify.toml` | CSP updated to unblock Google Fonts (see below) — kept in sync with `_headers` |
| `.github/workflows/netlify.yml` | **deleted** — it deployed to the now-dead Netlify site on every push |

`public/_redirects` and `.github/workflows/ci.yml` are untouched.

## Pre-existing bug found and fixed: CSP blocked the site's own webfonts

`index.html` loads Fraunces, Inter, JetBrains Mono and Playfair Display from Google Fonts,
but the CSP allowed neither `fonts.googleapis.com` (the stylesheet) nor `fonts.gstatic.com`
(the font files). Every page load was silently falling back to system fonts.

This was **not** caused by the migration — git chronology shows the CSP shipped in
`3f21b44` (2025-02-28) and the Google Fonts links arrived later in `b7ac47c`
(2026-04-18), with the CSP never updated. The migration reproduced the CSP faithfully,
which is what surfaced it.

Fix, applied to **both** `public/_headers` and `netlify.toml`:

```
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src  'self' https://fonts.gstatic.com
```

Verified: 0 console errors, and the intended typography renders.

> When checking this in a browser, use a cache-busting query string. A cached document
> replays the *old* CSP in the console and looks like the fix failed.

### `public/_headers` — the non-obvious one

Netlify serves this site's security headers from the `[[headers]]` blocks **inside
`netlify.toml`**. That is a TOML file Netlify parses; **Cloudflare never reads it.**
Deploying without translating it would silently drop:

- `Strict-Transport-Security` (HSTS, with preload)
- `Content-Security-Policy`
- `X-Frame-Options: DENY` (clickjacking)
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection`
- `Referrer-Policy`
- `Cache-Control: public, max-age=31536000, immutable` on `/assets/*`

The page renders perfectly without them, so no visual check would catch it. `public/_headers`
reproduces all of them. **Verify by response header, not by page render.**

Keep `public/_headers` and `netlify.toml`'s `[[headers]]` blocks in sync while both hosts
are live.

## The `_redirects` blocker

`public/_redirects` contains `/*  /index.html  200`. Cloudflare **rejects** this with
*"Infinite loop detected in this rule"* (error 100324) and the entire deploy fails.
`assets.not_found_handling: "single-page-application"` in `wrangler.jsonc` is the
equivalent. A `.assetsignore` file does **not** exempt it — wrangler validates `_redirects`
as a special file regardless of ignore rules (tested).

So any build must strip it before deploy:

```
npm run build && rm -f dist/_redirects
```

> Note this repo uses **npm**, not pnpm — `npm run build`, not `pnpm build`.
>
> **`npm run build` verified working (2026-07-27)** — run directly, completes normally.
> Fallback if it ever fails:
>
> ```
> node_modules/.bin/tsc -b && node_modules/.bin/vite build && rm -f dist/_redirects
> ```

## DNS (captured 2026-07-27, from authoritative `dns1.p05.nsone.net`)

| Name | Type | Value |
|---|---|---|
| `makebetter.pizza` | NS | `dns1–dns4.p05.nsone.net` (Netlify DNS) |
| `makebetter.pizza` | A | `35.157.26.135`, `63.176.8.218` (Netlify — currently serving 503) |
| `makebetter.pizza` | AAAA | *(none)* |
| `www.makebetter.pizza` | A | `63.176.8.218`, `35.157.26.135` |
| `makebetter.pizza` | MX | **none** — confirmed NODATA from the authoritative server |
| `makebetter.pizza` | TXT | **none** — confirmed NODATA from the authoritative server |

**No email and no verification records on this domain.** That makes this cutover far
lower-risk than `dogukanatlihan.com`, which runs iCloud custom email.

### Cutover

1. Add `makebetter.pizza` as a zone in Cloudflare (Free plan).
2. **Delete the imported Netlify `A` records for the apex and `www` before flipping
   nameservers.** They point at the 503'd Netlify origin; leaving them in means the site
   stays down for the whole propagation window.
3. Attach the Worker custom domain (apex), and a Redirect Rule for `www` → apex.
4. Change nameservers at the registrar.
5. Verify: site loads, deep link returns the app, **and all seven headers above are present.**

## Outstanding decision — the deploy workflow

`.github/workflows/netlify.yml` deploys to Netlify via `nwtgck/actions-netlify` on every
push to `main`. **It will keep deploying to the 503'd Netlify site until it is changed or
disabled.** Options: swap the deploy step for `cloudflare/wrangler-action`, or connect
Workers Builds in the Cloudflare dashboard and delete the workflow.

`.github/workflows/ci.yml` only builds and is unaffected.

## Knock-on fix

The portfolio (`DA-Portfolio-v2`) references this site at
`src/components/WebAppsSection.tsx:135-137`:

```ts
url:   'https://makebetter.pizza/',
logo:  'https://makebetter.pizza/pizza-icon.png',
hero:  'https://makebetter.pizza/pizza-thumbnail.png',
```

These are **stable, unhashed filenames at the site root**, so completing this migration
repaired the portfolio automatically — no portfolio code change was required.
Both images verified serving 200 after cutover. ✅

## Verification gotcha

For roughly the first 10–30 seconds after a deploy, a newly-uploaded asset can return a
hard `404` while it replicates. Paths *not* in the manifest correctly return the SPA
fallback during the same window, which makes it look like a routing bug. It isn't —
re-check before diagnosing.
