/* eslint-disable prefer-destructuring */
const boardContainer = document.getElementById('game-board');
const mainController = document.getElementById('main-controller');

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
        const index = cell.getAttribute('value');

        if (cell.innerHTML === '') {
          board[index] = marks[0];
          const temp = marks[0];
          marks[0] = marks[1];
          marks[1] = temp;
        } else {
          alert('This space has been taken');
        }

        render();
      });
    });
  };

  return { render };
})();

const displayController = (() => {
  const start = () => {
    mainController.innerHTML = '';

    const startBtn = `
    <div class="start-btn btn1">start</div>
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

const playerOne = player('Lobo', 0, 'X');
const playerTwo = player('Arcano', 0, 'Y');

console.log(playerOne.mark);
console.log(playerTwo.mark);

gameBoard.render();
displayController.start();
