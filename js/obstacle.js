function Obstacle(x, y, height, width, canv, dist, img) {
  let ctx = canv.context;
  this.x = x ? x : 10;
  this.y = y ? y : 10;
  this.height = height ? height : 10;
  this.width = width ? width : 10;
  this.distance = dist ? dist : 10;
  this.img = img;
  this.moveLeft = function () {
    if (this.x <= canv.width) this.x -= this.distance;
  };
  this.moveRight = function () {
    if (this.x >= canv.width) this.x += this.distance;
  };
  this.moveUp = function () {
    if (this.y >= 0) this.y -= this.distance;
  };
  this.moveDown = function () {
    if (this.y <= canv.height) this.y += this.distance;
  };
  this.drawObstacle = function () {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
}
