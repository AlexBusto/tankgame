var tank, tankani;
var turret, turretani;
var bullet, bulletimg;
var tankx, tanky;
var shoot = 0;

function preload(){
  tankimg0 = loadImage("tank_0.png");
  tankimg1 = loadImage("tank_1.png");
  tankimg2 = loadImage("tank_2.png");
  tankimg3 = loadImage("tank_3.png");
  tankimg4 = loadImage("tank_4.png");
  tankimg5 = loadImage("tank_5.png");
  tankani = loadAnimation("tank_0.png", "tank_1.png", "tank_2.png", "tank_3.png", "tank_4.png", "tank_5.png" );
  turretimg0 = loadImage("turret_0.png");
  turretimg1 = loadImage("turret_1.png");
  bulletimg = loadImage("bullet.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 4);
  tankx = width/2;
  tanky = height/2;
  tank = createSprite(tankx, tanky);
  tankani.frameDelay = 6;
  tank.addAnimation("default",  tankani);
  turret = createSprite(tankx, tanky);
  turret.addImage(turretimg1);
  tank.scale = 0.75;
  turret.scale = 0.75;
}

function draw() {
  background(237, 201, 175);
  drawSprites();
  moveTank();
  moveTurret();
  checkShoot();

  tankx = tank.position.x;
  tanky = tank.position.y;
  ellipse(tankx, tanky, 10);
  fill (0, 0, 255);
  textSize(20);
  text(tank.position, 20, 25);
  text(turret.height/2, 20, 50);
  text(tankx, 20, 75);
  text(tanky, 20, 100);
  text(shoot, 20, 125);
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
  if(keyDown(83)){
    tank.setSpeed(1, tank.rotation + 90);
    turret.setSpeed(1, tank.rotation + 90);
    tank.addImage(turretimg0);
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
  if(keyDown(72)){
    shoot = 1;
  }
  if(shoot == 1){
    bullet = createSprite(tankx, tanky - ((turret.height/2) - 20));
    bullet.addImage(bulletimg);
    bullet.scale = 0.15;
    shoot = 0;
    bullet.velocity.y = -2;
  }
}
