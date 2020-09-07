function Rocket(x, y, width, height, canv, img) {
  let ctx = canv.context;
  this.bullet = [];
  this.x = x ? x : 10;
  this.y = y ? y : 10;
  this.height = height ? height : 10;
  this.width = width ? width : 10;
  this.moveLeft = function (dist) {
    if (this.x > 0) this.x -= dist;
  };
  this.moveRight = function (dist) {
    if (this.x + this.width < canv.width) this.x += dist;
  };
  this.moveUp = function (dist) {
    if (this.y + this.height / 2 > 0) this.y -= dist;
    if (this.y + this.height / 2 < 0) this.y = -(this.height / 2);
  };
  this.moveDown = function (dist) {
    if (this.y + this.height / 2 < canv.height) this.y += dist;

    if (this.y + this.height / 2 > canv.height)
      this.y = canv.height - this.height / 2;
  };
  this.addBullet = function (x1, y1) {
    this.bullet.push({ x: x1, y: y1 });
  };
  this.drawRocket = function () {
    ctx.beginPath();
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
  this.drawBullet = function (tmp) {
    for (let i in this.bullet)
      if (this.bullet[i].x > canv.width) this.bullet.splice(i, 1);

    for (let i in this.bullet) {
      this.bullet[i].x += tmp;
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.bullet[i].x + this.width, this.bullet[i].y);
      ctx.lineTo(this.bullet[i].x + this.width + 15, this.bullet[i].y);
      ctx.stroke();
      ctx.closePath();
    }
  };
}
