/* =========================================================
   LUMINA CLAN — CONFIGURATION
   Edit the values below to turn on GitHub sign-in for your
   "Bytebash Blitz" clan. Everything here is safe to be public
   (client IDs are not secret). See server/README.md for the
   one small backend piece this needs.
   ========================================================= */

const LUMINA_CONFIG = {

  // ---- GitHub OAuth App settings ----
  // Create an OAuth App at https://github.com/settings/developers
  // Paste its "Client ID" below (NOT the client secret — that
  // stays on the server, see server/README.md).
  GITHUB_CLIENT_ID: "YOUR_GITHUB_CLIENT_ID_HERE",

  // The GitHub organization whose members are allowed to sign in.
  GITHUB_ORG: "bytebash-blitz",

  // Where GitHub should send the user after they approve access.
  // This must be the URL of your deployed auth callback worker
  // (see server/github-oauth-worker.js). Leave the placeholder
  // until you've deployed it.
  GITHUB_CALLBACK_URL: "https://YOUR-WORKER-SUBDOMAIN.workers.dev/callback",

  // OAuth scopes requested. "read:org" is required to check
  // organization membership server-side.
  GITHUB_SCOPES: "read:org",

  // ---- Branding ----
  // Drop your logo file at: assets/lumina-logo.webp
  // It will be picked up automatically — no code changes needed.
  LOGO_PATH: "assets/lumina-logo.webp",

  CLAN_NAME: "Bytebash Blitz"
};
