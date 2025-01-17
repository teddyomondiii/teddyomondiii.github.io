document.addEventListener("DOMContentLoaded", function() {
    const name = document.getElementById("name"); // Get the name element
// Create the canvas for the background
    const canvas = document.createElement("canvas");
    canvas.id = "backgroundCanvas";
    document.body.appendChild(canvas); // Append the canvas to the body

    const ctx = canvas.getContext("2d");

    // Set canvas size to cover the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const spheres = [];
    const numSpheres = 220; // Number of spheres

    // Create multiple spheres with different properties
    for (let i = 0; i < numSpheres; i++) {
        spheres.push({
            angle: Math.random() * 2 * Math.PI,
            radius: 100 + Math.random() * 50, // Randomize radius
            centerX: Math.random() * canvas.width,
            centerY: Math.random() * canvas.height,
            speed: 0.01 + Math.random() * 0.02, // Randomize speed
            originalCenterX: Math.random() * canvas.width,
            originalCenterY: Math.random() * canvas.height
        });
    }

    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each sphere
        spheres.forEach(sphere => {
            const x = sphere.centerX + sphere.radius * Math.cos(sphere.angle);
            const y = sphere.centerY + sphere.radius * Math.sin(sphere.angle);

            drawSphere(x, y);

            sphere.angle += sphere.speed;
            if (sphere.angle >= 2 * Math.PI) {
                sphere.angle = 0;
            }
        });

        requestAnimationFrame(drawBackground);
    }

    function drawSphere(x, y) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }

    drawBackground();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    console.log('DOM fully loaded and parsed');
});
