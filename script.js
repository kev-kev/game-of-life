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
    [9, 10],
    [10, 10],
    [11, 10]
  ]);
  
  // setInterval(() => {
  //   game.tick();
  // }, 1000);
  
  // game.tick();

});

// Start w/ a seed
// Tick every 2 seconds or something
class Game {
  // Create the data of the squares and then set it 
  constructor(){
    this.squares = [];
  }

  start(seedCoords) {
    seedCoords.forEach(coord => {
      const square = new Square(coord[0], coord[1], window.ctx);
      square.fill();
      this.squares.push(square);
    });
    
    
    // our tester
    // const square = new Square(2, 2, window.ctx);
    // square.fill();
    // console.log(square.neighborCoords);
    // square.neighborCoords.forEach(coord => {
    //   const newSquare = new Square(coord[0], coord[1], window.ctx);
    //   newSquare.fill("pink");
    // });
  }

  tick() {
    console.log("ticking");
    console.log(this.squares);
    // check for rules on the squares
    // copy this.squares- iterate through this.squares changing filled state in the copy. 
    // then overwrite this.squares with the copy   
    const squares = this.squares
    this.squares.forEach(square => {
      const filledNeighbors = square.getFilledNeighbors();
      console.log(square.filled, "filled");
      console.log(filledNeighbors, "neighbors");
      if (square.filled && (filledNeighbors === 2 || filledNeighbors === 3)) {
        console.log("survive");
        // survives
      } else if (!square.filled && filledNeighbors === 3) {
        console.log("fill");
        square.fill();
      } else {
        console.log("clear");
        square.clear();
      }
    });
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
      
//       console.log("Checking ", 
//         coord[0]
//                   + ", " +
//         coord[1]);
    
      const imageData = window.ctx.getImageData(
        coord[0] * SQUARE_SIZE,
        coord[1] * SQUARE_SIZE,
        1,
        1
      );
      
      if (imageData["data"]["0"] > 0) {
        count += 1;
      }
    })
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
}
