/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/
// 500x500 canvas
// 20 x 20 squares of 25 by 25 px
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const SQUARE_SIZE = 25;


// Start w/ a seed
// Tick every 2 seconds or something
class Game {
  constructor(){
    
  }
  
  start() {
    // fillSquare(0, 0);
    // fillSquare(475, 475);
  }
  
  tick() {
    
  }
}

class Square {
  // properties: int x, int y, bool filled
  // array neighbors (of Squares)
  fill() {
    ctx.fillRect(this.x, this.y, SQUARE_SIZE, SQUARE_SIZE);
  }
}

(new Game()).start();