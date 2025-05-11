const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const ballDiameter = 20;
const boardHeight = 300;
const blockPadding = 6; // smaller padding fits more

let timerId;

let xDirection = -2;
let yDirection = 2;

let score = 0;

const userStart = [230, 10];
let currentUserPosition = userStart;

const ballStart = [boardWidth / 2, boardHeight / 3];
let ballPosition = ballStart;

// =============  CREATE BLOCK =============
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// =============  ALL BLOCKS (DYNAMICALLY GENERATED) =============
const gridWidth = grid.offsetWidth; // width of the grid in px
//const blockPadding = 10;
const blockCols = Math.floor(
  (gridWidth + blockPadding) / (blockWidth + blockPadding)
);
const blockRows = 3; // you can increase this number for more rows

const blocks = [];

for (let row = 0; row < blockRows; row++) {
  for (let col = 0; col < blockCols; col++) {
    const x = col * (blockWidth + blockPadding);
    const y = 270 + row * (blockHeight + blockPadding); // top-down row layout
    blocks.push(new Block(x, y));
  }
}

// // =============  ALL BLOCKS =============

// const blocks = [
//   new Block(10, 270),
//   new Block(120, 270),
//   new Block(230, 270),
//   new Block(340, 270),
//   new Block(450, 270),
//   new Block(10, 240),
//   new Block(120, 240),
//   new Block(230, 240),
//   new Block(340, 240),
//   new Block(450, 240),
//   new Block(10, 210),
//   new Block(120, 210),
//   new Block(230, 210),
//   new Block(340, 210),
//   new Block(450, 210),
// ];
// console.log(blocks[0]);

// ============= BLOCK DRAWING =============

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

// =============  DRAW THE USER =============

function drawUser() {
  user.style.left = currentUserPosition[0] + "px";
  user.style.bottom = currentUserPosition[1] + "px";
}

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// =============  MOVE USER  =============

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

    default:
      break;
  }
}

document.addEventListener("keydown", moveUser);

// =============  DRAW THE BALL =============
function drawBall() {
  ball.style.left = ballStart[0] + "px";
  ball.style.bottom = ballStart[1] + "px";
}

// =============  CREATE BALL =============
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// =============  MOVE THE BALL =============
function moveBall() {
  ballPosition[0] += xDirection;
  ballPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

// =============  CHECK FOR COLLISIONS =============
function checkForCollisions() {
  wallCollisions();
  blockCollisions();
  userCollisions();
  gameOverLose();
}

// =============  CHECK FOR WALL COLLISIONS =============
function wallCollisions() {
  if (
    ballPosition[0] >= boardWidth - ballDiameter ||
    ballPosition[1] >= boardHeight - ballDiameter ||
    ballPosition[0] <= 0
  ) {
    changeBallDirection();
  }
}

// =============  CHECK FOR BLOCK COLLISIONS =============
function blockCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballPosition[0] > blocks[i].bottomLeft[0] &&
      ballPosition[0] < blocks[i].bottomRight[0] &&
      ballPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      score++;
      scoreDisplay.innerHTML = score;
      changeBallDirection();
      gameOverWin();
    }
  }
}

// =============  CHECK FOR USER COLLISIONS =============
function userCollisions() {
  if (
    ballPosition[0] > currentUserPosition[0] &&
    ballPosition[0] < currentUserPosition[0] + blockWidth &&
    ballPosition[1] > currentUserPosition[1] &&
    ballPosition[1] < currentUserPosition[1] + blockHeight
  ) {
    changeBallDirection();
  }
}

// =============  GAME OVER WIN =============
function gameOverWin() {
  if (blocks.length === 0) {
    scoreDisplay.innerHTML = "You Win!";
    clearInterval(timerId);
    document.removeEventListener("keydown", moveUser);
  }
}

// =============  GAME OVER LOSE =============
function gameOverLose() {
  if (ballPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You Lost";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeBallDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

document.getElementById("restart").addEventListener("click", () => {
  location.reload(); // reloads the page to reset everything
});
