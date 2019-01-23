// Game Values
let min = 1,
    max = 10,
    winNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Event listener for guess
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    guessInput.value = '';
    
  } else {
    
    // Check win
    if (guess === winNum) {
      // Game over - win
      gameOver(true, `${winNum} is correct, YOU WIN!`);

    } else {
      // Wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // Game over - lost
        gameOver(false, `Game over, you lost! The correct number is ${winNum}.`);

      } else {
        // Game continues - answer wrong
        guessInput.value = '';
        guessInput.style.borderColor = 'red';
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
      }
    }    
  }

})

// Play again event listener
game.addEventListener('mousedown', (event) => {
  if (event.target.className === 'play-again') {
    window.location.reload();
  }
})

// getRandomNum function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// setMessage function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// gameOver function
function gameOver(isWon, msg) {
  let color;
  isWon === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;

  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // Play again
  guessBtn.value = "play again";
  guessBtn.className +=  'play-again';
}
