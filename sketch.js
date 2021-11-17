var bg,bgImg,player,shooterImg,shooter_shooting,zombie,zombieImg;
var heart_1,heart_2,heart_3,heart_1Img,heart_2Img,heart_3Img,zombieGroup;
var score = 0;
var life = 3;
var bullets = 70;
var gameState = "fight";
var lose,winning,explosionSound;
var visible;

function preload(){
  heart_1Img = loadImage("assets/heart_1.png");
  heart_2Img = loadImage("assets/heart_2.png");
  heart_3Img = loadImage("assets/heart_3.png");
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  //adding the backgroundImage
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  //creating a player sprite
  player = createSprite(displayWidth-150,40,20,20);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = true;
  player.setCollider("rectangle",0,0,300,300);
 
  //creating sprite to depict lives remaining
  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false;
  heart1.addImage("heart1",heart_1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100,40,20,20);
  heart2.visible = false;
  heart2.addImage("heart2",heart_2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150,40,20,20);
  heart3.visible = false;
  heart3.addImage("heart3",heart_3Img);
  heart3.scale = 0.4;

  //creating group for zombies
  zombieGroup = new Group();
}

function draw(){
  background(0);
  if(gameState === "fight"){
    if(life === 3){
      heart_3.visible = true;
      heart_2.visible = false;
      heart_1.visible = false;
    }
    if(life === 2){
      heart_3.visible = false;
      heart_2.visible = true;
      heart_1.visible = false;
    }
    if(life === 1){
      heart_3.visible = false;
      heart_2.visible = false;
      heart_1.visible = true;
    }
    if(life === 0){
      gameState = "lost";
    }
    if(score === 100){
      gameState = "won";
      winning.play();

    }
    if(keyDown(UP_ARROW) || touches.length>0){
      player.y = player.y-30;
    }
    if(keyDown(DOWN_ARROW) || touches.length>0){
      player.y = player.y+30;
    }
    if(keyWentDown("space")){
      bullet = createSprite(displayWidth-1150,player.y-30,20,10);
      bullet.velocityX = 20;
      bulletGroup.add(bullet);
      player.depth = bullet.depth;
      player.depth+= 2;
      player.addImage(shooter_shooting);
      bullets = bullets-1;
      explosionSound.play();
    }
   else if(keyWentUp("space")) 
   {
       player.addImage(shooterImg);
   }
   if(bullets === 0){
     gameState = "bullet";
     lose.play();
   }
    if(zombieGroup.isTouching(bulletGroup)){
      for(var i = 1;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy();
          bulletGroup.destroyEach();
          explosionSound.play();
          score += 2;
        }
      }
    }
  }
  enemy();
  drawSprites();
}

function enemy(){
  if(frameCount % 50 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400);
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
    
  }
}
