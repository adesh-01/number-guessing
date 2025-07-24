let randomNum = parseInt(Math.random()*100)+1
// console.log(randomNum)
const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let attempts = 1

let playGame = true;

if (playGame){
    submit.addEventListener('click', (evnt)=>{
        evnt.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess)
    })
}

function validateGuess (guess) {
    if(isNaN(guess)){
        alert("please enter a valid number")
    } else if (guess < 1) {
        alert("please enter a number greater than 1")
    } else if (guess > 100) {
        alert("please enter a number less than 100")
    } else {
        prevGuess.push(guess)
        if(attempts === 11){
            displayGuess(guess)
            displayMessage(`game over . random number was ${randomNum}`)
            endGame()
        } else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess (guess) {
    if(guess === randomNum){
        displayMessage('you guessed it right')
        endGame()
    } else if ( guess < randomNum){
        displayMessage('guessed number is low')
    } else if ( guess > randomNum){
        displayMessage('guessed number is high')
    }
}

function displayGuess (guess) {
    userInput.value = ""
    guessSlot.innerHTML += `${guess} , `
    attempts ++;
    remaining.innerHTML = `${12-attempts}`

}

function displayMessage (message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;

}


function endGame () {
    userInput.value = ""
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = `<button id="newGame">Start new Game </button>`;
    startOver.appendChild(p)
    playGame = false;
    newGame();
}

function newGame () {
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click',function(evnt){
        randomNum = parseInt(Math.random()*100)+1
        prevGuess = []
        attempts = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${12-attempts}`;
        userInput.removeAttribute('disabled',)
        startOver.removeChild(p)

        playGame = true;
    })

}
