# Lumina Clan — Changes in this update

## 🐛 Bugs fixed
- **Settings could get permanently stuck** (e.g. sound muted forever)
  after a future update added new settings, because loading old saved
  data replaced the whole settings object instead of merging it.
  Fixed with a proper deep-merge in `loadData()`.
- **Corrupted stats could turn into `NaN`** for a language's average
  score if that language's saved stats were missing a field. Added
  safe fallbacks.
- **No way to quit a quiz early** — the quiz screen had no back/quit
  button, so you were locked in until you finished or ran out of
  hearts. Added a **QUIT** button with a confirmation prompt.
- **Achievement popups could overwrite each other** if two unlocked
  at the same moment (e.g. finishing your first *and* a perfect game
  together) — only the last one was visible. They now queue and show
  one after another.
- **Saving progress could throw silently** in browsers/private modes
  where `localStorage` is unavailable or full — wrapped in error
  handling so the app keeps working instead of breaking.
- **Modals could only be closed by clicking** — added Escape-key
  support.
- **Fullscreen button** didn't work on Safari/older browsers and had
  no error handling — added vendor-prefixed fallbacks.
- Guarded a few timing edge cases (e.g. quitting a quiz right as a
  timer/timeout callback was about to fire) that could throw a
  console error.

Everything was verified with an automated smoke test that plays
through login → language select → a full quiz → results → quitting a
quiz mid-way → modals → achievements, with zero console errors.

## ✨ New: Login screen (Minecraft-themed)
A new title-screen-style login screen now appears first:
- Animated flickering torches, floating particles, a "block burst"
  particle effect on button clicks, and a floating logo — all in the
  existing pixel-art Minecraft style, no new dependencies.
- **Sign in with GitHub** — restricted to members of your GitHub org
  (Bytebash Blitz). Verification happens server-side (required for
  security — see below), everything else is pure frontend.
- **Continue as Guest** — works immediately, no setup, no account.
- Clear, friendly messaging if GitHub sign-in isn't configured yet or
  if someone outside the org tries to sign in.
- Signed-in users get a small badge (avatar + name) on the home
  screen with a sign-out button.

### About the GitHub org restriction
A static site (no server) can never *securely* check "is this GitHub
user in our org" — that check needs a secret token that must not be
shipped to the browser. So this feature ships in two parts:
1. **Frontend (done, working now)** — the login screen, the GitHub
   button, guest mode, session handling, all the UI/animations.
2. **One small backend piece (you deploy, ~5 minutes, free)** — a
   Cloudflare Worker that does the actual org-membership check.
   Full copy-pasteable code and step-by-step instructions are in
   `server/github-oauth-worker.js` and `server/README.md`.

Until you deploy that piece, clicking "Sign in with GitHub" shows a
clear in-app message pointing to the setup guide — it never breaks or
errors out. Guest mode is fully functional either way.

## 🖼️ New: Logo placeholder
Both the login screen and home screen now show your Lumina logo.
**To add it:** just drop a file named `lumina-logo.webp` into the
`assets/` folder. No code edits needed — see `assets/README.txt` for
details. Until then, a themed placeholder icon is shown so nothing
looks broken.

## Files added
- `config.js` — the one file you edit to turn on GitHub sign-in and
  point at your logo.
- `auth.js` — login screen logic (GitHub redirect, guest mode,
  sessions, toasts).
- `server/github-oauth-worker.js` + `server/README.md` — the optional
  backend piece for GitHub org verification.

## Files changed
- `index.html` — added login screen, user badge, quit button, toast
  container, logo placeholders.
- `style.css` — added login screen / torch / toast / badge styles.
- `script.js` — bug fixes described above, quit-quiz wiring, Escape
  key, fullscreen fallback, achievement popup queue.
- `assets/README.txt` — logo instructions.

`questions.js` was not touched.
