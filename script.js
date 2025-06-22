const data = [
  { word: 'Accessible', prompt: 'Voice assistants make tech ___.', answer: 'Accessible', hint: 'Easy to use/access.' },
  { word: 'To doomscroll', prompt: 'She ___ for hours during the crisis.', answer: 'To doomscroll', hint: 'To obsessively read bad news online.' },
  { word: 'Disinformation', prompt: 'The viral post about miracle cures was pure ___.', answer: 'Disinformation', hint: 'False information spread deliberately to deceive.' },
  { word: 'To distract', prompt: 'Constant smartphone notifications ___ students from their studies.', answer: 'To distract', hint: 'To divert attention away from something.' },
  { word: 'Cryptocurrency', prompt: '___ prices fluctuate wildly.', answer: 'Cryptocurrency', hint: 'Digital money (e.g. Bitcoin).' },
  { word: 'Fact-check', prompt: 'The article includes a ___ at the bottom.', answer: 'Fact-check', hint: 'Verification process.' },
  { word: 'Cloud', prompt: 'She saved her files to the ___.', answer: 'Cloud', hint: 'Online data storage.' },
  { word: 'Deepfake', prompt: 'The ___ video spread misinformation.', answer: 'Deepfake', hint: 'AI-generated fake media.' },
  { word: 'User-friendly', prompt: 'The app’s ___ interface helps seniors.', answer: 'User-friendly', hint: 'Intuitive design.' },
  { word: 'Portable', prompt: '___ chargers are essential for travelers.', answer: 'Portable', hint: 'Easy to carry or move.' }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp) return;

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);











