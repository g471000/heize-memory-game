const cards = document.querySelectorAll('.memory-card');
const newGameButton = document.getElementsByName('new-game-btn');
const timer = document.getElementsByClassName('timer')[0];
const gameBoardOverlay = document.getElementsByClassName('overlay')[0];
const gameOverCard = document.getElementsByClassName('gameover-card')[0];
const cardText = document.getElementsByClassName('cardText')[0];


let hasFlippedCard = false;
let lockBoard = false;
let gameOver = false;
let seconds = 0;
let minutes = 0;
let gameOverInfo = '';
let time = '00:00';
let firstCard, secondCard, t, newTotalSeconds, newTime, storedTime, bestOverall, bestTime;

// Show the cards once the window has fully loaded
window.onload = function () {
    setTimeout(function () {
        reset();
    }, 750);
};

// function cardReveal() {
//     cards.forEach(card => card.classList.add('flip'));
//     lockBoard = true; // non-clickable before new game start
// }

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {

    let first = firstCard;
    let second = secondCard;

    setTimeout(function () {
        first.classList.add('fadeOutDown');
        second.classList.add('fadeOutDown');
        checkClass();
    }, 750);

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 750);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

newGameButton[0].addEventListener('click', function () {
    newGameButton[0].classList.add('button-hide');
    resetButton[0].classList.add('button-hide');

    flipAllCards();

});

function checkClass() {
    let totalFaded = 0;

    for (var i = 0; i < cards.length; i++){
        if (cards[i].classList.contains('fadeOutDown')) {
            totalFaded++;
        }
    
        if (totalFaded == 16) {
            clearTimeout(t);
            setTimeout(function () {
                displayGameOver();
            }, 1000);
        }
    }
}

/**
 * Display Game Over
 * @param {*} bestOverall 
 */
function displayGameOver(bestOverall) {
    gameBoardOverlay.classList.remove('hide');
    gameOverCard.classList.remove('hide');
    createGameoverInfo();
}

// Writes text if you beat your best time //
function createGameoverInfo() {
    newTime = timer.textContent;
    gameOverInfo += '<h1>You Won!</h1>' +
        '<h2>Your Time:</h2>' +
        '<h3>' + newTime + '</h3>' +
        '<h2>Best Time:</h2>' +
        '<h3>' + "Every second with you" + '</h3>' +
        '<h3></h3>' +
        '<h1>보고싶어요</h1>' +
        '<h1>헤이즈</h1>' +
        '<h1>사랑해요</h1>' +
        '<h3></h3>';

    cardText.innerHTML = gameOverInfo;
}

function shuffle() {
    cards.forEach(card => {
        let randomPosition = 0;
        randomPosition = Math.floor(Math.random() * 20);
        card.style.order = randomPosition;
    })
}

function flipAllCards() {
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.style.cursor = "pointer");
}

function reflipCards() {
    cards.forEach(card => 
        card.classList.remove('fadeOutDown'));
    cards.forEach(card =>
        card.addEventListener('click', flipCard));
    cards.forEach(card =>
        card.classList.remove('flip'));
    resetBoard();
    shuffle();
}

function resetGameOverCard() {
    gameOverInfo = '';
}

/**
 * Time Related Functions
 */
function toSeconds(newTime){
    let bits = newTime.split(':');
    bits = (Number(bits[0])*60) + Number(bits[1]);
    return bits;
}

function resetTimer() {
    seconds = 0;
    minutes = 0;
}

function addTime(){
    seconds++;
    if(seconds >=60){
      seconds = 0;
      minutes++;
    }
    timer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    secondTimeout();
  }

  function secondTimeout(){
    t = setTimeout(addTime, 1000);
}

function convertTime(bestOverall) {
    if (bestOverall > 60) {
        minutes = Math.floor(bestOverall / 60);
        seconds = bestOverall - (minutes * 60);
        bestTime = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    } else {
        bestTime = "00:" + bestOverall;
    }
}

function secondTimeout(){
    t = setTimeout(addTime, 1000);
}

function reset() {
    gameBoardOverlay.classList.add('hide');
    gameOverCard.classList.add('hide');
    newGameButton[0].classList.remove('button-hide');
    // newGameButton[1].classList.remove('button-hide');

    resetTimer();
    reflipCards();
    flipAllCards();
    resetBoard();
    resetGameOverCard();
    shuffle();
    addTime();
}

timer.textContent = "00:00";
newGameButton[0].addEventListener('click', addTime);
newGameButton[1].addEventListener('click', addTime);

cards.forEach(card => card.addEventListener('click', flipCard));

// New Game on the top
newGameButton[0].addEventListener('click', function () {
    reset();
});

// New Game After Game Over
newGameButton[1].addEventListener('click', function () {
    reset();
});


var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}
