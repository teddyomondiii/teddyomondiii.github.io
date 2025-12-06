document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    canvas.id = "snow-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.vy = 1 + Math.random() * 3;
            this.vx = 0.5 - Math.random();
            this.r = 1 + Math.random() * 2;
            this.o = 0.5 + Math.random() * 0.5;
        }

        update() {
            this.y += this.vy;
            this.x += this.vx;

            if (this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.o})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(loop);
    }

    window.addEventListener("resize", function () {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    init();
});
