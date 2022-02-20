// Global Constants and Assets
const start = document.querySelector(".start");
const gameContainer = document.querySelector(".game-container");
// const tiles = document.querySelectorAll(".game-contaienr__tile");
const gameEnd = document.querySelector(".game-over");

let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// Functions
const checkKey = (event) => {
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

const moveUp = () => {
  let newGrid = [[], [], [], []];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i % 4 === 0) {
        newGrid[j][i] = grid[i][j];
      } else if (i % 4 === 1) {
        newGrid[j][i] = grid[i][j];
      } else if (i % 4 === 2) {
        newGrid[j][i] = grid[i][j];
      } else if (i % 4 === 3) {
        newGrid[j][i] = grid[i][j];
      }
    }
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length - 1; j++) {
      if (newGrid[i][j] === newGrid[i][j + 1]) {
        newGrid[i][j] += newGrid[i][j + 1];
        newGrid[i][j + 1] = 0;
        j++;
      } else if (
        newGrid[i][j + 1] === 0 &&
        newGrid[i][j] === newGrid[i][j + 2] &&
        j < 2
      ) {
        newGrid[i][j] += newGrid[i][j + 2];
        newGrid[i][j + 2] = 0;
        j++;
      } else if (
        newGrid[i][j + 1] === 0 &&
        newGrid[i][j + 2] === 0 &&
        newGrid[i][j] === newGrid[i][j + 3] &&
        j < 1
      ) {
        newGrid[i][j] += newGrid[i][j + 3];
        newGrid[i][j + 2] = 0;
        j++;
      }
    }
  }

  let pushArray = [[], [], [], []];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (newGrid[i][j] !== 0) {
        pushArray[i].push(newGrid[i][j]);
      }
    }
  }

  for (let i = 0; i < pushArray.length; i++) {
    const count = 4 - pushArray[i].length;
    for (let j = 0; j < count; j++) {
      pushArray[i].push(0);
    }
  }

  newGrid = [[], [], [], []];
  for (let i = 0; i < pushArray.length; i++) {
    for (let j = 0; j < pushArray[i].length; j++) {
      newGrid[i].push(pushArray[j][i]);
    }
  }

  grid = newGrid;

  updateGrid();
};

const moveDown = () => {
  let newGrid = [[], [], [], []];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i % 4 === 0) {
        newGrid[j][i] = grid[i][j];
      } else if (i % 4 === 1) {
        newGrid[j][i] = grid[i][j];
      } else if (i % 4 === 2) {
        newGrid[j][i] = grid[i][j];
      } else if (i % 4 === 3) {
        newGrid[j][i] = grid[i][j];
      }
    }
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 3; j > 0; j--) {
      if (newGrid[i][j] === newGrid[i][j - 1]) {
        newGrid[i][j] += newGrid[i][j - 1];
        newGrid[i][j - 1] = 0;
        j--;
      } else if (
        newGrid[i][j - 1] === 0 &&
        newGrid[i][j] === newGrid[i][j - 2] &&
        j > 1
      ) {
        newGrid[i][j] += newGrid[i][j - 2];
        newGrid[i][j - 2] = 0;
        j--;
      } else if (
        newGrid[i][j - 1] === 0 &&
        newGrid[i][j - 2] === 0 &&
        newGrid[i][j] === newGrid[i][j - 3] &&
        j > 2
      ) {
        newGrid[i][j] += newGrid[i][j - 3];
        newGrid[i][j - 2] = 0;
        j--;
      }
    }
  }

  let pushArray = [[], [], [], []];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (newGrid[i][j] !== 0) {
        pushArray[i].push(newGrid[i][j]);
      }
    }
  }

  for (let i = 0; i < pushArray.length; i++) {
    const count = 4 - pushArray[i].length;
    for (let j = 0; j < count; j++) {
      pushArray[i].unshift(0);
    }
  }

  newGrid = [[], [], [], []];
  for (let i = 0; i < pushArray.length; i++) {
    for (let j = 0; j < pushArray[i].length; j++) {
      newGrid[i].push(pushArray[j][i]);
    }
  }

  grid = newGrid;
  updateGrid();
};

const moveRight = () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 3; j > 0; j--) {
          if (grid[i][j] === grid[i][j - 1]) {
            grid[i][j] += grid[i][j - 1];
            grid[i][j - 1] = 0;
            j--;
          } else if (
            grid[i][j - 1] === 0 &&
            grid[i][j] === grid[i][j - 2] &&
            j > 1
          ) {
            grid[i][j] += grid[i][j - 2];
            grid[i][j - 2] = 0;
            j--;
          } else if (
            grid[i][j - 1] === 0 &&
            grid[i][j - 2] === 0 &&
            grid[i][j] === grid[i][j - 3] &&
            j > 2
          ) {
            grid[i][j] += grid[i][j - 3];
            grid[i][j - 2] = 0;
            j--;
          }
        }
      }

  let pushArray = [[], [], [], []];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (parseInt(grid[i][j]) !== 0) {
        pushArray[i].push(grid[i][j]);
      }
    }
  }

  for (let i = 0; i < pushArray.length; i++) {
    const count = 4 - pushArray[i].length;
    for (let j = 0; j < count; j++) {
      pushArray[i].unshift(0);
    }
  }

  grid = pushArray;

  updateGrid();
};

const moveLeft = () => {
  console.log(grid);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length - 1; j++) {
      if (grid[i][j] === grid[i][j + 1]) {
        grid[i][j] += grid[i][j + 1];
        grid[i][j + 1] = 0;
        j++;
      } else if (
        grid[i][j + 1] === 0 &&
        grid[i][j] === grid[i][j + 2] &&
        j < 2
      ) {
        grid[i][j] += grid[i][j + 2];
        grid[i][j + 2] = 0;
        j++;
      } else if (
                grid[i][j + 1] === 0 &&
                grid[i][j + 2] === 0 &&
                grid[i][j] === grid[i][j + 3] &&
                j < 1
              ) {
                grid[i][j] += grid[i][j + 3];
                grid[i][j + 2] = 0;
                j++;
              }
    }
  }

  let pushArray = [[], [], [], []];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (parseInt(grid[i][j]) !== 0) {
        pushArray[i].push(grid[i][j]);
      }
    }
  }

  for (let i = 0; i < pushArray.length; i++) {
    const count = 4 - pushArray[i].length;
    for (let j = 0; j < count; j++) {
      pushArray[i].push(0);
    }
  }

  grid = pushArray;

  updateGrid();
};

const addNumber = () => {
  const randomNumber = Math.random();
  let newNumber;

  if (randomNumber < 0.5) {
    newNumber = 2;
  } else {
    newNumber = 4;
  }

  const randomLocation = [
    Math.floor(Math.random() * 4),
    Math.floor(Math.random() * 4),
  ];

  if (grid[randomLocation[0]][randomLocation[1]] !== 0) {
    addNumber();
  } else {
    grid[randomLocation[0]][randomLocation[1]] = newNumber;
  }
};

const updateGrid = () => {
  addNumber();

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
  updateGrid();
});

document.addEventListener("keydown", checkKey);
