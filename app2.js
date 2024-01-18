let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highestScore = 0;
let btns = ["orange", "blue", "pink", "coral"];
let h2 = document.querySelector("h2");

//Random Color genrator
function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = (`Level ${level}<br>............`);

    if (level > highestScore) {
        highestScore = level;
    }

    let ranIdx = Math.floor(Math.random()*4);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);

    btnFlash(ranBtn);
}

//button flashing
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

//Game startup
document.addEventListener("keypress", function (event) {
    if (event.key == "Enter" ) {
            if (started == false) {
        console.log("Game Started");
        started = true;

        levelUp();
    }
    }

})

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

//User pressing button
function btnPress() {
    // console.log(this);
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

//Matching random color & User input
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
            let sound = new Audio("assets/correct.mp3");
            sound.play();
        }
    }
    else {
        h2.innerHTML = `Game Over! Your Score is ${level} <br> Highest Score: ${highestScore}`;
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(() => {
            body.style.backgroundColor = "rgb(174, 37, 254)";
        }, 150);
        let sound = new Audio("assets/wrong.mp3");
        sound.play();

        reset();
    }
}
// Resting game after Game over
function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}