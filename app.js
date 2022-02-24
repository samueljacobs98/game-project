// Global Constants and Assets
const start = document.querySelector(".start");
const gameContainer = document.querySelector(".game-container");
const tiles = document.querySelectorAll(".game-container__tile");
const gameEnd = document.querySelector(".game-over");
const score = document.querySelector(".header__score");
const newGameButton = document.querySelector(".header__new-game-button");
const winContainerButtons = document.querySelectorAll(
  ".win-container__buttons"
);
const modal = document.querySelector(".modal");
const winScore = document.querySelector(".win-container__text");
const header = document.querySelector(".win-container__header");
const continueText = document.querySelector(".win-container__continue-text");
const yesButton = document.querySelector(".win-container__yes-button");
const howTo = document.querySelector(".how-to-container");
const closehowTo = document.querySelector(".how-to-container__close-rules");
const arrowButtons = document.querySelectorAll(".arrow");

let scoreCount;
let grid;
let previousGrid;
let reach2048;

// Functions
const initialiseGrid = () => {
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
};

const getGrid = () => {
  let array = [[], [], [], []];
  let i = 0;

  tiles.forEach((div, index) => {
    const arrayIndex = Math.floor(index / 4);
    array[arrayIndex].push(Number(div.innerText));
  });

  return array;
};

const rowsGameMayEnd = (checkGrid) => {
  for (let i = 0; i < checkGrid.length; i++) {
    for (let j = 0; j < checkGrid[i].length - 1; j++) {
      if (checkGrid[i][j] === checkGrid[i][j + 1]) return false;
    }
  }
  return true;
};

const columnsGameMayEnd = (checkGrid) => {
  transposedCheckGrid = transpose2DArray(checkGrid);
  return rowsGameMayEnd(transposedCheckGrid);
};

const checkGameOver = (checkGrid) => {
  if (!checkForNumber(0)) {
    if (rowsGameMayEnd(checkGrid)) {
      if (columnsGameMayEnd(checkGrid)) return true;
    }
  }
  return false;
};

const gameOverModal = () => {
  header.innerText = "Game Over!";
  continueText.innerText = "Play again?";
};

const gameOver = () => {
  printModal();
  gameOverModal();
};

const checkKey = (event) => {
  previousGrid = getGrid();
  if (checkGameOver(previousGrid)) {
    gameOver();
    return;
  }

  let key;
  if (event.code === undefined) {
    key = event.target.classList[1];
  } else {
    key = event.code;
  }

  switch (key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
  }
};

const transpose2DArray = (array) => {
  let transposedArray = [[], [], [], []];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      transposedArray[j].push(array[i].slice(j, j + 1));
    }
  }
  for (let i = 0; i < transposedArray.length; i++) {
    transposedArray[i] = transposedArray[i].flat();
  }
  return transposedArray;
};

const getNonZeroArray = (array) => {
  let nonZeroArray = [[], [], [], []];
  for (let i = 0; i < array.length; i++) {
    nonZeroArray[i] = array[i].filter((element) => element !== 0);
  }
  return nonZeroArray;
};

const mergeSameNumbers = (array, mergeFromStart) => {
  if (mergeFromStart) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === array[i][j + 1]) {
          array[i][j] += array[i][j + 1];
          scoreCount += array[i][j];
          array[i].splice(j + 1, 1);
          j++;
        }
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      for (let j = array[i].length - 1; j > 0; j--) {
        if (array[i][j] === array[i][j - 1]) {
          array[i][j] += array[i][j - 1];
          scoreCount += array[i][j];
          array[i].splice(j - 1, 1);
          j--;
        }
      }
    }
  }
  return array;
};

const getSquareArray = (nonZeroArray, start) => {
  for (let i = 0; i < nonZeroArray.length; i++) {
    const count = 4 - nonZeroArray[i].length;
    for (let j = 0; j < count; j++) {
      start ? nonZeroArray[i].push(0) : nonZeroArray[i].unshift(0);
    }
  }
  return nonZeroArray;
};

const checkForUpdate = (currentGrid) => {
  if (JSON.stringify(previousGrid) !== JSON.stringify(currentGrid)) {
    grid = [...currentGrid];
    updateGrid();
    return true;
  }
};

const chooseArray = (boolean, array) => {
  return boolean ? transpose2DArray(array) : [...array];
};

const move = (transpose, fromStart) => {
  const alignedArray = chooseArray(transpose, previousGrid);

  let nonZeroArray = getNonZeroArray(alignedArray);
  let condensedArray = mergeSameNumbers(nonZeroArray, fromStart);
  let squareArray = getSquareArray(condensedArray, fromStart);

  const finalArray = chooseArray(transpose, squareArray);

  return finalArray;
};

const moveUp = () => {
  checkForUpdate(move(true, true));
};
const moveDown = () => {
  checkForUpdate(move(true, false));
};
const moveRight = () => {
  checkForUpdate(move(false, false));
};
const moveLeft = () => {
  checkForUpdate(move(false, true));
};

const newNumber = () => {
  const randomNumber = Math.random();
  return randomNumber > 0.7 ? 2 : 4;
};

const randomLocation = () => {
  const location = [
    Math.floor(Math.random() * 4),
    Math.floor(Math.random() * 4),
  ];
  return location;
};

const addNumber = () => {
  const randomNewLocation = randomLocation();
  const randomNewNumber = newNumber();
  grid[randomNewLocation[0]][randomNewLocation[1]] !== 0
    ? addNumber()
    : (grid[randomNewLocation[0]][randomNewLocation[1]] = randomNewNumber);
};

const updateScore = () => {
  score.innerText = `${scoreCount}`;
};

const checkForNumber = (numberToCheck) => {
  let check = false;
  for (i = 0; i < grid.length; i++) {
    check = grid[i].includes(numberToCheck);
    if (check === true) break;
  }
  return check;
};

const defaultModal = () => {
  header.innerText = "";
  continueText.innerText = "";
  yesButton.classList.add("win-container__yes-button--hide");
};

const printModal = () => {
  defaultModal();
  modal.classList.remove("modal--no-display");
  winScore.innerText = `Your score: ${scoreCount}`;
};

const youWinModal = () => {
  header.innerText = "You win!";
  continueText.innerText = "Would you like to continue?";
  yesButton.classList.remove("win-container__yes-button--hide");
};

const youWin = () => {
  printModal();
  youWinModal();
  reach2048 = true;
};

const updateGrid = (start) => {
  start = start || false;
  if (start === true) addNumber();
  addNumber();
  updateScore();

  tiles.forEach((tile, index) => {
    const row = Math.floor(index / 4)
    const col = Math.floor(index % 4)

    tile.className = "game-container__tile";
    tile.innerText = "";

    if (grid[row][col] !== 0) {
      tile.innerText = grid[row][col]
      tile.classList.add(`game-container__tile--${grid[row][col]}`)
    }
  })

  if (checkForNumber(2048) && !reach2048) youWin()
};

const newGame = () => {
  scoreCount = 0;
  reach2048 = false;
  initialiseGrid();
  updateGrid(true);
};

const checkWinButton = (button) => {
  const response = button.target.innerText;
  modal.classList.add("modal--no-display");
  if (response === "New Game") newGame();
};
// Interaction
start.addEventListener("click", () => {
  start.classList.add("start--no-display");
  gameContainer.classList.remove("game-container--no-display");
  newGameButton.classList.remove("header__new-game-button--no-display");
  newGame();
});

winContainerButtons.forEach((button) => {
  button.addEventListener("click", checkWinButton);
});

newGameButton.addEventListener("click", newGame);

document.addEventListener("keydown", checkKey);
arrowButtons.forEach((button) => {
  button.addEventListener("click", checkKey);
});

closehowTo.addEventListener("click", function () {
  howTo.classList.add("how-to-container--no-display");
});
