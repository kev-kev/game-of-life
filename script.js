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
    // new Square() based off the seed
  }

  start() {
    // fillSquare(0, 0);
    // fillSquare(475, 475);
    (new Square(0, 0, this.ctx)).fill();
    console.log("in game", this.ctx);
  }
  
  tick() {
    // check for rules on the squares
  }
}

class Square {
  construct(x, y, ctx) {
    console.log("in square", ctx);
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }
  // properties: int x, int y, bool filled
  // array neighbors (of Squares)
  fill() {
    this.ctx.fillRect(this.x, this.y, SQUARE_SIZE, SQUARE_SIZE);
  }
  
  checkFilledNeighbors() {
    // iterate over this.neighbors to count
    // how many filled
    
    // return how many filled neighbors this square has
  }
}

window.addEventListener('load', () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  console.log(ctx);
  (new Game(ctx)).start();
});