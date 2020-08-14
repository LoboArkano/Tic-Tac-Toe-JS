const boardContainer = document.getElementById('game-board');

const player = (name, score) => {
  const getName = () => name;
  const getScore = () => score;
  const updateScore = () => { score += 1; };
  return { getScore, getName, updateScore };
};

const gameBoard = (() => {
  const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

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

gameBoard.display();
