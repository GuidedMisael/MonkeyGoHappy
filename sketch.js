var monkey_run, bananaImg, jungleimg, stoneimg

var monkey,banana,jungle,stone,ground,score;

var bananaGroup;

var stonegroup;

var PLAY,END,gameState

function preload(){
  
  monkey_run = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  stoneimg = loadImage("stone.png");
  
  jungleimg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
}


function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(200,200,10,10);
  jungle.addImage("jungle",jungleimg);
  jungle.x = jungle.width /2;
  jungle.velocityX = -5;
  
  ground = createSprite(200,380,400,30);
  ground.visible = false;
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  monkey = createSprite(100,335,20,20);
  monkey.addAnimation("running",monkey_run);
  monkey.scale = 0.05;
  
  stonegroup = createGroup();
  
  
  score = 0;
  
  PLAY = 1
  END = 0;
  gameState = 1;
  
  bananaGroup = createGroup();
}

function draw() {
  background(220);
  drawSprites();
  
  if(gameState === PLAY){
  textSize(20);
  fill("red");
  text("Score:"+score,180,40);
  
  
  if(monkey.isTouching(bananaGroup)){
     score = score+Math.round(random(1,5));
    bananaGroup.destroyEach();
     }
  
  
  if(jungle.x<-85){
  jungle.x = jungle.width/2;
  }
  
  if(World.frameCount%150 === 0){
    banana = createSprite(500,300,20,20);
  banana.addImage("banana",bananaImg);
  banana.scale = 0.1;
    banana.velocityX = -5
    banana.y = random(100,200);
   banana.lifetime = 400;
    bananaGroup.add(banana)
  }
  
  
  ground.velocityX = -5;
  
  if(ground.x<0){
  ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y>300){
    
    monkey.velocityY = -20;
    
  }
  monkey.velocityY = monkey.velocityY+0.8
  
  if(World.frameCount%100 === 0){
    stone = createSprite(500,350,20,20);
    stone.addImage("stone",stoneimg);
    stone.scale = 0.2
    stone.velocityX = -5
    stone.lifetime = 400;
    stonegroup.add(stone);
    
  }
    
    switch(score){
        
      case 10 : monkey.scale = 0.12
                break;
                
      case 20 : monkey.scale = 0.14
                break;
                
      case 30: monkey.scale = 0.16
               break;
      
      case 40: monkey.scale = 0.18;
               break;
        
        default : break;
        
        
        
        
        
    }
  
  if(monkey.isTouching(stonegroup)){
     jungle.velocityX = 0
     bananaGroup.setLifetimeEach(-1);
     stonegroup.setLifetimeEach(-1);
     bananaGroup.setVelocityXEach(0);
     stonegroup.setVelocityXEach(0);
     monkey.velocityY = 0;
     gameState = END;
     }
  }
  monkey.collide(ground);
}