let scoreBoard = document.querySelector(".score");
let score = 0;

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  asomar();
  setTimeout(() => (timeUp = true), 15000);
}

const holes = document.querySelectorAll(".hole");
const tiemposEnMilisegundos = [];

//Devlolver un número aleatorio  entre 1 y 3 segundos

function randomHole(excluir) {
  let segundo;
  do {
    segundo = Math.random() * (3 - 1) + 1;
  } while (segundo === excluir);

  return segundo;
}

//Devuelve los segundos que van a tardar los topos en estar levantados

let ultimoSegundo = 0;

function getTime() {
  const nuevoSegundo = randomHole(ultimoSegundo);
  ultimoSegundo = nuevoSegundo;

  const tiempoEnMilisegundos = Math.round(nuevoSegundo) * 1000;

  tiemposEnMilisegundos.push(tiempoEnMilisegundos);

  return tiemposEnMilisegundos;
}

function asomar() {
  let index = Math.random() * (6 - 1) + 1;
  let indexRedondeado = Math.round(index);
  let holeIndividual = document.querySelector(`.hole${indexRedondeado}`);
  wack(holeIndividual);
  holeIndividual.classList.add("up");
  setTimeout(() => {
    holeIndividual.classList.remove("up");
    asomar();
  }, tiemposEnMilisegundos[tiemposEnMilisegundos.length - 1]);
}

function wack(holeIndividual) {
  const moles = document.querySelectorAll(".mole");

  moles.forEach((mole) => {
    mole.addEventListener("click", function clickHandler() {
      if (holeIndividual.classList.contains("up")) {
        holeIndividual.classList.remove("up");
        score++;
        scoreBoard.textContent = score;
      }
      mole.removeEventListener("click", clickHandler);
    });
  });
}

getTime();
