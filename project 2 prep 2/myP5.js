let img;
let vid;
let theta = 0;

function setup() {
  createCanvas(710, 400, WEBGL);

  img = loadImage('images/ball0001.png');
  vid = createVideo(['images/world1.mp4']);
  vid.elt.muted = true;
  vid.loop();
  vid.hide();
}

function draw() {
  background(250);
  translate(0, 0, 0);
  push();
  rotateZ(theta * mouseX * 0.0001);
  rotateX(theta * mouseX * 0.0001);
  rotateY(theta * mouseX * 0.0001);
  noStroke();

  //pass image as texture
  texture(vid);
  sphere(150);
  pop();
  translate(220, 0, 0);
  push();
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  texture(img);
  box(100, 100, 100);
  pop();
  theta += 0.05;
}
