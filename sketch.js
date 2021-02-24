var bgImg, bg
var beeImg, bee
var flower, flowerImg
var bird, birdImg
var gameState= "play"
var go,goImg
var score = 0


function preload() {
  bgImg=loadImage("bgpic.jpg")
  beeImg=loadImage("fred.png")
  flower1=loadImage("blue_flower.png")
  flower2=loadImage("orangeflow.png")
  flower3=loadImage("pink_flower.png")
  gbird=loadImage("gbird.png")
  bbird=loadImage("bluebiRD.png")
  goImg=loadImage("gameover.jpg")

}



function setup() {
  createCanvas(600,300);
  bg = createSprite(350,150)
  bg.velocityX= -7
  bg.addImage(bgImg)
  bg.scale=1.2
  go = createSprite(300, 150)
  go.addImage(goImg)
  go.scale=0.6
  bee = createSprite(70,230)
  bee.addImage(beeImg)
  bee.scale=0.35
  bee.debug=false
  bee.setCollider("rectangle", 0,0, 220, 200)
 flowerGroup=new Group()
 birdGroup=new Group()
}

function draw() {
  background("blue"); 
 
  if(gameState==="play"){
if(bee.y>300){
 gameState= "end"
}
if(bee.y<0){
gameState="end"
}
  if(bg.x<200){
    bg.x = 400
  }
if(keyDown(UP_ARROW)){
   bee.velocityY=-5
}
bee.velocityY=bee.velocityY+0.5
  
  spawnBirds();

  spawnFlowers();
  for(var i =0;i<flowerGroup.length;i++){
    if(flowerGroup.get(i).isTouching(bee)){
      flowerGroup.get(i).destroy()
      score++
    }
  }
  go.visible = false
  bee.visible = true
  bg.visible = true
  bg.velocityX=-(7+score/100);

  if(birdGroup.isTouching(bee)){
    gameState="end"
  }
}
else if(gameState==="end"){
 birdGroup.destroyEach()
 bee.visible=false
 flowerGroup.destroyEach()
bee.velocityX=0
bee.velocityY=0
 bg.visible = false
 go.visible = true
 fill("black")
 text("click space to continue", 400, 290)
 if(keyDown("SPACE")){
  gameState = "play"
  score = 0
  bee.y=150

}


}

  drawSprites();
  textSize(20)
  fill("black")
  text("score:" + score,500,50)
}

function spawnFlowers() {
  if(frameCount%200===0){
    flower = createSprite(620,200)
    flower.velocityX=-(3+score/100);
    var rand = Math.round(random(1,3))
  switch(rand){
    case 1:flower.addImage(flower1)
    break
    case 2:flower.addImage(flower2)
    break
    case 3:flower.addImage(flower3)
    break
    default:break
  }
  flower.debug=false 
  flower.scale=0.1
  flower.y=Math.round(random(100,250))
  flower.lifetime=217
  flowerGroup.add(flower)

  }

}


function spawnBirds(){
if(frameCount%300===0){
bird = createSprite(620,200)
bird.velocityX=-(3+score/100);
var rand = Math.round(random(1,2))
switch(rand){
  case 1:bird.addImage(bbird)
  break
  case 2: bird.addImage(gbird)
  break
  default:break
}
bird.scale=0.19
bird.y=Math.round(random(50,200))
bird.lifetime=217
birdGroup.add(bird)
bird.debug=false
bird.setCollider("rectangle", 0,0, 200, 190)
}

}
















