var tank, tankani;
var turret, turretani;
var tankx, tanky;

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
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  tank = createSprite(width/2, height/2);
  tank.addImage(tankimg0);
  tank.addImage(tankimg1);
  tank.addImage(tankimg2);
  tank.addImage(tankimg3);
  tank.addImage(tankimg4);
  tank.addImage(tankimg5);
  turret = createSprite(width/2, height/2 - 33);
  turret.addImage(turretimg0);
  turret.addImage(turretimg1);
}
function draw() {
  background(237, 201, 175);
  drawSprites();
  moveTank();
}

function moveTank(){
  if(keyDown(83)){
    tank.setSpeed(1.5, tank.rotation + 90);
    turret.setSpeed(1.5, tank.rotation + 90);
  } else {
    tank.setSpeed(0, 0);
    turret.setSpeed(0, 0);
  }
  if(keyDown(87)){
    tank.setSpeed(1.5, tank.rotation - 90);
    turret.setSpeed(1.5, tank.rotation - 90);
  }
  if(keyDown(68)){
    tank.rotation += 1;
  }
  if(keyDown(65)){
    tank.rotation -= 1;
  }
}
