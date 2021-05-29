/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/
// 500x500 canvas
// 20 x 20 squares of 25 by 25 px
const SQUARE_SIZE = 25;
const SEED_2 = [
    [9, 9],
    [10, 10],
    [10, 11],
    [11, 9],
    [11, 10]
  ];
const SEED_PULSAR = [
  []
];

window.addEventListener('load', () => {
  const canvas = document.getElementById("myCanvas");
  window.ctx = canvas.getContext("2d");
  const game = (new Game());
  game.start(SEED_2);
  
  // setTimout(() => {
  
// })
  setInterval(() => {
    game.tick();
  }, 1000);

//   game.tick();
//   game.tick();
//   game.tick();
//   game.tick();

//   for(let i = 0 ; i < 2; i++ ) {
//     game.tick();
//   }
});

// Start w/ a seed
// Tick every 2 seconds or something
class Game {
  // Create the data of the squares and then set it 
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
    squaresCopy.forEach(square => {
      // console.log("Comparing: ", JSON.stringify(obj), JSON.stringify(square));
      if (square.x === obj.x && square.y == obj.y) {
        contains = true;
      }
    });
    // contains === false ? console.log("me falsey") : console.log("me truthy");
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
