document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-menu ul li a");
    const sections = document.querySelectorAll(".section");
    const navMenu = document.querySelector(".nav-menu");
    const name = document.getElementById("name"); // Get the name element
    const homeContainer = document.getElementById("home-container"); // Home container
    const container = document.getElementById("container"); // Other pages container

    // Create the canvas for the background
    const canvas = document.createElement("canvas");
    canvas.id = "backgroundCanvas";
    document.body.appendChild(canvas); // Append the canvas to the body

    const ctx = canvas.getContext("2d");

    // Set canvas size to cover the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const spheres = [];
    const numSpheres = 50; // Number of spheres

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

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Check if the clicked section is already active
            if (targetSection.classList.contains("active")) {
                return; // Do nothing if the section is already active
            }

            // Hide all sections
            sections.forEach(section => {
                if (section.id !== targetId) {
                    section.style.top = "100%";
                    section.classList.remove("active");
                }
            });

            // Show the target section
            targetSection.style.top = "0";
            targetSection.classList.add("active");

            // Update navigation menu position
            if (targetId !== "home") {
                navMenu.style.position = "fixed";
                navMenu.style.top = "0";
                navMenu.style.bottom = "unset";
            } else {
                navMenu.style.position = "absolute";
                navMenu.style.bottom = "10px";
                navMenu.style.top = "unset";
            }

            // Handle name visibility
            if (targetId !== "home") {
                name.style.opacity = "0";
                setTimeout(() => {
                    name.style.display = "none";
                }, 500);
            } else {
                name.style.display = "block";
                setTimeout(() => {
                    name.style.opacity = "1";
                }, 50);
            }

            // Show or hide containers
            if (targetId === "home") {
                homeContainer.style.display = "flex";
                container.style.display = "none";
            } else {
                homeContainer.style.display = "none";
                container.style.display = "flex";
            }

            // Update active state in navigation
            links.forEach(navLink => {
                navLink.parentElement.classList.remove("active");
            });
            this.parentElement.classList.add("active");
        });
    });

    // Initial setup
    document.querySelector("#home").classList.add("active");
    homeContainer.style.display = "flex";
    container.style.display = "none";
});

