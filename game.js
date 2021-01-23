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

//Draw Everything to canvas

function draw(x, y, playerWidth, playerHeight) {

    //Start Key

    document.addEventListener("keydown", (event) => {
        var key = event.keyCode;
        if (key == 13) {
            createObstacles();
            document.removeEventListener("keydown", displayMainScreen);
            document.removeEventListener("keydown", displayHighScoreBoard);
            document.addEventListener("keydown", movements);
            document.removeEventListener(event.type, arguments.callee);
            start.play();
            backgroundMusic.volume = 0.0;
            backgroundMusic.play();
            backgroundMusic.loop();
        }
    });

    //Initial Position of Obstacles

    const obstacles = {
        ob1 = {
            x: Math.floor(Math.random() * 169),
            y: 0
        },
        ob2 = {
            x: Math.floor((Math.random() * (320 - 189) + 189)),
            y: 0
        },
        ob3 = {
            x: Math.floor(Math.random() * (500 - 340) + 340),
            y: 0
        },
        ob4 = {
            x: Math.floor(Math.random() * (500 - 395) + 395),
            y: 0
        },
        ob5 = {
            x = Math.floor(Math.random() * (500 - 420) + 420),
            y = 0
        },
        ob6 = {
            x: Math.floor(Math.random() * (500 - 420) + 420),
            y: 0
        }
    }

    //Spawning Obstacles

    ctx.clearRect(0, 0, 520, 320);
    ctx.drawImage(background, 0, 0, 520, 320);
    ctx.drawImage(bomb, obX, obY, 20, 20);
    ctx.drawImage(bomb, ob2X, ob2Y, 20, 20);
    ctx.drawImage(bomb, ob3X, ob3Y, 20, 20);

    let createObstacles = () => {
        obY += speed;
        ob2Y += speed;
        ob3Y += speed;

        ctx.clearRect(0, 0, 520, 320);
        ctx.drawImage(background, 0, 0, 520, 320);
        ctx.drawImage(bomb, obX, obY, 20, 20);
        ctx.drawImage(bomb, ob2X, ob2Y, 20, 20);
        ctx.drawImage(bomb, ob3X, ob3Y, 20, 20);

        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 20, 20);

        //Respawn Obstacles 

        if (obY == 300) {
            scoreAudio.play();
            score += 3;
            if (score < 30) {
                obX = Math.floor(Math.random() * 169);
                obY = 0;
                ob2X = Math.floor((Math.random() * (320 - 189) + 189));
                ob2Y = 0;
                ob3X = Math.floor(Math.random() * (500 - 340) + 340);
                ob3Y = 0;
            } else if (score < 60) {
                obX = Math.floor(Math.random() * 125);
                obY = 0;
                ob2X = Math.floor((Math.random() * (250 - 145) + 145));
                ob2Y = 0;
                ob3X = Math.floor(Math.random() * (375 - 270) + 270);
                ob3Y = 0;
                ob4X = Math.floor(Math.random() * (500 - 395) + 395);
                ob4Y = 0;
            } else if (score < 100) {
                obX = Math.floor(Math.random() * 100);
                obY = 0;
                ob2X = Math.floor((Math.random() * (200 - 120) + 120));
                ob2Y = 0;
                ob3X = Math.floor(Math.random() * (300 - 220) + 220);
                ob3Y = 0;
                ob4X = Math.floor(Math.random() * (400 - 320) + 320);
                ob4Y = 0;
                ob5X = Math.floor(Math.random() * (500 - 420) + 420);
                ob5Y = 0;
            } else {
                obX = Math.floor(Math.random() * 80);
                obY = 0;
                ob2X = Math.floor((Math.random() * (160 - 100) + 100));
                ob2Y = 0;
                ob3X = Math.floor(Math.random() * (240 - 180) + 180);
                ob3Y = 0;
                ob4X = Math.floor(Math.random() * (320 - 260) + 260);
                ob4Y = 0;
                ob5X = Math.floor(Math.random() * (400 - 340) + 340);
                ob5Y = 0;
                ob6X = Math.floor(Math.random() * (500 - 420) + 420);
                ob6Y = 0;
            }
        }

        if (score < 30) {
            speed = 1.5;
        } else if (score < 60) {
            speed = 2;
            ctx.drawImage(bomb, ob4X, ob4Y, 20, 20);
            ob4Y += speed;
        } else if (score < 100) {
            speed = 2.5;
            ctx.drawImage(bomb, ob4X, ob4Y, 20, 20);
            ctx.drawImage(bomb, ob5X, ob5Y, 20, 20);
            ob4Y += speed;
            ob5Y += speed;
        } else {
            speed = 3;
            ctx.drawImage(bomb, ob4X, ob4Y, 20, 20);
            ctx.drawImage(bomb, ob5X, ob5Y, 20, 20);
            ctx.drawImage(bomb, ob6X, ob6Y, 20, 20);
            ob4Y += speed;
            ob5Y += speed;
            ob6Y += speed;
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

        playerIsTouchingObstacle = (x + 19 >= obX && x + 19 <= obX + 38 && y - 19 <= obY && y - 19 > obY - 38);
        playerIsTouchingObstacle2 = (x + 19 >= ob2X && x + 19 <= ob2X + 38 && y - 19 <= ob2Y && y - 19 > ob2Y - 38);
        playerIsTouchingObstacle3 = (x + 19 >= ob3X && x + 19 <= ob3X + 38 && y - 19 <= ob3Y && y - 19 > ob3Y - 38);
        playerIsTouchingObstacle4 = false;
        playerIsTouchingObstacle5 = false;
        playerIsTouchingObstacle6 = false;
        if (score > 30) {
            playerIsTouchingObstacle4 = (x + 19 >= ob4X && x + 19 <= ob4X + 38 && y - 19 <= ob4Y && y - 19 > ob4Y - 38);
        }
        if (score > 60) {
            playerIsTouchingObstacle5 = (x + 19 >= ob5X && x + 19 <= ob5X + 38 && y - 19 <= ob5Y && y - 19 > ob5Y - 38);
        }
        if (score > 100) {
            playerIsTouchingObstacle6 = (x + 19 >= ob6X && x + 19 <= ob6X + 38 && y - 19 <= ob6Y && y - 19 > ob6Y - 38);
        }

        levelAnnouncement();
        gameOver();
        writeScore();
        requestAnimationFrame(createObstacles);
    }

    //Level Announcement

    function levelAnnouncement() {
        if (score == 0) {
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.font = "100px Game Over";
            ctx.fillText("LEVEL 1", 260, 170);
        }
        if (score == 30) {
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.font = "100px Game Over";
            ctx.fillText("LEVEL 2", 260, 170);
        }
        if (score == 60) {
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.font = "100px Game Over";
            ctx.fillText("LEVEL 3", 260, 170);
        }
        if (score == 100) {
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.font = "100px Game Over";
            ctx.fillText("LEVEL 4", 260, 170);
        }
    }

    //Function to Redraw Everything

    function redrawEverything() {
        ctx.clearRect(0, 0, 520, 320);
        ctx.drawImage(background, 0, 0, 520, 320);
        ctx.drawImage(bomb, obX, obY, 20, 20);
        ctx.drawImage(bomb, ob2X, ob2Y, 20, 20);
        ctx.drawImage(bomb, ob3X, ob3Y, 20, 20);
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, playerWidth, playerHeight);

        if (score >= 30) {
            ctx.drawImage(bomb, ob4X, ob4Y, 20, 20);
        }
        if (score >= 60) {
            ctx.drawImage(bomb, ob5X, ob5Y, 20, 20);
        }
        if (score >= 100) {
            ctx.drawImage(bomb, ob6X, ob6Y, 20, 20);
        }
    }

    //Movements

    function movements(event) {
        var key = event.keyCode;
        if (key == 39 && x <= 495) {
            moveRight();
        }
        if (key == 37 && x >= 5) {
            moveLeft();
        }
        if (key == 40 && y <= 295) {
            moveDown();
        }
        if (key == 38 && y >= 5) {
            moveUp();
        }
        levelAnnouncement();
    }

    //Assigning keys to each movement

    function moveRight() {
        redrawEverything();
        x += 5;
        right.play();
    }

    function moveLeft() {
        redrawEverything();
        x -= 5;
        left.play();
    }

    function moveUp() {
        redrawEverything();
        y -= 5;
        up.play();
    }

    function moveDown() {
        redrawEverything();
        y += 5;
        down.play();
    }

    //Game Over

    function gameOver() {
        if (playerIsTouchingObstacle || playerIsTouchingObstacle2 || playerIsTouchingObstacle3 || playerIsTouchingObstacle4 || playerIsTouchingObstacle5 || playerIsTouchingObstacle6) {
            cancelAnimationFrame(createObstacles);
            createObstacles = {};
            document.removeEventListener("keydown", movements);
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
            return "Game Over";
        }
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
}

draw(x, y, playerWidth, playerHeight);

// Restart Game

/*document.addEventListener("event", () => {
    let key = event.keyCode;
    if (key == 13) {
        draw(x, y, playerWidth, playerHeight)
    }
});*/

draw(x, y, playerWidth, playerHeight);
