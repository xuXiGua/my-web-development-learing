// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 计数段落
const para = document.querySelector('p');

// 获取浏览器视图的高宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
function randColor(){
  return 'rgb('+random(0, 255)+','+random(0,255)+','+random(0,255)+')';
}

function Shape(x, y, velX, velY, exist){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exist = exist;
}

// 声明球类的属性和方法，继承Shape类
function Ball(x, y, velX, velY, exist, color, size){
  Shape.call(this, x, y, velX, velY, exist);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;
// 在画布上画彩球
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}
// 更新彩球位置
Ball.prototype.update = function(){
  if((this.x + this.size) >= width){
    this.velX = -(this.velX);
  }
  if((this.x - this.size) <= 0){
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY; 
}
// 检测碰撞，若碰撞，则彩球变色
Ball.prototype.collisionDetect = function(){
  for(let i = 0; i < balls.length; i++){
    if(this != balls[i]){
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx**2+dy**2);
      if(distance < this.size+balls[i].size){
        balls[i].color = this.color = randColor();
      }
    }
  }
}

// 声明吸球圈的属性和方法，继承Shape类
function EvilCircle(x, y, exist){
  Shape.call(this, x, y, 20, 20, exist);
  this.color = 'white';
  this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
// 在画布上画吸球圈
EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.stroke();
}
// 检测吸球圈是否超出试图范围
EvilCircle.prototype.checkBounds = function(){
  if((this.x + this.size) >= width){
    this.x = width - this.size;
  }
  if((this.x - this.size) <= 0){
    this.x = this.size;
  }
  if ((this.y + this.size) >= height) {
    this.y = height - this.size;
  }
  if ((this.y - this.size) <= 0) {
    this.y = this.size;
  }
}
// 设置键盘控制按键
EvilCircle.prototype.setControls = function(){
  window.onkeydown = e => {                                         //箭头函数
    switch(e.key){
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velX;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  };
}
// 检测碰撞，若与彩球碰撞，则彩球不存在
EvilCircle.prototype.collisionDetect = function(){
  for(let i = 0; i < balls.length; i++){
    if(balls[i].exist === true){
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx**2+dy**2);
      if(distance < this.size+balls[i].size){
        balls[i].exist = false;
      }
    }
  }
}

// 生成彩球实例数组
let balls = [];
while(balls.length < 10){
  let size = random(10, 20);
  let ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randColor(),
    size
  );
  balls.push(ball);
}

// 生成吸球圈实例，并设置键盘控制
const evilcir = new EvilCircle(10, 10, true);
evilcir.setControls();

// 显示屏幕上还存在多少个球
function countBalls(){
  let count = 0;
  for(let i=0;i<balls.length;i++){
    if(balls[i].exist){
      count++;
    }
  }
  para.textContent = "剩余彩球数："+count;
}

// 每个循环要进行的处理
function loop(){
  // 画布填充颜色，以挡住之前画的彩球，透明可以一定的运动轨迹
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  for(let i = 0; i < balls.length; i++){
    if(balls[i].exist){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  evilcir.draw();
  evilcir.checkBounds();
  evilcir.collisionDetect();
  countBalls();
  // 函数循环
  requestAnimationFrame(loop);
}

loop();