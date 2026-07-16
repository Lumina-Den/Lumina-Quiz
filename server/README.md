# Setting up "Sign in with GitHub" (Bytebash Blitz members only)

Lumina Clan is a static site (HTML/CSS/JS, no server). Checking
"is this GitHub user in our org" requires a secret token, and secrets
can never live in frontend code — so this one piece needs a tiny
backend. The good news: it's ~70 lines and deploys free on Cloudflare
Workers in about 5 minutes. Everything else (the whole quiz app) still
works with zero backend, and **Guest mode works right now with no
setup at all.**

## What you'll end up with

```
Player clicks "Sign in with GitHub"
        │
        ▼
github.com/login/oauth/authorize   (user approves access)
        │
        ▼
your-worker.workers.dev/callback   (exchanges code, checks org membership)
        │
        ├── member?  → redirect to your site with ?login=success&user=...
        └── not?     → redirect to your site with ?login=denied&reason=not_member
```

## 1. Create a GitHub OAuth App

1. Go to <https://github.com/settings/developers> → **New OAuth App**.
2. Fill in:
   - **Application name**: `Lumina Clan`
   - **Homepage URL**: your site's URL (e.g. `https://yourname.github.io/Lumina-Quiz`)
   - **Authorization callback URL**: `https://YOUR-WORKER-SUBDOMAIN.workers.dev/callback`
     (you'll get the exact worker URL in step 3 — you can come back and edit this field after)
3. Click **Register application**.
4. Copy the **Client ID**.
5. Click **Generate a new client secret** and copy it too — you'll only see it once.

## 2. Create a GitHub Personal Access Token for the org-membership check

This is a *separate* token, used only by the worker to ask "is user X a
member of org Y" — it needs to belong to someone with visibility into
org membership (an org owner/admin's token is safest).

1. Go to <https://github.com/settings/tokens> → **Generate new token (classic)**.
2. Scope needed: `read:org`.
3. Copy the token.

## 3. Deploy the worker (Cloudflare Workers, free tier)

1. Install the Cloudflare CLI if you don't have it: `npm install -g wrangler`
2. From the `server/` folder, run: `wrangler init` (or just `wrangler deploy github-oauth-worker.js` with a `wrangler.toml` — Cloudflare's docs walk through both, whichever is current when you deploy)
3. Add your secrets (never commit these — they're stored encrypted by Cloudflare, not in this repo):
   ```
   wrangler secret put GITHUB_CLIENT_ID
   wrangler secret put GITHUB_CLIENT_SECRET
   wrangler secret put GITHUB_ORG_CHECK_TOKEN
   wrangler secret put GITHUB_ORG          # e.g. "bytebash-blitz"
   wrangler secret put SITE_URL            # e.g. "https://yourname.github.io/Lumina-Quiz"
   ```
4. Deploy: `wrangler deploy`
5. Cloudflare gives you a URL like `https://lumina-auth.yourname.workers.dev`. That + `/callback` is your callback URL.
6. Go back to your GitHub OAuth App settings and paste that exact URL into **Authorization callback URL**.

## 4. Point the frontend at it

Open `config.js` in the project root and fill in:

```js
GITHUB_CLIENT_ID: "the client ID from step 1",
GITHUB_CALLBACK_URL: "https://lumina-auth.yourname.workers.dev/callback",
GITHUB_ORG: "bytebash-blitz",
```

That's it — reload the site, click **Sign in with GitHub**, approve
access, and you'll land back on the home screen signed in. Anyone who
isn't in the org gets a friendly "Access denied" message and can still
play as a guest.

## Notes

- Nothing in `config.js` is secret — client IDs are meant to be public.
  The only secrets are the three you `wrangler secret put` above, and
  those never leave Cloudflare.
- Until you complete this setup, clicking "Sign in with GitHub" shows
  a toast explaining it isn't configured yet, and points people at
  this file — it won't error or break the page.
- Any other small serverless platform (Vercel/Netlify Functions, AWS
  Lambda, a tiny Express server, etc.) works too — `github-oauth-worker.js`
  is intentionally plain `fetch`-based JS so it's easy to port.
++++++++++++