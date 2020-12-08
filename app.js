/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice1, dice2, gamePlay;
var lastDice;
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlay) {
    dice1 = Math.floor(Math.random() * 6) + 1;
    // dice2 = Math.floor(Math.random() * 6) + 1;

    document.querySelector("#dice-1").src = "dice-" + dice1 + ".png";
    // document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";
    document.querySelector("#dice-1").style.display = "block";
    // document.querySelector("#dice-2").style.display = "block";

    // if (dice === 6 && lastDice === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector("#score-" + activePlayer).textContent = 0;
    //   nextPlayer();
    // }
    if (dice1 !== 1) {
      roundScore += dice1;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      document.querySelector("#current-" + activePlayer).textContent = 0;
      nextPlayer();
    }
    // lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlay) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      gamePlay = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", function () {
  init();
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlay = true;
  dice1 = 0;
  // dice2 = 0;

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;

  document.querySelector("#dice-1").style.display = "none";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".final-score").value = "";
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");

btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

window.addEventListener("load", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
