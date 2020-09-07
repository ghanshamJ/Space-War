let div1;
let canv;
let imageRocket;
let imageBlast;
let imageObstacle1;
let imageObstacle2;
let imageObstacle3;
let imageship1;
let audioFire;
let audioBackground;
let audioDestroy;
function init() {
  imageRocket = document.getElementById("rocket");
  imageBlast = document.getElementById("blast");
  imageObstacle1 = document.getElementById("obstacle");
  imageObstacle2 = document.getElementById("obstacle2");
  imageObstacle3 = document.getElementById("obstacle3");
  imageship1 = document.getElementById("mothership2");
  audioFire = document.getElementById("gunshot");
  audioBackground = document.getElementById("backgroundAudio");
  audioDestroy = document.getElementById("destroy");

  canv = document.getElementById("myCanvas");
  div1 = document.getElementsByClassName("div1");

  div1[0].style.display = "none";
  canv.style.display = "block";

  if (window.innerHeight > window.innerWidth) {
    canv.width = window.innerWidth;
    canv.height = window.innerWidth;
  } else {
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
  }
  play(1, canv);
}
//*************************** start the game*******************************************************/
function play(level, canv) {
  let compSize = (canv.height / 100) * 5; //size for set the height and width of game components for responsive to different devices

  //********************************instantiate the game objects******************************************************/
  const context1 = new Canvas(canv);
  let rocket1 = new Rocket(
    0,
    context1.height / 2,
    compSize * 3,
    compSize * 1.5,
    context1,
    imageRocket
  );
  let img = [imageObstacle1, imageObstacle2, imageObstacle3];
  let stages = new Stage(level, context1, compSize, imageship1, img);
  let speed = 1000 / level;
  let addObstacles = setInterval(function () {
    stages.addObstacles(level * 10 * 2);
  }, speed * 2);
  let shipUp;
  let shipDown;
  let flag = true;

  let moveShip = setInterval(function () {
    if (flag) {
      // alert("yes");
      shipUp = setInterval(function () {
        for (let i in stages.ships) {
          stages.ships[i].moveUp();
        }
      }, 1000);
      clearInterval(shipDown);
      flag = false;
    } else {
      // alert("no");
      shipDown = setInterval(function () {
        for (let i in stages.ships) {
          stages.ships[i].moveDown();
          stages.ships[i].addBomb(
            stages.ships[i].x - stages.ships[i].width,
            stages.ships[i].y + stages.ships[i].height / 2
          );
        }
      }, 1000);
      clearInterval(shipUp);
      flag = true;
    }
  }, 10000);

  //**************************variables************************************************************/

  let score = 0;
  let lives = 5;

  let btnUpPress = false;
  let btnDownPress = false;
  let btnLeftPress = false;
  let btnRightPress = false;
  let rocketMoveSpeed = 10;

  let animate = setInterval(animation, 150);
  soundBackground();

  //**********************************event listeners in the game on user actions ****************************************************/
  document.addEventListener("keypress", keyPressHandler);
  document.addEventListener("keydown", keyDownHandler);
  canv.addEventListener("touch", btn_Game_Controller);
  canv.addEventListener("click", btn_Game_Controller);
  //canv.addEventListener("mousemove", moveRocket_with_Mouse);

  window.addEventListener("blur", function () {});
  window.addEventListener("focus", function () {});
  //***********************************add Buttons on canvas for game control***************************************************/
  let btnMiddle = new Button(
    compSize * 2,
    canv.height - compSize * 4,
    compSize * 2,
    compSize * 2,
    "",
    "blue",
    ""
  );
  let btnLeft = new Button(
    0,
    canv.height - compSize * 4,
    compSize * 2,
    compSize * 2,
    "",
    "gray",
    ""
  );
  let btnRight = new Button(
    compSize * 4,
    canv.height - compSize * 4,
    compSize * 2,
    compSize * 2,
    "",
    "gray",
    ""
  );
  let btnUp = new Button(
    compSize * 2,
    canv.height - compSize * 6,
    compSize * 2,
    compSize * 2,
    "",
    "gray",
    ""
  );
  let btnDown = new Button(
    compSize * 2,
    canv.height - compSize * 2,
    compSize * 2,
    compSize * 2,
    "",
    "gray",
    ""
  );
  let btnFire = new Button(
    canv.width / 2,
    canv.height - compSize * 3,
    compSize * 3,
    compSize * 3,
    "f",
    "gray",
    "yellow"
  );
  //************************************move the roket on mouse move event**************************************************/
  function moveRocket_with_Mouse(evt) {
    let pos = gameController1.getMousePos(canv, evt);
    rocket1.x = pos.x;
    rocket1.y = pos.y;
  }
  //************************************canv_ButtonController event on controller Buttons  to move the rocket with given distance, fire bullet and pause game**************************************************/
  function btn_Game_Controller(event) {
    btnLeft.bgColor = btnLeft === true ? "blue" : "gray";
    btnDown.bgColor = btnLeft === true ? "blue" : "gray";
    btnUp.bgColor = btnLeft === true ? "blue" : "gray";
    btnRight.bgColor = btnLeft === true ? "blue" : "gray";
    btnFire.bgColor = btnLeft === true ? "red" : "gray";

    if (btnDown.isInside(canv, event)) {
      rocketMoveSpeed = btnDownPress ? rocketMoveSpeed + 5 : 5;
      btnDownPress = true;
      btnRightPress = btnUpPress = btnLeftPress = false;
      btnDown.bgColor = "blue";
    }
    if (btnUp.isInside(canv, event)) {
      rocketMoveSpeed = btnUpPress ? rocketMoveSpeed + 5 : 5;
      btnUpPress = true;
      btnRightPress = btnLeftPress = btnDownPress = false;
      btnUp.bgColor = "blue";
    }
    if (btnLeft.isInside(canv, event)) {
      rocketMoveSpeed = btnLeftPress ? rocketMoveSpeed + 5 : 5;
      btnLeftPress = true;
      btnRightPress = btnUpPress = btnDownPress = false;
      btnLeft.bgColor = "blue";
    }
    if (btnRight.isInside(canv, event)) {
      rocketMoveSpeed = btnRightPress ? rocketMoveSpeed + 5 : 5;
      btnRightPress = true;
      btnLeftPress = btnUpPress = btnDownPress = false;
      btnRight.bgColor = "blue";
    }
    if (btnMiddle.isInside(canv, event)) {
      btnRightPress = btnLeftPress = btnUpPress = btnDownPress = false;
    }
    if (btnFire.isInside(canv, event)) {
      soundFiring();
      rocket1.addBullet(rocket1.x, rocket1.y + rocket1.height / 2);
      btnFire.bgColor = "red";
    }
  }
  //************************************draw game controller butons  **************************************************/
  function draw_Buttons() {
    btnDown.drawButton(context1.context);
    btnUp.drawButton(context1.context);
    btnLeft.drawButton(context1.context);
    btnRight.drawButton(context1.context);
    btnFire.drawButton(context1.context);
    btnMiddle.drawButton(context1.context);
  }
  //************************************animate the game**************************************************/
  function animation() {
    context1.context.clearRect(0, 0, context1.width, context1.height);
    rocket1.drawBullet(20);
    draw_Buttons();
    rocket1.drawRocket();
    stages.drawStage();
    collision();
    moveRocket(rocketMoveSpeed);
  }
  //********************************** keyboard keypress event to move rocket, pause game and fire bullet ****************************************************/
  function keyPressHandler(e) {
    if (e.which === 117) rocket1.moveUp(10);
    if (e.which === 100) rocket1.moveDown(10);
    if (e.which === 114) rocket1.moveRight(10);
    if (e.which === 108) rocket1.moveLeft(10);
    if (e.which === 32) {
      soundFiring();
      rocket1.addBullet(rocket1.x, rocket1.y + rocket1.height / 2);
    }
    if (e.which === 48) {
      clearInterval(animate);
    }
    if (e.which === 49) {
      clearInterval(animate);
      animate = setInterval(animation, 100);
    }
  }
  //************************************move rocket on keyboard keydown event**************************************************/
  function keyDownHandler(e) {
    switch (e.key) {
      case "ArrowUp":
        rocket1.moveUp(10);
        break;
      case "ArrowDown":
        rocket1.moveDown(10);
        break;
      case "ArrowRight":
        rocket1.moveRight(10);
        break;
      case "ArrowLeft":
        rocket1.moveLeft(10);
        break;
    }
  }

  //**************************************play sound when rocket fire bullets************************************************/
  function soundFiring() {
    audioFire.currentTime = 0;
    audioFire.play();
    audioFire.addEventListener(
      "timeupdate",
      function () {
        if (audioFire.currentTime >= 0.5) {
          audioFire.pause();
        }
      },
      false
    );
  }
  //***********************************play sound when collision happened ***************************************************/
  function soundDestroy() {
    audioDestroy.currentTime = 0;
    audioDestroy.play();
    audioDestroy.addEventListener(
      "timeupdate",
      function () {
        if (audioDestroy.currentTime >= 0.5) {
          audioDestroy.pause();
        }
      },
      false
    );
  }
  //************************************play game background sound **************************************************/
  function soundBackground() {
    audioBackground.currentTime = 5;
    audioBackground.play();
    audioBackground.addEventListener(
      "timeupdate",
      function () {
        if (audioBackground.currentTime >= 10) {
          audioBackground.currentTime = 5;
        }
      },
      false
    );
  }
  //***************************************draw blast when collision happened ***********************************************/
  function drawBlast(iamge, x, y, width, height) {
    context1.context.beginPath();
    context1.context.drawImage(iamge, x, y, width, height);
    context1.context.closePath();
  }
  //*******************************check the stages.obstacles are outside the canvas on left side *******************************************************/
  function isObstacle_Clash_leftofWindow() {
    for (let j in stages.obstacles)
      if (stages.obstacles[j].x <= -stages.obstacles[j].width) {
        stages.obstacles.splice(j, 1);
      }
  }
  //********************************check  bullet shut to obstacle******************************************************/
  function isBullet_Clash_obstacle() {
    for (let j in stages.obstacles) {
      for (let i in rocket1.bullet) {
        if (
          rocket1.bullet[i].y >= stages.obstacles[j].y &&
          rocket1.bullet[i].y <=
            stages.obstacles[j].y + stages.obstacles[j].height &&
          rocket1.bullet[i].x + 40 >= stages.obstacles[j].x &&
          rocket1.bullet[i].x <= stages.obstacles[j].x
        ) {
          soundDestroy();
          drawBlast(
            imageBlast,
            stages.obstacles[j].x + 10,
            stages.obstacles[j].y,
            stages.obstacles[j].width + 20,
            stages.obstacles[j].height + 20
          );
          stages.obstacles[j].x = -100;
          rocket1.bullet[i].x = context1.width + 10;
          score += 10;
        }
      }
    }
  }
  //********************************check  bullet shut to ship******************************************************/
  let shipLive = 200;
  function isBullet_Clash_Ship() {
    for (let j in stages.ships) {
      for (let i in rocket1.bullet) {
        if (
          rocket1.bullet[i].y >= stages.ships[j].y &&
          rocket1.bullet[i].y <= stages.ships[j].y + stages.ships[j].height &&
          rocket1.bullet[i].x + 40 >= stages.ships[j].x &&
          rocket1.bullet[i].x <= stages.ships[j].x
        ) {
          rocket1.bullet[i].x = context1.width + 10;
          score += 10;
          if (shipLive <= 0) {
            soundDestroy();
            drawBlast(
              imageBlast,
              stages.ships[j].x + 10,
              stages.ships[j].y,
              stages.ships[j].width + 20,
              stages.ships[j].height + 20
            );
            stages.ships.pop();
            score += 100;
          }
          shipLive -= 1;
        }
      }
    }
  }
  //***************************************check  rocket clash with obstacle***********************************************/
  function isRocket_Clash_obstacle() {
    for (let j in stages.obstacles) {
      if (
        stages.obstacles[j].x - rocket1.width / 1.2 <= rocket1.x &&
        stages.obstacles[j].x >= rocket1.x &&
        stages.obstacles[j].y >= rocket1.y - rocket1.height &&
        stages.obstacles[j].y <= rocket1.y + rocket1.height
      ) {
        stages.obstacles[j].x = -200;
        soundDestroy();
        drawBlast(
          imageBlast,
          rocket1.x,
          rocket1.y - 10,
          rocket1.width + 10,
          rocket1.height + 10
        );
        rocket1.x = 0;
        lives -= 1;
      }
    }
  }
  //***************************************check  rocket clash with obstacle***********************************************/
  function isRocket_Clash_Bomb() {
    for (let i in stages.bomb) {
      if (
        stages.bomb[i].y >= rocket1.y &&
        stages.bomb[i].y <= rocket1.y + rocket1.height &&
        stages.bomb[i].x - rocket1.width <= rocket1.x &&
        stages.bomb[i].x >= rocket1.x
      ) {
        stages.bomb[i].x = -200;
        soundDestroy();
        drawBlast(
          imageBlast,
          rocket1.x,
          rocket1.y - 10,
          rocket1.width + 10,
          rocket1.height + 10
        );
        rocket1.x = 0;
        lives -= 1;
      }
    }
  }
  //***********************************monitors the collision in  the game ***************************************************/
  function collision() {
    isObstacle_Clash_leftofWindow();
    isBullet_Clash_obstacle();
    isRocket_Clash_obstacle();
    if (lives <= 0) {
      endGame();
    }
    draw_Score_Lives();
    isRocket_Clash_Bomb();
    isBullet_Clash_Ship();
  }
  //***********************************monitors the collision in  the game ***************************************************/
  function endGame() {
    clearInterval(animate);

    audioBackground.pause();
    alert(`Game over ! Your Score: ${score}`);

    canv.style.display = "none";
    div1[0].style.display = "block";
  }
  //**************************************draw the score on canvas************************************************/
  function draw_Score_Lives() {
    context1.context.beginPath();
    context1.context.font = compSize + "px Arial";
    context1.context.fillStyle = "yellow";
    context1.context.fillText(
      `Lives: ${lives}     Score: ${score} `,
      0,
      compSize,
      compSize * 10,
      compSize * 10
    );
    context1.context.fill();
    context1.context.closePath();
  }
  //*************************** canv_ButtonController event to move the rocket with given distance***********************************************************/
  function moveRocket(dist) {
    if (btnLeftPress) {
      rocket1.moveLeft(dist);
    }
    if (btnRightPress) {
      rocket1.moveRight(dist);
    }
    if (btnUpPress) {
      rocket1.moveUp(dist);
    }
    if (btnDownPress) {
      rocket1.moveDown(dist);
    }
  }
}
