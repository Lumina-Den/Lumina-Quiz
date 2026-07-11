/* =========================================================
   LUMINA CLAN — GAME ENGINE
   Vanilla JS. No dependencies.
   ========================================================= */

/* ---------- STORAGE KEYS ---------- */
const STORAGE_KEY = "luminaClanQuizData";

/* ---------- DEFAULT PERSISTENT STATE ---------- */
function defaultData(){
  return {
    gamesPlayed: 0,
    totalXP: 0,
    totalEmeralds: 0,
    bestScore: 0,
    highestAccuracy: 0,
    hadPerfectGame: false,
    langStats: {},          // { java: { played, best, avgScore } }
    unlockedAchievements: [],
    settings: { music:50, sfx:70, animations:true, theme:"overworld", musicOn:true, sfxOn:true }
  };
}

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultData();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultData(), parsed);
  }catch(e){ return defaultData(); }
}

function saveData(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData)); }

let gameData = loadData();

/* ---------- SOUND ENGINE (WebAudio, no external files needed) ---------- */
const SoundFX = {
  ctx: null,
  ensure(){ if(!this.ctx){ try{ this.ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } },
  beep(freq, duration, type="square", vol=0.15){
    if(!gameData.settings.sfxOn) return;
    this.ensure();
    if(!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol * (gameData.settings.sfx/100);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.stop(this.ctx.currentTime + duration);
  },
  click(){ this.beep(440, 0.08, "square", 0.12); },
  hover(){ this.beep(660, 0.04, "sine", 0.05); },
  correct(){ this.beep(523, 0.09); setTimeout(()=>this.beep(784,0.12),90); },
  wrong(){ this.beep(160, 0.25, "sawtooth", 0.18); },
  levelComplete(){ [523,659,784,1046].forEach((f,i)=>setTimeout(()=>this.beep(f,0.15),i*110)); },
  gameOver(){ [400,300,200].forEach((f,i)=>setTimeout(()=>this.beep(f,0.3,"sawtooth"),i*160)); }
};

/* ---------- NAVIGATION ---------- */
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen-"+id).classList.add("active");
}

function openModal(id){
  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("modal-"+id).classList.add("active");
  SoundFX.click();
}
function closeModals(){
  document.getElementById("modalOverlay").classList.remove("active");
  document.querySelectorAll(".modal").forEach(m=>m.classList.remove("active"));
}

/* ---------- BACKGROUND PARTICLES ---------- */
function spawnBgParticles(){
  const layer = document.getElementById("bgParticles");
  for(let i=0;i<26;i++){
    const p = document.createElement("span");
    p.style.left = Math.random()*100+"%";
    p.style.animationDuration = (8+Math.random()*10)+"s";
    p.style.animationDelay = (Math.random()*10)+"s";
    p.style.opacity = 0.3+Math.random()*0.5;
    layer.appendChild(p);
  }
}

/* =========================================================
   LANGUAGE SELECT SCREEN
   ========================================================= */
function renderLanguageGrid(){
  const grid = document.getElementById("langGrid");
  grid.innerHTML = "";
  Object.keys(QUESTIONS_DB).forEach(key=>{
    const lang = QUESTIONS_DB[key];
    const qCount = lang.questions.length;
    const estTime = Math.round(qCount*30/60*10)/10;
    const card = document.createElement("div");
    card.className = "lang-card";
    card.style.setProperty("--card-color", lang.color);
    card.innerHTML = `
      <div class="lang-icon">${lang.icon}</div>
      <div class="lang-name">${lang.name.toUpperCase()}</div>
      <div class="lang-meta">
        <span>📝 ${qCount} Questions</span>
        <span>⏱ ~${estTime} min</span>
      </div>
      <div class="lang-diff">${lang.difficulty.toUpperCase()}</div>
    `;
    card.addEventListener("click", ()=>{ SoundFX.click(); startQuiz(key); });
    card.addEventListener("mouseenter", ()=>SoundFX.hover());
    grid.appendChild(card);
  });
}

/* =========================================================
   QUIZ STATE
   ========================================================= */
let quiz = null;

function startQuiz(langKey){
  const lang = QUESTIONS_DB[langKey];
  const shuffled = shuffleArray(lang.questions.map((q,idx)=>({...q, options:[...q.options]})));
  // shuffle options within each question while tracking correct answer
  shuffled.forEach(q=>{
    const correctText = q.options[q.correct];
    q.options = shuffleArray(q.options);
    q.correct = q.options.indexOf(correctText);
  });

  quiz = {
    langKey, lang,
    questions: shuffled,
    index: 0,
    score: 0,
    xp: 0,
    emeralds: 0,
    hearts: 3,
    correctCount: 0,
    wrongCount: 0,
    skippedCount: 0,
    combo: 0,
    bestCombo: 0,
    startTime: Date.now(),
    timerHandle: null,
    timeLeft: 30,
    answered: false
  };

  showScreen("quiz");
  document.getElementById("qLangBadge").textContent = lang.name.toUpperCase();
  updateHud();
  renderQuestion();
}

function shuffleArray(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

/* ---------- RENDER QUESTION ---------- */
function renderQuestion(){
  quiz.answered = false;
  const q = quiz.questions[quiz.index];

  document.getElementById("qCounter").textContent = `Question ${quiz.index+1} / ${quiz.questions.length}`;
  document.getElementById("progressFill").style.width = ((quiz.index)/quiz.questions.length*100)+"%";

  const card = document.getElementById("questionCard");
  card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
  document.getElementById("questionText").textContent = q.q;

  const codeEl = document.getElementById("codeSnippet");
  if(q.code){ codeEl.style.display="block"; codeEl.textContent = q.code; }
  else{ codeEl.style.display="none"; codeEl.textContent=""; }

  const grid = document.getElementById("answersGrid");
  grid.innerHTML = "";
  const letters = ["A","B","C","D"];
  q.options.forEach((opt, i)=>{
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", (e)=>selectAnswer(i, btn, e));
    btn.addEventListener("mouseenter", ()=>SoundFX.hover());
    grid.appendChild(btn);
  });

  updateHeartsDisplay();
  startTimer();
}

/* ---------- TIMER ---------- */
function startTimer(){
  clearInterval(quiz.timerHandle);
  quiz.timeLeft = 30;
  const bar = document.getElementById("timerBar");
  const text = document.getElementById("timerText");
  bar.classList.remove("warning");
  bar.style.width = "100%";
  text.textContent = "30";

  quiz.timerHandle = setInterval(()=>{
    quiz.timeLeft--;
    text.textContent = quiz.timeLeft;
    bar.style.width = (quiz.timeLeft/30*100)+"%";
    if(quiz.timeLeft <= 10) bar.classList.add("warning");
    if(quiz.timeLeft <= 0){
      clearInterval(quiz.timerHandle);
      handleTimeout();
    }
  },1000);
}

function handleTimeout(){
  if(quiz.answered) return;
  quiz.answered = true;
  quiz.skippedCount++;
  quiz.combo = 0;
  loseHeart();
  revealCorrect();
  disableAnswers();
  setTimeout(nextStep, 1200);
}

/* ---------- ANSWER SELECTION ---------- */
function selectAnswer(index, btnEl, evt){
  if(quiz.answered) return;
  quiz.answered = true;
  clearInterval(quiz.timerHandle);

  createRipple(btnEl, evt);

  const q = quiz.questions[quiz.index];
  const isCorrect = index === q.correct;

  if(isCorrect){
    btnEl.classList.add("correct");
    quiz.correctCount++;
    quiz.combo++;
    quiz.bestCombo = Math.max(quiz.bestCombo, quiz.combo);
    let xpGain = 10;
    let emeraldGain = 2;
    if(quiz.combo >= 3){ xpGain += 5; emeraldGain += 1; }
    quiz.xp += xpGain;
    quiz.emeralds += emeraldGain;
    quiz.score += xpGain;
    SoundFX.correct();
    spawnPixelParticles(btnEl, "correct");
    spawnFloatingText(btnEl, `+${xpGain} XP  +${emeraldGain} 💎`, "#17d873");
  }else{
    btnEl.classList.add("wrong");
    quiz.wrongCount++;
    quiz.combo = 0;
    loseHeart();
    SoundFX.wrong();
    spawnPixelParticles(btnEl, "wrong");
    triggerScreenShake();
    revealCorrect();
  }

  updateHud();
  disableAnswers();
  setTimeout(nextStep, 1200);
}

function revealCorrect(){
  const q = quiz.questions[quiz.index];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((b,i)=>{ if(i===q.correct) b.classList.add("correct"); });
}
function disableAnswers(){
  document.querySelectorAll(".answer-btn").forEach(b=>b.disabled=true);
}

function loseHeart(){
  quiz.hearts--;
  updateHeartsDisplay();
  if(quiz.hearts <= 0){
    setTimeout(()=>endQuiz(true), 1300);
  }
}
function updateHeartsDisplay(){
  const full = "❤".repeat(Math.max(quiz.hearts,0));
  const empty = "🖤".repeat(3-Math.max(quiz.hearts,0));
  document.getElementById("heartsDisplay").textContent = full+empty;
}

function updateHud(){
  document.getElementById("emeraldCount").textContent = quiz.emeralds;
  document.getElementById("scoreCount").textContent = quiz.score;
  document.getElementById("xpBarFill").style.width = Math.min(100,(quiz.xp % 100))+"%";
  const comboTag = document.getElementById("comboTag");
  if(quiz.combo >= 2){
    comboTag.style.display = "inline-block";
    document.getElementById("comboVal").textContent = quiz.combo;
  }else{
    comboTag.style.display = "none";
  }
}

/* ---------- NEXT STEP ---------- */
function nextStep(){
  if(quiz.hearts <= 0) return; // endQuiz already scheduled
  quiz.index++;
  if(quiz.index >= quiz.questions.length){
    endQuiz(false);
  }else{
    renderQuestion();
  }
}

/* ---------- EFFECTS ---------- */
function createRipple(el, evt){
  const rect = el.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size+"px";
  const x = (evt?.clientX ?? rect.left+rect.width/2) - rect.left - size/2;
  const y = (evt?.clientY ?? rect.top+rect.height/2) - rect.top - size/2;
  ripple.style.left = x+"px";
  ripple.style.top = y+"px";
  el.appendChild(ripple);
  setTimeout(()=>ripple.remove(), 550);
}

function spawnPixelParticles(el, type){
  if(!gameData.settings.animations) return;
  const rect = el.getBoundingClientRect();
  const layer = document.getElementById("particleLayer");
  const color = type==="correct" ? "#17d873" : "#e6423d";
  for(let i=0;i<14;i++){
    const p = document.createElement("div");
    p.className = "pixel-particle";
    p.style.left = (rect.left+rect.width/2)+"px";
    p.style.top = (rect.top+rect.height/2)+"px";
    p.style.background = color;
    const angle = Math.random()*Math.PI*2;
    const dist = 40+Math.random()*60;
    p.style.setProperty("--dx", Math.cos(angle)*dist+"px");
    p.style.setProperty("--dy", Math.sin(angle)*dist+"px");
    layer.appendChild(p);
    setTimeout(()=>p.remove(), 700);
  }
}

function spawnFloatingText(el, text, color){
  const rect = el.getBoundingClientRect();
  const layer = document.getElementById("floatingLayer");
  const t = document.createElement("div");
  t.className = "floating-points";
  t.textContent = text;
  t.style.left = (rect.left+rect.width/2-40)+"px";
  t.style.top = (rect.top)+"px";
  t.style.color = color;
  layer.appendChild(t);
  setTimeout(()=>t.remove(), 1000);
}

function triggerScreenShake(){
  if(!gameData.settings.animations) return;
  const screen = document.getElementById("screen-quiz");
  screen.classList.add("screen-shake");
  setTimeout(()=>screen.classList.remove("screen-shake"), 400);
}

/* =========================================================
   END QUIZ / RESULTS
   ========================================================= */
function endQuiz(diedFromHearts){
  clearInterval(quiz.timerHandle);
  const totalAnswered = quiz.correctCount + quiz.wrongCount + quiz.skippedCount;
  const accuracy = totalAnswered>0 ? Math.round((quiz.correctCount/quiz.questions.length)*100) : 0;
  const timeTaken = Math.round((Date.now()-quiz.startTime)/1000);
  const isPerfect = quiz.correctCount === quiz.questions.length;

  // Update persistent stats
  gameData.gamesPlayed++;
  gameData.totalXP += quiz.xp;
  gameData.totalEmeralds += quiz.emeralds;
  gameData.bestScore = Math.max(gameData.bestScore, quiz.score);
  gameData.highestAccuracy = Math.max(gameData.highestAccuracy, accuracy);
  if(isPerfect) gameData.hadPerfectGame = true;

  const ls = gameData.langStats[quiz.langKey] || { played:0, best:0, totalScore:0 };
  ls.played++;
  ls.best = Math.max(ls.best, accuracy);
  ls.totalScore += quiz.score;
  gameData.langStats[quiz.langKey] = ls;

  saveData();
  checkAchievements();

  if(quiz.hearts <= 0) SoundFX.gameOver();
  else SoundFX.levelComplete();

  // Populate results screen
  const rank = getRank(accuracy);
  document.getElementById("trophyIcon").textContent = rank.icon;
  document.getElementById("rankName").textContent = rank.name;
  document.getElementById("rankBadge").style.background = `linear-gradient(180deg, ${rank.color}, #00000066)`;
  document.getElementById("resLang").textContent = quiz.lang.name;
  document.getElementById("resCorrect").textContent = quiz.correctCount;
  document.getElementById("resWrong").textContent = quiz.wrongCount;
  document.getElementById("resSkipped").textContent = quiz.skippedCount;
  document.getElementById("resAccuracy").textContent = accuracy+"%";
  document.getElementById("resTime").textContent = timeTaken+"s";
  document.getElementById("resXP").textContent = quiz.xp;
  document.getElementById("resEmeralds").textContent = quiz.emeralds;
  document.getElementById("resCombo").textContent = "x"+quiz.bestCombo;

  showScreen("results");
}

function getRank(accuracy){
  return RANKS.find(r=>accuracy>=r.min && accuracy<=r.max) || RANKS[0];
}

/* =========================================================
   ACHIEVEMENTS
   ========================================================= */
function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    if(!gameData.unlockedAchievements.includes(a.id) && a.check(gameData)){
      gameData.unlockedAchievements.push(a.id);
      showAchievementPopup(a);
    }
  });
  saveData();
}

function showAchievementPopup(ach){
  const popup = document.getElementById("achievementPopup");
  document.getElementById("achPopupIcon").textContent = ach.icon;
  document.getElementById("achPopupName").textContent = ach.name;
  popup.classList.add("show");
  setTimeout(()=>popup.classList.remove("show"), 3200);
}

function renderAchievements(){
  const grid = document.getElementById("achGrid");
  grid.innerHTML = "";
  ACHIEVEMENTS.forEach(a=>{
    const unlocked = gameData.unlockedAchievements.includes(a.id);
    const item = document.createElement("div");
    item.className = "ach-item" + (unlocked ? " unlocked" : "");
    item.innerHTML = `<span class="ach-icon">${a.icon}</span><span class="ach-name">${a.name}</span><span class="ach-check">${unlocked?"✔":"🔒"}</span>`;
    grid.appendChild(item);
  });
}

/* =========================================================
   STATISTICS
   ========================================================= */
function renderStats(){
  const grid = document.getElementById("statsGrid");
  let favLang = "—";
  let maxPlayed = 0;
  Object.keys(gameData.langStats).forEach(k=>{
    if(gameData.langStats[k].played > maxPlayed){
      maxPlayed = gameData.langStats[k].played;
      favLang = QUESTIONS_DB[k]?.name || k;
    }
  });
  const avgScore = gameData.gamesPlayed>0 ? Math.round(gameData.totalXP/gameData.gamesPlayed) : 0;

  const stats = [
    ["Best Score", gameData.bestScore],
    ["Highest Accuracy", gameData.highestAccuracy+"%"],
    ["Games Played", gameData.gamesPlayed],
    ["Total XP", gameData.totalXP],
    ["Total Emeralds", gameData.totalEmeralds],
    ["Favorite Language", favLang],
    ["Average Score", avgScore]
  ];
  grid.innerHTML = stats.map(([label,val])=>`
    <div class="result-stat"><span class="rs-label">${label}</span><span class="rs-val">${val}</span></div>
  `).join("");
}

/* =========================================================
   SETTINGS
   ========================================================= */
function applySettingsToUI(){
  document.getElementById("musicVolume").value = gameData.settings.music;
  document.getElementById("sfxVolume").value = gameData.settings.sfx;
  document.getElementById("animToggle").checked = gameData.settings.animations;
  document.getElementById("themeSelect").value = gameData.settings.theme;
  updateToggleIcons();
}
function updateToggleIcons(){
  document.getElementById("musicToggle").textContent = gameData.settings.musicOn ? "🎵" : "🔇";
  document.getElementById("sfxToggle").textContent = gameData.settings.sfxOn ? "🔊" : "🔈";
  document.getElementById("musicToggle").classList.toggle("muted", !gameData.settings.musicOn);
  document.getElementById("sfxToggle").classList.toggle("muted", !gameData.settings.sfxOn);
}

/* =========================================================
   EVENT WIRING
   ========================================================= */
function init(){
  spawnBgParticles();
  renderLanguageGrid();
  applySettingsToUI();

  document.getElementById("btnPlay").addEventListener("click", ()=>{ SoundFX.click(); showScreen("languages"); });
  document.getElementById("btnHowTo").addEventListener("click", ()=>openModal("howto"));
  document.getElementById("btnSettings").addEventListener("click", ()=>openModal("settings"));
  document.getElementById("btnStats").addEventListener("click", ()=>{ renderStats(); openModal("stats"); });
  document.getElementById("btnAchievements").addEventListener("click", ()=>{ renderAchievements(); openModal("achievements"); });
  document.getElementById("btnCredits").addEventListener("click", ()=>openModal("credits"));

  document.querySelectorAll("[data-back]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ SoundFX.click(); showScreen(btn.dataset.back); });
  });

  document.querySelectorAll(".modal-close").forEach(btn=>{
    btn.addEventListener("click", ()=>{ SoundFX.click(); closeModals(); });
  });
  document.getElementById("modalOverlay").addEventListener("click", closeModals);

  document.getElementById("musicToggle").addEventListener("click", ()=>{
    gameData.settings.musicOn = !gameData.settings.musicOn;
    updateToggleIcons(); saveData();
  });
  document.getElementById("sfxToggle").addEventListener("click", ()=>{
    gameData.settings.sfxOn = !gameData.settings.sfxOn;
    updateToggleIcons(); saveData(); if(gameData.settings.sfxOn) SoundFX.click();
  });
  document.getElementById("fullscreenBtn").addEventListener("click", ()=>{
    if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  document.getElementById("musicVolume").addEventListener("input", e=>{ gameData.settings.music = +e.target.value; saveData(); });
  document.getElementById("sfxVolume").addEventListener("input", e=>{ gameData.settings.sfx = +e.target.value; saveData(); });
  document.getElementById("animToggle").addEventListener("change", e=>{ gameData.settings.animations = e.target.checked; saveData(); });
  document.getElementById("themeSelect").addEventListener("change", e=>{ gameData.settings.theme = e.target.value; saveData(); applyTheme(); });

  document.getElementById("btnResetData").addEventListener("click", ()=>{
    if(confirm("Reset ALL progress? This cannot be undone.")){
      gameData = defaultData();
      saveData();
      renderStats(); renderAchievements(); applySettingsToUI();
      alert("Progress reset!");
    }
  });

  document.getElementById("btnPlayAgain").addEventListener("click", ()=>{ SoundFX.click(); startQuiz(quiz.langKey); });
  document.getElementById("btnChooseLang").addEventListener("click", ()=>{ SoundFX.click(); showScreen("languages"); });
  document.getElementById("btnGoHome").addEventListener("click", ()=>{ SoundFX.click(); showScreen("home"); });
  document.getElementById("btnShareScore").addEventListener("click", shareScore);

  applyTheme();
}

function shareScore(){
  const text = `I scored ${quiz.score} points (${document.getElementById("resAccuracy").textContent} accuracy) on the ${quiz.lang.name} quiz at Lumina Clan! 🏆`;
  if(navigator.share){
    navigator.share({ title:"Lumina Clan Quiz", text }).catch(()=>{});
  }else{
    navigator.clipboard?.writeText(text);
    alert("Score copied to clipboard!\n\n"+text);
  }
}

function applyTheme(){
  const themes = {
    overworld: { top:"#4d9be6", bottom:"#bfe4ff" },
    nether: { top:"#4a1010", bottom:"#7a2a1a" },
    end: { top:"#1a1030", bottom:"#3a2a5a" }
  };
  const t = themes[gameData.settings.theme] || themes.overworld;
  document.documentElement.style.setProperty("--sky-top", t.top);
  document.documentElement.style.setProperty("--sky-bottom", t.bottom);
}

document.addEventListener("DOMContentLoaded", init);
