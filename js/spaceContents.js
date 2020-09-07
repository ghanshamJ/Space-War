function SpaceContents(canv) {
  let ctx = canv.context;
  this.star = [];
  let tmp = 0;
  while (tmp < 200) {
    this.star.push({
      x: Math.random() * canv.width,
      y: Math.random() * canv.height,
    });
    tmp += 1;
  }

  this.moveStar = function (dist) {
    for (let i in this.star) {
      if (this.star[i].x < 0) {
        this.star[i].x = canv.width;
        this.star[i].y = Math.random() * canv.height;
      }
      this.star[i].x -= dist ? dist : 3;
    }
  };

  this.drawStar = function (height, width) {
    for (let i in this.star) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      if (i & (0 === 0)) {
        ctx.font = "20 Arial";
        ctx.fillText(".", this.star[i].x, this.star[i].y, height, width);
      } else {
        ctx.font = "10px Arial";
        ctx.fillText("*", this.star[i].x, this.star[i].y, height, width);
      }

      ctx.fill();
      ctx.closePath();
    }
  };
}
