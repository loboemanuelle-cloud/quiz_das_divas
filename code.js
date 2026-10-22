
const questions = [
  {
    question: "Quem é conhecida como a Princess of Pop?",
    answers: [
      "Britney Spears",
      "Lady Gaga",
      "Rihanna",
      "Ariana Grande"
    ],
    correct: 0
  },
  {
    question: "Qual diva lançou o álbum 'The Rise and Fall of a Midwest Princess'?",
    answers: [
      "Taylor Swift",
      "Chappell Roan",
      "Dua Lipa",
      "Miley Cyrus"
    ],
    correct: 1
  },
  {
    question: "Qual é o nome do fandom da Lady Gaga?",
    answers: [
      "Swifties",
      "Little Monsters",
      "Arianators",
      "Navy"
    ],
    correct: 1
  },
  {
    question: "Quem canta o hit 'When did you get hot'?",
    answers: [
      "Katy Perry",
      "Madonna",
      "Sabrina Carpenter",
      "P!nk"
    ],
    correct: 2
  },
  {
    question: "Quem lançou o álbum '1989'?",
    answers: [
      "Taylor Swift",
      "Olivia Rodrigo",
      "Sabrina Carpenter",
      "Selena Gomez"
    ],
     correct: 0
  },
     {
    question: "Qual destas musicas é um hit de Avril Lavigne?",
    answers: [
      "Complicated",
      "Expetations",
      "Let me love you",
      "Vogue"
    ],
     correct: 0
     },
     {
    question: "Qual cantora lançou Shake It Off?",
    answers: [
      "Kate Perry",
      "Lady Gaga",
      "Taylor Swift",
      "Ariana Grande"
    ],
      correct: 2
     },
     {
    question: "Qual é o nome do fandom da Ariana Grande?",
    answers: [
      "Swifties",
      "Little Monsters",
      "Arianators",
      "Navy"
    ],
      correct: 2
     },
     {
    question: "Qual é o nome do álbum de estreia de Amy Winehouse?",
    answers: [
      "Back to Black",
      "Frank",
      "Lioness",
      "Rehab"
    ],
      correct: 0
     },
     {
    question: "Qual cantora cantou o hit da copa Waka Waka?",
    answers: [
      "Jennifer Lopez",
      "Shakira",
      "Beoncé",
      "Alicia Keya"
    ],
      correct: 1
     },
     {
    question: "Quem canta Umbrella?",
    answers: [
      "Beyoncé",
      "Rihanna",
      "Britney Spears",
      "Lady Gaga"
    ],
      correct: 1
     },
     {
    question: "Quem canta Single Ladies?",
    answers: [
      "Jennifer Lopez",
      "Christina Aguilera",
      "Beyoncé",
      "Rihanna"
    ],
       correct: 2
     },
     {
    question: "Quem canta o hit Thank u next?",
    answers: [
      "Gwen Stefani",
      "Beyoncé",
      "Ariana Grande",
      "Taylor Swift"
    ],
        correct: 2
     },
     {
    question: "Qual cantora lançou Cool for the Summer?",
    answers: [
      "Selena Gomez",
      "Demi Lovato",
      "Ariana Grande",
      "Miley Cyrus"
    ],
       correct: 1
     },
     {
    question: "Qual dessas musicas e da Chappell Roan?",
    answers: [
      "Please please please",
      "New Rules",
     "Lady Gaga",
      "Pink Pony Club"
    ],
    correct: 3
  }
];

let current = 0;
let points = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next");
const gameEl = document.getElementById("game");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

function showQuestion() {
  answered = false;

  const q = questions[current];

  document.getElementById("counter").textContent =
    `PERGUNTA ${current + 1} DE ${questions.length}`;

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";

  progressBar.style.width =
    `${(current / questions.length) * 100}%`;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;
    button.type = "button";

    button.addEventListener("click", () => {
      checkAnswer(index, button);
    });

    answersEl.appendChild(button);
  });
}

function checkAnswer(index, selectedButton) {
  if (answered) return;

  answered = true;

  const q = questions[current];
  const buttons = answersEl.querySelectorAll(".answer");

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.correct) {
      button.classList.add("correct");
    }
  });

  if (index === q.correct) {
    points++;
    feedbackEl.textContent = "SLAYYY! ✨ Você acertou!";
  } else {
    selectedButton.classList.add("wrong");

    feedbackEl.textContent =
      `OOPS, diva! A resposta era ${q.answers[q.correct]} 💋`;
  }

  progressBar.style.width =
    `${((current + 1) / questions.length) * 100}%`;

  nextBtn.textContent =
    current === questions.length - 1
      ? "VER MEU RESULTADO ★"
      : "PRÓXIMA ✧";

  nextBtn.style.display = "block";
}

function showResult() {
  gameEl.style.display = "none";
  resultEl.style.display = "block";

  document.getElementById("score").textContent =
    `Você acertou ${points} de ${questions.length} perguntas!`;

  let title;
  let message;

  if (points === 15) {
    title = "POP CULTURE ICON ";
    message =
      "Você é literalmente a enciclopédia das divas pop!";
  } else if (points >= 7) {
    title = "IT GIRL EM ASCENSÃO ";
    message = "Seu lugar no tapete rosa está garantido!";
  } else {
    title = "FUTURA POP PRINCESS ";
    message =
      "Hora de montar sua playlist e maratonar os clipes!";
  }

  document.getElementById("result-title").textContent = title;
  document.getElementById("result-text").textContent = message;
}

nextBtn.addEventListener("click", () => {
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

document.getElementById("restart").addEventListener("click", () => {
  current = 0;
  points = 0;

  gameEl.style.display = "block";
  resultEl.style.display = "none";

  showQuestion();
});

showQuestion();
