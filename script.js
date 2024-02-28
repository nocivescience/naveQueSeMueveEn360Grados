var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(.5, .5);

var angle = 0;
var x = canvas.width / 2;
var y = canvas.height / 2;

var img = new Image();
img.src = 'ship.png';

var keys = {};
var bullets = [];

function drawShip() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
}

function drawBullets(){
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

function fire() {
    var bullet = {
        x: x+150*Math.cos(angle * Math.PI / 180-Math.PI/2),
        y: y+150*Math.sin(angle * Math.PI / 180-Math.PI/2),
        dx: 50 * Math.cos(angle * Math.PI / 180-Math.PI/2),
        dy: 50 * Math.sin(angle * Math.PI / 180-Math.PI/2)
    };
    bullets.push(bullet);
    // var radian = angle * Math.PI / 180;
    // bullets.push({
    //     x: x,
    //     y: y,
    //     dx: Math.cos(radian) * 5,
    //     dy: Math.sin(radian) * 5
    // });
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
    if (keys['p']) fire();
    drawShip();
    drawBullets();
    requestAnimationFrame(animate);
};

img.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animate();
};