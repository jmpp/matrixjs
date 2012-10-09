var requestAnimFrame = (function() {
	return	window.requestAnimationFrame 		||
			window.webkitRequestAnimationFrame 	||
			window.mozRequestAnimationFrame 	||
			window.oRequestAnimationFrame 		||
			window.msRequestAnimationFrame 		||
			function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				window.setTimeout(callback, 1000/60);
			};
})();

function getScreenSize() {
	return {
		width : window.innerWidth   || document.documentElement.clientWidth	|| document.body.clientWidth,
		height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	}
}

var screenSize = getScreenSize();
var WIDTH = screenSize.width;
var HEIGHT = screenSize.height;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

var columnWidth = 14;
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456879'.match(/.{1}/g);
var letters = [];

function init() {
	// Initializing code letters for falling
	for (var i = 0, c = chars.length; i < c; i++) {
		letters.push({
			chr  : chars[i],
			x    : columnX(),
			y    : 0,
			s    : Math.random() * 8 + 3,
			col  : Math.random() > 0.9 ? '#fff' : '#0f0'
		});
	}
}

function update() {
	for (var i = 0, c = letters.length; i < c; i++) {
		letters[i].y += letters[i].s;
		letters[i].chr = chars[ parseInt(Math.random() * chars.length) ];

		if (letters[i].y > HEIGHT) {
			letters[i].x = columnX();
			letters[i].y = 0;
			letters[i].s = Math.random() * 8 + 3;
			letters[i].col = Math.random() > 0.9 ? '#fff' : '#0f0'
		}
	}
}

function render() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	for (var i = 0, c = letters.length; i < c; i++) {
		ctx.fillStyle = letters[i].col;
		ctx.font = '20pt matrix_code_nfiregular';
		ctx.fillText(letters[i].chr, letters[i].x, letters[i].y);
	}
}

function run() {
	update();
	render();

	requestAnimFrame(run);
}

init();
run();

function columnX() {
	var totalColumns = Math.floor(WIDTH / columnWidth);
	return columnWidth * Math.floor(Math.random() * totalColumns);
}

addEventListener('resize', function() {
	var screenSize = getScreenSize();
	WIDTH = screenSize.width;
	HEIGHT = screenSize.height;

	ctx.save();
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx.restore();
}, false);