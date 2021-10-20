

var circle;

function setup() {
  canvas = createCanvas(800,500);
	canvas.parent('sketch2');


  circle = createSprite(0, 0);
  circle.addAnimation('normal', 'images/asterisk_circle0006.png', 'images/asterisk_circle0008.png');

}

function draw() {
  background(0);


  circle.velocity.x = (mouseX-circle.position.x)/10;
  circle.velocity.y = (mouseY-circle.position.y)/10;



  circle.debug = mouseIsPressed;

  drawSprites();
}
