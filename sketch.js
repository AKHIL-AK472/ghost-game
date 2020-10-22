var tower,towerImg;
var door,doorImg;
var railing,railingImg;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";
var sound;
var score=0;
function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  railingImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas (600,600);
  sound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  ghost=createSprite(200,150);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  doorsGroup=new Group();
  railingsGroup=new Group();
  invisibleBlockGroup=new Group();
}
function draw(){
 background("cyan");
  score=score+Math.round(getFrameRate()/60);
  if(gameState=="play"){

  if (tower.y >400){
   tower.y=300;
 }
  if (keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if (railingsGroup.isTouching(ghost)){
ghost.velocityY=0;
  }
 if(invisibleBlockGroup.isTouching( ghost)||ghost.y>600 ){
   ghost.destroy();
   gameState="end";
 }
  
  spawnDoors();
drawSprites();
  }
  if(gameState=="end"){
stroke("red");
  fill("green");
  textSize(30);
  text("GAME OVER",250,250);
    
  }
  textSize(30);
  fill("yellow");
  text("score: "+score,100,100);
}

function spawnDoors(){
if(frameCount%240==0){
  door=createSprite(200,-50);
  door.addImage (doorImg);
  door.x=Math.round(random(120,400));
  door.velocityY=1;
  door.lifetime=800;
  doorsGroup.add(door);
  
  railing=createSprite(200,0);
    railing.addImage(railingImg);
    railing.x=door.x
    railing.velocityY=1;
    railing.lifetime=800;
    railingsGroup.add(railing);
  
  
  ghost.depth=door.depth
  ghost.depth=ghost.depth+1;
  
  invisibleBlock=createSprite(200,10);
  invisibleBlock.width=railing.width;
  invisibleBlock.height=2
  invisibleBlock.velocityY=1;
  invisibleBlock.visible=false;
  invisibleBlock.lifetime=800;
  invisibleBlockGroup.add(invisibleBlock);
}
}

