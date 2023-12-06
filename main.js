const panels = document.querySelectorAll(".panel");
const start = document.querySelector("#start");
const sequences = [];
let index = 0;
let score = 0;
let canPlay = false;

for (let i = 0; i < panels.length; i++) {
  const panel = panels[i];
  panel.addEventListener("click", clicked);
}

function clicked(e) {
  if (!canPlay) {
    return;
  }

  Beau(e.currentTarget);
  const isValid = verifySequ(index, e.currentTarget);
  if (isValid) {
    if (index >= sequences.length - 1) {
      index = 0;
      sequence();
      setScore();
    } else index++;
  } else alert(`You lose Bitch Ton score était de ${score}`);
}

function sequence() {
  const random = Math.floor(Math.random() * panels.length);
  sequences.push(panels[random]);
  playSequences();
}

function playSequences() {
  let index = 0;
  const length = sequences.length;
  const T = setInterval(() => {
    sequences[index].classList.add("active");
    setTimeout(() => {
      sequences[index].classList.remove("active");

      if (index >= length - 1) {
        canPlay = true;
        clearInterval(T);
      } else {
        canPlay = false;
      }

      index++;
    }, 500);
  }, 1000);
}

function verifySequ(index, clicked) {
  if (sequences[index] === clicked) {
    return true;
  }
  return false;
}

function Beau(element) {
  element.classList.add("clicked");
  setTimeout(() => {
    element.classList.remove("clicked");
  }, 200);
}

start.addEventListener("click", (e) => {
  start.classList.add("hidden");
  document.querySelector("#container").classList.remove("hidden");
  sequence();
});

function setScore() {
  score++;
  displayScore();
}
function displayScore() {
  document.querySelector("#score-nbr").innerText = score;
}
