const categories = {
    fruits: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥭", "🍒"],
    emojis: ["😀", "😎", "🤩", "😍", "🥳", "😜", "🤔", "😇"],
    animals: ["🐶", "🐱", "🐼", "🦁", "🐧", "🐘", "🦒", "🐠"],
    planets: ["🌍", "🌕", "🌞", "🪐", "🌌", "🌠", "🌑", "🌙"],
    flags: ["🇺🇸", "🇬🇧", "🇨🇦", "🇯🇵", "🇫🇷", "🇩🇪", "🇦🇺", "🇧🇷"]
};

let selectedCategory = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer;
let timeLeft = 30;

const landingPage = document.querySelector(".landing-page");
const gameContainer = document.querySelector(".game-container");
const cardsGrid = document.querySelector(".cards-grid");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.querySelector(".game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart");
const gameOverMessage = document.getElementById("game-over-message");

// Event listeners for category selection
document.querySelectorAll(".category-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = categories[button.dataset.category];
        startGame();
    });
});

// Start the game
function startGame() {
    landingPage.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    initializeCards();
    startTimer();
}

// Initialize and shuffle cards
function initializeCards() {
    const cards = [...selectedCategory, ...selectedCategory];
    cards.sort(() => Math.random() - 0.5);
    cardsGrid.innerHTML = "";
    cards.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = item;
        card.addEventListener("click", handleCardClick);
        cardsGrid.appendChild(card);
    });
}

// Handle card clicks
function handleCardClick(event) {
    const card = event.target;
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains("matched")) {
        flipCard(card);
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Flip a card
function flipCard(card) {
    card.classList.add("flipped");
    card.textContent = card.dataset.value;
}

// Check for a match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        score += 10;
        scoreDisplay.textContent = score;
        if (matchedCards.length === selectedCategory.length * 2) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
        }, 1000);
    }
    flippedCards = [];
}

// Timer functionality
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame(false);
        }
    }, 1000);
}

// End the game
function endGame(isWin) {
    clearInterval(timer); // Stop the timer
    gameOverScreen.classList.remove("hidden"); // Show the game over screen
    finalScoreDisplay.textContent = score; // Display the final score

    // Disable further card clicks
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.removeEventListener("click", handleCardClick);
    });
}

// Restart the game
restartButton.addEventListener("click", () => {
    location.reload();
});
