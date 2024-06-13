const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const unit = 20;
let snake = [{ x: unit * 5, y: unit * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: unit * Math.floor(Math.random() * canvas.width / unit), y: unit * Math.floor(Math.random() * canvas.height / unit) };
let score = 0;

document.addEventListener("keydown", changeDirection);
document.addEventListener("keydown", resetGame);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction.x === 0) { // Left arrow key
        direction = { x: -unit, y: 0 };
    } else if (key === 38 && direction.y === 0) { // Up arrow key
        direction = { x: 0, y: -unit };
    } else if (key === 39 && direction.x === 0) { // Right arrow key
        direction = { x: unit, y: 0 };
    } else if (key === 40 && direction.y === 0) { // Down arrow key
        direction = { x: 0, y: unit };
    }
}

function drawSnake() {
    ctx.fillStyle = "#386641";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, unit, unit);
    });
}

function drawFood() {
    ctx.fillStyle = "#bc4749";
    ctx.fillRect(food.x, food.y, unit, unit);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        food = { x: unit * Math.floor(Math.random() * canvas.width / unit), y: unit * Math.floor(Math.random() * canvas.height / unit) };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function update() {
    if (checkCollision()) {
        document.getElementById("gameOverMessage").style.display = "block";
        direction = { x: 0, y: 0 };
        return;
    } else {
        document.getElementById("gameOverMessage").style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        moveSnake();
        drawSnake();
    }
}

function resetGame() {
    if (document.getElementById("gameOverMessage").style.display === "block") {
        snake = [{ x: unit * 5, y: unit * 5 }];
        direction = { x: 0, y: 0 };
        score = 0;
        document.getElementById("score").innerText = "Score: " + score;
        food = { x: unit * Math.floor(Math.random() * canvas.width / unit), y: unit * Math.floor(Math.random() * canvas.height / unit) };
        document.getElementById("gameOverMessage").style.display = "none";
    }
}

setInterval(update, 100);
