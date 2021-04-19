//Canvas for drawing

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Import images

const obstacle = new Image();
const background = new Image();
const footground = new Image();
const backButton = new Image();

obstacle.src = "img/obstacle.png";
background.src = "img/background.jpg";
footground.src = "img/footground.jpg";
backButton.src = " img/back_button.png";

//Import audio files

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

//Create background and footground

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
    ctx.fillText("HIGHSCORES - H", 510, 310);
    document.addEventListener("keydown", startGame);
    document.addEventListener("keydown", displayHighScoreBoard);
}

var gameOverFont = new FontFace("Game Over", "url(font/game_over_regular.woff)");

var supportsWoff2 = (function() {
    if (!("FontFace" in window)) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:font/woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status == 'loading' || f.status == 'loaded';
})();

if (supportsWoff2) {
    var gameOverFont = new FontFace("Game Over", "url(font/game_over_regular.woff2)");
}

background.onload = () => gameOverFont.load().then(font => {
    document.fonts.add(font);
    drawStartScreen();
});

footground.onload = () => {
    ctx.drawImage(footground, 0, 320, 520, 40);
}

//Menu functions

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
        document.removeEventListener(event.type, displayMainScreen);
    }
}

//Initial positons and values

const x = 260;
const y = 300;
const playerWidth = 20;
const playerHeight = 20;
const score = 0;
const speed = 0;
let highscore = localStorage.getItem("highscore");
let secondHighscore = localStorage.getItem("secondHighscore");
let thirdHighscore = localStorage.getItem("thirdHighscore");

// Start key

function startGame(event) {
    var key = event.keyCode;
    if (key == 13) {
        draw(x, y, playerWidth, playerHeight, obstacles, speed, score);
        document.addEventListener("keydown", setDirection);
        document.removeEventListener("keydown", displayMainScreen);
        document.removeEventListener("keydown", displayHighScoreBoard);
        document.removeEventListener(event.type, arguments.callee);
        start.play();
    }
}

//Set directions for player movements

let direction;

function setDirection(event) {
    let key = event.keyCode;
    if (key == 39) direction = "right";
    if (key == 37) direction = "left";
    if (key == 40) direction = "down";
    if (key == 38) direction = "up";
}

//Initial position of obstacles

const obstacles = {
    1: {
        x: Math.floor(Math.random() * 169),
        y: 0
    },
    2: {
        x: Math.floor(Math.random() * (320 - 189) + 189),
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
};

//Draw everything to canvas

let draw = (x, y, playerWidth, playerHeight, obstaclesObject, speed, score) => {
    //Duplicate the object containing obstacles` info
    obstaclesObject = JSON.parse(JSON.stringify(obstaclesObject));

    //Spawning obstacles

    ctx.clearRect(0, 0, 520, 320);
    ctx.drawImage(background, 0, 0, 520, 320);
    for (let i = 1; i <= 3; i++) ctx.drawImage(obstacle, obstaclesObject[i].x, obstaclesObject[i].y, 20, 20);

    // Draw player

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, playerWidth, playerHeight);

    //Respawn obstacles 

    if (obstaclesObject[1].y == 300) {
        scoreAudio.play();
        score += 3;
        if (score < 30) {
            obstaclesObject[1].x = Math.floor(Math.random() * 169);
            obstaclesObject[2].x = Math.floor(Math.random() * (320 - 189) + 189);
            obstaclesObject[3].x = Math.floor(Math.random() * (500 - 340) + 340);
            for (let i = 1; i <= 3; i++) obstaclesObject[i].y = 0;
        } else if (score < 60) {
            obstaclesObject[1].x = Math.floor(Math.random() * 125);
            obstaclesObject[2].x = Math.floor(Math.random() * (250 - 145) + 145);
            obstaclesObject[3].x = Math.floor(Math.random() * (375 - 270) + 270);
            obstaclesObject[4].x = Math.floor(Math.random() * (500 - 395) + 395);
            for (let i = 1; i <= 4; i++) obstaclesObject[i].y = 0;
        } else if (score < 100) {
            obstaclesObject[1].x = Math.floor(Math.random() * 100);
            obstaclesObject[2].x = Math.floor(Math.random() * (200 - 120) + 120);
            obstaclesObject[3].x = Math.floor(Math.random() * (300 - 220) + 220);
            obstaclesObject[4].x = Math.floor(Math.random() * (400 - 320) + 320);
            obstaclesObject[5].x = Math.floor(Math.random() * (500 - 420) + 420);
            for (let i = 1; i <= 5; i++) obstaclesObject[i].y = 0;
        } else {
            obstaclesObject[1].x = Math.floor(Math.random() * 80);
            obstaclesObject[2].x = Math.floor(Math.random() * (160 - 100) + 100);
            obstaclesObject[3].x = Math.floor(Math.random() * (240 - 180) + 180);
            obstaclesObject[4].x = Math.floor(Math.random() * (320 - 260) + 260);
            obstaclesObject[5].x = Math.floor(Math.random() * (400 - 340) + 340);
            obstaclesObject[6].x = Math.floor(Math.random() * (500 - 420) + 420);
            for (let i = 1; i <= Object.keys(obstaclesObject).length; i++) obstaclesObject[i].y = 0;
        }
    }

    //Moving obstacles

    if (score < 30) {
        speed = 1.5;
        for (let i = 1; i <= 3; i++) obstaclesObject[i].y += speed;
    } else if (score >= 30 && score < 60) {
        speed = 2;
        ctx.drawImage(obstacle, obstaclesObject[4].x, obstaclesObject[4].y, 20, 20);
        for (let i = 1; i <= 4; i++) obstaclesObject[i].y += speed;
    } else if (score >= 60 && score < 100) {
        speed = 2.5;
        for (let i = 1; i <= 5; i++) {
            ctx.drawImage(obstacle, obstaclesObject[i].x, obstaclesObject[i].y, 20, 20);
            obstaclesObject[i].y += speed;
        }
    } else {
        speed = 3;
        for (let i = 1; i <= Object.keys(obstaclesObject).length; i++) {
            ctx.drawImage(obstacle, obstaclesObject[i].x, obstaclesObject[i].y, 20, 20);
            obstaclesObject[i].y += speed;
        }
    }

    //Store highscores to local storage

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

    //Calling player movements

    if (direction == "right" && x <= 495) {
        moveRight();
        direction = "";
    }
    if (direction == "left" && x >= 5) {
        moveLeft();
        direction = "";
    }
    if (direction == "down" && y <= 295) {
        moveDown();
        direction = "";
    }
    if (direction == "up" && y >= 5) {
        moveUp();
        direction = "";
    }

    //Assigning Keys to each player movement

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
    gameOver(x, y, playerWidth, playerHeight, obstaclesObject, speed, score);
}

//Level announcement

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

//Updating score

function writeScore(score) {
    ctx.clearRect(0, 320, 520, 40);
    ctx.drawImage(footground, 0, 320, 520, 40);
    ctx.drawImage(obstacle, 20, 327.5, 25, 25);
    ctx.fillStyle = "white";
    ctx.textAlign = "start";
    ctx.font = "25px Changa";
    ctx.fillText(score, 50, 350);
}

//Game Over Effects and What to do if Game is Not Over

function gameOver(x, y, playerWidth, playerHeight, obstaclesObject, speed, score) {
    //Logic for Game Over
    const isPlayerTocuhingAnObstacle = {};
    for (let i = 1; i <= Object.keys(obstaclesObject).length; i++) isPlayerTocuhingAnObstacle["obstacle" + i] = (x + 19 >= obstaclesObject[i].x && x + 19 <= obstaclesObject[i].x + 38 && y - 19 <= obstaclesObject[i].y && y - 19 > obstaclesObject[i].y - 38);
    const playerIsTouchingAnObstacle = Object.values(isPlayerTocuhingAnObstacle).includes(true);

    if (playerIsTouchingAnObstacle) {
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
    } else requestAnimationFrame(() => draw(x, y, playerWidth, playerHeight, obstaclesObject, speed, score));
}