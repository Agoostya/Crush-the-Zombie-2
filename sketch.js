const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,wall1,wall2;
var bridge, jointPoint, jointLink;
var stone;
var zombie;
var stones=[];
var zombie1Img,zombie2Img,zombie3Img,zombie4Img,bridgeImg,stoneImg,axeImg,bgImg;
var zombie;
var breakButton;
var collided=false;

function preload(){
  axeImg=loadImage("assets/axe.png");
  bgImg=loadImage("assets/background.png");
  stoneImg=loadImage("assets/stone.png");
  bridgeImg=loadImage("assets/wood.png");
  zombie1Img=loadImage("assets/zombie1.png");
  zombie2Img=loadImage("assets/zombie2.png");
  zombie3Img=loadImage("assets/zombie3.png");
  zombie4Img=loadImage("assets/zombie4.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground=new Base(windowWidth/2,700,windowWidth,100);
  wall2=new Base(windowWidth-60,windowHeight/2,500,100);
  wall1=new Base(windowWidth-1240,windowHeight/2,500,100);

  bridge=new Bridge(15,{x:windowWidth-60,y:windowHeight/2});
  jointPoint=new Base(windowWidth-1050,height/2+10,40,20);
  
  Matter.Composite.add(bridge.body,jointPoint);
  jointLink=new Link(bridge,jointPoint);

  zombie=createSprite(width/2,height-110);
  zombie.addAnimation("lefttoright",zombie1Img,zombie2Img,zombie1Img);
  zombie.addAnimation("righttoleft",zombie3Img,zombie4Img,zombie3Img);
  
  zombie.scale=0.1;
  zombie.velocityX=10;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

  for(var i=0;i<=8;i++){
    var x=random(width/2-200,width/2+300);
    var y=random(-10,140);
    var stone=new Stone(x,y,80,80);
    stones.push(stone);
  }
}

function draw() {
  background(bgImg);
  Engine.update(engine);

  ground.show();
  wall1.show();
  wall2.show();
  bridge.show();

  for(var stone of stones){
    stone.show();
  }
  
  if (zombie.position.x >= width - 300 && !collided) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300 && !collided) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}