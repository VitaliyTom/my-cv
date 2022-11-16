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
let lastTime = 0;
let timeStart = 0;
// let dt;

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
// const maxSnowflake = w > 550 ? 10 : 30;
const maxSnowflake = w > 550 ? 10 : 20;

const optsSnow = {
	// maxSpeed: w > 550 ? 0.1 : 0.004,
	maxSpeed: 0.1,
	maxSpeedCoefficient: w > 550 ? 0.5 : 1.8
};

class Snowflake {
	constructor() {
		this.x = Math.floor(Math.random() * (w + 1) - 1);
		this.y = -25;
		this.speedX = Math.random() * optsSnow.maxSpeed + 0.05 - optsSnow.maxSpeed;
		this.speedY = Math.random() * optsSnow.maxSpeed;
		this.angle = 0;
		this.speedAngle = (Math.random() * 0.005) - 0.005;
		this.imgSnowflake = Math.round(Math.random() * 2);
		this.urlImageOne = imageSnow;
		this.urlImageTwo = imageSnowTwo;
		this.urlImageFour = imageSnowThree;
	}

	position(i, dt) {
		if (this.x > w || this.x <= -20 || this.y > h) {
			snowflakes.splice(i, 1);
			// snowflakes[i].x = Math.floor(Math.random() * (w + 1) - 1)
			// snowflakes[i].y = -25
			// console.log(this.x)
		} else {
			this.x += this.speedX * dt;
			this.y += this.speedY * dt < 0.8 ? this.speedY * dt + 1.4 : this.speedY * dt;
		}

		this.angle += this.speedX * dt > 0 ? this.speedAngle * dt + 0.1 : -this.speedAngle * dt - 0.1;

		lastTime = timeStart;
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

function reDrawSnowflake(dt) {
	for (const i in snowflakes) {
		snowflakes[i].position(i, dt);
		if (snowflakes[i]) {
			snowflakes[i].drawSnowflake(snowflakes[i]);
		}
	}
}

function updateSnowflake() {
	const timeStamp = performance.now();
	timeStart = Math.round(timeStamp * 100 / 100);
	const dt = timeStart - lastTime;

	// console.log('timeStart:', timeStart);
	// console.log('lastTime:', lastTime);
	// console.log('dt:', dt);

	timer++;
	if (timer % maxSnowflake === 0) {
		snowflakes.push(new Snowflake());
	}
	reDrawBg();
	reDrawSnowflake(dt);
	// console.log('snowflakes = ', snowflakes.length);
	window.requestAnimationFrame(updateSnowflake);
}
// const
function initSnowflake() {
	// for (let index = 0; index < 10000; index++) {
	// 	snowflakes.push(new Snowflake())

	// }
	updateSnowflake();
}
