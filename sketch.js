var road,roadImage;
var car,carImage;
var car2Image;
var car3Image;
var car4Image;
var car5Image;
var car6Image;
var vehicleGroup,vehicleImage;
var lifeCounter=3;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage;
var restart,restartImage;
var gameSound,gameOverSound;

function preload(){
  roadImage=loadImage('track.png');
  carImage=loadImage('Car1.png');
  vehicleImage=loadImage('Car2.png');
  car2Image=loadImage('Car3.png')
  car3Image=loadImage('Car4.png')
  car4Image=loadImage('Car5.png')
  car5Image=loadImage('Car6.png')
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("Restart.png");
  gameSound=loadSound("Accordion.mp3");
  gameOverSound=loadSound("Applause.mp3");

}

function setup(){
 createCanvas(600,600);

 //gameSound.loop();

 createP("Car Game");

  vehicleGroup=new Group(); 

 road=createSprite(300,300);
 road.addImage(roadImage);
 road.scale=1;

 car=createSprite(370,350);
 car.addImage(car5Image);
 car.scale=0.3

 gameOver=createSprite(250,250);
 gameOver.addImage(gameOverImage);
 gameOver.scale=0.5;

 restart=createSprite(250,350);
 restart.addImage(restartImage);
 restart.scale=0.5
}

function draw(){
console.log(gameState);
  if(gameState===PLAY){
    if(gameSound.isPlaying()==false){
      gameSound.loop();
    }

    gameOver.visible=false;
    restart.visible=false;
    road.velocityY=2;
    if(road.y>400){
      road.y=300;
    }

    if(keyIsDown(LEFT_ARROW)){
      car.x=car.x-5;
    }

    if(keyIsDown(RIGHT_ARROW)){
      car.x=car.x+5;
    }
    //console.log(road.y);
    spawnVehicles();

    if(vehicleGroup.isTouching(car)){
      vehicleGroup.destroyEach();
      lifeCounter--;
    }

    if(lifeCounter===0){
      gameState=END
    }
    drawSprites();

    textSize(20);
    fill(255)
    
}

if(gameState===END){
  if(gameSound.isPlaying()==true){
    gameSound.pause();
  }
  //gameOverSound.play();
  gameOver.visible=true;
  restart.visible=true;
  vehicleGroup.setVelocityYEach(0);
  road.velocityY=0;
  
  textSize(10);
  fill(0,0,0);
  strokeWeight(2);
  //text("PRESS SPACE TO RESTART",230,350); 
}
  
 //if(mousePressedOver(restart)){
   if(keyIsDown(32)){
     gameState =PLAY;
     lifeCounter = 3;
 }

drawSprites();
textSize(20);
text("Lifes Remaining:"+lifeCounter,430,50);
  
}

function spawnVehicles(){   
  if(frameCount%100===0){
    
    vehicle1=createSprite(55,600,30,30);
    //vehicle1.addImage(vehicleImage);
    //vehicle1.scale=0.3
    
      var randX=Math.round(random(150,500));
      vehicle1.x=randX;
      vehicle1.y=600;
      vehicle1.velocityY=-2;

      
      var rand=Math.round(random(1,5))
      switch(rand) {
        case 1: vehicle1.addImage(carImage);
                break;
        case 2: vehicle1.addImage(car2Image);
                break;
        case 3: vehicle1.addImage(car3Image);
                break;
        case 4: vehicle1.addImage(car4Image);
                break;
        case 5: vehicle1.addImage(car5Image);
                break;
        default: break;
      }

      vehicle1.scale=0.3;    
     vehicleGroup.add(vehicle1);
  }

}