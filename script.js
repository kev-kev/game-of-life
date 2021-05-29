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

  // for(let i = 0 ; i < 4; i++ ) {
  //   game.tick();
  // }
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
      const square = {x: coord[0], y: coord[1], coord: coord, filled: true};
      this.squares.push(square);
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
    console.log("Start of tick: ", this.squaresCopy.length);

    this.squares.forEach(square => {
      const copy = {x: square.x, y: square.y, coord: [square.x, square.y], filled: false};
      copy.filled = this.shouldFillSquare(square.x, square.y, square.filled);
      if (copy.filled) {
        this.squaresCopy.push(copy);
      }

      const neighborCoords = calculateNeighborCoords(square.x, square.y);
      neighborCoords.forEach(coord => {
        const neighborCopy = {x: coord[0], y: coord[1], coord: coord, filled: false};
        neighborCopy.filled = this.shouldFillSquare(neighborCopy.x, neighborCopy.y, neighborCopy.filled);
        if (neighborCopy.filled) {
          this.squaresCopy.push(neighborCopy);
        }
      });
    });
    

    // Get unique squaresCopy
    
    this.squaresCopy = [... new Set(this.squaresCopy.map(square => square.coord))];
    console.log("End of tick: "  + this.squaresCopy.length);
    console.log(this.squares.length);
    this.clearSquares();
    this.squares = this.squaresCopy;
    this.drawSquares();
  }
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
    
    
//       const imageDataTenTen = window.ctx.getImageData(
//         250, 250, 1, 1,
//       );
      
//       console.log("Img Data for 10,10: " + JSON.stringify(imageDataTenTen));
      
    const neighborCoords = calculateNeighborCoords(x, y);
    neighborCoords.forEach(coord => {
      if (isCoordinateFilled(coord[0], coord[1])) {
        count += 1;
      }
    });
    // console.log("Num of filled neighbors for square " + this.x + ", " + this.y + ": " + count);
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
