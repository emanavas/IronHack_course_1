

    const canvas = document.getElementById('bg_webapp_icons');
    // Get the canvas element from the DOM
    const ctx = canvas.getContext('2d');
    // Get the 2D drawing context of the canvas
    canvas.width = window.innerWidth;
    // Set the canvas width to the window's inner width
    canvas.height = window.innerHeight;
    
    let dots = [];
    const DOT_RADIUS = 50;
    const DOT_COUNT = Math.min(canvas.width, canvas.height) * 0.01;
    const DOT_SPEED = 0.2;
    const icon_params = {
        MAX_SPEED : 0.1,
        MIN_SPEED : 0.05,
        MAX_ALPHA : 0.3,
        MIN_ALPHA : 0.2,
        MAX_SIZE : Math.floor(canvas.width * 0.05),
        MIN_SIZE : Math.floor(canvas.width * 0.03),
    }

    const icons_paths = [
        '/assets/techs/bootstrap.svg',
        '/assets/techs/c.svg',
        '/assets/techs/css3.svg',
        '/assets/techs/docker.svg',
        '/assets/techs/expresar-js.svg',
        '/assets/techs/git.svg',
        '/assets/techs/html-5.svg',
        '/assets/techs/jquery.svg', 
        '/assets/techs/js.svg',
        '/assets/techs/mongodb.svg',
        '/assets/techs/mysql.svg',
        '/assets/techs/ngp.svg',
        '/assets/techs/nodejs.svg',
        '/assets/techs/python.svg',
        // electronics
        '/assets/techs/kicad.svg',
        '/assets/techs/arduino.svg',
        '/assets/techs/altiumdesigner.svg',

    ];

    let icons = [];

    function clamp(val, min, max) {
        return val > max ? max : val < min ? min : val;
    }


    function initDots() {
        for (let i = 0; i < DOT_COUNT; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speed = Math.random() * DOT_SPEED;
            const direction = Math.random() * Math.PI * 2;
            dots.push({ x, y, speed, direction });
        }
    }
    
    function drawDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < DOT_COUNT; i++) {
            const dot = dots[i];
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgb(30, 255, 255, ' + (Math.sin((dot.x + dot.y) * 0.01) * 0.5 + 0.5) + ')';
            ctx.fill();
            dot.x += Math.cos(dot.direction) * dot.speed;
            dot.y += Math.sin(dot.direction) * dot.speed;
        }
    }

    // --------------------------------------------------------------

    // function to show icons on the canvas
    function iniIcons() {
        for (let i = 0; i < icons_paths.length; i++) {
            const icon = new Image();
            icon.src = icons_paths[i];
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speed = Math.random() * (icon_params.MAX_SPEED - icon_params.MIN_SPEED) + icon_params.MIN_SPEED; // Set the speed of the icon
            const size = Math.floor(Math.random() * (icon_params.MAX_SIZE - icon_params.MIN_SIZE)) + icon_params.MIN_SIZE; // Set the size of the icon
            icon.onload = function() {
                const alpha = 0;
                const max_alpha = Math.random() * (icon_params.MAX_ALPHA - icon_params.MIN_ALPHA) + icon_params.MIN_ALPHA; // Set the transparency of the icon
                ctx.globalAlpha = alpha; // Set the transparency of the icon        const speed = Math.floor(Math.random() * (icon_params.MAX_SPEED - icon_params.MIN_SPEED)) + icon_params.MIN_SPEED;
                const direction = Math.random() * Math.PI * 2;
                ctx.drawImage(icon, x, y, 50, 50); // Draw the icon at a random position
                icons.push({ icon, x, y, speed, direction, alpha, size: size,  max_alpha: max_alpha, alpha_dir: 1, collision: false });
            };
        }
    }
    // Function to draw the icons on the canvas
    function moveIcons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < icons.length; i++) {
            const icon = icons[i].icon;

            // Handle alpha changes
            if (icons[i].alpha >= icons[i].max_alpha) {
                icons[i].alpha_dir = -1; // Change the direction of the alpha value to decrease it
            } else if (icons[i].alpha <= 0 && icons[i].alpha_dir == -1) {
                icons[i].x = Math.random() * canvas.width; // Set the x position of the icon to a random value
                icons[i].y = Math.random() * canvas.height; // Set the y position of the icon to a random value
                icons[i].alpha_dir = 1; // Change the direction of the alpha value to increase it
                icons[i].direction = Math.random() * Math.PI * 2; // Set the direction of the icon to a random value
                const size = Math.floor(Math.random() * (icon_params.MAX_SIZE - icon_params.MIN_SIZE)) + icon_params.MIN_SIZE; // Set the size of the icon
                icons[i].size = size;
            }
            
            icons[i].alpha += 0.0005 * icons[i].alpha_dir; // Decrease the alpha value to make the icon fade out
            icons[i].alpha = clamp(icons[i].alpha, 0, icons[i].max_alpha); // Clamp the alpha value to be between 0 and max_alpha
            // Update position
            icons[i].x += Math.cos(icons[i].direction) * icons[i].speed;
            icons[i].y += Math.sin(icons[i].direction) * icons[i].speed;

            // Collision detection with canvas boundaries
            if (icons[i].x <= 0 || icons[i].x + 50 >= canvas.width) {
                icons[i].direction = Math.PI - icons[i].direction; // Reverse horizontal direction
            }
            if (icons[i].y <= 0 || icons[i].y + 50 >= canvas.height) {
                icons[i].direction = -icons[i].direction; // Reverse vertical direction
            }

            // Draw the icon
            ctx.globalAlpha = icons[i].alpha; // Set the transparency of the icon
            ctx.drawImage(icon, icons[i].x, icons[i].y, icons[i].size, icons[i].size); // Draw the icon at its current position
        }
    }

    //initDots();
    //setInterval(drawDots, 16);
    iniIcons();
    // call the drawIcons function to draw the icons on the canvas
    setInterval( moveIcons, 5);
