/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/
// 500x500 canvas
// 25 x 25 squares of 20 by 20 px
const SQUARE_SIZE = 20;
const SEED_2 = [
    [9, 9],
    [10, 10],
    [10, 11],
    [11, 9],
    [11, 10]
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

window.addEventListener('load', () => {
  const canvas = document.getElementById("myCanvas");
  window.ctx = canvas.getContext("2d");
  const game = (new Game());
  game.start(SEED_PULSAR);

  setInterval(() => game.tick(), 200);
});

class Game {
  constructor(){
    this.squares = [];
    this.squaresCopy = [];
  }

  start(seedCoords) {
    seedCoords.forEach(coord => {
      const square = {x: coord[0], y: coord[1], filled: true};
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
   this.squares.forEach(square => {
     if(square.filled) {
       fillSquare(square.x, square.y);
     }
   });
  }

  clearSquares() {
    this.squares.forEach(square => 
      clearSquare(square.x, square.y)
    );
  }

  tick() {
    this.squaresCopy = [];

    this.squares.forEach(square => {
      const copy = {x: square.x, y: square.y, filled: false};
      copy.filled = this.shouldFillSquare(square.x, square.y, square.filled);
      if (copy.filled) {
        if (!containsSquareAlready(copy, this.squaresCopy)) {
          this.squaresCopy.push(copy);
        }
      }

      const neighborCoords = calculateNeighborCoords(square.x, square.y);
      neighborCoords.forEach(coord => {
        const neighborCopy = {x: coord[0], y: coord[1], filled: false};
        neighborCopy.filled = this.shouldFillSquare(neighborCopy.x, neighborCopy.y, neighborCopy.filled);
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
//     squaresCopy.forEach(square => {
//       if (square.x === obj.x && square.y == obj.y) {
//         contains = true;
//       }
      
//     });
    
    for (let i = 0; i < squaresCopy.length; i++) {
      if (squaresCo)
    }
    return contains;
  }

  const fillSquare = (x, y, color = "pink") => {
    window.ctx.fillStyle = color;
    window.ctx.fillRect(
      x * SQUARE_SIZE,
      y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
  }
  
  const clearSquare = (x, y) => {
    window.ctx.clearRect(
      x * SQUARE_SIZE,
      y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
    this.filled = false;
  }
  
  const getFilledNeighbors = (x, y) => {
    let count = 0;
    const neighborCoords = calculateNeighborCoords(x, y);
    
    neighborCoords.forEach(coord => {
      if (isCoordinateFilled(coord[0], coord[1])) {
        count += 1;
      }
    });
    return count;
  }

  const calculateNeighborCoords = (squareX, squareY) => {
    const neighborCoords = [];
    for(let y = squareY - 1; y < squareY + 2; y++) {
      for(let x = squareX - 1; x < squareX + 2; x++) {
        // skip if we're on the current square, or if x/y is negative
        if ((x === squareX && y === squareY) || x < 0 || y < 0) {
          continue;
        }
        neighborCoords.push([x, y]);
      }
    }
    return neighborCoords;
  }
  
  
  const isCoordinateFilled = (x, y) => {
    const imageData = window.ctx.getImageData(
        x * SQUARE_SIZE,
        y * SQUARE_SIZE,
        1,
        1
    );
      
    return imageData["data"]["0"] > 0;
  }
