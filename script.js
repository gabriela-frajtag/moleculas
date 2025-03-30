
let correctAnswer = "cafeína";
let attempts = 6;

function checkAnswer() {
  const input = document.getElementById("iupac-input").value.toLowerCase();
  const feedback = document.getElementById("feedback");
  const lives = document.getElementById("lives");
  const funFact = document.getElementById("fun-fact");

  if (input === correctAnswer) {
    feedback.innerText = "🎉 Acertou!";
    funFact.style.display = "block";
    funFact.innerText = "Essa molécula é a cafeína! Está presente no café, chá e afeta os receptores de adenosina no cérebro.";
  } else {
    attempts--;
    lives.innerText = "🧬".repeat(attempts);
    if (attempts === 0) {
      feedback.innerText = `😢 Fim de jogo! A resposta era: ${correctAnswer}`;
      funFact.style.display = "block";
      funFact.innerText = "Essa molécula é a cafeína! Está presente no café, chá e afeta os receptores de adenosina no cérebro.";
    } else {
      feedback.innerText = "❌ Tente novamente!";
    }
  }
}
