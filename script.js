var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var angle = 0;
var x = canvas.width / 2;
var y = canvas.height / 2;

var img = new Image();
img.src = 'ship.png';

var keys = {};

function drawShip() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
}

function rotateLeft() {
    angle += 1;
}

function rotateRight() {
    angle -= 1;
}

document.onkeydown = document.onkeyup = function(e) {
    keys[e.key] = e.type == 'keydown'; // true for keydown, false for keyup
};

var animate = function() {
    if (keys['a']) rotateLeft();
    if (keys['d']) rotateRight();
    drawShip();
    requestAnimationFrame(animate);
};

img.onload = function() {
    animate();
};