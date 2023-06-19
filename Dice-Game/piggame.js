'use strict';

//selecting the scores elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
//selecting the current score
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//selecting the dice element
const diceEl = document.querySelector('.dice');
//creating variables for the buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHow = document.querySelector('.btn--how');

//opening the modal
const modal = document.querySelector('.modal');
btnHow.addEventListener('click', function () {
  modal.style.display = 'block';
});

//closinng the modal
const btnCloseModal = document.querySelector('.close-modal');
const closeModal = function () {
  modal.style.display = 'none';
};

btnCloseModal.addEventListener('click', closeModal);

//close modal on click of esc key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

//declaring empty variables
let scores, currentScore, activePlayer, playing;

//function to initiate game
const init = function () {
  //setting the scores to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  //hiding the dice by default
  diceEl.classList.add('hidden');
  //array to hold the scores
  scores = [0, 0];
  //variable for current score
  currentScore = 0;
  //variable for active player
  activePlayer = 0;
  //variable for play state
  playing = true;
  //rolling the dice functionality
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

//swap player function
const swapPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player by changing the active player value. If active player is 0, switch to 1. If false, active player is 0.
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle classlist method adds the class if not there, and removes if there
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  //only executes if play state is true
  if (playing) {
    //generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice by removing hidden class
    diceEl.classList.remove('hidden');
    //display dice number based on png string using src
    diceEl.src = `dice-${dice}.png`;

    //if roll is not a 1, add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //if roll is a 1
    } else {
      //switch player
      swapPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //only executes if play state true
  if (playing) {
    //add current score to active player position in scores array
    scores[activePlayer] += currentScore;
    //getting active player current score and setting text content to score of active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //switch player
    //check if score is >= 100
    if (scores[activePlayer] >= 100) {
      //set playing state to false
      playing = false;
      diceEl.classList.add('hidden');

      //add winner class and remove active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swapPlayer();
    }
  }
});

//resetting the game
btnNew.addEventListener('click', init);
