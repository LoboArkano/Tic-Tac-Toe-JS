const boardContainer = document.getElementById('game-board');
const mainController = document.getElementById('main-controller');

const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

const player = (name, score) => {
  const getName = () => name;
  const getScore = () => score;
  const updateScore = () => { score += 1; };
  return { getScore, getName, updateScore };
};

const gameBoard = (() => {
  const display = () => {
    boardContainer.innerHTML = '';

    board.forEach((cell) => {
      const cellBoard = `
      <div class="cell" value="${cell}">${cell}</div>
      `;

      boardContainer.innerHTML += cellBoard;
    });
  };

  return { display };
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

gameBoard.display();
displayController.start();
