var tank, tankani;
var turret, turretani;
var bullets, bulletimg, bulletx, bullety;
var tankx, tanky, tankSpeed = 1;

var tank2, tank2ani;
var turret2, turret2ani;
var bullets2, bullet2img, bullet2x, bullet2y;
var tank2x, tank2y, tank2Speed = 1;

var shoot = 0, checkshot = 0, checktime;
var shoot2 = 0, checkshot2 = 0, checktime2;

var wallTop, wallLeft, wallRight, wallBottom, walls;
var wallRightOne, wallRightTwo, wallLeftOne, wallLeftTwo, wallMid;

var tankScore = 0, tank2Score = 0;

var end = 0, winnerNum = 0;

function preload(){
  tankimg0 = loadImage("tank_0.png");
  tankimg1 = loadImage("tank_1.png");
  tankimg2 = loadImage("tank_2.png");
  tankimg3 = loadImage("tank_3.png");
  tankimg4 = loadImage("tank_4.png");
  tankimg5 = loadImage("tank_5.png");
  tankani = loadAnimation("tank_0.png", "tank_1.png", "tank_2.png", "tank_3.png", "tank_4.png", "tank_5.png");
  tank2ani = loadAnimation("tank_0.png", "tank_1.png", "tank_2.png", "tank_3.png", "tank_4.png", "tank_5.png");
  turretimg0 = loadImage("turret_0.png");
  turretimg1 = loadImage("turret_1.png");
  bulletimg = loadImage("bullet.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 4);
  angleMode(DEGREES);
  bullets = new Group();
  bullets2 = new Group();
  //////////////////////tanks///////////////////////
  tank = createSprite(tankx, tanky);
  tankani.frameDelay = 6;
  tank.addAnimation("default",  tankani);
  tank.scale = 0.6;
  tank.position.x = tank.width;
  tank.position.y = height/2;
                 ////playertwo////
  tank2 = createSprite(tank2x, tank2y);
  tank2ani.frameDelay = 6;
  tank2.addAnimation("default",  tank2ani);
  tank2.scale = 0.6;
  tank2.position.x = width - tank.width;
  tank2.position.y = height/2;
  //-----------------tanks/--------------------//

  ///////////////////turrets/////////////////////
  turret = createSprite(tank.position.x, tank.position.y);
  turret.scale = 0.6;
  turret.addImage(turretimg1);

  turret2 = createSprite(tank2.position.x, tank2.position.y);
  turret2.scale = 0.6;
  turret2.addImage(turretimg1);
  //-----------------turrets/-------------------//

  ////////////////////////////walls and wall group///////////////////////////
  walls = new Group();
  wallTop = createSprite(width/2, 10, width, 20);
  wallBottom = createSprite(width/2, height - 10, width, 20);
  wallLeft = createSprite(10, height/2, 20, height);
  wallRight = createSprite(width - 10, height/2, 20, height);
  wallRightOne = createSprite(random((width-300),(width-200)), random((height/2)-45,(height/2)+45), random(15,25), random(height-400,height-275));
  wallRightTwo = createSprite(random((width-550),(width-450)), random((height/2)-70,(height/2)+70), random(15,25), random(height-(550),height-(height/2)));
  wallLeftOne = createSprite(random(200,300), random((height/2)-45,(height/2)+45), random(15,25), random(height-400,height-275));
  wallLeftTwo = createSprite(random(450,550), random((height/2)-45,(height/2)+45), random(15,25), random(height-(550),height-(height/2)));
  wallMid = createSprite(random((width/2)-50, (width/2)+50), random((height/2)-50, (height/2)+50), random(90,150), random(90,height/2));
  walls.add(wallTop);
  walls.add(wallBottom);
  walls.add(wallLeft);
  walls.add(wallRight);
  walls.add(wallRightOne);
  walls.add(wallRightTwo);
  walls.add(wallLeftOne);
  walls.add(wallLeftTwo);
  walls.add(wallMid);
  wallTop.shapeColor = "#5b533f";
  wallBottom.shapeColor = "#5b533f";
  wallLeft.shapeColor = "#5b533f";
  wallRight.shapeColor = "#5b533f";
  wallRightOne.shapeColor = "#7a7055";
  wallRightTwo.shapeColor = "#7a7055";
  wallLeftOne.shapeColor = "#7a7055";
  wallLeftTwo.shapeColor = "#7a7055";
  wallMid.shapeColor = "#7a7055";
  wallLeft.immovable = true;
  wallLeftOne.immovable = true;
  wallLeftTwo.immovable = true;
  wallRight.immovable = true;
  wallRightOne.immovable = true;
  wallRightTwo.immovable = true;
  wallMid.immovable = true;
  wallTop.immovable = true;
  wallBottom.immovable = true;
  //--------------------------walls and wall group/------------------------//
}

//////////////////////////////////////////////////////////////////DRAW/////////////////////////////////////////////////////////////////
function draw() {
  if (end == 0){
    background(237, 201, 175);
    fill("#7a7055");
    drawSprites();
    moveTank();
    moveTank2();
    tank.collide(walls);
    tank.collide(tank2);
    tank2.collide(walls);
    tank2.collide(tank);
    moveTurret();
    moveTurret2();
    bulletx = tank.position.x + ((turret.height/2) + 21) * sin(turret.rotation);
    bullety = tank.position.y - ((turret.height/2) + 21) * cos(turret.rotation);
    bullet2x = tank2.position.x + ((turret.height/2) + 21) * sin(turret2.rotation);
    bullet2y = tank2.position.y - ((turret.height/2) + 21) * cos(turret2.rotation);
    checkShoot();
    checkShoot2();
    for(var i = 0; i < bullets.length; i++){
      bullets [i].bounce(walls);
      bullets [i].bounce(tank, tankHit);
      bullets [i].bounce(tank2, tank2Hit);
    }
    for(var i = 0; i < bullets2.length; i++){
      bullets2 [i].bounce(walls);
      bullets2 [i].bounce(tank, tankHit);
      bullets2 [i].bounce(tank2, tank2Hit);
    }
    addShot();
    addShot2();
    displayScores();
    endCheck();
  } else if(end == 1){      ////////game ends
    background(0);
    var buttonx = width/2 - 300;
    var buttony = height - (height/4) - 100;
    var buttonw = 600;
    var buttonh = 100;
    fill(255, 0, 0);
    rect(buttonx, buttony, buttonw, buttonh);
    if(mouseIsPressed && mouseX >= buttonx && mouseX <= buttonx + buttonw && mouseY >= buttony && mouseY <= buttony + buttonh){
      reset();
    }
    displayScores();
    fill(255,0,0);
    textSize(100);
    textAlign(CENTER);
    text ("Player " + winnerNum + " wins!", width/2, height/2 - 20);
    textSize(40);
    fill(0);
    text ("Press to Restart", width/2, height - (height/4) - 40);
  }
}
//-------------------------------------------------------------DRAW/-------------------------------------------------------//

//rotate the turret upon pressing F or G
function moveTurret(){
  if(keyDown(71)){ //G
    turret.rotation += 1;
  }
  if(keyDown(70)){ //F
    turret.rotation -= 1;
  }
}

//rotates the turret upon pressing numpad1 or numpad3
function moveTurret2(){
  if(keyDown(99)){ //3
    turret2.rotation += 1;
  }
  if(keyDown(97)){ //1
    turret2.rotation -= 1;
  }
}

function moveTank(){
  //also moves turret with tank
  turret.position.x = tank.position.x;
  turret.position.y = tank.position.y;
  if(keyDown(83)){  //S
    tank.setSpeed(1, tank.rotation + 90);
  } else {
    tank.setSpeed(0, 0);
  }
  if(keyDown(87)){ //W
    tank.setSpeed(1, tank.rotation - 90);
  }
  if(keyDown(68)){  //D
    tank.rotation += 0.7;
    turret.rotation += 0.7;
  }
  if(keyDown(65)){ //A
    tank.rotation -= 0.7;
    turret.rotation -= 0.7;
  }
}

function moveTank2(){
  //also moves turret with tank
  turret2.position.x = tank2.position.x;
  turret2.position.y = tank2.position.y;
  if(keyDown(40)){
    tank2.setSpeed(1, tank2.rotation + 90);
    turret2.setSpeed(1, tank2.rotation + 90);
  } else {
    tank2.setSpeed(0, 0);
    turret2.setSpeed(0, 0);
  }
  if(keyDown(38)){
    tank2.setSpeed(1, tank2.rotation - 90);
    turret2.setSpeed(1, tank2.rotation - 90);
  }
  if(keyDown(39)){
    tank2.rotation += 0.7;
    turret2.rotation += 0.7;
  }
  if(keyDown(37)){
    tank2.rotation -= 0.7;
    turret2.rotation -= 0.7;
  }
}

function checkShoot(){
  if(keyDown(72) && checkshot <= 1){
    shoot = 1;
    checkshot = 0;
  }
  if(checktime + 50 < millis()){
    checktime = 0;
    turret.addImage(turretimg1);
  }
  if(shoot == 1){
    var bullet = createSprite(bulletx, bullety);
    bullets.add(bullet);
    bullet.addImage(bulletimg);
    bullet.scale = 0.05;
    bullet.scale = 0.05;
    checkshot += 1;
    bullet.setSpeed(4, turret.rotation - 90);
    bullet.rotation = turret.rotation;
    bullet.life = 600;
    turret.addImage(turretimg0);
    checktime = millis();
    shoot = 0;
  }
}

function checkShoot2(){
  if(keyDown(101) && checkshot2 <= 1){
    shoot2 = 1;
    checkshot2 = 0;
  }
  if(checktime2 + 50 < millis()){
    checktime2 = 0;
    turret2.addImage(turretimg1);
  }
  if(shoot2 == 1){
    var bullet2 = createSprite(bullet2x, bullet2y);
    bullets2.add(bullet2);
    bullet2.addImage(bulletimg);
    bullet2.scale = 0.05;
    bullet2.scale = 0.05;
    checkshot2 += 1;
    bullet2.setSpeed(4, turret2.rotation - 90);
    bullet2.rotation = turret2.rotation;
    bullet2.life = 600;
    turret2.addImage(turretimg0);
    checktime2 = millis();
    shoot2 = 0;
  }
}

function addShot(){
  if (checkshot > 0){
    checkshot += 1;
  }
  if (checkshot > 50){
    checkshot = 0;
  }
}

function addShot2(){
  if (checkshot2 > 0){
    checkshot2 += 1;
  }
  if (checkshot2 > 50){
    checkshot2 = 0;
  }
}

function tankHit(){
  tank2Score ++;
}
function tank2Hit(){
  tankScore ++;
}

function displayScores(){
  fill (255, 0, 0);
  textSize(40);
  noStroke();
  text(tank2Score, width - 50, 60);
  text(tankScore, 25, 60);
}

function endCheck(){
  if(tankScore >= 5){
    tankWin();
  }
  if(tank2Score >= 5){
    tank2Win();
  }
}

function tankWin(){
  end = 1;
  winnerNum = 1;
}
function tank2Win(){
  end = 1;
  winnerNum = 2;
}

function reset(){
  for(var i = 0; i < allSprites.length; i++){
    allSprites [i].remove();
  }
  for(var n = 0; n < bullets.length; n++){
    bullets [n].remove();
  }
  for(var k = 0; i < bullets2.length; k++){
    bullets2 [k].remove();
  }
  for(var j = 0; j < walls.length; j++){
    walls [j].remove();
  }
  tank2.remove();
  turret2.remove();
  winnerNum = 0;
  end = 0;
  tankScore = 0;
  tank2Score = 0;
  tankx = 0;
  tanky = 0;
  tank2x = 0;
  tank2y = 0;
  bullets = new Group();
  bullets2 = new Group();
  //////////////////////tanks///////////////////////
  tank = createSprite(tankx, tanky);
  tankani.frameDelay = 6;
  tank.addAnimation("default",  tankani);
  tank.scale = 0.6;
  tank.position.x = tank.width;
  tank.position.y = height/2;
                 ////playertwo////
  tank2 = createSprite(tank2x, tank2y);
  tank2ani.frameDelay = 6;
  tank2.addAnimation("default",  tank2ani);
  tank2.scale = 0.6;
  tank2.position.x = width - tank.width;
  tank2.position.y = height/2;
  //-----------------tanks/--------------------//

  ///////////////////turrets/////////////////////
  turret = createSprite(tank.position.x, tank.position.y);
  turret.scale = 0.6;
  turret.addImage(turretimg1);

  turret2 = createSprite(tank2.position.x, tank2.position.y);
  turret2.scale = 0.6;
  turret2.addImage(turretimg1);
  //-----------------turrets/-------------------//

  ////////////////////////////walls and wall group///////////////////////////
  walls = new Group();
  wallTop = createSprite(width/2, 10, width, 20);
  wallBottom = createSprite(width/2, height - 10, width, 20);
  wallLeft = createSprite(10, height/2, 20, height);
  wallRight = createSprite(width - 10, height/2, 20, height);
  wallRightOne = createSprite(random((width-300),(width-200)), random((height/2)-45,(height/2)+45), random(15,25), random(height-400,height-275));
  wallRightTwo = createSprite(random((width-550),(width-450)), random((height/2)-70,(height/2)+70), random(15,25), random(height-(550),height-(height/2)));
  wallLeftOne = createSprite(random(200,300), random((height/2)-45,(height/2)+45), random(15,25), random(height-400,height-275));
  wallLeftTwo = createSprite(random(450,550), random((height/2)-45,(height/2)+45), random(15,25), random(height-(550),height-(height/2)));
  wallMid = createSprite(random((width/2)-50, (width/2)+50), random((height/2)-50, (height/2)+50), random(90,150), random(90,height/2));
  walls.add(wallTop);
  walls.add(wallBottom);
  walls.add(wallLeft);
  walls.add(wallRight);
  walls.add(wallRightOne);
  walls.add(wallRightTwo);
  walls.add(wallLeftOne);
  walls.add(wallLeftTwo);
  walls.add(wallMid);
  wallTop.shapeColor = "#5b533f";
  wallBottom.shapeColor = "#5b533f";
  wallLeft.shapeColor = "#5b533f";
  wallRight.shapeColor = "#5b533f";
  wallRightOne.shapeColor = "#7a7055";
  wallRightTwo.shapeColor = "#7a7055";
  wallLeftOne.shapeColor = "#7a7055";
  wallLeftTwo.shapeColor = "#7a7055";
  wallMid.shapeColor = "#7a7055";
  wallLeft.immovable = true;
  wallLeftOne.immovable = true;
  wallLeftTwo.immovable = true;
  wallRight.immovable = true;
  wallRightOne.immovable = true;
  wallRightTwo.immovable = true;
  wallMid.immovable = true;
  wallTop.immovable = true;
  wallBottom.immovable = true;
  //--------------------------walls and wall group/------------------------//
}






/////////////////////debug////////////////////////
tank.debug = mouseIsPressed;
tank2.debug = mouseIsPressed;
turret.debug = mouseIsPressed;
turret2.debug = mouseIsPressed;
if (keyDown(45)){
  stroke(0);
  line(tank.position.x, tank.position.y, tank2.position.x, tank2.position.y);
  noFill();
  ellipse(tank.position.x, tank.position.y, 10);
  ellipse(tank.position.x, tank.position.y, turret.height);
  ellipse(tank.position.x, tank.position.y, turret.width);
  ellipse(bulletx, bullety, 5);
  ellipse(tank2.position.x, tank2.position.y, 10);
  ellipse(tank2.position.x, tank2.position.y, turret2.height);
  ellipse(tank2.position.x, tank2.position.y, turret2.width);
  ellipse(bullet2x, bullet2y, 5);
  fill (0, 0, 255);
  textSize(20);
  noStroke();
  text(tank.position, 20, 25);
  text(turret.rotation, 20, 50);
  text("x = " + (tank.position.x + turret.height/2 * cos(turret.rotation)), 20, 75);
  text("y = " + (tank.position.y + turret.height/2 * sin(turret.rotation)), 20, 100);
  text("mouse x: " + mouseX, 20, 125);
  text("mouse y: " + mouseY, 20, 150);
  text("width: " + width, 20, 175);
  text("height: " + height, 20, 200);
}
//------------------debug/----------------------/
