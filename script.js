const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
//using ID tags to assign elements
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayerOTurn = false;

//creating function for starting game

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
	isPlayerOTurn = false;
	cellElements.forEach(cell => {
	  cell.classList.remove(PLAYER_X_CLASS);
	  cell.classList.remove(PLAYER_O_CLASS);
	  cell.removeEventListener('click', handleCellClick);
	  cell.addEventListener('click', handleCellClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
	winningMessageTextElement.innerText = '';
  }

//creating the mouse click function for players
function handleCellClick(e) {
	const cell = e.target;
	const currentClass = isPlayerOTurn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
	  endGame(false, currentClass);
	} else if (isDraw()) {
	  endGame(true);
	} else {
	  swapTurns();
	  setBoardHoverClass();
	}
  }

//this returns the value if its a draw
  function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
	  });
	}

//to place the character in the cell and switch turns

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
  }

  function swapTurns() {
	isPlayerOTurn = !isPlayerOTurn;
  }
//cursor effect onto the board
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS);
	boardElement.classList.remove(PLAYER_O_CLASS);
	if (isPlayerOTurn) {
	  boardElement.classList.add(PLAYER_O_CLASS);
	} else {
	  boardElement.classList.add(PLAYER_X_CLASS);
	}
  }
//to check if there is the winner using our winning combination 

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
	  return combination.every(index => {
		return cellElements[index].classList.contains(currentClass);
	  });
	});
  }

  //the endgame function to dipslay the winner or draw statement
  function endGame(isDraw, currentClass) {
	if (isDraw) {
	  winningMessageTextElement.innerText = "It's a draw!";
	} else {
	  winningMessageTextElement.innerText = `${currentClass === PLAYER_X_CLASS ? 'X' : 'O'} Wins!`;
	}
	winningMessageElement.classList.add('show');
  }