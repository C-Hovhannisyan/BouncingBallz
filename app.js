var BouncingBall = /** @class */ (function () {
    function BouncingBall() {
        this.balls = [];
        this.maxBalls = 15;
        this.groundLevel = window.innerHeight - 110; //A position on the canvas that represents the ground level. You can change it depending on your screen size
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    BouncingBall.prototype.init = function () {
        var _this = this;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('click', function (event) { return _this.spawnBall(event); });
        this.gameLoop();
    };
    BouncingBall.prototype.spawnBall = function (event) {
        if (this.balls.length < this.maxBalls) {
            var color = this.getRandomColor();
            var ball = new Ball(event.clientX, event.clientY - 110, color);
            this.balls.push(ball);
        }
    };
    BouncingBall.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    BouncingBall.prototype.gameLoop = function () {
        var _this = this;
        var deltaTime = 0.02; // You can adjust this value for smoother animation
        this.update(deltaTime);
        this.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    BouncingBall.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.update(deltaTime, this.groundLevel);
        }
    };
    BouncingBall.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.draw(this.ctx);
        }
    };
    return BouncingBall;
}());
var Ball = /** @class */ (function () {
    function Ball(x, y, color) {
        this.velocityY = 0; //Vertical velocity of the ball.
        this.gravity = 0.5; //Acceleration due to gravity.
        this.dampening = 0.9; //Dampening factor to simulate loss of energy during bounces.
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.color = color;
    }
    Ball.prototype.update = function (deltaTime, groundLevel) {
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY;
        if (this.y + this.radius > groundLevel) {
            this.y = groundLevel - this.radius;
            this.velocityY *= -this.dampening;
        }
    };
    Ball.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.closePath();
    };
    return Ball;
}());
// Initialize the simulation
new BouncingBall();
