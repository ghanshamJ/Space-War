function Stage(lvl, context1, compSize, img_ship, img_obstacle) {
  this.obstacles = [];
  this.ships = [];
  this.bomb = [];
  this.spaceContent = [];
  this.spaceContent[0] = new SpaceContents(context1);

  this.ships.push(
    new Ship(
      context1.width,
      context1.height / 2,
      compSize * 4,
      compSize * 3,
      context1,
      30,
      img_ship
    )
  );

  //*****************************************obstacles******************************************************** */
  this.addObstacles = function (move) {
    function img() {
      return img_obstacle[parseInt(Math.random() * img_obstacle.length)];
    }

    this.obstacles.push(
      new Obstacle(
        context1.width,
        Math.random() * (context1.height - 50) + 20,
        compSize * 2,
        compSize * 2,
        context1,
        move,
        img()
      )
    );
  };
  //*************************************************************************************************************************************
  this.drawObstacles = function () {
    for (let i in this.obstacles) {
      this.obstacles[i].drawObstacle();
      this.obstacles[i].moveLeft();
    }
  };
  //******************spaceContent*************************************************************************************
  this.drawSpaceContent = function () {
    for (i in this.spaceContent) {
      this.spaceContent[i].drawStar(20, 30);
      this.spaceContent[i].moveStar(10);
    }
  };
  //************************************draw stage************************************************************* */
  this.drawStage = function () {
    this.drawSpaceContent();
    this.drawObstacles();
    this.drawShip();
  };
  //************************************ship**************************************************/
  for (let i in this.ships) {
    this.bomb = this.ships[i].bomb;
  }

  //*******************************************
  this.drawShip = function () {
    let speed = 20;
    for (let i in this.ships) {
      this.ships[i].drawBomb(speed);
      this.ships[i].drawShip();
    }
  };
  //**************************************************************************************/
}
