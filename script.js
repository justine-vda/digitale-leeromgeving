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

document.getElementById("l4Button").addEventListener("click", () => show(l4));
document.getElementById("backToHome").addEventListener("click", () => show(home));
document.getElementById("backToWorlds").addEventListener("click", () => show(l4));

document.querySelector('[data-world="communicatie"]').addEventListener("click", () => {
  stage = 1;
  questionIndex = 0;
  score = 0;
  show(communication);
  renderStage();
});

document.querySelectorAll(".world-card").forEach(card => {
  if (!card.dataset.world) {
    card.addEventListener("click", () => alert("Deze leerwereld bouwen we later."));
  }
});

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

/* 1. ONTDEK & LEER
   Veel minder tekst: eerst doen, daarna pas het begrip benoemen. */
function renderDiscover() {
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="interactive-title">
        <div class="emoji">📨</div>
        <h3>Wie stuurt het bericht?</h3>
        <p>Help Emma en Milan. Tik op de persoon die het bericht verstuurt.</p>
        <div class="tap-hint">👆 Tik op een kaart</div>
      </div>

      <div class="choice-flow">
        <button class="tap-card" id="emmaCard" type="button">
          <span class="icon">👧</span><strong>Emma</strong><small>heeft een bericht</small>
        </button>
        <div class="flow-arrow">→</div>
        <button class="tap-card" id="milanCard" type="button">
          <span class="icon">👦</span><strong>Milan</strong><small>krijgt het bericht</small>
        </button>
      </div>

      <div id="discoverFeedback"></div>

      <div class="mini-scenario hidden" id="senderExplain">
        <strong>🎯 Juist!</strong>
        <p>Emma <strong>stuurt</strong> het bericht. Emma is dus de <strong>verzender</strong>.</p>
        <button class="primary" id="nextDiscover" type="button">Nu online of offline →</button>
      </div>
    </div>`;

  document.getElementById("emmaCard").addEventListener("click", () => {
    document.getElementById("emmaCard").classList.add("selected");
    document.getElementById("milanCard").disabled = true;
    document.getElementById("discoverFeedback").className = "feedback good";
    document.getElementById("discoverFeedback").innerHTML = "✅ Goed gezien! Emma stuurt het bericht.";
    document.getElementById("senderExplain").classList.remove("hidden");
  });

  document.getElementById("milanCard").addEventListener("click", () => {
    const f = document.getElementById("discoverFeedback");
    f.className = "feedback bad";
    f.innerHTML = "❌ Kijk naar het pijltje: wie <strong>stuurt</strong> het bericht?";
  });

  document.getElementById("nextDiscover").addEventListener("click", renderOnline);
}

function renderOnline() {
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="interactive-title">
        <div class="emoji">🌐</div>
        <h3>Online of offline?</h3>
        <p>Je hoeft de woorden nog niet uit je hoofd te kennen. Kijk naar het voorbeeld.</p>
      </div>

      <div class="tap-card-grid">
        <div class="concept"><div class="big">🌐</div><h4>ONLINE</h4><p>Je hebt een internetverbinding nodig.</p></div>
        <div class="concept"><div class="big">📴</div><h4>OFFLINE</h4><p>Je hebt geen internetverbinding nodig.</p></div>
      </div>

      <div class="apply-box">
        <p class="question">📱 Je opent een website.</p>
        <p><strong>Wat denk je?</strong></p>
        <div class="answer-grid">
          <button class="answer" data-answer="online" type="button">🌐 Online</button>
          <button class="answer" data-answer="offline" type="button">📴 Offline</button>
        </div>
        <div id="feedback" aria-live="polite"></div>
      </div>
      <div class="lesson-action"><button class="primary hidden" id="next2" type="button">Ik ben klaar →</button></div>
    </div>`;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => {
      const feedback = document.getElementById("feedback");
      if (btn.dataset.answer === "online") {
        document.querySelectorAll(".answer").forEach(b => b.disabled = true);
        feedback.className = "feedback good";
        feedback.innerHTML = "✅ Juist! Een website heeft internet nodig. Dat is <strong>online</strong>.";
        document.getElementById("next2").classList.remove("hidden");
      } else {
        feedback.className = "feedback bad";
        feedback.innerHTML = "❌ Nog niet. Een website heeft internet nodig. Probeer opnieuw.";
      }
    });
  });
  document.getElementById("next2").addEventListener("click", nextStage);
}

/* 2. BEGRIJP */
const understandQuestions = [
  {q:"📨 Emma stuurt een brief naar Milan. Wie is de verzender?",a:["Emma","Milan"],correct:0,why:"Emma stuurt de brief. Zij is de verzender."},
  {q:"📬 Emma stuurt een brief naar Milan. Wie is de ontvanger?",a:["Emma","Milan"],correct:1,why:"Milan krijgt de brief. Hij is de ontvanger."},
  {q:"🌐 Je zoekt iets op het internet. Online of offline?",a:["Online","Offline"],correct:0,why:"Je gebruikt het internet, dus je bent online."},
  {q:"🎬 Je bekijkt een filmpje dat al op je tablet staat. Online of offline?",a:["Online","Offline"],correct:1,why:"Het filmpje staat al op je tablet. Je hebt daarvoor geen internet nodig."}
];

function renderUnderstand() {
  renderQuestionStage(understandQuestions, "Begrijp");
}

/* 3. OEFEN */
const practiceQuestions = [
  {q:"🎁 Lotte stuurt een cadeau naar Noor. Wie is de verzender?",a:["Lotte","Noor"],correct:0,why:"Lotte stuurt het cadeau."},
  {q:"🎵 Je luistert naar een liedje dat al op je tablet staat. Online of offline?",a:["Online","Offline"],correct:1,why:"Het liedje staat al op je tablet."},
  {q:"🌍 Je opent een website om dierenfoto's te bekijken. Online of offline?",a:["Online","Offline"],correct:0,why:"Een website openen vraagt een internetverbinding."},
  {q:"📸 Noor krijgt een foto van Lotte. Wie is de ontvanger?",a:["Lotte","Noor"],correct:1,why:"Noor krijgt de foto."},
  {q:"📖 Je leest een gewoon boek. Online of offline?",a:["Online","Offline"],correct:1,why:"Een gewoon boek heeft geen internet nodig."}
];

function renderPractice() {
  renderQuestionStage(practiceQuestions, "Oefen");
}

function renderQuestionStage(questions, title) {
  const q = questions[questionIndex];
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="question-counter">${title} • vraag ${questionIndex + 1} van ${questions.length}</div>
      <p class="question">${q.q}</p>
      <div class="answer-grid">
        ${q.a.map((x,i)=>`<button class="answer" data-i="${i}" type="button">${x}</button>`).join("")}
      </div>
      <div id="feedback" aria-live="polite"></div>
      <div class="lesson-action"><button class="primary hidden" id="nextQuestion" type="button">${questionIndex === questions.length-1 ? "Naar Pas toe →" : "Volgende →"}</button></div>
    </div>`;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.i);
      const feedback = document.getElementById("feedback");
      if (i === q.correct) {
        document.querySelectorAll(".answer").forEach(b => b.disabled = true);
        feedback.className = "feedback good";
        feedback.innerHTML = `✅ Juist! ${q.why}`;
        document.getElementById("nextQuestion").classList.remove("hidden");
      } else {
        feedback.className = "feedback bad";
        feedback.innerHTML = `❌ Nog niet. Denk even opnieuw na.<br><button class="retry" type="button">↩ Opnieuw</button>`;
        feedback.querySelector(".retry").addEventListener("click", () => feedback.innerHTML = "");
      }
    });
  });

  document.getElementById("nextQuestion").addEventListener("click", () => {
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      renderQuestionStage(questions, title);
    } else {
      stage = 4;
      questionIndex = 0;
      renderStage();
    }
  });
}

/* 4. PAS TOE — één echte situatie */
function renderApply() {
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="interactive-title">
        <div class="emoji">🚀</div>
        <h3>Jij bent de digitale detective</h3>
        <p>Los deze situatie stap voor stap op.</p>
      </div>

      <div class="apply-box">
        <p class="question">📸 Emma stuurt via het internet een foto naar haar papa.</p>

        <p><strong>1. Wie stuurt?</strong></p>
        <div class="apply-row" id="applySender">
          <button class="choice-big" data-correct="true" type="button">👧 Emma</button>
          <button class="choice-big" type="button">👨 Papa</button>
        </div>

        <p style="margin-top:22px"><strong>2. Wie krijgt de foto?</strong></p>
        <div class="apply-row" id="applyReceiver">
          <button class="choice-big" type="button">👧 Emma</button>
          <button class="choice-big" data-correct="true" type="button">👨 Papa</button>
        </div>

        <p style="margin-top:22px"><strong>3. Online of offline?</strong></p>
        <div class="apply-row" id="applyOnline">
          <button class="choice-big" data-correct="true" type="button">🌐 Online</button>
          <button class="choice-big" type="button">📴 Offline</button>
        </div>

        <div id="applyFeedback" aria-live="polite"></div>
      </div>

      <div class="lesson-action"><button class="primary hidden" id="nextApply" type="button">Naar Beheersing →</button></div>
    </div>`;

  let completed = 0;

  document.querySelectorAll(".choice-big").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.parentElement.dataset.done) return;

      if (btn.dataset.correct === "true") {
        btn.classList.add("correct","pop");
        btn.parentElement.dataset.done = "true";
        btn.parentElement.querySelectorAll(".choice-big").forEach(b => b.disabled = true);
        completed++;
      } else {
        btn.classList.add("wrong");
        setTimeout(() => btn.classList.remove("wrong"), 450);
      }

      if (completed === 3) {
        document.getElementById("applyFeedback").className = "feedback good";
        document.getElementById("applyFeedback").innerHTML = "🎉 Alles juist! Jij kunt verzender, ontvanger en online/offline samen gebruiken.";
        document.getElementById("nextApply").classList.remove("hidden");
      }
    });
  });

  document.getElementById("nextApply").addEventListener("click", () => {
    stage = 5;
    questionIndex = 0;
    score = 0;
    renderStage();
  });
}

/* 5. BEHEERSING */
const masteryQuestions = [
  {q:"📨 Wie is de verzender? Sara stuurt een kaart naar Amir.",a:["Sara","Amir"],correct:0},
  {q:"📬 Wie is de ontvanger? Sara stuurt een kaart naar Amir.",a:["Sara","Amir"],correct:1},
  {q:"🌐 Je opent een website. Online of offline?",a:["Online","Offline"],correct:0},
  {q:"🎮 Je speelt een spel waarvoor je geen internet nodig hebt. Online of offline?",a:["Online","Offline"],correct:1},
  {q:"📸 Tom stuurt een foto naar zijn oma. Wie ontvangt de foto?",a:["Tom","Zijn oma"],correct:1},
  {q:"🎬 Je bekijkt een filmpje dat al op je tablet staat. Online of offline?",a:["Online","Offline"],correct:1},
  {q:"📢 De juf stuurt een bericht naar de klas. Wie is de verzender?",a:["De juf","De klas"],correct:0},
  {q:"🔎 Je zoekt informatie op het internet. Online of offline?",a:["Online","Offline"],correct:0}
];

function renderMastery() {
  if (questionIndex >= masteryQuestions.length) {
    lessonContent.innerHTML = `
      <div class="lesson-card result">
        <div style="font-size:55px">🎉</div>
        <h3>Knap gedaan!</h3>
        <div class="score">${score} / ${masteryQuestions.length}</div>
        <p>Je hebt geoefend met <strong>verzender</strong>, <strong>ontvanger</strong>, <strong>online</strong> en <strong>offline</strong>.</p>
        <button class="primary" id="restart" type="button">Opnieuw proberen</button>
      </div>`;
    document.getElementById("restart").addEventListener("click", () => {
      questionIndex = 0;
      score = 0;
      renderMastery();
    });
    return;
  }

  const q = masteryQuestions[questionIndex];
  lessonContent.innerHTML = `
    <div class="lesson-card">
      <div class="question-counter">Beheersing • vraag ${questionIndex+1} van ${masteryQuestions.length}</div>
      <p class="question">${q.q}</p>
      <div class="answer-grid">${q.a.map((x,i)=>`<button class="answer" data-i="${i}" type="button">${x}</button>`).join("")}</div>
      <div id="feedback" aria-live="polite"></div>
      <div class="lesson-action"><button class="primary hidden" id="masteryNext" type="button">${questionIndex===masteryQuestions.length-1?"Resultaat bekijken →":"Volgende →"}</button></div>
    </div>`;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.i);
      const feedback = document.getElementById("feedback");
      document.querySelectorAll(".answer").forEach(b => b.disabled = true);

      if (i === q.correct) {
        score++;
        feedback.className = "feedback good";
        feedback.innerHTML = "✅ Juist! Goed geredeneerd.";
      } else {
        feedback.className = "feedback bad";
        feedback.innerHTML = `❌ Niet juist. Het goede antwoord is <strong>${q.a[q.correct]}</strong>.`;
      }
      document.getElementById("masteryNext").classList.remove("hidden");
    });
  });

  document.getElementById("masteryNext").addEventListener("click", () => {
    questionIndex++;
    renderMastery();
  });
}
