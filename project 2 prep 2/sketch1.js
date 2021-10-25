
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
  "puzzel1": {"bx": 70,"by": 50, "width": 100, "height": 120, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzel2": {"bx": 100,"by": 550,"width": 100, "height": 90,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel3": {"bx": 200,"by": 250,"width": 103, "height": 90,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel4": {"bx": 700,"by": 350,"width": 85, "height": 120,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel5": {"bx": 800,"by": 450,"width": 85, "height": 120, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzel6": {"bx": 500,"by": 300,"width": 100, "height": 100,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel7": {"bx": 570,"by": 300,"width": 120, "height": 90,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel8": {"bx": 600,"by": 400,"width": 100, "height": 120,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzel9": {"bx": 200,"by": 500,"width": 100, "height": 100,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
}

function preload() {
  img1 = loadImage('images/puzzel1-02.png');
  img2 = loadImage('images/puzzel2-02.png');
  img3 = loadImage('images/puzzel3-02.png');
  img4 = loadImage('images/puzzel4-02.png');
  img5 = loadImage('images/puzzel5-02.png');
  img6 = loadImage('images/puzzel6-02.png');
  img7 = loadImage('images/puzzel7-02.png');
  img8 = loadImage('images/puzzel8-02.png');
  img9 = loadImage('images/puzzel9-02.png');
}

function setup() {
  createCanvas( 1000, 700);

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
