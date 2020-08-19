/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
const boardContainer = document.getElementById('game-board');
const mainController = document.getElementById('main-controller');
const form = document.getElementById('users-form');
const submitBtn = document.getElementById('ok-form');
const usernNme1 = document.getElementById('username1');
const usernNme2 = document.getElementById('username2');
let players = [];

let board = ['', '', '', '', '', '', '', '', ''];
const winRows = [
  ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'],
  ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'],
  ['0', '4', '8'], ['2', '4', '6']];

const player = (name, score, mark) => {
  const getName = () => name;
  const getScore = () => score;
  const updateScore = () => { score += 1; };
  return {
    mark, getScore, getName, updateScore,
  };
};

const displayController = (() => {
  const reset = () => {
    mainController.innerHTML = '';
  };

  const start = () => {
    reset();

    const startBtn = `
    <div class="start-btn btn1" onclick="showForm()">start</div>
    `;

    mainController.innerHTML = startBtn;
  };

  const gameOver = () => {
    reset();

    const gameOverBtns = `
    <div id="new-btn" class="new-btn btn1 w-50">new game</div>
    <div id="quit-btn" class="quit-btn btn1 w-50">quit</div>
    `;

    mainController.innerHTML = gameOverBtns;

    const newBtn = document.getElementById('new-btn');
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();

      board = ['', '', '', '', '', '', '', '', ''];
      gameEngine.matchStart();
    });

    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      board = ['', '', '', '', '', '', '', '', ''];
      players = [];
      gameEngine.gameOn();
    });
  };

  return { reset, start, gameOver };
})();

const rules = (() => {
  const subset = (pChoices) => {
    let result = false;
    winRows.forEach((row) => {
      if (row.every(num => pChoices.includes(num))) {
        result = true;
      }
    });

    return result;
  };

  const checkWin = () => {
    const pChoices = [];
    const cells = boardContainer.querySelectorAll('.cell');

    cells.forEach((cell) => {
      if (cell.innerHTML === players[1].mark) {
        pChoices.push(cell.getAttribute('value'));
      }
    });

    const winner = subset(pChoices);

    if (winner) {
      players[1].updateScore();
      boardContainer.innerHTML = '';

      const congrulations = `
      <div>
        <p>Congrulations ${players[1].getName()}</p>
        <p>Score ${players[1].getScore()}</p>
      </div>
      `;
      boardContainer.innerHTML = congrulations;
      displayController.gameOver();
      return true;
    }

    return false;
  };

  const checkDraw = () => {
    if (board.every(cell => cell !== '')) {
      boardContainer.innerHTML = '';

      const draw = `
      <div>Match Finished. It's a draw!!</div>
      `;
      boardContainer.innerHTML = draw;
      displayController.gameOver();
    }
  };

  return { checkWin, checkDraw };
})();

const gameBoard = (() => {
  const nextTurn = () => {
    const temp = players[0];
    players[0] = players[1];
    players[1] = temp;
  };

  const updateCell = (cell) => {
    if (cell.innerHTML === '') {
      const index = cell.getAttribute('value');

      board[index] = players[0].mark;
      nextTurn();
    } else {
      alert('This space has been taken');
    }
  };

  const defaultBoard = () => {
    boardContainer.innerHTML = '';

    board.forEach(() => {
      const cellBoard = `
      <div class="cell"></div>
      `;

      boardContainer.innerHTML += cellBoard;
    });
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
        if (rules.checkWin() === false) {
          rules.checkDraw();
        }
      });
    });
  };

  return { render, defaultBoard };
})();

function showForm() {
  form.classList.remove('d-none');
}

function hideForm() {
  form.classList.add('d-none');
}

const gameEngine = (() => {
  const gameOn = () => {
    gameBoard.defaultBoard();
    displayController.start();
  };

  const matchStart = () => {
    gameBoard.render();
    displayController.reset();
  };

  return { gameOn, matchStart };
})();

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  players = [];
  const playerOne = player(usernNme1.value, 0, 'X');
  const playerTwo = player(usernNme2.value, 0, 'O');

  players.push(playerOne, playerTwo);

  usernNme1.value = '';
  usernNme2.value = '';
  hideForm();
  displayController.reset();
  gameEngine.matchStart();
});

gameEngine.gameOn();
