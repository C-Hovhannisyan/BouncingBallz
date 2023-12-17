class BouncingBall {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private balls: Ball[] = [];
	private maxBalls: number = 15;
	private groundLevel: number = window.innerHeight - 110; //A position on the canvas that represents the ground level. You can change it depending on your screen size

  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener('click', (event) => this.spawnBall(event));
    this.gameLoop();
  }

  spawnBall(event: MouseEvent) {
    if (this.balls.length < this.maxBalls) {
      const color = this.getRandomColor();
      const ball = new Ball(event.clientX, event.clientY-110, color);
      this.balls.push(ball);
    }
  }

	getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  gameLoop() {
    const deltaTime = 0.02; // You can adjust this value for smoother animation
    this.update(deltaTime);
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  update(deltaTime: number) {
    for (const ball of this.balls) {
      ball.update(deltaTime,this.groundLevel);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const ball of this.balls) {
      ball.draw(this.ctx);
    }
  }
}

class Ball {
  private x: number;
  private y: number;
  private radius: number;
  private velocityY: number = 0;     //Vertical velocity of the ball.
  private gravity: number = 0.5;    //Acceleration due to gravity.
  private dampening: number = 0.9; //Dampening factor to simulate loss of energy during bounces.
	color: string;
	

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = 20;
		this.color = color;
  }

  update(deltaTime: number, groundLevel: number) {
    this.velocityY += this.gravity * deltaTime;
    this.y += this.velocityY;

    if (this.y + this.radius > groundLevel) {
      this.y =groundLevel - this.radius;
      this.velocityY *= -this.dampening;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color; 
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
		ctx.shadowBlur = 5;
		ctx.fill();
    ctx.closePath();
  }
}

// Initialize the simulation
new BouncingBall();
