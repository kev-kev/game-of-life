/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/
// 500x500 canvas
// 20 x 20 squares of 25 by 25 px
const SQUARE_SIZE = 25;

window.addEventListener('load', () => {
  const canvas = document.getElementById("myCanvas");
  window.ctx = canvas.getContext("2d");
  const game = (new Game());
  game.start([
    [9, 9],
    [10, 10],
    [10, 11],
    [11, 9],
    [11, 10]
  ]);
  
  // setTimout(() => {
  
// })
  setInterval(() => {
    game.tick();
  }, 1000);

//   game.tick();
//   game.tick();
//   game.tick();
//   game.tick();

  // game.tick();
});

// Start w/ a seed
// Tick every 2 seconds or something
class Game {
  // Create the data of the squares and then set it 
  constructor(){
    this.squares = [];
    this.squares_copy = [];
  }

  start(seedCoords) {
    seedCoords.forEach(coord => {
      const square = new Square(coord[0], coord[1]);
      this.squares.push(square);
      square.filled = true;
    });
    this.drawSquares();
    
    
    // our tester
    // const square = new Square(2, 2, window.ctx);
    // square.fill();
    // console.log(square.neighborCoords);
    // square.neighborCoords.forEach(coord => {
    //   const newSquare = new Square(coord[0], coord[1], window.ctx);
    //   newSquare.fill("pink");
    // });
  }
  
  shouldFillSquare(square) {
      const filledNeighbors = square.getFilledNeighbors();
      if (square.filled && (filledNeighbors === 2 || filledNeighbors === 3)) {
        // console.log("fill");
        return true;
      } else if (!square.filled && filledNeighbors === 3) {
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
       square.fill();
     }
   });
  }

  clearSquares() {
    this.squares.forEach(square => 
      square.clear()
    );
  }

  tick() {
    this.squares_copy = [];

    this.squares.forEach(square => {
      const copy = new Square(square.x, square.y);
      copy.filled = this.shouldFillSquare(square);
      this.squares_copy.push(copy);

      square.neighborCoords.forEach(coord => {
        const neighborCopy = new Square(coord[0], coord[1]);
        neighborCopy.filled = this.shouldFillSquare(neighborCopy);
        if (neighborCopy.filled) {
          this.squares_copy.push(neighborCopy);
        }
      });
    });

    console.log(this.squares_copy.length);
    // this.clearSquares();
    // this.squares = this.squares_copy;
    // this.drawSquares();
  }
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighborCoords = this.calculateNeighborCoords();
    this.filled = false;
  }

  fill(color = "pink") {
    window.ctx.fillStyle = color;
    window.ctx.fillRect(
      this.x * SQUARE_SIZE,
      this.y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
    this.filled = true;
  }
  
  clear() {
    window.ctx.clearRect(
      this.x * SQUARE_SIZE,
      this.y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
    this.filled = false;
  }
  
  getFilledNeighbors() {
    let count = 0;
    
    
//       const imageDataTenTen = window.ctx.getImageData(
//         250, 250, 1, 1,
//       );
      
//       console.log("Img Data for 10,10: " + JSON.stringify(imageDataTenTen));
      
    this.neighborCoords.forEach(coord => {
      if (this.isCoordinateFilled(coord[0], coord[1])) {
        count += 1;
      }
    });
    // console.log("Num of filled neighbors for square " + this.x + ", " + this.y + ": " + count);
    return count;
  }

  checkFilledNeighbors() {
    // iterate over this.neighbors to count
    // how many filled
    
    // return how many filled neighbors this square has
  }
  
  calculateNeighborCoords() {
    const neighborCoords = [];
    for(let y = this.y - 1; y < this.y + 2; y++) {
      for(let x = this.x - 1; x < this.x + 2; x++) {
        // skip if we're on the current square, or if x/y is negative
        if ((x === this.x && y === this.y) || x < 0 || y < 0) {
          continue;
        }
        neighborCoords.push([x, y]);
      }
    }
    return neighborCoords;
  }
  
  
  isCoordinateFilled(x, y) {
    const imageData = window.ctx.getImageData(
        x * SQUARE_SIZE,
        y * SQUARE_SIZE,
        1,
        1
    );
      
    return imageData["data"]["0"] > 0;
  }
}
