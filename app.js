// Global Constants and Assets
const start = document.querySelector(".start");
const gameContainer = document.querySelector(".game-container");
const tiles = document.querySelectorAll(".game-container__tile");
const gameEnd = document.querySelector(".game-over");
const score = document.querySelector(".header__score")

let scoreCount = 0;
let grid;
let previousGrid;

// Functions
const getGrid = () => {
    let array = [[],[],[],[]]
    let i = 0;

    for (div in gameContainer.children) {
        if (i < 4) {
            array[0].push(Number(gameContainer.children.item(div).innerHTML))
            i++
        } else if (i < 8) {
            array[1].push(Number(gameContainer.children.item(div).innerHTML))
            i++
        } else if (i < 12) {
            array[2].push(Number(gameContainer.children.item(div).innerHTML))
            i++
        } else if (i < 16) {
            array[3].push(Number(gameContainer.children.item(div).innerHTML))
            i++
        }
    }
    return array
}

const checkKey = (event) => {
  previousGrid = getGrid();
  switch (event.code) {
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
        transposedArray[i] = transposedArray[i].flat()
    }
    return transposedArray;
};

const getNonZeroArray = (array) => {
    let nonZeroArray = [[],[],[],[]]
    for (let i = 0; i < array.length; i++) {
        nonZeroArray[i] = array[i].filter(element => element !== 0)
    }
    return nonZeroArray
}

const mergeSameNumbers = (array, mergeFromStart) => {
    if (mergeFromStart) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === array[i][j + 1]) {
                    array[i][j] += array[i][j + 1]
                    scoreCount += array[i][j]
                    array[i].splice(j+1, 1)
                    j++
                }
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            for (let j = array[i].length - 1; j > 0; j--) {
                if (array[i][j] === array[i][j - 1]) {
                    array[i][j] += array[i][j - 1]
                    scoreCount += array[i][j]
                    array[i].splice(j-1, 1)
                    j--
                }
            }
        }
    }
    return array
}

const getSquareArray = (nonZeroArray, start) => {
    for (let i = 0; i < nonZeroArray.length; i++) {
        const count = 4 - nonZeroArray[i].length;
        for (let j = 0; j < count; j++) {
            if (start) {
                nonZeroArray[i].push(0)
            } else {
                nonZeroArray[i].unshift(0)
            }
        }
    }
    return nonZeroArray;
}


const checkForUpdate = (previousGrid, currentGrid) => {
    if (JSON.stringify(previousGrid) !== JSON.stringify(currentGrid)) {
        grid = [...currentGrid]
        updateGrid()
    }
}

const moveUp = () => {
    let transposedArray = transpose2DArray(previousGrid)
    let nonZeroArray = getNonZeroArray(transposedArray)
    let condensedArray = mergeSameNumbers(nonZeroArray, true)
    let squareArray = getSquareArray(condensedArray, true)
    let finalArray = transpose2DArray(squareArray)
    checkForUpdate(previousGrid, finalArray)
};
const moveDown = () => {
    let transposedArray = transpose2DArray(previousGrid)
    let nonZeroArray = getNonZeroArray(transposedArray)
    let condensedArray = mergeSameNumbers(nonZeroArray, false)
    let squareArray = getSquareArray(condensedArray, false)
    let finalArray = transpose2DArray(squareArray)
    checkForUpdate(previousGrid, finalArray)
};
const moveRight = () => {
    let nonZeroArray = getNonZeroArray(previousGrid)
    let condensedArray = mergeSameNumbers(nonZeroArray, false)
    let finalArray = getSquareArray(condensedArray, false)
    checkForUpdate(previousGrid, finalArray)
};
const moveLeft = () => {
    let nonZeroArray = getNonZeroArray(previousGrid)
    let condensedArray = mergeSameNumbers(nonZeroArray, true)
    let finalArray = getSquareArray(condensedArray, true)
    checkForUpdate(previousGrid, finalArray)
};

const newNumber = () => {
  const randomNumber = Math.random();
  if (randomNumber < 0.7) {
    return 2;
  } else {
    return 4;
  }
};

const randomLocation = () => {
    const location = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
  return location
};

const addNumber = () => {
  const randomNewLocation = randomLocation();
  const randomNewNumber = newNumber();
  if (grid[randomNewLocation[0]][randomNewLocation[1]] !== 0) {
    addNumber();
  } else {
    grid[randomNewLocation[0]][randomNewLocation[1]] = randomNewNumber
  }
};

const updateScore = () => {
  score.innerText = `${scoreCount}`
}

const updateGrid = (start) => {
  start = start || false;
  if (start === true) {
    addNumber();
  }
  addNumber();
  updateScore()

  for (div in gameContainer.children) {
    gameContainer.children.item(div).className = "game-container__tile";
    gameContainer.children.item(div).innerText = "";
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) {
        gameContainer.children.item(i * 4 + j).innerText = grid[i][j];
        gameContainer.children
          .item(i * 4 + j)
          .classList.add(`game-container__tile--${grid[i][j]}`);
      }
    }
  }
};

// Interaction
start.addEventListener("click", () => {
  start.classList.add("start--no-display");
  gameContainer.classList.remove("game-container--no-display");
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  updateGrid(true);
});

document.addEventListener("keydown", checkKey);