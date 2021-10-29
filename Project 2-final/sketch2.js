
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;

let img9;
let img10;
let img11;
let img12;
let img13;
let img14;
let img15;
let img16;

let mySound;

let puzzles = {
  "puzzle1": {"bx": 610,"by": 0, "width": 150, "height": 150, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzle2": {"bx": 610,"by": 155,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle3": {"bx": 610,"by": 310,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle4": {"bx": 610,"by": 465,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle5": {"bx": 770,"by": 155,"width": 150, "height": 150, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzle6": {"bx": 770,"by": 310,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle7": {"bx": 770,"by": 465,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle8": {"bx": 770,"by": 0,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle9": {"bx": 1090,"by": 155, "width": 150, "height": 150, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzle10": {"bx": 930,"by": 310,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle11": {"bx": 930,"by": 465,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle12": {"bx": 930,"by": 0,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle13": {"bx": 930,"by": 155,"width": 150, "height": 150, "overBox": false,  "locked": false, "xOffset": 0.0, "yOffset": 0.0,},
  "puzzle14": {"bx": 1090,"by": 310,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle15": {"bx": 1090,"by": 465,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},
  "puzzle16": {"bx": 1090,"by": 0,"width": 150, "height": 150,"overBox": false,  "locked": false,"xOffset": 0.0,"yOffset": 0.0,},

}

function preload() {
  img1 = loadImage('images/h-01.png');
  img2 = loadImage('images/h-02.png');
  img3 = loadImage('images/h-03.png');
  img4 = loadImage('images/h-04.png');
  img5 = loadImage('images/h-05.png');
  img6 = loadImage('images/h-06.png');
  img7 = loadImage('images/h-07.png');
  img8 = loadImage('images/h-08.png');
  img9 = loadImage('images/h-09.png');
  img10 = loadImage('images/h-10.png');
  img11 = loadImage('images/h-11.png');
  img12 = loadImage('images/h-12.png');
  img13 = loadImage('images/h-13.png');
  img14 = loadImage('images/h-14.png');
  img15 = loadImage('images/h-15.png');
  img16 = loadImage('images/h-16.png');
  soundFormats('mp3', 'ogg');
  mySound = loadSound('images/mixkit-arcade-game-jump-coin-216.wav');
}

function canvasPressed() {
  mySound.play();
}

function setup() {
  createCanvas( 1500,1500);


  img1.loadPixels();
  img2.loadPixels();
  img3.loadPixels();
  img4.loadPixels();
  img5.loadPixels();
  img6.loadPixels();
  img7.loadPixels();
  img8.loadPixels();
  img9.loadPixels();
  img10.loadPixels();
  img11.loadPixels();
  img12.loadPixels();
  img13.loadPixels();
  img14.loadPixels();
  img15.loadPixels();
  img16.loadPixels();


}

function draw() {
   background(0);
   clear();
  rect(0, 0, 600, 600);
  stroke(50);
  strokeWeight(5);
  noFill();

  // check for mouse over images
  for (const [key, value] of Object.entries(puzzles)) {
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
  for (const [key, value] of Object.entries(puzzles)) {
    if (key == "puzzle1") {
      image(img1, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle2") {
      image(img2, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle3") {
      image(img3, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle4") {
      image(img4, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle5") {
      image(img5, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle6") {
      image(img6, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle7") {
      image(img7, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle8") {
      image(img8, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle9") {
      image(img9, value.bx, value.by, value.width, value.height);
    }else if (key == "puzzle10") {
      image(img10, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle11") {
      image(img11, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle12") {
      image(img12, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle13") {
      image(img13, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle14") {
      image(img14, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle15") {
      image(img15, value.bx, value.by, value.width, value.height);
    } else if (key == "puzzle16") {
      image(img16, value.bx, value.by, value.width, value.height);
    }

  }
}

function mousePressed() {
  canvasPressed();
  for (const [key, value] of Object.entries(puzzles)) {
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
  for (const [key, value] of Object.entries(puzzles)) {
    if (value.locked) {
      value.bx = mouseX - value.xOffset;
      value.by = mouseY - value.yOffset;
    }
  }
}

function mouseReleased() {
  for (const [key, value] of Object.entries(puzzles)) {
    value.locked = false;
  }
}
