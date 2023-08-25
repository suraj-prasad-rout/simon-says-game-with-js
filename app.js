let gameseq = [];
let userseq = [];
let btns = ["red", "yellow", "green", "blue"]

let started = false;
let level = 0;
let highScore = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game started");
        started = true;
    levelUp()
    }
    
});

function btnFlash(btn){
    btn.classList.add("flash")
    setTimeout(function() {
        btn.classList.remove("flash");      
    },250)
}

function levelUp(){
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    if(highScore < level){
        highScore = level;
        displayHighScore();
    }

    randIdx = Math.floor(Math.random() * 3);
    randColor = btns[randIdx];
    randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
};

function checkAns(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp, 800)
        }
    }else{
        h3.innerHTML = (`Game Over! <b>Your Score Was ${level}</b> <br><br> Press Any Key To Re-Start`);
        console.log("Game Over! Press Any Key To Re-Start");
        let bodyColor = document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"
        }, 250
        )
        gameRestart()
    }
}

function btnPress(){
    console.log(this);
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1)

}
let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}
function gameRestart(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
function displayHighScore(){
    let highScoreElement = document.querySelector("#highscore")
    highScoreElement.innerText = `Your Highscore Is ${highScore}`
  
}