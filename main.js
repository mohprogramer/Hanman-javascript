const words = ["click", "programmer", "javascript", "behind", "developer", "mohammad"];

let randomWord;
let clicked = [];
let result;
let mistakes = 0;

document.querySelector("#letters").addEventListener("click", buttonHandler);
window.addEventListener("keydown", keyboardHendler)

function selectRandomItem() {
    const random = Math.floor(Math.random() * words.length);
    randomWord = words[random];
};


function buttonHandler(event) {
    event.preventDefault();
    letterHandler(event.target.id);
}

function letterHandler(letter) {
    let lowerCaseLetter = letter.toLowerCase();
    clicked.indexOf(lowerCaseLetter) === -1 ? clicked.push(lowerCaseLetter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomWord.indexOf(lowerCaseLetter) >= 0) {
        setUnderScores();
        ifWin();
    } else if (randomWord.indexOf(letter) === -1) {
        mistakes++;
        updateImage();
        ifLose();
    }
}

function keyboardHendler(event) {
    event.preventDefault();
    letterHandler(event.key);
}

function setUnderScores() {
    let randomWorlSplited = randomWord.split("");
    let mapRandomWord = randomWorlSplited.map(item => clicked.indexOf(item) >= 0 ? item : "_");
    result = mapRandomWord.join("");
    document.querySelector("#clue").innerHTML = `<p>${result}</p>`;
}

function ifWin() {
    if (result === randomWord) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "assets/winner.png"
    }
}

function updateImage() {
    if (mistakes < 6) {
        document.getElementById("image").querySelector("img").src = `assets/hangman${mistakes}.png`;
    }
}

function ifLose() {
    if (mistakes === 6) {
        document.getElementById("image").querySelector("img").src = `assets/hangman${mistakes}.png`;
        document.getElementById("clue").innerHTML = `<p>Gameover Random Word was ${randomWord}</p>`;
    }
}


selectRandomItem();
setUnderScores();