let img;
let vid;
let theta = 0;

function setup() {
  createCanvas(1000, 700, WEBGL);
  img1 = loadImage('images/mars.jpg');
  img2 = loadImage('images/venus.jpg');
  vid = createVideo(['images/world2.mp4']);
  vid.elt.muted = true;
  vid.loop();
  vid.hide();

}

function draw() {

  background(0);
  translate(0, 0, 0);
  push();

  rotateZ(theta * mouseX * 0.0001);
  rotateX(theta * mouseX * 0.0001);
  rotateY(theta * mouseX * 0.0001);
  noStroke();
  texture(vid);
  sphere(200);
  pop();

  translate(300, 80, 0);
  push();
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  texture(img1);
  noStroke();
  sphere(50);
  texture(img2);
  noStroke();
  sphere(30);
  pop();

  push();
  texture(img2);
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  ellipse(0,100,50);
  ellipse(-500,100,50);
  ellipse(0,-200,50);
  ellipse(-600,-200,50);
  ellipse(-300,-200,50);
  ellipse(-500,500,50);

  pop();

  theta += 0.05;

  console.log(theta)

}
