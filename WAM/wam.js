const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const startButton = document.getElementById('start-button');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('active');
  setTimeout(() => {
    hole.classList.remove('active');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = '0';
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
}

function whack(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('active');
  scoreBoard.textContent = score;
}

holes.forEach(hole => hole.addEventListener('click', function(e) {
  if (e.target.classList.contains('mole')) {
    whack.call(e.target, e);
  }
}));

startButton.addEventListener('click', startGame);
