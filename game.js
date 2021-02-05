//Canvas for drawing

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Import Images

const bomb = new Image();
const background = new Image();
const footground = new Image();
const backButton = new Image();

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
    document.addEventListener("keydown", startGame);
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
        document.addEventListener("keydown", displayMainScreen);
        document.removeEventListener(event.type, displayHighScoreBoard);
        document.removeEventListener("keydown", startGame);
    }
}

function displayMainScreen(event) {
    let key = event.keyCode;
    if (key == 8) {
        back.play();
        ctx.clearRect(0, 0, 520, 320);
        drawStartScreen();
        document.addEventListener("keydown", startGame);
        document.removeEventListener(event.type, displayMainScreen);
    }
}

//Initial positons and values

const x = 260;
const y = 300;
const playerWidth = 20;
const playerHeight = 20;
const score = 0;
let highscore = localStorage.getItem("highscore");
let secondHighscore = localStorage.getItem("secondHighscore");
let thirdHighscore = localStorage.getItem("thirdHighscore");

// Start Key

function startGame(event) {
    var key = event.keyCode;
    if (key == 13) {
        draw(x, y, playerWidth, playerHeight, obstacles, score);
        document.addEventListener("keydown", setDirection);
        document.removeEventListener("keydown", displayMainScreen);
        document.removeEventListener("keydown", displayHighScoreBoard);
        document.removeEventListener(event.type, arguments.callee);
        start.play();
        /*backgroundMusic.volume = 0.0;
        backgroundMusic.play();
        backgroundMusic.loop();*/
    }
}

//Set Directions for Player Movements

let direction;

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

//Draw Everything to Canvas

let draw = (x, y, playerWidth, playerHeight, obstaclesObject, score) => {
    //Duplicate the object containing obstacles` info

    obstaclesObject = JSON.parse(JSON.stringify(obstaclesObject));

    //Spawning Obstacles

    let speed = 1.5;

    obstaclesObject[1].y += speed;
    obstaclesObject[2].y += speed;
    obstaclesObject[3].y += speed;

    ctx.clearRect(0, 0, 520, 320);
    ctx.drawImage(background, 0, 0, 520, 320);
    ctx.drawImage(bomb, obstaclesObject[1].x, obstaclesObject[1].y, 20, 20);
    ctx.drawImage(bomb, obstaclesObject[2].x, obstaclesObject[2].y, 20, 20);
    ctx.drawImage(bomb, obstaclesObject[3].x, obstaclesObject[3].y, 20, 20);

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, playerWidth, playerHeight);

    //Respawn Obstacles 

    if (obstaclesObject[1].y == 300) {
        scoreAudio.play();
        score += 3;
        if (score < 30) {
            obstaclesObject[1].x = Math.floor(Math.random() * 169);
            obstaclesObject[1].y = 0;
            obstaclesObject[2].x = Math.floor((Math.random() * (320 - 189) + 189));
            obstaclesObject[2].y = 0;
            obstaclesObject[3].x = Math.floor(Math.random() * (500 - 340) + 340);
            obstaclesObject[3].y = 0;
        } else if (score < 60) {
            obstaclesObject[1].x = Math.floor(Math.random() * 125);
            obstaclesObject[1].y = 0;
            obstaclesObject[2].x = Math.floor((Math.random() * (250 - 145) + 145));
            obstaclesObject[2].y = 0;
            obstaclesObject[3].x = Math.floor(Math.random() * (375 - 270) + 270);
            obstaclesObject[3].y = 0;
            obstaclesObject[4].x = Math.floor(Math.random() * (500 - 395) + 395);
            obstaclesObject[4].y = 0;
        } else if (score < 100) {
            obstaclesObject[1].x = Math.floor(Math.random() * 100);
            obstaclesObject[1].y = 0;
            obstaclesObject[2].x = Math.floor((Math.random() * (200 - 120) + 120));
            obstaclesObject[2].y = 0;
            obstaclesObject[3].x = Math.floor(Math.random() * (300 - 220) + 220);
            obstaclesObject[3].y = 0;
            obstaclesObject[4].x = Math.floor(Math.random() * (400 - 320) + 320);
            obstaclesObject[4].y = 0;
            obstaclesObject[5].x = Math.floor(Math.random() * (500 - 420) + 420);
            obstaclesObject[5].y = 0;
        } else {
            obstaclesObject[1].x = Math.floor(Math.random() * 80);
            obstaclesObject[1].y = 0;
            obstaclesObject[2].x = Math.floor((Math.random() * (160 - 100) + 100));
            obstaclesObject[2].y = 0;
            obstaclesObject[3].x = Math.floor(Math.random() * (240 - 180) + 180);
            obstaclesObject[3].y = 0;
            obstaclesObject[4].x = Math.floor(Math.random() * (320 - 260) + 260);
            obstaclesObject[4].y = 0;
            obstaclesObject[5].x = Math.floor(Math.random() * (400 - 340) + 340);
            obstaclesObject[5].y = 0;
            obstaclesObject[6].x = Math.floor(Math.random() * (500 - 420) + 420);
            obstaclesObject[6].y = 0;
        }
    }

    if (score < 30) {
        speed = 1.5;
    } else if (score < 60) {
        speed = 2;
        ctx.drawImage(bomb, obstaclesObject[4].x, obstaclesObject[4].y, 20, 20);
        obstaclesObject[4].y += speed;
    } else if (score < 100) {
        speed = 2.5;
        for (let i = 4; i <= 5; i++) {
            ctx.drawImage(bomb, obstaclesObject[i].x, obstaclesObject[i].y, 20, 20);
            obstaclesObject[i].y += speed;
        }
    } else {
        speed = 3;
        for (let i = 4; i <= 6; i++) {
            ctx.drawImage(bomb, obstaclesObject[i].x, obstaclesObject[i].y, 20, 20);
            obstaclesObject[i].y += speed;
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

    //Calling Player Movements

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

    //Assigning Keys to Each Movement

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

    announceLevel(score);
    writeScore(score);
    gameOver(x, y, playerWidth, playerHeight, obstaclesObject, score);
}

//Level Announcement

function writeLevel(level) {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "100px Game Over";
    ctx.fillText(level, 260, 170);
}

function announceLevel(score) {
    if (score == 0) writeLevel("LEVEL 1");
    if (score == 30) writeLevel("LEVEL 2");
    if (score == 60) writeLevel("LEVEL 3");
    if (score == 100) writeLevel("LEVEL 4");
}

//Wrting and updating score

function writeScore(score) {
    ctx.clearRect(0, 320, 520, 40);
    ctx.drawImage(footground, 0, 320, 520, 40);
    ctx.fillStyle = "white";
    ctx.textAlign = "start";
    ctx.font = "25px Changa";
    ctx.fillText("Score: " + score, 20, 347.5);
}

//Game Over Effects and What to do if Game is Not Over

function gameOver(x, y, playerWidth, playerHeight, obstaclesObject, score) {
    //Logic for Game Over

    let playerIsTouchingObstacle1 = (x + 19 >= obstaclesObject[1].x && x + 19 <= obstaclesObject[1].x + 38 && y - 19 <= obstaclesObject[1].y && y - 19 > obstaclesObject[1].y - 38);
    let playerIsTouchingObstacle2 = (x + 19 >= obstaclesObject[2].x && x + 19 <= obstaclesObject[2].x + 38 && y - 19 <= obstaclesObject[2].y && y - 19 > obstaclesObject[2].y - 38);
    let playerIsTouchingObstacle3 = (x + 19 >= obstaclesObject[3].x && x + 19 <= obstaclesObject[3].x + 38 && y - 19 <= obstaclesObject[3].y && y - 19 > obstaclesObject[3].y - 38);
    let playerIsTouchingObstacle4 = (x + 19 >= obstaclesObject[4].x && x + 19 <= obstaclesObject[4].x + 38 && y - 19 <= obstaclesObject[4].y && y - 19 > obstaclesObject[4].y - 38);;
    let playerIsTouchingObstacle5 = (x + 19 >= obstaclesObject[5].x && x + 19 <= obstaclesObject[5].x + 38 && y - 19 <= obstaclesObject[5].y && y - 19 > obstaclesObject[5].y - 38);;
    let playerIsTouchingObstacle6 = (x + 19 >= obstaclesObject[6].x && x + 19 <= obstaclesObject[6].x + 38 && y - 19 <= obstaclesObject[6].y && y - 19 > obstaclesObject[6].y - 38);;

    if (playerIsTouchingObstacle1 || playerIsTouchingObstacle2 || playerIsTouchingObstacle3 || playerIsTouchingObstacle4 || playerIsTouchingObstacle5 || playerIsTouchingObstacle6) {
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
        return "Game Over";
    } else requestAnimationFrame(() => draw(x, y, playerWidth, playerHeight, obstaclesObject, score));
}