/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/
// 500x500 canvas
// 20 x 20 squares of 25 by 25 px
const SQUARE_SIZE = 25;

// Start w/ a seed
// Tick every 2 seconds or something
class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.squares = {};
    // new Square() based off the seed
    
  }

  start() {
    for(let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        
      }
    }
    
    // fillSquare(0, 0);
    // fillSquare(475, 475);
    // original
    (new Square(2, 2, this.ctx)).fill();
    
    // neighbors
    (new Square(1, 1, this.ctx)).fill("pink");
    (new Square(1, 3, this.ctx)).fill("pink");
    (new Square(3, 1, this.ctx)).fill("pink");
    (new Square(3, 3, this.ctx)).fill("pink");
    
    (new Square(1, 2, this.ctx)).fill("hotpink");
    (new Square(2, 1, this.ctx)).fill("hotpink");
    (new Square(2, 3, this.ctx)).fill("hotpink");
    (new Square(3, 2, this.ctx)).fill("hotpink").clear();
  }
  
  getSquare(x, y) {
    // returns the Square at x y
  }
  
  tick() {
    // check for rules on the squares
  }
}

class Square {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.neighborCoords = this.getNeighbors();
    this.ctx = ctx;
  }
  // properties: int x, int y, bool filled
  // array neighbors (of Squares)
  fill(color = "#000") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.x * SQUARE_SIZE,
      this.y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
  }
  
  clear() {
    this.ctx.clearRect(
      this.x * SQUARE_SIZE,
      this.y * SQUARE_SIZE,
      SQUARE_SIZE
    );
  }

  checkFilledNeighbors() {
    // iterate over this.neighbors to count
    // how many filled
    
    // return how many filled neighbors this square has
  }
  
  getNeighbors() {
    this.neighborCoords = [];
    
    for(let y = this.y - 1; y < y + 2; y ++) {
      for(let x = this.x - 1; x < x + 2; x++) {
        if (x == this.x && y == this.y) {
          continue
        }
        if (x <)
      }
    }
  }
}

window.addEventListener('load', () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  console.log("test", ctx);
  (new Game(ctx)).start();
});