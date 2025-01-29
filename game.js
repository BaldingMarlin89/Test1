/public/game.js
// Array of words for the spelling game
const words = [
    'beautiful', 'chocolate', 'elephant', 'fantastic',
    'giraffe', 'happiness', 'important', 'journey',
    'knowledge', 'lightning'
];

// Game state variables
let currentWordIndex = 0;
let score = 0;
let gameActive = true;

// DOM elements
const speakButton = document.getElementById('speak-button');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const scoreDisplay = document.getElementById('score');
const currentQuestionDisplay = document.getElementById('current-question');
const gameContainer = document.getElementById('game-container');
const resultContainer = document.getElementById('result-container');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

// Initialize text-to-speech
const speech = new SpeechSynthesisUtterance();
speech.rate = 0.8;
speech.pitch = 1;

// Speak the current word
speakButton.addEventListener('click', () => {
    speech.text = words[currentWordIndex];
    window.speechSynthesis.speak(speech);
});

// Handle answer submission
submitButton.addEventListener('click', checkAnswer);

// Check the spelled word
function checkAnswer() {
    if (!gameActive) return;
    
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = words[currentWordIndex].toLowerCase();
    
    if (userAnswer === correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
    }
    
    currentWordIndex++;
    currentQuestionDisplay.textContent = currentWordIndex + 1;
    answerInput.value = '';
    
    if (currentWordIndex >= words.length) {
        endGame();
    }
}

// End the game and show results
function endGame() {
    gameActive = false;
    gameContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreDisplay.textContent = score;
}

// Reset the game
playAgainButton.addEventListener('click', () => {
    currentWordIndex = 0;
    score = 0;
    gameActive = true;
    scoreDisplay.textContent = score;
    currentQuestionDisplay.textContent = 1;
    gameContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    answerInput.value = '';
});

// Allow Enter key to submit answer
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
