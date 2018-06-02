var tank, tankani;
var turret, turretani;
var bullet, bulletimg, bulletx, bullety;
var tankx, tanky, tankSpeed = 1, tankAnglePos, tankAngleNeg;
var shoot = 0, checkshot = 0;
var checktime;
var wallTop, wallLeft, wallRight, wallBottom, walls;
var crates, crateimg, brokencrateimg;

function preload(){
  tankimg0 = loadImage("tank_0.png");
  tankimg1 = loadImage("tank_1.png");
  tankimg2 = loadImage("tank_2.png");
  tankimg3 = loadImage("tank_3.png");
  tankimg4 = loadImage("tank_4.png");
  tankimg5 = loadImage("tank_5.png");
  tankani = loadAnimation("tank_0.png", "tank_1.png", "tank_2.png", "tank_3.png", "tank_4.png", "tank_5.png");
  turretimg0 = loadImage("turret_0.png");
  turretimg1 = loadImage("turret_1.png");
  bulletimg = loadImage("bullet.png");
  crateimg = loadImage("box.png");
  brokencrateimg = loadImage("boxBroken.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 4);
  crates = new Group();
  for(var i=0; i <= 10; i++){
    var box = createSprite(random(40, width - 40), random(40, height - 40));
    box.addImage(crateimg);
    box.scale = random(0.3, 0.6);
    crates.add(box);
  }
  angleMode(DEGREES);
  tankx = width/2;
  tanky = height/2;
  tank = createSprite(tankx, tanky);
  tankani.frameDelay = 6;
  tank.addAnimation("default",  tankani);
  turret = createSprite(tankx, tanky);
  ////////////walls and wall group/////////////////
  walls = new Group();
  wallTop = createSprite(width/2, 10, width, 20);
  wallBottom = createSprite(width/2, height - 10, width, 20);
  wallLeft = createSprite(10, height/2, 20, height);
  wallRight = createSprite(width - 10, height/2, 20, height);
  walls.add(wallTop);
  walls.add(wallBottom);
  walls.add(wallLeft);
  walls.add(wallRight);
  wallTop.shapeColor = "#7a7055";
  wallBottom.shapeColor = "#7a7055";
  wallLeft.shapeColor = "#7a7055";
  wallRight.shapeColor = "#7a7055";
  //--------walls and wall group/---------------//
  tank.scale = 0.6;
  turret.scale = 0.6;
  turret.addImage(turretimg1);
}

function draw() {
  background(237, 201, 175);
  fill("#7a7055");
  drawSprites();
  //turret.collide(walls, turretHit);
  //tank.collide(walls, tankHit);
  //tank.collide(walls);
  //turret.collide(walls);
  moveTank();
  moveTurret();
  bulletx = tankx + turret.height/2 * sin(turret.rotation);
  bullety = tanky - turret.height/2 * cos(turret.rotation);
  checkShoot();
  addShot();

  tankx = tank.position.x;
  tanky = tank.position.y;
  /////////////////////debug////////////////////////
  if (keyDown(45)){
    noFill();
    ellipse(tankx, tanky, 10);
    ellipse(tankx, tanky, turret.height);
    ellipse(tankx, tanky, turret.width);
    ellipse(bulletx, bullety, 5);
    fill (0, 0, 255);
    textSize(20);
    text(tank.position, 20, 25);
    text(turret.rotation, 20, 50);
    text("x = " + (tankx + turret.height/2 * cos(turret.rotation)), 20, 75);
    text("y = " + (tanky + turret.height/2 * sin(turret.rotation)), 20, 100);
    text(millis(), 20, 125);
    //text(tankx, 20, 75);
    //text(tanky, 20, 100);
  }
  //------------------debug/----------------------/
}

function moveTurret(){
  if(keyDown(71)){
    turret.rotation += 1;
  }
  if(keyDown(70)){
    turret.rotation -= 1;
  }
}

function moveTank(){
  //also moves turret with tank
  if(keyDown(83)){  //s
    tank.setSpeed(1, tank.rotation + 90);
    turret.setSpeed(1, tank.rotation + 90);
  } else {
    tank.setSpeed(0, 0);
    turret.setSpeed(0, 0);
  }
  if(keyDown(87)){
    tank.setSpeed(1, tank.rotation - 90);
    turret.setSpeed(1, tank.rotation - 90);
  }
  if(keyDown(68)){
    tank.rotation += 0.7;
    turret.rotation += 0.7;
  }
  if(keyDown(65)){
    tank.rotation -= 0.7;
    turret.rotation -= 0.7;
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
    bullet = createSprite(bulletx, bullety);
    bullet.addImage(bulletimg);
    bullet.scale = 0.1;
    checkshot += 1;
    bullet.setSpeed(2.5, turret.rotation - 90);
    bullet.rotation = turret.rotation;
    turret.addImage(turretimg0);
    checktime = millis();
    shoot = 0;
  }
}

function addShot(){
  if (checkshot > 0){
    checkshot += 1;
  }
  if (checkshot > 100){
    checkshot = 0;
  }
}

function turretHit(){
  tank.setVelocity(0, 0);
  turret.setVelocity(0, 0);
}
function tankHit(){
  turret.setVelocity(0, 0);
  tank.setVelocity(0, 0);
}

function checkCrates(){
  box.addImage(brokencrateimg);
}
