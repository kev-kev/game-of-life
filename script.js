window.addEventListener("load", () => {
  const canvas = document.getElementById("myCanvas");
  window.ctx = canvas.getContext("2d");
  const game = new Game();
  game.start(SEED_GLIDER_GUN);
  game.start(SEED_PULSAR_LR);
  // game.start(SEED_CLOVER);
  // game.start(SEED_2);

  setInterval(() => game.tick(), 100);
});

class Game {
  constructor() {
    this.squares = [];
    this.squaresCopy = [];
  }

  start(seedCoords) {
    seedCoords.forEach((coord) => {
      const square = { x: coord[0], y: coord[1], filled: true };
      this.squares.push(square);
    });
    this.drawSquares();
  }

  shouldFillSquare(x, y, isFilled) {
    const filledNeighbors = getFilledNeighbors(x, y);
    if (isFilled && (filledNeighbors === 2 || filledNeighbors === 3)) {
      // console.log("fill");
      return true;
    } else if (!isFilled && filledNeighbors === 3) {
      // console.log("fill");
      return true;
    } else {
      // console.log("clear");
      return false;
    }
  }

  drawSquares() {
    this.squares.forEach((square) => {
      if (square.filled) {
        fillSquare(square.x, square.y);
      }
    });
  }

  clearSquares() {
    this.squares.forEach((square) => clearSquare(square.x, square.y));
  }

  tick() {
    this.squaresCopy = [];

    this.squares.forEach((square) => {
      const copy = { x: square.x, y: square.y, filled: false };
      copy.filled = this.shouldFillSquare(square.x, square.y, square.filled);
      if (copy.filled) {
        if (!containsSquareAlready(copy, this.squaresCopy)) {
          this.squaresCopy.push(copy);
        }
      }

      const neighborCoords = calculateNeighborCoords(square.x, square.y);
      neighborCoords.forEach((coord) => {
        const neighborCopy = { x: coord[0], y: coord[1], filled: false };
        neighborCopy.filled = this.shouldFillSquare(
          neighborCopy.x,
          neighborCopy.y,
          neighborCopy.filled
        );
        if (neighborCopy.filled) {
          if (!containsSquareAlready(neighborCopy, this.squaresCopy)) {
            this.squaresCopy.push(neighborCopy);
          }
        }
      });
    });

    this.clearSquares();
    this.squares = this.squaresCopy;
    this.drawSquares();
  }
}

const containsSquareAlready = (obj, squaresCopy) => {
  let contains = false;
  for (let i = 0; i < squaresCopy.length; i++) {
    if (squaresCopy[i].x === obj.x && squaresCopy[i].y === obj.y) {
      return true;
    }
  }
  return false;
};

const fillSquare = (x, y, color = "pink") => {
  window.ctx.fillStyle = color;
  window.ctx.fillRect(
    x * SQUARE_SIZE,
    y * SQUARE_SIZE,
    SQUARE_SIZE,
    SQUARE_SIZE
  );
};

const clearSquare = (x, y) => {
  window.ctx.clearRect(
    x * SQUARE_SIZE,
    y * SQUARE_SIZE,
    SQUARE_SIZE,
    SQUARE_SIZE
  );
  this.filled = false;
};

const getFilledNeighbors = (x, y) => {
  let count = 0;
  const neighborCoords = calculateNeighborCoords(x, y);

  neighborCoords.forEach((coord) => {
    if (isCoordinateFilled(coord[0], coord[1])) {
      count += 1;
    }
  });
  return count;
};

const calculateNeighborCoords = (squareX, squareY) => {
  const neighborCoords = [];
  for (let y = squareY - 1; y < squareY + 2; y++) {
    for (let x = squareX - 1; x < squareX + 2; x++) {
      // skip if we're on the current square, or if x/y is negative
      if ((x === squareX && y === squareY) || x < 0 || y < 0) {
        continue;
      }
      neighborCoords.push([x, y]);
    }
  }
  return neighborCoords;
};

const isCoordinateFilled = (x, y) => {
  const imageData = window.ctx.getImageData(
    x * SQUARE_SIZE,
    y * SQUARE_SIZE,
    1,
    1
  );

  return imageData["data"]["0"] > 0;
};

// CONSTANTS DEFINED BELOW

const SQUARE_SIZE = 10;
const SEED_2 = [
  [9, 9],
  [10, 10],
  [10, 11],
  [11, 9],
  [11, 10],
];

const SEED_CLOVER = [
  [4, 1],
  [6, 1],
  [2, 2],
  [3, 2],
  [4, 2],
  [6, 2],
  [7, 2],
  [8, 2],
  [1, 3],
  [5, 3],
  [9, 3],
  [1, 4],
  [3, 4],
  [7, 4],
  [9, 4],
  [2, 5],
  [3, 5],
  [5, 5],
  [7, 5],
  [8, 5],
  [2, 7],
  [3, 7],
  [5, 7],
  [7, 7],
  [8, 7],
  [1, 8],
  [3, 8],
  [7, 8],
  [9, 8],
  [1, 9],
  [5, 9],
  [9, 9],
  [2, 10],
  [3, 10],
  [4, 10],
  [6, 10],
  [7, 10],
  [8, 10],
  [4, 11],
  [6, 11],
];

const SEED_PULSAR = [
  [6, 8],
  [6, 9],
  [6, 10],
  [6, 14],
  [6, 15],
  [6, 16],
  [11, 16],
  [11, 8],
  [11, 9],
  [11, 10],
  [11, 14],
  [11, 15],
  [11, 16],
  [13, 8],
  [13, 9],
  [13, 10],
  [13, 14],
  [13, 15],
  [13, 16],
  [18, 8],
  [18, 9],
  [18, 10],
  [18, 14],
  [18, 15],
  [18, 16],

  [8, 6],
  [9, 6],
  [10, 6],
  [14, 6],
  [15, 6],
  [16, 6],

  [8, 11],
  [9, 11],
  [10, 11],
  [14, 11],
  [15, 11],
  [16, 11],

  [8, 13],
  [9, 13],
  [10, 13],
  [14, 13],
  [15, 13],
  [16, 13],

  [8, 18],
  [9, 18],
  [10, 18],
  [14, 18],
  [15, 18],
  [16, 18],
];

const SEED_PULSAR_LR = [];
SEED_PULSAR.forEach((coords) => {
  SEED_PULSAR_LR.push([coords[0] + 30, coords[1] + 30]);
});

const SEED_GLIDER_GUN = [
  [2, 6],
  [2, 7],
  [3, 6],
  [3, 7],

  [36, 4],
  [36, 5],
  [37, 4],
  [37, 5],

  [24, 3],
  [24, 7],
  [26, 2],
  [26, 3],
  [26, 7],
  [26, 8],
  [23, 4],
  [23, 5],
  [23, 6],
  [22, 4],
  [22, 5],
  [22, 6],

  [12, 6],
  [12, 7],
  [12, 8],
  [13, 5],
  [13, 9],
  [14, 4],
  [14, 10],
  [15, 4],
  [15, 10],
  [16, 7],
  [17, 5],
  [17, 9],
  [18, 6],
  [18, 7],
  [18, 8],
  [19, 7],
];
