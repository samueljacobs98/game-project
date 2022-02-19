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

// console.table(grid)

// console.log(start)
// console.log(gameContainer)
console.log(gameContainer.children.length);
// console.log(gameEnd)

// Functions
const checkKey = (event) => {
  switch (event.code) {
    case "ArrowUp":
      //   console.log(event.code);
      moveUp();
      break;
    case "ArrowDown":
      console.log(event.code);
      //   moveDown();
      break;
    case "ArrowRight":
      console.log(event.code);
      //   moveRight();
      break;
    case "ArrowLeft":
      console.log(event.code);
      //   moveLeft();
      break;
  }
};

const moveUp = () => {
  // Get each column
  // Grab all non-zeroes in each column
  // For each column, if non-zeroes < 4
  // map to new last column
  // concat required number of zeroes
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
  //   console.log(newGrid);

  let pushArray = [[], [], [], []];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (newGrid[i][j] !== 0) {
        pushArray[i].push(newGrid[i][j]);
      }
    }
  }

  //   console.log(pushArray);

  for (let i = 0; i < pushArray.length; i++) {
    const count = 4 - pushArray[i].length;
    for (let j = 0; j < count; j++) {
      pushArray[i].push(0);
    }
  }

  //   console.log(pushArray);
  newGrid = [[], [], [], []];
  for (let i = 0; i < pushArray.length; i++) {
    for (let j = 0; j < pushArray[i].length; j++) {
      newGrid[i].push(pushArray[j][i]);
    }
  }

  console.log(newGrid);
  grid = newGrid;
  console.log(grid);
  updateGrid();
};

const moveDown = () => {
    // Get each column
    // Grab all non-zeroes in each column
    // For each column, if non-zeroes < 4
    // map to new last column
    // concat required number of zeroes
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
    //   console.log(newGrid);
  
    let pushArray = [[], [], [], []];
  
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (newGrid[i][j] !== 0) {
          pushArray[i].push(newGrid[i][j]);
        }
      }
    }
  
    //   console.log(pushArray);
  
    for (let i = 0; i < pushArray.length; i++) {
      const count = 4 - pushArray[i].length;
      for (let j = 0; j < count; j++) {
        pushArray[i].push(0);
      }
    }
  
    //   console.log(pushArray);
    newGrid = [[], [], [], []];
    for (let i = 0; i < pushArray.length; i++) {
      for (let j = 0; j < pushArray[i].length; j++) {
        newGrid[i].push(pushArray[j][i]);
      }
    }
  
    console.log(newGrid);
    grid = newGrid;
    console.log(grid);
    updateGrid();
  };

// moveRight();

// moveLeft();

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

  //   console.log(grid);
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
        // gameContainer.children.item(i * 4 + j).className =
        //   "game-container__tile";
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
