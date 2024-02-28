var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const escala=.25;
ctx.scale(escala, escala);

var shootLasers= false;
var dx = 0;
var dy = 0;

var angle = 0;
var x = canvas.width / 2;
var y = canvas.height / 2;

var img = new Image();
img.src = 'ship.png';

var keys = {};
var bullets = [];

function moveForward() {
    x += 5 * Math.cos(angle * Math.PI / 180-Math.PI/2);
    y += 5 * Math.sin(angle * Math.PI / 180-Math.PI/2);
    if (x > canvas.width/escala) {
        x = 0;
    }else if(x < 0){
        x = canvas.width/escala;
    }
    if (y > canvas.height/escala) {
        y = 0;
    }else if(y < 0){
        y = canvas.height/escala;
    }
}

function moveShip() {
    x+=dx;
    y+=dy;
}

function drawShip() {
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
        ctx.save();
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

function fire() {
    if(bullets.length < 10){
        var bullet = {
            x: x+150*Math.cos(angle * Math.PI / 180-Math.PI/2),
            y: y+150*Math.sin(angle * Math.PI / 180-Math.PI/2),
            dx: 50 * Math.cos(angle * Math.PI / 180-Math.PI/2),
            dy: 50 * Math.sin(angle * Math.PI / 180-Math.PI/2)
        };
        bullets.push(bullet);
    }else{
        bullets.shift(); //remove the first bullet
        var bullet = {
            x: x+150*Math.cos(angle * Math.PI / 180-Math.PI/2),
            y: y+150*Math.sin(angle * Math.PI / 180-Math.PI/2),
            dx: 50 * Math.cos(angle * Math.PI / 180-Math.PI/2),
            dy: 50 * Math.sin(angle * Math.PI / 180-Math.PI/2)
        };
        bullets.push(bullet);
    }
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
    ctx.clearRect(0, 0, canvas.width/escala, canvas.height/escala);
    if (keys['a']) rotateLeft();
    if (keys['d']) rotateRight();
    if (keys['p']) fire();
    if (keys['w']) moveForward();
    moveShip();
    drawShip();
    drawBullets();
    requestAnimationFrame(animate);
};

img.onload = function() {
    animate();
};