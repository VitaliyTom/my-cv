const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = (canvas.width = innerWidth);
let h = (canvas.height = innerHeight);

window.onresize = resize;
function resize() {
	w = canvas.width = innerWidth;
	h = canvas.height = innerHeight;
}

let timer = 0;

const imageSnow = new Image();
imageSnow.src = '../../src/img/snow.png';

const imageSnowTwo = new Image();
imageSnowTwo.src = '../../src/img/snow2.png';

const imageSnowThree = new Image();
imageSnowThree.src = '../../src/img/snow3.png';

imageSnow.onload = () => {
	initSnowflake();
};

// snowflake
const snowflakes = [];
const maxSnowflake = w > 550 ? 20 : 30;

const optsSnow = {
	maxSpeed: w > 550 ? 1.5 : 0.004,
	maxSpeedCoefficient: w > 550 ? 0.5 : 1.8
};

class Snowflake {
	constructor() {
		this.x = Math.floor(Math.random() * (w + 1) - 1);
		this.y = -25;
		this.speedX = Math.random() * (optsSnow.maxSpeed + optsSnow.maxSpeedCoefficient) - 1;
		this.speedY = Math.random() * (optsSnow.maxSpeed + 1.5) - 0.5;
		this.angle = 0;
		this.speedAngle = Math.random() * (0.03 - 0.005);
		this.imgSnowflake = Math.round(Math.random() * 2);
		this.urlImageOne = imageSnow;
		this.urlImageTwo = imageSnowTwo;
		this.urlImageFour = imageSnowThree;
	}

	position(i) {
		if (this.x > w || this.x <= -20 || this.y > h) {
			snowflakes.splice(i, 1);
		} else {
			this.x += this.speedX;
			this.y += this.speedY < 0.8 ? this.speedY + 1.4 : this.speedY;
		}

		this.angle += this.speedX >= 0 ? this.speedAngle : -this.speedAngle;
	}

	drawSnowflake(snowflakes) {
		ctx.save();
		ctx.translate(this.x + 10, this.y + 10);
		ctx.rotate(this.angle);
		ctx.drawImage(
			snowflakes.imgSnowflake === 0
				? snowflakes.urlImageOne
				: snowflakes.imgSnowflake === 1 ? snowflakes.urlImageTwo : snowflakes.urlImageFour,
			-10,
			-10,
			20,
			20
		);
		ctx.restore();
	}
}

function reDrawBg() {
	ctx.clearRect(0, 0, w, h);
}

function reDrawSnowflake() {
	for (const i in snowflakes) {
		snowflakes[i].position(i);
		if (snowflakes[i]) {
			snowflakes[i].drawSnowflake(snowflakes[i]);
		}
	}
}

function updateSnowflake() {
	timer++;
	if (timer % maxSnowflake === 0) {
		snowflakes.push(new Snowflake());
	}
	reDrawBg();
	reDrawSnowflake();
	window.requestAnimationFrame(updateSnowflake);
}

function initSnowflake() {
	updateSnowflake();
}
