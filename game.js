//Canvas for drawing

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Import Images

let bomb = new Image();
let background = new Image();
let footground = new Image();
let backButton = new Image();

bomb.src = "img/bomb.png";
background.src = "img/background.png";
footground.src = "img/footground.jpg";
backButton.src = " img/back_button.png";

//Import Audio Files

const left = new Audio();
const right = new Audio();
const up = new Audio();
const down = new Audio();
const start = new Audio();
const scoreAudio = new Audio();
const lose = new Audio();
const select = new Audio();
const back = new Audio();

up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
lose.src = "audio/lose.wav";
scoreAudio.src = "audio/score.mp3";
start.src = "audio/start.ogg";
select.src = "audio/select.wav";
back.src = "audio/back.wav";

//Create Background and Footground

function drawStartScreen() {
    ctx.drawImage(background, 0, 0, 520, 320);
    ctx.textAlign = "center";
    ctx.font = "100px Game Over";
    ctx.fillText("PRESS START", 260, 175);
    ctx.font = "75px Game Over";
    ctx.fillText("HIGHSCORES", 260, 210);
    ctx.font = "35px Game Over";
    ctx.textAlign = "start";
    ctx.fillText("START - ENTER", 10, 310);
    ctx.textAlign = "end";
    ctx.fillText("HIGHSCORES - H", 510, 310)
    document.addEventListener("keydown", displayHighScoreBoard);
}

background.onload = () => drawStartScreen();

footground.onload = () => {
    ctx.drawImage(footground, 0, 320, 520, 40);
}

//Menu Functions
function displayHighScoreBoard(event) {
    let key = event.keyCode;
    if (key == 72) {
        select.play();
        ctx.clearRect(0, 0, 520, 320);
        ctx.drawImage(background, 0, 0, 520, 320);
        ctx.textAlign = "center";
        ctx.font = "100px Game Over";
        ctx.fillText("HIGHSCORES", 260, 140);
        ctx.font = "75px Game Over";
        ctx.fillText("1. " + highscore, 260, 180);
        ctx.fillText("2. " + secondHighscore, 260, 205);
        ctx.fillText("3. " + thirdHighscore, 260, 230);
        ctx.font = "35px Game Over";
        ctx.textAlign = "start";
        ctx.fillText("BACK - BACKSPACE", 10, 310);
        ctx.drawImage(backButton, 10, 10);
        document.removeEventListener(event.type, displayHighScoreBoard);
        document.addEventListener("keydown", displayMainScreen);
    }
}

function displayMainScreen(event) {
    let key = event.keyCode;
    if (key == 8) {
        back.play();
        ctx.clearRect(0, 0, 520, 320);
        drawStartScreen();
        document.removeEventListener(event.type, displayMainScreen);
    }
}

//Initial positon and values

let x = 260;
let y = 300;
const playerWidth = 20;
const playerHeight = 20;
let score = 0;
let speed = 0;
let highscore = localStorage.getItem("highscore");
let secondHighscore = localStorage.getItem("secondHighscore");
let thirdHighscore = localStorage.getItem("thirdHighscore");

// Start Key

document.addEventListener("keydown", startGame);

function startGame(event) {
    var key = event.keyCode;
    if (key == 13) {
        draw(x, y, playerWidth, playerHeight);
        document.removeEventListener("keydown", displayMainScreen);
        document.removeEventListener("keydown", displayHighScoreBoard);
        document.removeEventListener(event.type, arguments.callee);
        start.play();
        /*backgroundMusic.volume = 0.0;
        backgroundMusic.play();
        backgroundMusic.loop();*/
    }
}

//Set Directions for player to move in

let direction;

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    let key = event.keyCode;
    if (key == 39) direction = "right";
    if (key == 37) direction = "left";
    if (key == 40) direction = "down";
    if (key == 38) direction = "up";
}
//Initial Position of Obstacles

const obstacles = {
    1: {
        x: Math.floor(Math.random() * 169),
        y: 0
    },
    2: {
        x: Math.floor((Math.random() * (320 - 189) + 189)),
        y: 0
    },
    3: {
        x: Math.floor(Math.random() * (500 - 340) + 340),
        y: 0
    },
    4: {
        x: Math.floor(Math.random() * (500 - 395) + 395),
        y: 0
    },
    5: {
        x: Math.floor(Math.random() * (500 - 420) + 420),
        y: 0
    },
    6: {
        x: Math.floor(Math.random() * (500 - 420) + 420),
        y: 0
    }
}

//Draw Everything to canvas

let draw = (x, y, playerWidth, playerHeight) => {

    //Spawning Obstacles

    obstacles[1].y += speed;
    obstacles[2].y += speed;
    obstacles[3].y += speed;

    ctx.clearRect(0, 0, 520, 320);
    ctx.drawImage(background, 0, 0, 520, 320);
    ctx.drawImage(bomb, obstacles[1].x, obstacles[1].y, 20, 20);
    ctx.drawImage(bomb, obstacles[2].x, obstacles[2].y, 20, 20);
    ctx.drawImage(bomb, obstacles[3].x, obstacles[3].y, 20, 20);

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, playerWidth, playerHeight);

    //Respawn Obstacles 

    if (obstacles[1].y == 300) {
        scoreAudio.play();
        score += 3;
        if (score < 30) {
            obstacles[1].x = Math.floor(Math.random() * 169);
            obstacles[1].y = 0;
            obstacles[2].x = Math.floor((Math.random() * (320 - 189) + 189));
            obstacles[2].y = 0;
            obstacles[3].x = Math.floor(Math.random() * (500 - 340) + 340);
            obstacles[3].y = 0;
        } else if (score < 60) {
            obstacles[1].x = Math.floor(Math.random() * 125);
            obstacles[1].y = 0;
            obstacles[2].x = Math.floor((Math.random() * (250 - 145) + 145));
            obstacles[2].y = 0;
            obstacles[3].x = Math.floor(Math.random() * (375 - 270) + 270);
            obstacles[3].y = 0;
            obstacles[4].x = Math.floor(Math.random() * (500 - 395) + 395);
            obstacles[4].y = 0;
        } else if (score < 100) {
            obstacles[1].x = Math.floor(Math.random() * 100);
            obstacles[1].y = 0;
            obstacles[2].x = Math.floor((Math.random() * (200 - 120) + 120));
            obstacles[2].y = 0;
            obstacles[3].x = Math.floor(Math.random() * (300 - 220) + 220);
            obstacles[3].y = 0;
            obstacles[4].x = Math.floor(Math.random() * (400 - 320) + 320);
            obstacles[4].y = 0;
            obstacles[5].x = Math.floor(Math.random() * (500 - 420) + 420);
            obstacles[5].y = 0;
        } else {
            obstacles[1].x = Math.floor(Math.random() * 80);
            obstacles[1].y = 0;
            obstacles[2].x = Math.floor((Math.random() * (160 - 100) + 100));
            obstacles[2].y = 0;
            obstacles[3].x = Math.floor(Math.random() * (240 - 180) + 180);
            obstacles[3].y = 0;
            obstacles[4].x = Math.floor(Math.random() * (320 - 260) + 260);
            obstacles[4].y = 0;
            obstacles[5].x = Math.floor(Math.random() * (400 - 340) + 340);
            obstacles[5].y = 0;
            obstacles[6].x = Math.floor(Math.random() * (500 - 420) + 420);
            obstacles[6].y = 0;
        }
    }

    if (score < 30) {
        speed = 1.5;
    } else if (score < 60) {
        speed = 2;
        ctx.drawImage(bomb, obstacles[4].x, obstacles[4].y, 20, 20);
        obstacles[4].y += speed;
    } else if (score < 100) {
        speed = 2.5;
        for (let i = 4; i <= 5; i++) {
            ctx.drawImage(bomb, obstacles[i].x, obstacles[i].y, 20, 20);
            obstacles[i].y += speed;
        }
    } else {
        speed = 3;
        for (let i = 4; i <= 6; i++) {
            ctx.drawImage(bomb, obstacles[i].x, obstacles[i].y, 20, 20);
            obstacles[i].y += speed;
        }
    }

    //Store Highscores to Local Storage

    if (highscore == null) {
        localStorage.setItem("highscore", score);
        highscore = localStorage.getItem("highscore");
    } else if (score > highscore) {
        localStorage.setItem("highscore", score);
        highscore = localStorage.getItem("highscore");
    }
    if (secondHighscore == null) {
        localStorage.setItem("secondHighscore", 0);
        secondHighscore = localStorage.getItem("secondHighscore");
    } else if (score > secondHighscore && score < highscore) {
        localStorage.setItem("secondHighscore", score);
        secondHighscore = localStorage.getItem("secondHighscore");
    }
    if (thirdHighscore == null) {
        localStorage.setItem("thirdHighscore", 0);
        thirdHighscore = localStorage.getItem("thirdHighscore");
    } else if (score > thirdHighscore && score < secondHighscore && score < highscore) {
        localStorage.setItem("thirdHighscore", score);
        thirdHighscore = localStorage.getItem("thirdHighscore");
    }

    //Logic for Game Over

    playerIsTouchingObstacle = (x + 19 >= obstacles[1].x && x + 19 <= obstacles[1].x + 38 && y - 19 <= obstacles[1].y && y - 19 > obstacles[1].y - 38);
    playerIsTouchingObstacle2 = (x + 19 >= obstacles[2].x && x + 19 <= obstacles[2].x + 38 && y - 19 <= obstacles[2].y && y - 19 > obstacles[2].y - 38);
    playerIsTouchingObstacle3 = (x + 19 >= obstacles[3].x && x + 19 <= obstacles[3].x + 38 && y - 19 <= obstacles[3].y && y - 19 > obstacles[3].y - 38);
    playerIsTouchingObstacle4 = (x + 19 >= obstacles[4].x && x + 19 <= obstacles[4].x + 38 && y - 19 <= obstacles[4].y && y - 19 > obstacles[4].y - 38);;
    playerIsTouchingObstacle5 = (x + 19 >= obstacles[5].x && x + 19 <= obstacles[5].x + 38 && y - 19 <= obstacles[5].y && y - 19 > obstacles[5].y - 38);;
    playerIsTouchingObstacle6 = (x + 19 >= obstacles[6].x && x + 19 <= obstacles[6].x + 38 && y - 19 <= obstacles[6].y && y - 19 > obstacles[6].y - 38);;

    //Movements

    if (direction == "right") {
        moveRight();
        direction = "";
    }
    if (direction == "left") {
        moveLeft();
        direction = "";
    }
    if (direction == "down") {
        moveDown();
        direction = "";
    }
    if (direction == "up") {
        moveUp();
        direction = "";
    }

    //Assigning keys to each movement

    function moveRight() {
        x += 5;
        right.play();
    }

    function moveLeft() {
        x -= 5;
        left.play();
    }

    function moveUp() {
        y -= 5;
        up.play();
    }

    function moveDown() {
        y += 5;
        down.play();
    }

    announceLevel()
    writeScore();
    gameOver(x, y, playerWidth, playerHeight);
}

//Level Announcement

function writeLevel(level) {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "100px Game Over";
    ctx.fillText(level, 260, 170);
}

function announceLevel() {
    if (score == 0) writeLevel("LEVEL 1");
    if (score == 30) writeLevel("LEVEL 2");
    if (score == 60) writeLevel("LEVEL 3");
    if (score == 100) writeLevel("LEVEL 4");
}

//Wrting and updating score

function writeScore() {
    ctx.clearRect(0, 320, 520, 40);
    ctx.drawImage(footground, 0, 320, 520, 40);
    ctx.fillStyle = "white";
    ctx.textAlign = "start";
    ctx.font = "25px Changa";
    ctx.fillText("Score: " + score, 20, 347.5);
}

//Game Over

function gameOver(x, y, playerWidth, playerHeight) {
    if (playerIsTouchingObstacle || playerIsTouchingObstacle2 || playerIsTouchingObstacle3 || playerIsTouchingObstacle4 || playerIsTouchingObstacle5 || playerIsTouchingObstacle6) {
        document.removeEventListener("keydown", setDirection);
        ctx.clearRect(0, 0, 520, 320);
        ctx.drawImage(background, 0, 0, 520, 320);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "100px Game Over";
        ctx.fillText("GAME OVER", 260, 175);
        ctx.font = "75px Game Over";
        ctx.fillText("SCORE: " + score, 260, 210);
        ctx.font = "60px Game Over";
        ctx.fillText("1. " + highscore, 260, 240);
        ctx.fillText("2. " + secondHighscore, 260, 265);
        ctx.fillText("3. " + thirdHighscore, 260, 290);
        ctx.clearRect(0, 320, 520, 40);
        ctx.drawImage(footground, 0, 320, 520, 40);
        lose.play();
        document.addEventListener("keydown", startGame);
        score = 0;
        return "Game Over";
    } else requestAnimationFrame(() => draw(x, y, playerWidth, playerHeight));
}