// Create a Konva stage
var stage = new Konva.Stage({
    container: 'container', // ID of container <div>
    width: window.innerWidth,
    height: window.innerHeight,
});

// Create a layer
var layer = new Konva.Layer();
stage.add(layer);

// Array to hold the dots
var dots = [];

// Function to generate a random color
function getRandomColor() {
    const colors = [
        'rgba(255, 223, 186, 0.7)', // Light peach
        'rgba(186, 255, 223, 0.5)', // Light mint
        'rgba(186, 223, 255, 0.5)', // Light blue
        'rgba(255, 182, 193, 0.5)', // Light pink (LightPink)
        'rgba(255, 204, 204, 0.5)', // Light red (LightCoral)
        'rgba(255, 228, 196, 0.5)', // Bisque
        'rgba(173, 255, 47, 0.5)',  // Green Yellow
        'rgba(255, 215, 0, 0.5)',    // Gold
        'rgba(135, 206, 250, 0.5)',  // Sky blue
        'rgba(100, 149, 237, 0.5)',  // Cornflower blue
        'rgba(255, 105, 180, 0.5)',  // Hot pink
        'rgba(255, 140, 0, 0.5)',    // Dark orange
        'rgba(255, 165, 0, 0.5)',    // Orange
        'rgba(144, 238, 144, 0.5)',  // Light green
        'rgba(60, 179, 113, 0.5)',   // Medium sea green
        'rgba(34, 139, 34, 0.5)',    // Forest green
        'rgba(221, 160, 221, 0.5)',  // Plum
        'rgba(255, 99, 71, 0.5)',    // Tomato
        'rgba(255, 228, 196, 0.5)',  // Bisque
        'rgba(255, 182, 193, 0.5)',  // Light pink
        'rgba(255, 228, 181, 0.6)',  // Light apricot
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create a dot with random velocity
function createDot() {
    var dot = new Konva.Circle({
        x: Math.random() * stage.width(),
        y: Math.random() * stage.height(),
        radius: Math.random() * 20 + 10, // Random radius between 10 and 30
        fill: getRandomColor(), // Use random color
        draggable: true,
    });

    // Assign random velocity with reduced range
    dot.velocityX = (Math.random() - 0.5) * 1; // Random velocity in x direction (slower)
    dot.velocityY = (Math.random() - 0.5) * 1; // Random velocity in y direction (slower)

    // Add animation for scaling while dragging
    dot.on('dragmove', function () {
        this.scale({ x: 1.2, y: 1.2 }); // Scale up while dragging
        layer.batchDraw();
    });

    dot.on('dragend', function () {
        this.scale({ x: 1, y: 1 }); // Reset scale after dragging
        layer.batchDraw();
    });

    layer.add(dot);
    dots.push(dot); // Store the dot in the array
}

// Create multiple dots
for (var i = 0; i < 50; i++) {
    createDot();
}

// Function to check for collisions between two dots
function checkCollision(dot1, dot2) {
    const dx = dot1.x() - dot2.x();
    const dy = dot1.y() - dot2.y();
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = dot1.radius() + dot2.radius();
    return distance < minDistance;
}

// Function to handle collision response
function handleCollision(dot1, dot2) {
    const dx = dot1.x() - dot2.x();
    const dy = dot1.y() - dot2.y();
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the normal vector
    const normalX = dx / distance;
    const normalY = dy / distance;

    // Calculate the relative velocity
    const relativeVelocityX = dot1.velocityX - dot2.velocityX;
    const relativeVelocityY = dot1.velocityY - dot2.velocityY;

    // Calculate the velocity along the normal
    const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

    // Only resolve if the dots are moving towards each other
    if (velocityAlongNormal > 0) return;

    // Calculate restitution (bounciness)
    const restitution = 0.2; // Perfectly elastic collision

    // Calculate impulse scalar
    const impulseScalar = -(1 + restitution) * velocityAlongNormal;

    // Apply impulse to both dots
    dot1.velocityX += impulseScalar * normalX > 1.5 ? 1.5 : impulseScalar * normalX ;
    dot1.velocityY += impulseScalar * normalY > 1.5 ? 1.5 : impulseScalar * normalY;
    dot2.velocityX -= impulseScalar * normalX > 1.5 ? 1.5 : impulseScalar * normalX ;
    dot2.velocityY -= impulseScalar * normalY > 1.5 ? 1.5 : impulseScalar * normalY;
}

// Animation loop using Konva.Animation
var anim = new Konva.Animation(function() {
    dots.forEach(function(dot) { // Iterate over the stored dots
        // Update position based on velocity
        dot.x(dot.x() + dot.velocityX);
        dot.y(dot.y() + dot.velocityY);

        // Apply damping to slow down the movement
        dot.velocityX *= 0.9995; // Damping factor for x velocity
        dot.velocityY *= 0.9995; // Damping factor for y velocity

        // Keep the dots within the stage boundaries
        if (dot.x() < 0) {
            dot.x(0);
            dot.velocityX *= -1; // Reverse direction
        }
        if (dot.x() > stage.width()) {
            dot.x(stage.width());
            dot.velocityX *= -1; // Reverse direction
        }
        if (dot.y() < 0) {
            dot.y(0);
            dot.velocityY *= -1; // Reverse direction
        }
        if (dot.y() > stage.height()) {
            dot.y(stage.height());
            dot.velocityY *= -1; // Reverse direction
        }

        // Gradually change color
        if (!dot.targetColor) {
            dot.targetColor = getRandomColor(); // Set a new target color
            dot.colorTransitionFrames = 0; // Reset frame counter
        }

        // Interpolate color
        if (dot.colorTransitionFrames < 30) { // Change color over 30 frames
            dot.colorTransitionFrames++;
            const currentColor = dot.fill();
            const targetColor = dot.targetColor;

            // Extract RGBA values
            const currentRGBA = currentColor.match(/[\d.]+/g).map(Number);
            const targetRGBA = targetColor.match(/[\d.]+/g).map(Number);

            // Interpolate each channel
            const newRGBA = currentRGBA.map((c, i) => {
                return c + (targetRGBA[i] - c) / (30 - dot.colorTransitionFrames);
            });

            // Set the new color
            dot.fill;
        } else {
            dot.targetColor = null; // Reset target color after transition
        }
    });

    // Check for collisions between dots
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            if (checkCollision(dots[i], dots[j])) {
                handleCollision(dots[i], dots[j]); // Handle collision response
            }
        }
    }

    layer.batchDraw();
}, layer);

// Start the animation
anim.start(); 