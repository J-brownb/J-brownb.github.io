"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//function for the message class
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//adding event listen with event handlern as click
document.querySelector(".check").addEventListener("click", function () {
  //saving the value of the input field as variable guess. Use Number to convert the guess to an integer rather than string
  const guess = Number(document.querySelector(".guess").value);
  //if the guess is false (0), error message
  if (!guess) {
    displayMessage("No Number Inputted ⚠️");
    //if the guess is the same as the secret number, success message
  } else if (guess === secretNumber) {
    displayMessage("Correct Number 🥳");
    //displaying correct number on win
    document.querySelector(".number").textContent = secretNumber;
    //changing background color & element width on win
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "20rem";

    //setting highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    //when guess is wrong (differnt to the secret number)
  } else if (guess !== secretNumber) {
    if (score > 1) {
      //ternary operator to display too high or too low
      displayMessage(
        guess > secretNumber
          ? "Your Guess is Too High! ⬆️"
          : "Your Guess is Too Low! ⬇️"
      );
      //decrement score on each guess
      score--;
      //set score to current score value
      document.querySelector(".score").textContent = score;
      //once the score hits 0, show losing message and set score to 0
    } else {
      displayMessage("Out of Guesses - You Lose 😭");
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "red";
    }
  }

  //Resetting all fields on clicking the again button
  document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage("Start guessing...");
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
  });
});
