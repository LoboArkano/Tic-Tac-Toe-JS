/* eslint-disable no-use-before-define */
const boardContainer = document.getElementById('board');
const mainController = document.getElementById('main-controller');
const userInfo = document.getElementById('user');
const score = document.getElementById('score');
const form = document.getElementById('users-form');
const submitBtn = document.getElementById('ok-form');
const usernNme1 = document.getElementById('username1');
const usernNme2 = document.getElementById('username2');
const myAudio = new Audio('assets/music/sw-8bits.mp3');
const confirmation = new Audio('assets/music/happy-confirmation.mp3');
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
  const gameOverEvent = () => {
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

  const reset = () => {
    mainController.innerHTML = '';
  };

  const start = () => {
    const startBtn = `
    <div class="start-btn btn1" onclick="showForm()">start</div>
    `;

    mainController.innerHTML = startBtn;
  };

  const gameOver = () => {
    const gameOverBtns = `
    <div id="new-btn" class="new-btn btn1 w-100">new game</div>
    <div id="quit-btn" class="quit-btn btn1 w-100">quit</div>
    `;

    mainController.innerHTML = gameOverBtns;
    gameOverEvent();
  };

  return { reset, start, gameOver };
})();

const rules = (() => {
  const isSubset = () => {
    const pChoices = [];
    const cells = boardContainer.querySelectorAll('.cell');
    let result = false;

    cells.forEach((cell) => {
      if (cell.innerHTML === players[1].mark) {
        pChoices.push(cell.getAttribute('value'));
      }
    });

    winRows.forEach((row) => {
      if (row.every(num => pChoices.includes(num))) {
        result = true;
      }
    });

    return result;
  };

  const isFilled = () => board.every(cell => cell !== '');

  const checkWin = () => {
    if (isSubset()) {
      players[1].updateScore();
      userInfo.innerHTML = '';

      const congrulations = `
      <div class="info d-flex justify-center align-center w-100">
        <p class="match-info w-100">Congratulations ${players[1].getName()} you are the winner!!!</p>
        <p class="match-info w-100">Score: ${players[1].getScore()}</p>
      </div>
      `;
      boardContainer.innerHTML = congrulations;
      score.innerHTML = `
        <p>${players[0].getName()} wins: ${players[0].getScore()}</p>
        <p>${players[1].getName()} wins: ${players[1].getScore()}</p>
      `;
      displayController.gameOver();
      return true;
    }

    return false;
  };

  const checkDraw = () => {
    if (isFilled()) {
      userInfo.innerHTML = '';

      const draw = `
      <div class="info d-flex justify-center align-center w-100">
        <p class="match-info w-100">Game over. It's a tie!!!</p>
      </div>
      `;
      boardContainer.innerHTML = draw;
      displayController.gameOver();
    }
  };

  return { checkWin, checkDraw };
})();

const gameBoard = (() => {
  const nextTurn = () => {
    players.push(players.shift());
  };

  const updateCell = (cell) => {
    if (cell.innerHTML === '') {
      const index = cell.getAttribute('value');

      board[index] = players[0].mark;
      nextTurn();
    } else {
      // eslint-disable-next-line no-alert
      alert('This space has been taken');
    }
  };

  const cellEvent = () => {
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

  const defaultBoard = () => {
    boardContainer.innerHTML = '';
    userInfo.innerHTML = '';
    score.innerHTML = '';

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
      <div class="cell d-flex justify-center align-center black" value="${i}">${cell}</div>
      `;

      i += 1;
      boardContainer.innerHTML += cellBoard;
    });

    userInfo.innerHTML = `${players[0].getName()} is your turn.`;
    cellEvent();
  };

  return { render, defaultBoard };
})();

// eslint-disable-next-line no-unused-vars
function showForm() {
  form.classList.remove('d-none');
  confirmation.play();
}

function hideForm() {
  form.classList.add('d-none');
}

const gameEngine = (() => {
  const gameOn = () => {
    gameBoard.defaultBoard();
    displayController.start();
    myAudio.pause();
  };

  const matchStart = () => {
    gameBoard.render();
    displayController.reset();
    myAudio.play();
  };

  return { gameOn, matchStart };
})();

function validateForm() {
  let message = '';

  if (usernNme1.value.length === 0) {
    message += 'Write the name of player 1. ';
  }
  if (usernNme2.value.length === 0) {
    message += 'Write the name of player 2.';
  }
  if (message.length === 0) {
    return true;
  }

  // eslint-disable-next-line no-alert
  alert(message);
  return false;
}

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  if (validateForm()) {
    players = [];
    const playerOne = player(usernNme1.value, 0, 'X');
    const playerTwo = player(usernNme2.value, 0, 'O');

    players.push(playerOne, playerTwo);

    usernNme1.value = '';
    usernNme2.value = '';
    hideForm();
    displayController.reset();
    gameEngine.matchStart();
  }
});

myAudio.loop = true;
gameEngine.gameOn();
