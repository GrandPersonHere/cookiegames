const canvas = document.getElementById('cookieCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Cookie image
const cookieImg = new Image();
cookieImg.src = '/Imgs/cookie.webp'; // Simple cookie-like image (a brown circle)

class Cookie {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = 20 + Math.random() * 30;
        this.speed = 1 + Math.random() * 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;

        if (this.y > height) {
            this.reset();
            this.y = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(cookieImg, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

const cookies = [];
const numCookies = 30;

// Initialize cookies after the image has loaded
cookieImg.onload = () => {
    for (let i = 0; i < numCookies; i++) {
        cookies.push(new Cookie());
    }
    animate();
};

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let cookie of cookies) {
        cookie.update();
        cookie.draw(ctx);
    }
    requestAnimationFrame(animate);
}
