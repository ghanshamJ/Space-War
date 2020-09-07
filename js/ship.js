function Ship(x, y, width, height, canv, dist, img) {
  this.bomb = [];
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
    if (this.y + this.height <= canv.height) this.y += this.distance;
  };
  this.drawShip = function () {
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.x - this.width,
      this.y,
      this.width,
      this.height
    );
    ctx.closePath();
  };
  this.addBomb = function (x1, y1) {
    this.bomb.push({ x: x1, y: y1 });
  };
  this.drawBomb = function (speed) {
    for (let i in this.bomb) if (this.bomb[i].x < 0) this.bomb.splice(i, 1);
    for (let i in this.bomb) {
      this.bomb[i].x -= speed;
      ctx.beginPath();
      ctx.fillStyle = "gold";
      ctx.arc(this.bomb[i].x, this.bomb[i].y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  };
}
