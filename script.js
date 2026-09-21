const home = document.getElementById("home");
const l4 = document.getElementById("l4");
const communication = document.getElementById("communication");
const lessonContent = document.getElementById("lessonContent");
const stageProgress = document.getElementById("stageProgress");
const stageLabel = document.getElementById("stageLabel");
const stageButtons = document.querySelectorAll(".stage");

let stage = 1;
let questionIndex = 0;
let score = 0;

document.getElementById("l4Button").onclick = () => show(l4);
document.getElementById("backToHome").onclick = () => show(home);
document.getElementById("backToWorlds").onclick = () => show(l4);

document.querySelector('[data-world="communicatie"]').onclick = () => {
  stage = 1;
  questionIndex = 0;
  score = 0;
  show(communication);
  renderStage();
};

function show(section) {
  [home, l4, communication].forEach(s => s.classList.add("hidden"));
  section.classList.remove("hidden");
  window.scrollTo(0, 0);
}

function updateStage() {
  stageButtons.forEach((button, i) => button.classList.toggle("active", i === stage - 1));
  stageLabel.textContent = `${stage} van 5`;
  stageProgress.style.width = `${stage * 20}%`;
}

function nextStage() {
  if (stage < 5) {
    stage++;
    questionIndex = 0;
    renderStage();
    window.scrollTo(0, 0);
  }
}

function renderStage() {
  updateStage();
  if (stage === 1) renderDiscover();
  if (stage === 2) renderUnderstand();
  if (stage === 3) renderPractice();
  if (stage === 4) renderApply();
  if (stage === 5) renderMastery();
}

function renderDiscover() {
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <h3>📨 Eerst: wie stuurt en wie ontvangt?</h3>
      <p class="intro">Als iemand iets verstuurt, noemen we die persoon de <strong>verzender</strong>. De persoon die iets krijgt, is de <strong>ontvanger</strong>.</p>

      <div class="visual-message">
        <div class="person"><span>👧</span>Emma<br><small>verstuurt</small></div>
        <div class="arrow-big">→ 💬 →</div>
        <div class="person"><span>👦</span>Milan<br><small>ontvangt</small></div>
      </div>

      <div class="concept-grid">
        <div class="concept">
          <div class="big">📤</div>
          <h4>Verzender</h4>
          <p>De verzender is degene die iets <strong>verstuurt</strong>.</p>
        </div>
        <div class="concept">
          <div class="big">📥</div>
          <h4>Ontvanger</h4>
          <p>De ontvanger is degene die iets <strong>ontvangt</strong>.</p>
        </div>
      </div>

      <p class="intro"><strong>Dit kan digitaal zijn, maar ook in het echte leven.</strong> Denk aan een brief, een cadeau, een foto of een bericht.</p>

      <div class="lesson-action"><button class="primary" id="next1">Ik snap het →</button></div>
    </div>`;
  document.getElementById("next1").onclick = () => renderOnline();
}

function renderOnline() {
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <h3>🌐 Online of offline?</h3>
      <p class="intro"><strong>Online</strong> betekent dat een apparaat verbonden is met het internet. <strong>Offline</strong> betekent dat het apparaat niet met het internet verbonden is.</p>
      <div class="concept-grid">
        <div class="concept"><div class="big">🌐</div><h4>ONLINE</h4><p>Je gebruikt een internetverbinding.</p></div>
        <div class="concept"><div class="big">📴</div><h4>OFFLINE</h4><p>Je hebt geen internetverbinding nodig.</p></div>
      </div>
      <div class="apply-box">
        <p class="question">Voorbeeld: je opent een website.</p>
        <div class="answer-grid">
          <button class="answer" data-answer="online">🌐 Online</button>
          <button class="answer" data-answer="offline">📴 Offline</button>
        </div>
        <div id="feedback"></div>
      </div>
      <div class="lesson-action"><button class="primary hidden" id="next2">Verder →</button></div>
    </div>`;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.onclick = () => {
      const feedback = document.getElementById("feedback");
      if (btn.dataset.answer === "online") {
        feedback.className = "feedback good";
        feedback.innerHTML = "✅ Juist! Een website openen doe je met een internetverbinding. Dat is <strong>online</strong>.";
        document.getElementById("next2").classList.remove("hidden");
      } else {
        feedback.className = "feedback bad";
        feedback.innerHTML = "❌ Nog niet. Een website heeft een internetverbinding nodig. Probeer opnieuw.";
      }
    };
  });
  document.getElementById("next2").onclick = nextStage;
}

const understandQuestions = [
  {q:"Emma stuurt een brief naar Milan. Wie is de verzender?", a:["Emma","Milan"], correct:0, why:"Emma stuurt de brief. Zij is dus de verzender."},
  {q:"Emma stuurt een brief naar Milan. Wie is de ontvanger?", a:["Emma","Milan"], correct:1, why:"Milan krijgt de brief. Hij is dus de ontvanger."},
  {q:"Je zoekt iets op het internet. Ben je online of offline?", a:["Online 🌐","Offline 📴"], correct:0, why:"Je gebruikt het internet, dus je bent online."},
  {q:"Je bekijkt een filmpje dat al op je tablet staat. Ben je online of offline?", a:["Online 🌐","Offline 📴"], correct:1, why:"Het filmpje staat al op je tablet. Je hebt daarvoor geen internet nodig."}
];

function renderUnderstand() {
  renderQuestionStage(understandQuestions, "Begrijp");
}

function renderQuestionStage(questions, title) {
  const q = questions[questionIndex];
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="question-counter">${title} • vraag ${questionIndex + 1} van ${questions.length}</div>
      <p class="question">${q.q}</p>
      <div class="answer-grid">${q.a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join("")}</div>
      <div id="feedback"></div>
      <div class="lesson-action"><button class="primary hidden" id="nextQuestion">${questionIndex === questions.length-1 ? "Naar Oefen →" : "Volgende →"}</button></div>
    </div>`;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.i);
      const feedback = document.getElementById("feedback");
      if (i === q.correct) {
        document.querySelectorAll(".answer").forEach(b => b.disabled = true);
        feedback.className = "feedback good";
        feedback.innerHTML = `✅ Juist! ${q.why}`;
        document.getElementById("nextQuestion").classList.remove("hidden");
      } else {
        feedback.className = "feedback bad";
        feedback.innerHTML = `❌ Nog niet. ${q.correct === 0 ? "Kijk goed naar wie iets doet." : "Kijk goed naar wie iets krijgt."}<br><button class="retry">Probeer opnieuw</button>`;
        feedback.querySelector(".retry").onclick = () => feedback.innerHTML = "";
      }
    };
  });

  document.getElementById("nextQuestion").onclick = () => {
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      renderQuestionStage(questions, title);
    } else {
      stage = 3; questionIndex = 0; renderStage();
    }
  };
}

const practiceQuestions = [
  {q:"Lotte stuurt een cadeau naar Noor. Wie is de verzender?",a:["Lotte","Noor"],correct:0},
  {q:"Je luistert naar een liedje dat al op je tablet staat. Online of offline?",a:["Online 🌐","Offline 📴"],correct:1},
  {q:"Je opent een website om dierenfoto's te bekijken. Online of offline?",a:["Online 🌐","Offline 📴"],correct:0},
  {q:"Noor krijgt een foto van Lotte. Wie is de ontvanger?",a:["Lotte","Noor"],correct:1},
  {q:"Je leest een gewoon boek. Online of offline?",a:["Online 🌐","Offline 📴"],correct:1}
];

function renderPractice() {
  renderQuestionStage(practiceQuestions, "Oefen");
}

function renderApply() {
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <h3>🚀 Pas toe</h3>
      <p class="intro">Lees de situatie. Kies telkens het juiste antwoord.</p>
      <div class="apply-box">
        <p class="question">Emma stuurt via het internet een foto naar haar papa.</p>
        <p><strong>Wie is de verzender?</strong></p>
        <div class="apply-row" id="applySender">
          <button class="choice-big" data-correct="true">👧 Emma</button>
          <button class="choice-big">👨 Papa</button>
        </div>
        <p style="margin-top:22px"><strong>Wie is de ontvanger?</strong></p>
        <div class="apply-row" id="applyReceiver">
          <button class="choice-big">👧 Emma</button>
          <button class="choice-big" data-correct="true">👨 Papa</button>
        </div>
        <p style="margin-top:22px"><strong>Is Emma online of offline?</strong></p>
        <div class="apply-row" id="applyOnline">
          <button class="choice-big" data-correct="true">🌐 Online</button>
          <button class="choice-big">📴 Offline</button>
        </div>
        <div id="applyFeedback"></div>
      </div>
      <div class="lesson-action"><button class="primary hidden" id="nextApply">Naar Beheersing →</button></div>
    </div>`;

  let completed = 0;
  document.querySelectorAll(".choice-big").forEach(btn => {
    btn.onclick = () => {
      if (btn.parentElement.dataset.done) return;
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
        btn.parentElement.dataset.done = "true";
        completed++;
      } else {
        btn.classList.add("wrong");
        setTimeout(() => btn.classList.remove("wrong"), 450);
      }
      if (completed === 3) {
        document.getElementById("applyFeedback").className = "feedback good";
        document.getElementById("applyFeedback").innerHTML = "✅ Alles juist! Je kunt de vier begrippen nu samen gebruiken.";
        document.getElementById("nextApply").classList.remove("hidden");
      }
    };
  });
  document.getElementById("nextApply").onclick = () => { stage=5; questionIndex=0; score=0; renderStage(); };
}

const masteryQuestions = [
  {q:"Wie is de verzender? Sara stuurt een kaart naar Amir.",a:["Sara","Amir"],correct:0},
  {q:"Wie is de ontvanger? Sara stuurt een kaart naar Amir.",a:["Sara","Amir"],correct:1},
  {q:"Je opent een website. Online of offline?",a:["Online 🌐","Offline 📴"],correct:0},
  {q:"Je speelt een spel waarvoor je geen internet nodig hebt. Online of offline?",a:["Online 🌐","Offline 📴"],correct:1},
  {q:"Tom stuurt een foto naar zijn oma. Wie ontvangt de foto?",a:["Tom","Zijn oma"],correct:1},
  {q:"Je bekijkt een filmpje dat al op je tablet staat. Online of offline?",a:["Online 🌐","Offline 📴"],correct:1},
  {q:"Wie is de verzender? De juf stuurt een bericht naar de klas.",a:["De juf","De klas"],correct:0},
  {q:"Je zoekt informatie op het internet. Online of offline?",a:["Online 🌐","Offline 📴"],correct:0}
];

function renderMastery() {
  if (questionIndex >= masteryQuestions.length) {
    lessonContent.innerHTML = `
      <div class="lesson-card result">
        <div style="font-size:55px">🎉</div>
        <h3>Knap gedaan!</h3>
        <div class="score">${score} / ${masteryQuestions.length}</div>
        <p>Je hebt de begrippen verzender, ontvanger, online en offline geoefend.</p>
        <button class="primary" id="restart">Opnieuw proberen</button>
      </div>`;
    document.getElementById("restart").onclick = () => { questionIndex=0; score=0; renderMastery(); };
    return;
  }

  const q = masteryQuestions[questionIndex];
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="question-counter">Beheersing • vraag ${questionIndex+1} van ${masteryQuestions.length}</div>
      <p class="question">${q.q}</p>
      <div class="answer-grid">${q.a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join("")}</div>
      <div id="feedback"></div>
      <div class="lesson-action"><button class="primary hidden" id="masteryNext">${questionIndex===masteryQuestions.length-1?"Resultaat bekijken →":"Volgende →"}</button></div>
    </div>`;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.i);
      const feedback = document.getElementById("feedback");
      document.querySelectorAll(".answer").forEach(b => b.disabled = true);
      if (i === q.correct) {
        score++;
        feedback.className = "feedback good";
        feedback.innerHTML = "✅ Juist!";
      } else {
        feedback.className = "feedback bad";
        feedback.innerHTML = `❌ Niet juist. Het goede antwoord is <strong>${q.a[q.correct]}</strong>.`;
      }
      document.getElementById("masteryNext").classList.remove("hidden");
    };
  });

  document.getElementById("masteryNext").onclick = () => {
    questionIndex++;
    renderMastery();
  };
}

document.querySelectorAll(".world-card").forEach(card => {
  if (!card.dataset.world) card.onclick = () => alert("Deze leerwereld bouwen we later.");
});


/* WERELD 2 — DE CODEKRAKER */
const codeScreen=document.getElementById("codekraker");
const codeContent=document.getElementById("codeContent");
const codeStages=document.querySelectorAll(".code-stage");
let codeStage=1, codeQ=0, codeScore=0;

if(codeScreen){
  document.getElementById("backFromCode").addEventListener("click",()=>show(l4));
  document.querySelector('[data-world="codekraker"]').addEventListener("click",()=>{
    codeStage=1;codeQ=0;codeScore=0;show(codeScreen);renderCode();
  });
}

function updateCode(){
  codeStages.forEach((b,i)=>b.classList.toggle("active",i===codeStage-1));
  document.getElementById("codeStageLabel").textContent=`${codeStage} van 5`;
  document.getElementById("codeStageProgress").style.width=`${codeStage*20}%`;
}
function renderCode(){
  updateCode();
  if(codeStage===1) codeDiscover();
  if(codeStage===2) codeUnderstand();
  if(codeStage===3) codePractice();
  if(codeStage===4) codeApply();
  if(codeStage===5) codeMastery();
}
function codeDiscover(){
  codeContent.innerHTML=`<div class="lesson-card"><div class="interactive-title"><div class="emoji">🤖</div><h3>Help de robot!</h3><p>Zet de stappen in de juiste volgorde.</p><div class="tap-hint">👆 Kies eerst wat stap 1 is</div></div><div class="code-order" id="codeOrder"><button data-step="2" type="button">🍞 Brood nemen</button><button data-step="4" type="button">🥪 Boterham klaar</button><button data-step="1" type="button">🧈 Boter nemen</button><button data-step="3" type="button">🔪 Boter op brood</button></div><div id="codeOrderFeedback" aria-live="polite"></div></div>`;
  let next=1;
  document.querySelectorAll("#codeOrder button").forEach(btn=>btn.addEventListener("click",()=>{
    const f=document.getElementById("codeOrderFeedback");
    if(Number(btn.dataset.step)===next){
      btn.classList.add("correct");btn.disabled=true;next++;
      f.className="feedback good";
      f.innerHTML=next===5?"🎉 Perfect! Dit noemen we een <strong>algoritme</strong>: stappen in een goede volgorde.":"✅ Goed! Wat is de volgende stap?";
      if(next===5){
        f.innerHTML+="<div class='lesson-action'><button class='primary' id='codeNext' type='button'>Ontdek meer →</button></div>";
        document.getElementById("codeNext").addEventListener("click",()=>{codeStage=2;renderCode()});
      }
    }else{f.className="feedback bad";f.textContent=`❌ Nog niet. Denk na: wat moet eerst? Kies stap ${next}.`;}
  }));
}
function codeUnderstand(){
  const concepts=[["📋","Algoritme","stappen in een goede volgorde"],["🧩","Decompositie","een grote taak opdelen"],["🔁","Patroonherkenning","zien wat steeds terugkomt"],["🎯","Abstractie","alleen belangrijke info houden"]];
  codeContent.innerHTML=`<div class="lesson-card"><div class="interactive-title"><div class="emoji">🧠</div><h3>Vier slimme ideeën</h3><p>Tik op elke kaart. Ontdek wat ze betekenen.</p></div><div class="code-concepts">${concepts.map((c,i)=>`<button class="code-concept" data-i="${i}" type="button"><span class="icon">${c[0]}</span><strong>${c[1]}</strong><small>${c[2]}</small></button>`).join("")}</div><div id="codeConceptFeedback" aria-live="polite"></div><div class="lesson-action"><button class="primary hidden" id="codeConceptNext" type="button">Ik ken ze →</button></div></div>`;
  const details=["Een algoritme is een reeks stappen in een goede volgorde.","Bij decompositie splits je een grote taak op in kleinere taken.","Bij patroonherkenning zoek je wat steeds terugkomt.","Bij abstractie laat je details weg die je niet nodig hebt."];
  const seen=new Set();
  document.querySelectorAll(".code-concept").forEach(btn=>btn.addEventListener("click",()=>{
    seen.add(btn.dataset.i);const f=document.getElementById("codeConceptFeedback");
    f.className="feedback good";f.textContent="💡 "+details[Number(btn.dataset.i)];
    if(seen.size===4)document.getElementById("codeConceptNext").classList.remove("hidden");
  }));
  document.getElementById("codeConceptNext").addEventListener("click",()=>{codeStage=3;codeQ=0;renderCode()});
}
const codeQuestions=[
 {q:"🎂 Je organiseert een verjaardagsfeest. Wat is decompositie?",a:["Het feest opdelen in kleinere taken","Alles tegelijk proberen"],c:0,w:"Je maakt een grote taak kleiner en overzichtelijker."},
 {q:"🔴🔵🔴🔵🔴 ... Wat komt daarna?",a:["🔴","🟢"],c:0,w:"Het patroon rood-blauw herhaalt zich."},
 {q:"☔ Je wilt weten of je een regenjas nodig hebt. Welke info is belangrijk?",a:["Of het gaat regenen","Welke kleur je schoenen hebben"],c:0,w:"De regen is belangrijk voor je beslissing."},
 {q:"📋 Een robot krijgt: vooruit, rechts, vooruit. Wat is dit?",a:["Een algoritme","Een patroon"],c:0,w:"Het is een reeks opdrachten in een bepaalde volgorde."}
];
function codePractice(){
  const q=codeQuestions[codeQ];
  codeContent.innerHTML=`<div class="lesson-card"><div class="question-counter">Oefen • vraag ${codeQ+1} van ${codeQuestions.length}</div><p class="question">${q.q}</p><div class="answer-grid">${q.a.map((x,i)=>`<button class="answer" data-i="${i}" type="button">${x}</button>`).join("")}</div><div id="codePracticeFeedback"></div><div class="lesson-action"><button class="primary hidden" id="codePracticeNext" type="button">${codeQ===codeQuestions.length-1?"Naar Pas toe →":"Volgende →"}</button></div></div>`;
  document.querySelectorAll("#codeContent .answer").forEach(btn=>btn.addEventListener("click",()=>{
    const f=document.getElementById("codePracticeFeedback"),i=Number(btn.dataset.i);
    if(i===q.c){document.querySelectorAll("#codeContent .answer").forEach(b=>b.disabled=true);codeScore++;f.className="feedback good";f.innerHTML="✅ Juist! "+q.w;document.getElementById("codePracticeNext").classList.remove("hidden");}
    else{f.className="feedback bad";f.textContent="❌ Nog niet. Denk aan wat je net ontdekt hebt.";}
  }));
  document.getElementById("codePracticeNext").addEventListener("click",()=>{if(codeQ<codeQuestions.length-1){codeQ++;renderCode()}else{codeStage=4;renderCode();}});
}
function codeApply(){
  codeContent.innerHTML=`<div class="lesson-card"><div class="interactive-title"><div class="emoji">🤖</div><h3>Programmeer de robot</h3><p>Gebruik de pijlen. Breng de robot naar de ⭐.</p></div><div class="robot-grid" id="robotGrid"></div><div class="command-row"><button class="command" data-m="left" type="button">⬅️ Links</button><button class="command" data-m="up" type="button">⬆️ Omhoog</button><button class="command" data-m="down" type="button">⬇️ Omlaag</button><button class="command" data-m="right" type="button">➡️ Rechts</button></div><div id="robotFeedback"></div><div class="lesson-action"><button class="primary hidden" id="codeApplyNext" type="button">Naar Beheersing →</button></div></div>`;
  let pos=0;const goal=19,walls=new Set([2,7,13,15]);
  function draw(){const grid=document.getElementById("robotGrid");grid.innerHTML="";for(let i=0;i<20;i++){const cell=document.createElement("div");cell.className="robot-cell";if(walls.has(i)){cell.classList.add("wall");cell.textContent="⬛";}else if(i===goal){cell.classList.add("goal");cell.textContent="⭐";}if(i===pos){cell.className="robot-cell robot";cell.textContent="🤖";}grid.appendChild(cell);}}
  draw();
  document.querySelectorAll(".command").forEach(btn=>btn.addEventListener("click",()=>{
    const r=Math.floor(pos/5),c=pos%5;let nr=r,nc=c;
    if(btn.dataset.m==="left")nc--;if(btn.dataset.m==="right")nc++;if(btn.dataset.m==="up")nr--;if(btn.dataset.m==="down")nr++;
    const f=document.getElementById("robotFeedback");
    if(nr<0||nr>3||nc<0||nc>4){f.className="feedback bad";f.textContent="🧱 Daar kan de robot niet heen.";return;}
    const np=nr*5+nc;if(walls.has(np)){f.className="feedback bad";f.textContent="🧱 Oeps, daar staat een muur.";return;}
    pos=np;draw();
    if(pos===goal){f.className="feedback good";f.innerHTML="🎉 Gelukt! Je gaf opdrachten, testte ze en verbeterde je route.";document.querySelectorAll(".command").forEach(b=>b.disabled=true);document.getElementById("codeApplyNext").classList.remove("hidden");}
  }));
  document.getElementById("codeApplyNext").addEventListener("click",()=>{codeStage=5;codeQ=0;renderCode()});
}
const codeMastery=[{q:"Wat is een algoritme?",a:["Een reeks stappen in een goede volgorde","Een tekening"],c:0},{q:"Je deelt een groot probleem op in kleine stukjes. Hoe heet dat?",a:["Decompositie","Patroonherkenning"],c:0},{q:"Je ziet rood-blauw-rood-blauw steeds terugkomen. Wat gebruik je?",a:["Patroonherkenning","Abstractie"],c:0},{q:"Je houdt alleen de informatie bij die je nodig hebt. Wat doe je?",a:["Abstractie","Decompositie"],c:0},{q:"Je test een programma en verbetert een fout. Hoe noemen we dat?",a:["Debuggen","Kopiëren"],c:0}];
function codeMastery(){
  if(codeQ>=codeMastery.length){codeContent.innerHTML=`<div class="lesson-card result"><div style="font-size:55px">🎉</div><h3>Code gekraakt!</h3><div class="score">${codeScore} / ${codeMastery.length}</div><p>Je hebt geoefend met algoritmes, decompositie, patronen, abstractie en debuggen.</p><button class="primary" id="backCodeDone" type="button">Terug naar L4</button></div>`;document.getElementById("backCodeDone").addEventListener("click",()=>show(l4));return;}
  const q=codeMastery[codeQ];
  codeContent.innerHTML=`<div class="lesson-card"><div class="question-counter">Beheersing • vraag ${codeQ+1} van ${codeMastery.length}</div><p class="question">${q.q}</p><div class="answer-grid">${q.a.map((x,i)=>`<button class="answer" data-i="${i}" type="button">${x}</button>`).join("")}</div><div id="codeMasteryFeedback"></div><div class="lesson-action"><button class="primary hidden" id="codeMasteryNext" type="button">${codeQ===codeMastery.length-1?"Resultaat bekijken →":"Volgende →"}</button></div></div>`;
  document.querySelectorAll("#codeContent .answer").forEach(btn=>btn.addEventListener("click",()=>{const f=document.getElementById("codeMasteryFeedback"),i=Number(btn.dataset.i);document.querySelectorAll("#codeContent .answer").forEach(b=>b.disabled=true);if(i===q.c){codeScore++;f.className="feedback good";f.textContent="✅ Juist!"}else{f.className="feedback bad";f.innerHTML=`❌ Het goede antwoord is <strong>${q.a[q.c]}</strong>.`};document.getElementById("codeMasteryNext").classList.remove("hidden");}));
  document.getElementById("codeMasteryNext").addEventListener("click",()=>{codeQ++;renderCode()});
}
