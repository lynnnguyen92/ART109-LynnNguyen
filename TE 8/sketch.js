var width, height, center;
var points = 200;
var smooth = true;
var path = new Path();
var mousePos = view.center/2;
var pathHeight = mousePos.y;



var path = new Path.Circle({
    center: view.center,
    radius: 100
});

var stops = [
    ['yellow', 0.2],
    ['orange', 0.3],
    ['red', 0.5],
    ['black', 1]

];

var gradient = new Gradient(stops, true);
var from = path.position;
var to = path.position + [600, 0];

// Create the gradient color:
var gradientColor = new Color(gradient, from, to);
path.fillColor = gradientColor;

initializePath();

function initializePath() {
	center = view.center;
	width = view.size.height;
	height = view.size.width;
	path.segments = [];
	path.add(view.bounds.topLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(view.bounds.topRight);
	path.fullySelected = true;

}

function onFrame(event) {

	pathHeight += (center.y - mousePos.y - pathHeight) / 10;
	for (var i = 1; i < points; i++) {
		var sinSeed = event.count + (i + i % 10) * 200;
		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 120)* sinHeight + height;
		path.segments[i].point.y = yPos;
	}
	if (smooth)
		path.smooth({ type: 'continuous' });

}

function onMouseMove(event) {
	mousePos = event.point;
}

function onMouseDown(event) {
	smooth = !smooth;
	if (!smooth) {
		// If smooth has been turned off, we need to reset
		// the handles of the path:
		for (var i = 0, l = path.segments.length; i < l; i++) {
			var segment = path.segments[i];
			segment.handleIn = segment.handleOut = null;
		}
	}
}
