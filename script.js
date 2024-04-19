const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');
const winnerDisplay = document.getElementById('winner');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-cell-index');

  if (gameState[index] !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  gameState[index] = currentPlayer;
  checkWinner();
  swapPlayer();
}

function swapPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      winnerDisplay.textContent = `${gameState[a]} wins!`;
      break;
    }
  }
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    winnerDisplay.textContent = 'It\'s a draw!';
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  winnerDisplay.textContent = '';
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
