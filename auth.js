/* =========================================================
   LUMINA CLAN — AUTH MODULE
   Handles the login screen: "Sign in with GitHub" (restricted
   to LUMINA_CONFIG.GITHUB_ORG members, verified server-side)
   and "Continue as Guest". No backend = no way to safely check
   org membership, so the actual verification happens in the
   tiny worker described in server/README.md. This file only
   talks to that worker and trusts its redirect back.
   ========================================================= */

const AUTH_STORAGE_KEY = "luminaClanAuth";

const LuminaAuth = {

  session: null,

  /* ---------- SESSION HELPERS ---------- */
  loadSession(){
    try{
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  },
  saveSession(session){
    this.session = session;
    try{ localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session)); }
    catch(e){ /* storage unavailable (e.g. private mode quota) — session still works for this tab */ }
  },
  clearSession(){
    this.session = null;
    try{ localStorage.removeItem(AUTH_STORAGE_KEY); }catch(e){}
  },
  isConfigured(){
    return LUMINA_CONFIG.GITHUB_CLIENT_ID &&
           !LUMINA_CONFIG.GITHUB_CLIENT_ID.includes("YOUR_") &&
           LUMINA_CONFIG.GITHUB_CALLBACK_URL &&
           !LUMINA_CONFIG.GITHUB_CALLBACK_URL.includes("YOUR-");
  },

  /* ---------- TOASTS ---------- */
  toast(message, type="info", duration=4200){
    const stack = document.getElementById("toastStack");
    if(!stack) return;
    const el = document.createElement("div");
    el.className = `mc-toast mc-toast-${type}`;
    const icons = { info:"ℹ", success:"✔", error:"⛔" };
    el.innerHTML = `<span class="mc-toast-icon">${icons[type]||"ℹ"}</span><span class="mc-toast-msg">${message}</span>`;
    stack.appendChild(el);
    requestAnimationFrame(()=>el.classList.add("show"));
    setTimeout(()=>{
      el.classList.remove("show");
      setTimeout(()=>el.remove(), 300);
    }, duration);
  },

  /* ---------- LOGIN SCREEN FX ---------- */
  spawnLoginParticles(){
    const layer = document.getElementById("loginParticles");
    if(!layer) return;
    layer.innerHTML = "";
    for(let i=0;i<22;i++){
      const p = document.createElement("span");
      p.style.left = Math.random()*100+"%";
      p.style.animationDuration = (6+Math.random()*8)+"s";
      p.style.animationDelay = (Math.random()*8)+"s";
      p.style.opacity = 0.25+Math.random()*0.5;
      layer.appendChild(p);
    }
  },
  blockBurst(el){
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const colors = ["#5d9c3f","#7a5230","#ffd633","#4ce8ff"];
    for(let i=0;i<10;i++){
      const p = document.createElement("div");
      p.className = "login-burst-particle";
      p.style.left = (rect.left+rect.width/2)+"px";
      p.style.top = (rect.top+rect.height/2)+"px";
      p.style.background = colors[i%colors.length];
      const angle = Math.random()*Math.PI*2;
      const dist = 30+Math.random()*50;
      p.style.setProperty("--dx", Math.cos(angle)*dist+"px");
      p.style.setProperty("--dy", Math.sin(angle)*dist+"px");
      document.body.appendChild(p);
      setTimeout(()=>p.remove(), 650);
    }
  },

  /* ---------- USER BADGE ---------- */
  renderBadge(){
    const nameEl = document.getElementById("userName");
    const avatarEl = document.getElementById("userAvatar");
    if(!nameEl || !avatarEl) return;
    if(this.session && this.session.mode === "github"){
      nameEl.textContent = this.session.username || "Clan Member";
      avatarEl.src = this.session.avatar || "";
      avatarEl.style.display = this.session.avatar ? "inline-block" : "none";
    }else{
      nameEl.textContent = "Guest";
      avatarEl.style.display = "none";
    }
  },

  /* ---------- GITHUB FLOW ---------- */
  startGithubLogin(){
    if(!this.isConfigured()){
      this.toast(`GitHub sign-in isn't set up yet. See <strong>server/README.md</strong> to connect it to the ${LUMINA_CONFIG.CLAN_NAME} org.`, "error", 6000);
      return;
    }
    const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
    try{ sessionStorage.setItem("luminaOauthState", state); }catch(e){}
    const params = new URLSearchParams({
      client_id: LUMINA_CONFIG.GITHUB_CLIENT_ID,
      redirect_uri: LUMINA_CONFIG.GITHUB_CALLBACK_URL,
      scope: LUMINA_CONFIG.GITHUB_SCOPES,
      state
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  },

  /* Handles the redirect BACK from the auth worker, e.g.
     ?login=success&user=octocat&avatar=https://...&name=Octo+Cat
     ?login=denied&reason=not_member  */
  handleRedirectResult(){
    const url = new URL(window.location.href);
    const login = url.searchParams.get("login");
    if(!login) return false;

    if(login === "success"){
      const username = url.searchParams.get("user") || "Clan Member";
      const avatar = url.searchParams.get("avatar") || "";
      this.saveSession({ mode:"github", username, avatar, ts:Date.now() });
      this.toast(`Welcome back, <strong>${username}</strong>! ⛏`, "success");
    }else if(login === "denied"){
      const reason = url.searchParams.get("reason");
      const msg = reason === "not_member"
        ? `Access denied — GitHub sign-in is reserved for <strong>${LUMINA_CONFIG.CLAN_NAME}</strong> members. Try Continue as Guest instead.`
        : "GitHub sign-in failed. Please try again or continue as a guest.";
      this.toast(msg, "error", 6000);
    }

    // Clean the auth params out of the URL without reloading
    url.searchParams.delete("login");
    url.searchParams.delete("user");
    url.searchParams.delete("avatar");
    url.searchParams.delete("name");
    url.searchParams.delete("reason");
    window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    return login === "success";
  },

  /* ---------- GUEST FLOW ---------- */
  continueAsGuest(){
    this.saveSession({ mode:"guest", ts:Date.now() });
    this.toast("Playing as Guest. Have fun! 🧍", "info", 2600);
  },

  /* ---------- SIGN OUT ---------- */
  signOut(){
    if(!confirm("Sign out and return to the login screen?")) return;
    this.clearSession();
    window.location.reload();
  },

  /* ---------- INIT ---------- */
  init(){
    this.session = this.loadSession();
    this.spawnLoginParticles();

    const cameFromRedirect = this.handleRedirectResult();
    const authed = cameFromRedirect || !!this.session;

    if(authed){
      showScreen("home");
      this.renderBadge();
    }
    // else: login screen stays active (it's the default in the HTML)

    const githubBtn = document.getElementById("btnGithubLogin");
    const guestBtn = document.getElementById("btnGuestLogin");
    const signOutBtn = document.getElementById("signOutBtn");

    githubBtn?.addEventListener("click", (e)=>{
      SoundFX?.click?.();
      this.blockBurst(githubBtn);
      this.startGithubLogin();
    });

    guestBtn?.addEventListener("click", (e)=>{
      SoundFX?.click?.();
      this.blockBurst(guestBtn);
      this.continueAsGuest();
      setTimeout(()=>{ showScreen("home"); this.renderBadge(); }, 320);
    });

    signOutBtn?.addEventListener("click", ()=> this.signOut());
  }
};

document.addEventListener("DOMContentLoaded", ()=> LuminaAuth.init());
