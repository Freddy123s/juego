var ball1,ball1img
var bloquesgroup
var barra

var score=0
var vidas=2
var gamestate="serve"
function preload(){
ball1img=loadImage("pelota.png")  
}   
function setup(){
ball1=createSprite(200,170,70,20)
ball1.addImage(ball1img)
ball1.scale=0.5
 bloquesgroup=new Group()
 barra=createSprite(195,370,70,10)
createEdgeSprites()
} 



function createbloques(y,color){
for(var i=0; i<=5;i++){
var bloque=createSprite(65+54*i,y,50,20)  
bloque.shapeColor=color
bloquesgroup.add(bloque)
}
}

var dulces=["paleta","papas","chocolates","palestas de hielo","mazapan"]  
console.log(dulces[2,4])


function draw() {
  background("red");
  createbloques(65,"blue")
createbloques(65+30,"yellow")
createbloques(65+30+30,"green")
  textSize(20);
  text("Puntuación: "+score,40,25);
  text("Vidas: "+vidas, 40, 45);
  barra.x=World.mouseX
  //barra.x=ball1.x
  if(gamestate == "serve"){
    text("Clic para sacar la pelota.", 120,250);
    ball1.velocityX =0;
    ball1.velocityY =0;
    ball1.x = 200;
    ball1.y = 200;
  }
  else if(gamestate =="end") {
    text("¡Fin del Juego!", 150, 250);
  }
  else {
    play();
  }
  
  drawSprites();
}
function ganar(){
if(!bloquesgroup[0]){
text ("Ganaste",200,200)  
}  
}
function mousePressed()
{
  ball1.velocityX = 10;
  ball1.velocityY = 6;
  
  if(gamestate == "serve"){
    gamestate = "play";
    ball1.velocityY = -7;
    ball1.velocityX = -7;
    bloquesgroup.setVelocityYEach(0.3)
  }
  
}



function play(){
ball1.scale=0.8
ball1.bounceOff(topEdge);
ball1.bounceOff(barra)
ball1.bounceOff(leftEdge)
ball1.bounceOff(rightEdge)
ball1.bounceOff(bloquesgroup,destroy)
if (keyDown("up")) {
ball1.velocityY=-10
ball1.velocityX=-8  
}
if(keyDown("w")){
ball1.x=World.mouseX
ball1.y=World.mouseY
}

giro()
drawSprites()
if(ball1.isTouching(barra)){
playSound("sound://category_jump/arcade_game_jump_1.mp3");
  
}
ganar()
//IA()  
if(ball1.isTouching(bottomEdge)){
vidamenos()  
}
if (ball1.isTouching(topEdge)|| ball1.isTouching(leftEdge)|| ball1.isTouching(rightEdge)) {
  playSound("sound://category_jump/classic_jump_3.mp3");
}
}

function giro(){
  
  ball1.rotation=ball1.rotation+15
  
}
function destroy(ball1,bloque){
  bloque.destroy()
score=score+5
if (ball1.velocityY<12){
ball1.velocityX*=1.5
ball1.velocityY*=1.5
}

  playSound("sound://category_explosion/8bit_explosion.mp3", false);
}
if (ball1.isTouching(topEdge)|| ball1.isTouching(leftEdge)|| ball1.isTouching(rightEdge)) {
  playSound("sound://category_jump/classic_jump_3.mp3");
}
function vidamenos(){
vidas=vidas-1
if (vidas>=1){
gamestate="serve"  
}else {
gamestate="end"  
}
}
function IA(){
barra.x=ball1.x  
}
