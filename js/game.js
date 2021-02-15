let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
//let img = document.getElementById("corona_image");
// let pattern = ctx.createPattern(img, "repeat");
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = pattern
// ctx.fill();
// ctx.closePath();
/*keyEvent*/
let rightPressed = false;
let leftPressed = false;
/*canvas*/
let x = canvas.width / 2;
let y = canvas.height - 30;

/*velocity*/
let dx = 2;
let dy = -2;

let VriusRadius = 10;

/*human*/
let humanHeight = 30;
let humanWidth = 50;
let humanX = (canvas.width - humanWidth) / 2;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawHuman() {
    ctx.beginPath();
    ctx.rect(humanX, canvas.height - humanHeight, humanWidth, humanHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawVirus() {

    ctx.beginPath();
    ctx.arc(x, y, VriusRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawVirus();
    drawHuman();


    if (x + dx > canvas.width - VriusRadius || x + dx < VriusRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - VriusRadius || y + dy < VriusRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > humanX && x < humanX + humanWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }

    if (rightPressed && humanX < canvas.width - humanWidth) {
        humanX += 7;
    } else if (leftPressed && humanX > 0) {
        humanX -= 7;
    }
    x += dx;
    y += dx;


}

let interval = setInterval(draw, 10);