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
