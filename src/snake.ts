import * as Settings from "./settings";

export class Snake {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private dir: string = 'Right';
  private prevDir: string = 'Right';
  private cellWidth: number;
  private cellHeight: number;
  private updateFrame: number = 0;
  private snake:number[][] = [];
  private head:number[] = [];
  private tail:number[] = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    this.cellWidth = canvasWidth / Settings.board.dimX;
    this.cellHeight = canvasHeight / Settings.board.dimY;
    this.x = 0;
    this.y = 0;
    this.snake = [ [0,0], [1,0], [2,0] ]
    this.head = this.snake[this.snake.length - 1] //last item
    this.tail = this.snake[0]

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          
        if (this.prevDir !== "Up"){
          this.dir = "Down"
          this.prevDir = this.dir;
        }
        break;

        case "Up": // IE/Edge specific value
        case "ArrowUp":

        if (this.prevDir !== "Down") {
          this.dir = "Up"
          this.prevDir = this.dir;
        }
        break;
        
        case "Right": // IE/Edge specific value
        case "ArrowRight":

          if (this.prevDir !== "Left") {
            this.dir = "Right"
            this.prevDir = this.dir;
          }
        break;
          
        case "Left": // IE/Edge specific value
        case "ArrowLeft":

        if (this.prevDir !== "Right") {
          this.dir = "Left"
          this.prevDir = this.dir;
        }
        break;

          // case "Enter":
        //   // Do something for "enter" or "return" key press.
        //   break;
        // case "Esc": // IE/Edge specific value
        // case "Escape":
        //   // Do something for "esc" key press.
        //   break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    })
  }


  draw() {
    for (let i = 0; i < this.snake.length ; i++) {
      this.ctx.fillStyle = "#ff0000";
      this.ctx.fillRect(
        this.snake[i][0] * this.cellWidth, //x
        this.snake[i][1] * this.cellHeight, //y
        30,
        30
      );
    }
  }

  update() {
    this.updateFrame++;

    if (this.updateFrame % 10 === 0) {
      switch (this.dir) {
        case "Down":
          if (this.prevDir !== "Up"){
            this.tail = this.snake.shift(); //remove tail
            this.tail[0] = this.head[0]; //reassign tail coords
            this.tail[1] = this.head[1] + 1; 
            this.snake.push(this.tail); //add tail to front
            this.head = this.snake[this.snake.length - 1]; //change head coords to the new tail/head
          }
          break;
          
        case "Up": 
          if (this.prevDir !== "Down") {          
            this.tail = this.snake.shift(); //remove tail
            this.tail[0] = this.head[0]; //reassign tail coords
            this.tail[1] = this.head[1] - 1;
            this.snake.push(this.tail); //add tail to front
            this.head = this.snake[this.snake.length - 1]; //change head coords to the new tail/head
          }
          break;

        case "Left": 
          if (this.prevDir !== "Right") {
            this.tail = this.snake.shift(); //remove tail
            this.tail[0] = this.head[0] - 1; //reassign tail coords
            this.tail[1] = this.head[1];
            this.snake.push(this.tail); //add tail to front
            this.head = this.snake[this.snake.length - 1]; //change head coords to the new tail/head
          }
          break;

        case "Right": 
          if (this.prevDir !== "Left") {
            this.tail = this.snake.shift(); //remove tail
            this.tail[0] = this.head[0] + 1; //reassign tail coords
            this.tail[1] = this.head[1];
            this.snake.push(this.tail); //add tail to front
            this.head = this.snake[this.snake.length - 1]; //change head coords to the new tail/head
          }
          break;

        default:
          return;
      } 
      if (this.head[0] >= Settings.board.dimX ) this.head[0] = 0; //right bound
      if (this.head[0] < 0) this.head[0] = Settings.board.dimX - 1; //left bound 

      if (this.head[1] >= Settings.board.dimY) this.head[1] = 0; //bottom bound
      if (this.head[1] < 0) this.head[1] = Settings.board.dimY; //top bound
    }
  }
}