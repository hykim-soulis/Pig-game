'use strict';

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const current0 = document.querySelector('#current--0');
const score1 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--1');

let diceNum;
let currentScore = 0;
let player0Score = 0;
let player1Score = 0;

// First Game
dice.style.display = 'none';
score0.textContent = 0;
score1.textContent = 0;

// Roll dice Function
const roll = function () {
  dice.style.display = 'block';
  diceNum = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${diceNum}.png`;
  if (player0.classList.contains('player--active')) {
    if (diceNum === 1) {
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      currentScore = 0;
    } else {
      currentScore += diceNum;
    }
    current0.textContent = currentScore;
  } else {
    if (diceNum === 1) {
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      currentScore = 0;
    } else {
      currentScore += diceNum;
    }
    current1.textContent = currentScore;
  }
};

// Hold function
const hold = function () {
  if (player0.classList.contains('player--active')) {
    player0Score += currentScore;
    score0.textContent = player0Score;
    if (player0Score >= 100) {
      player0.classList.add('player--winner');
      btnRoll.removeEventListener('click', roll);
      btnHold.removeEventListener('click', hold);
    } else {
      current0.textContent = 0;
      currentScore = 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  } else {
    player1Score += currentScore;
    score1.textContent = player1Score;
    if (player1Score >= 100) {
      player1.classList.add('player--winner');
      btnRoll.removeEventListener('click', roll);
      btnHold.removeEventListener('click', hold);
    } else {
      current1.textContent = 0;
      currentScore = 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
};

// New Game
const newGame = function () {
  dice.style.display = 'none';
  player0Score = 0;
  player1Score = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  btnRoll.addEventListener('click', roll);
  btnHold.addEventListener('click', hold);
};

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', newGame);
