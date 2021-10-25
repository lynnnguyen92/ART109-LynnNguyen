
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;

let puzzels = {
  "puzzel1": {"bx": 610,"by": 0, "width": 200, "height": 200, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzel2": {"bx": 610,"by": 210,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel3": {"bx": 610,"by": 420,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel4": {"bx": 820,"by": 0,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel5": {"bx": 820,"by": 210,"width": 200, "height": 200, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzel6": {"bx": 820,"by": 420,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel7": {"bx": 1030,"by": 00,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel8": {"bx": 1030,"by": 210,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel9": {"bx": 1030,"by": 420,"width": 200, "height": 200,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
}

function preload() {
  img1 = loadImage('images/e1-01.png');
  img2 = loadImage('images/e2-01.png');
  img3 = loadImage('images/e3-01.png');
  img4 = loadImage('images/e4-01.png');
  img5 = loadImage('images/e5-01.png');
  img6 = loadImage('images/e6-01.png');
  img7 = loadImage('images/e7-01.png');
  img8 = loadImage('images/e8-01.png');
  img9 = loadImage('images/e9-01.png');
}

function setup() {
  createCanvas( 1500,1500);


;
  img1.loadPixels();
  img2.loadPixels();
  img3.loadPixels();
  img4.loadPixels();
  img5.loadPixels();
  img6.loadPixels();
  img7.loadPixels();
  img8.loadPixels();
  img9.loadPixels();


}

function draw() {
   background(0);
   clear();
  rect(0, 0, 600, 600);
  stroke(50);
  strokeWeight(5);
  noFill();

  // check for mouse over images
  for (const [key, value] of Object.entries(puzzels)) {
    if (
      mouseX > value.bx &&
      mouseX < value.bx + value.width &&
      mouseY > value.by &&
      mouseY < value.by + value.height

    ) {
      value.overBox = true;
    } else {
      value.overBox = false;
    }
  }

  // draw images
  for (const [key, value] of Object.entries(puzzels)) {
    if (key == "puzzel1") {
      image(img1, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel2") {
      image(img2, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel3") {
      image(img3, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel4") {
      image(img4, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel5") {
      image(img5, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel6") {
      image(img6, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel7") {
      image(img7, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel8") {
      image(img8, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzel9") {
      image(img9, value.bx, value.by, value.width, value.height);
    }

  }
}

function mousePressed() {
  for (const [key, value] of Object.entries(puzzels)) {
    if (value.overBox) {
      value.locked = true;
    } else {
      value.locked = false;
    }
    value.xOffset = mouseX - value.bx;
    value.yOffset = mouseY - value.by;
  }
}

function mouseDragged() {
  for (const [key, value] of Object.entries(puzzels)) {
    if (value.locked) {
      value.bx = mouseX - value.xOffset;
      value.by = mouseY - value.yOffset;
    }
  }
}

function mouseReleased() {
  for (const [key, value] of Object.entries(puzzels)) {
    value.locked = false;
  }
}
