
const hangmanImage = document.querySelector('.hangman-box img')
const keyboardDiv = document.querySelector('.key-board');
const wordDisplay = document.querySelector('.word-display');
const guessesText = document.querySelector('.guesses-text b')
const gameModal = document.querySelector('.game-modal')
const playAgainBtn = document.querySelector('.play-again')

let currentWord, correctLetters ,wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Resetting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = ` ${wrongGuessCount} / ${maxGuesses} `;
    keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li> `).join("");
    gameModal.classList.remove('show');

}

const getRandomWord = () => {
    // Selecting random word and hint from wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word, hint);
    document.querySelector('.hint-text b').innerText = hint;
    resetGame();
}

const gameOver = (inVictiory) => {
    // After 600ms of game complete.. showing modal with relevan details
    setTimeout(()=> {
        const modalText = inVictiory ? 'You Found The Word:' : 'The Correct Word Was:';
        gameModal.querySelector('img').src = `images/${inVictiory? 'victory' : 'lost'}.gif`
        gameModal.querySelector('h4').innerText = `${inVictiory? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector('p').innerHTML = `${modalText} <b> ${currentWord} </b> `
        gameModal.classList.add('show')
    }, 300)
}

const initGame = (button, clickedLetter) => {
    // Cheacking if clickedletter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
    // If clicked letter doesn't exist then update wrongGuessCount and hangmanImg
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;


    }
    button.disabled = true;
    guessesText.innerText = ` ${wrongGuessCount} / ${maxGuesses} `;


    // Calling gameOver function if any of these condition meets
    if (wrongGuessCount == maxGuesses) return gameOver(false);
    if (correctLetters.length == currentWord.length) return gameOver(true);
}

// Creating keyboard buttons
for (let i = 97; i < 122; i++) {
    
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)))


};

getRandomWord();

playAgainBtn.addEventListener('click', getRandomWord)