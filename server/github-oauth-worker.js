/**
 * LUMINA CLAN — GitHub OAuth callback worker
 * ===========================================
 * Deploy this on Cloudflare Workers (free tier is plenty).
 * It is the ONLY piece of this project that needs a server,
 * because checking "is this GitHub user a member of our org"
 * requires a secret token that must never sit in frontend code.
 *
 * What it does:
 *   1. Receives the ?code= GitHub sends after the user approves
 *      the app on github.com/login/oauth/authorize.
 *   2. Exchanges that code for an access token (needs CLIENT_SECRET,
 *      kept as a Worker secret — never exposed to the browser).
 *   3. Looks up the user's GitHub profile.
 *   4. Checks whether that user is a member of your GitHub org,
 *      using a Worker-only Personal Access Token with `read:org`
 *      scope (also kept secret).
 *   5. Redirects back to your site with either
 *        ?login=success&user=...&avatar=...
 *      or
 *        ?login=denied&reason=not_member
 *
 * See server/README.md for step-by-step deploy instructions.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/callback") {
      return new Response("Lumina Clan auth worker is running.", { status: 200 });
    }

    const code = url.searchParams.get("code");
    if (!code) {
      return redirectToSite(env, { login: "denied", reason: "missing_code" });
    }

    try {
      // 1. Exchange the code for an access token
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code
        })
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) {
        return redirectToSite(env, { login: "denied", reason: "token_exchange_failed" });
      }

      // 2. Get the authenticated user's profile
      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "User-Agent": "lumina-clan-auth-worker",
          "Accept": "application/vnd.github+json"
        }
      });
      const user = await userRes.json();
      if (!user || !user.login) {
        return redirectToSite(env, { login: "denied", reason: "profile_fetch_failed" });
      }

     // Check the authenticated user's organizations
const orgsRes = await fetch("https://api.github.com/user/orgs", {
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "User-Agent": "lumina-clan-auth-worker",
    "Accept": "application/vnd.github+json"
  }
});

const orgs = await orgsRes.json();

const isMember = Array.isArray(orgs) &&
  orgs.some(org => org.login.toLowerCase() === env.GITHUB_ORG.toLowerCase());

if (!isMember) {
  return new Response(
    JSON.stringify(
      {
        githubUser: user.login,
        orgSetting: env.GITHUB_ORG,
        orgsReturnedByGitHub: orgs
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

      // 4. Success — send the user back with their public profile info.
      //    (Nothing secret is included in this redirect.)
      return redirectToSite(env, {
        login: "success",
        user: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url || ""
      });

    } catch (err) {
      return redirectToSite(env, { login: "denied", reason: "server_error" });
    }
  }
};

function redirectToSite(env, params) {
  const dest = new URL(env.SITE_URL);
  Object.entries(params).forEach(([k, v]) => dest.searchParams.set(k, v));
  return Response.redirect(dest.toString(), 302);
}
