const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;

let xDirection = -2;
let yDirection = 2;
let speed = 30;
let timerId = null;
let score = 0;

const boardWidth = grid.offsetWidth;
const boardHeight = grid.offsetHeight;

const userStart = [230, 10];
let currentUserPosition = userStart;

const ballStart = [boardWidth / 2, boardHeight / 3];
let ballPosition = [...ballStart];

class Block {
  constructor(xAxis, yAxis, color) {
    this.bottomLeft = [xAxis, yAxis];
    this.color = color;
  }
}

const blockPadding = 10;
const leftOffset = 5;
const topOffset = 360;
const blockCols = Math.floor(
  (boardWidth - leftOffset) / (blockWidth + blockPadding)
);
const blockRows = 4;
const blockColors = ["crimson", "orange", "gold", "limegreen"]; // level colors

const blocks = [];
for (let row = 0; row < blockRows; row++) {
  for (let col = 0; col < blockCols; col++) {
    const x = leftOffset + col * (blockWidth + blockPadding);
    const y = topOffset - row * (blockHeight + blockPadding);
    blocks.push(new Block(x, y, blockColors[row]));
  }
}

function addBlocks() {
  blocks.forEach((block) => {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");
    blockDiv.style.left = block.bottomLeft[0] + "px";
    blockDiv.style.bottom = block.bottomLeft[1] + "px";
    blockDiv.style.backgroundColor = block.color;
    grid.appendChild(blockDiv);
  });
}
addBlocks();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

function drawUser() {
  user.style.left = currentUserPosition[0] + "px";
  user.style.bottom = currentUserPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentUserPosition[0] > 0) {
        currentUserPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentUserPosition[0] < boardWidth - blockWidth) {
        currentUserPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

function drawBall() {
  ball.style.left = ballPosition[0] + "px";
  ball.style.bottom = ballPosition[1] + "px";
}

function moveBall() {
  ballPosition[0] += xDirection;
  ballPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, speed);

function checkForCollisions() {
  wallCollisions();
  blockCollisions();
  userCollisions();
  gameOverLose();
}

function wallCollisions() {
  if (ballPosition[0] >= boardWidth - ballDiameter || ballPosition[0] <= 0) {
    xDirection = -xDirection;
  }
  if (ballPosition[1] >= boardHeight - ballDiameter) {
    yDirection = -yDirection;
  }
}

function blockCollisions() {
  const allBlocks = Array.from(document.querySelectorAll(".block"));

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (
      ballPosition[0] + ballDiameter > block.bottomLeft[0] &&
      ballPosition[0] < block.bottomLeft[0] + blockWidth &&
      ballPosition[1] + ballDiameter > block.bottomLeft[1] &&
      ballPosition[1] < block.bottomLeft[1] + blockHeight
    ) {
      allBlocks[i].remove();
      blocks.splice(i, 1);
      score++;
      scoreDisplay.textContent = `Score: ${score}`;

      changeBallDirection();
      increaseSpeed();
      gameOverWin();
      break;
    }
  }
}

function increaseSpeed() {
  speed = Math.max(speed - 0.2, 5); // Lower interval = faster speed
  clearInterval(timerId);
  timerId = setInterval(moveBall, speed);
}

function userCollisions() {
  if (
    ballPosition[0] > currentUserPosition[0] &&
    ballPosition[0] < currentUserPosition[0] + blockWidth &&
    ballPosition[1] <= currentUserPosition[1] + blockHeight
  ) {
    yDirection = 2;

    const hitPos = ballPosition[0] - currentUserPosition[0];
    if (hitPos < blockWidth / 3) {
      xDirection = -2;
    } else if (hitPos > (2 * blockWidth) / 3) {
      xDirection = 2;
    }
  }
}

function gameOverWin() {
  if (blocks.length === 0) {
    scoreDisplay.innerHTML = "🎉 You Win!";
    clearInterval(timerId);
    document.removeEventListener("keydown", moveUser);
  }
}

function gameOverLose() {
  if (ballPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "💥 You Lost";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeBallDirection() {
  xDirection = -xDirection;
  yDirection = -yDirection;
}

document.getElementById("restart").addEventListener("click", () => {
  location.reload(); // reloads the page to reset everything
});
