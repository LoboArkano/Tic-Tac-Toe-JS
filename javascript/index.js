/* eslint-disable prefer-destructuring */
const boardContainer = document.getElementById('game-board');
const mainController = document.getElementById('main-controller');
const form = document.getElementById('users-form');
const submitBtn = document.getElementById('ok-form');
const usernNme1 = document.getElementById('username1');
const usernNme2 = document.getElementById('username2');
let players = [];

const board = ['', '', '', '', '', '', '', '', ''];
const marks = ['X', 'O'];

const player = (name, score, mark) => {
  const getName = () => name;
  const getScore = () => score;
  const updateScore = () => { score += 1; };
  return {
    mark, getScore, getName, updateScore,
  };
};

const gameBoard = (() => {
  const updateCell = (cell) => {
    if (cell.innerHTML === '') {
      const index = cell.getAttribute('value');

      board[index] = marks[0];
      const temp = marks[0];
      marks[0] = marks[1];
      marks[1] = temp;
    } else {
      alert('This space has been taken');
    }
  };

  const render = () => {
    let i = 0;
    boardContainer.innerHTML = '';

    board.forEach((cell) => {
      const cellBoard = `
      <div class="cell" value="${i}">${cell}</div>
      `;

      i += 1;
      boardContainer.innerHTML += cellBoard;
    });

    const cells = boardContainer.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        updateCell(cell);

        render();
      });
    });
  };

  return { render };
})();


function showForm() {
  form.classList.remove('d-none');
}

function hideForm() {
  form.classList.add('d-none');
}

const displayController = (() => {
  const start = () => {
    mainController.innerHTML = '';

    const startBtn = `
    <div class="start-btn btn1" onclick="showForm()">start</div>
    `;

    mainController.innerHTML = startBtn;
  };

  const gameOver = () => {
    mainController.innerHTML = '';

    const gameOverBtns = `
    <div class="new-btn btn1">new game</div>
    <div class="quit-btn btn1">quit</div>
    `;

    mainController.innerHTML = gameOverBtns;
  };

  return { start, gameOver };
})();

const gameEngine = (() => {

  const getUserData = () => {

  };

  const gameOn = () => {
    gameBoard.render();
    displayController.start();
  };

  return { gameOn };
})();

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  players = [];
  const playerOne = player(usernNme1.value, 0, 'X');
  const playerTwo = player(usernNme2.value, 0, 'Y');

  players.push(playerOne, playerTwo);
  console.log(players[0].getName());

  usernNme1.value = '';
  usernNme2.value = '';
  hideForm();
  gameBoard.render();
});

gameEngine.gameOn();
