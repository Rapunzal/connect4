const playerOne = "R";
const playerTwo = "Y";
let currentPlayer = playerOne;
const player = document.getElementById("player");
let board;
let gameOver = false;
var currColumns = []; //keeps track of which row each column is at.
const container = document.querySelector(".container");
const rows = 6;
const cols = 7;
let columns;
createBoard();
function createBoard() {
  board = [];
  columns = [5, 5, 5, 5, 5, 5, 5];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(" ");
      const disk = document.createElement("div");
      disk.classList.add("disk");
      disk.id = i + "-" + j;
      disk.addEventListener("click", setColor);
      container.appendChild(disk);
    }
    board.push(row);
  }
}

function setColor(e) {
  if (gameOver) {
    return;
  }
  console.log(e.target);
  const piece = e.target;
  let id = piece.id.split("-");
  console.log(id);
  let r = id[0];
  let c = id[1];

  r = columns[c];
  if (r < 0) {
    return;
  }
  board[r][c] = currentPlayer;
  const x = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer === "R") {
    x.classList.add("red");
    currentPlayer = "Y";
  } else if (currentPlayer === "Y") {
    x.classList.add("yellow");
    currentPlayer = "R";
  }
  r -= 1;
  columns[c] = r;
  checkWinner();
}

function checkWinner() {
  //horizontal
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 3; j++) {
      if (board[i][j] != " ") {
        if (
          board[i][j] == board[i][j + 1] &&
          board[i][j + 1] == board[i][j + 2] &&
          board[i][j + 2] == board[i][j + 3]
        ) {
          console.log("check winner");
          setWinner(i, j);
          return;
        }
      }
    }
  }
  //vertical
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows - 3; j++) {
      if (board[j][i] != " ") {
        if (
          board[j][i] == board[j + 1][i] &&
          board[j + 1][i] == board[j + 2][i] &&
          board[j + 2][i] == board[j + 3][i]
        ) {
          console.log("check winner");
          setWinner(j, i);
          return;
        }
      }
    }
  }
  //anti daigonal
  for (let i = 0; i < rows - 3; i++) {
    for (let j = 0; j < cols - 3; j++) {
      if (board[i][j] != " ") {
        if (
          board[i][j] == board[i + 1][j + 1] &&
          board[i + 1][j + 1] == board[i + 2][j + 2] &&
          board[i + 2][j + 2] == board[i + 3][j + 3]
        ) {
          console.log("check winner");
          setWinner(i, j);
          return;
        }
      }
    }
  }

  // diagonal
  for (let i = 3; i < rows; i++) {
    for (let j = 0; j < cols - 3; j++) {
      if (board[i][j] != " ") {
        if (
          board[i][j] == board[i - 1][j + 1] &&
          board[i - 1][j + 1] == board[i - 2][j + 2] &&
          board[i - 2][j + 2] == board[i - 3][j + 3]
        ) {
          setWinner(i, j);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  console.log(playerOne, " board[r][c] ", board[r][c]);
  console.log(playerTwo);
  if (board[r][c] == playerOne) {
    player.innerText = "Red Wins!";
  } else if (board[r][c] == playerTwo) {
    player.innerText = "Yellow Wins!";
  }
  gameOver = true;
}

const reset = document.getElementById("reset");

reset.addEventListener("click", () => resetBoard());

function resetBoard() {
  const x = document.querySelectorAll(".container div");
  //console.log("===", board);
  board.map((b) => console.log(b));
  currentPlayer = playerOne;

  columns = [5, 5, 5, 5, 5, 5, 5];
  for (let i = 0; i < x.length; i++) {
    // console.log(x[i]);
    x[i].classList.remove("yellow");
    x[i].classList.remove("red");
  }
  board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(" ");
    }
    board.push(row);
  }
  console.log("2nd board====", board);
}
