'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // RAW DATA USED IN THE SIMULATION
    const angle = [0.3, 1.2, 2.1, 2.7, 3.6, 4.5, 5.4, 6.3, 7.2, 8.1, 9, 9.9, 10.8, 11.7, 12.6, 13.5, 14.4, 18, 27, 36, 45, 51, 60, 150, 240, 600, 1500, 1800, 1887];
    const torque = [0.2, 0.9, 1.7, 2.2, 3.1, 3.8, 4.6, 4.8, 5.3, 5.5, 5.6, 6, 5.8, 5.9, 5.8, 5.9, 5.9, 5.8, 5.8, 5.8, 5.9, 6, 6, 6.3, 6.3, 6.3, 6.4, 6.5, 6.5];

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function() { restart(); });

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', function() { play(); });

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function() { pause(); });

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        FPS = originalFPS * (output.innerHTML);
        restart();
    };

    function setAll() {
        step = 0;
        coordinates = [];
        flag = 0;
        currentAngle = 0;
        document.getElementById("angle").innerHTML = "0.0 deg";
        document.getElementById("torque").innerHTML = "0.0 N-m";
    }

    function restart() {
        window.clearTimeout(tmHandle);
        setAll();
        graph();
        play();
    }

    function play() {
        tmHandle = window.setTimeout(draw, 1000 / FPS);
        pauseButton.removeAttribute("disabled");
        restartButton.removeAttribute("disabled");
        playButton.setAttribute("disabled", "true");
    }

    function pause() {
        window.clearTimeout(tmHandle);
        pauseButton.setAttribute("disabled", "true");
        playButton.removeAttribute("disabled");
    }

    function drawObject(ctx, obj, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(obj[0][0], obj[0][1]);

        for (let i = 0; i < obj.length; ++i) {
            const next = (i + 1) % obj.length;
            ctx.lineTo(obj[next][0], obj[next][1]);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }


    const canvas = document.getElementById("main");
    canvas.width = 600;
    canvas.height = 100;
    canvas.style = "border:3px solid;";
    const ctx = canvas.getContext("2d");

    const fill = data.colors.rod;
    const lineWidth = 1.5;
    const originalFPS = 10;
    let FPS = 10;
    let tmHandle;

    const mid = 50;
    const startX = 50;
    const radius = 20;
    let currentAngle = 0;
    // heights starting from the left side 
    const ht = [20, 10, 25, 10, 15, 8, 13, 15, 13, 25, 6, 2, 6, 23];
    const width = [0, 10, 50, 100, 220, 230, 380, 395, 405, 410, 430, 435, 465, 470, 490];
    let flag = 0;

    const rod1 = [
        [startX + width[10], mid + 17],
        [startX + width[13], mid + 17],
        [startX + width[13], mid + 15],
        [startX + width[10], mid + 15]
    ];

    const rod2 = [
        [startX + width[10], mid - 17],
        [startX + width[13], mid - 17],
        [startX + width[13], mid - 15],
        [startX + width[10], mid - 15]
    ];

    const brokenRodPart1 = [
        [startX + width[5], mid - ht[5]],
        [startX + width[5] + 95, mid - ht[5]],
        [startX + width[6] - 50, mid + ht[5]],
        [startX + width[5], mid + ht[5]]
    ];

    const brokenRodPart2 = [
        [startX + width[5] + 100, mid - ht[5]],
        [startX + width[6], mid - ht[5]],
        [startX + width[6], mid + ht[5]],
        [startX + width[6] - 45, mid + ht[5]]
    ];
    let coordinates = [];
    let chart = [];
    let step = 0;

    graph();
    drawStatic();


    function drawOval() {
        ctx.beginPath();
        ctx.scale(0.5, 1);
        ctx.arc(1000, 50, 9, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = data.colors.bg;
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = fill;
    }


    function draWheel(angle) {
        ctx.beginPath();
        ctx.arc(startX + 75, 50, radius, 0, 2 * Math.PI);
        ctx.moveTo(startX + 75, 50);
        let dx = Math.cos(angle) * radius;
        let dy = Math.sin(angle) * radius;
        ctx.lineTo(startX + 75 + dx, 50 + dy);

        ctx.moveTo(startX + 75, 50);
        dx = Math.cos(90 + angle) * radius;
        dy = Math.sin(90 + angle) * radius;
        ctx.lineTo(startX + 75 + dx, 50 + dy);

        ctx.moveTo(startX + 75, 50);
        dx = Math.cos(180 + angle) * radius;
        dy = Math.sin(180 + angle) * radius;
        ctx.lineTo(startX + 75 + dx, 50 + dy);

        ctx.stroke();
    }

    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = fill;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        let j = 0;

        while (j < 15) {
            let curr = [
                [startX + width[j], mid - ht[j]],
                [startX + width[j + 1], mid - ht[j]],
                [startX + width[j + 1], mid + ht[j]],
                [startX + width[j], mid + ht[j]]
            ]
            if (flag === 1) {

                if (j === 5) {
                    drawObject(ctx, brokenRodPart1, data.colors.rod1);
                    drawObject(ctx, brokenRodPart2, data.colors.rod1);
                    j++;
                    continue;
                }
            }
            if (j === 2 || j === 5 || j === 9 || j === 13) {
                drawObject(ctx, curr, data.colors.rod1);
            } else {
                drawObject(ctx, curr, data.colors.rod);
            }
            j++;
        }

        drawObject(ctx, rod1, data.colors.rod);
        drawObject(ctx, rod2, data.colors.rod);
        drawOval();
        draWheel(currentAngle);
    }

    function draw() {
        drawStatic();

        if (step < angle.length) {
            updateChart();
        }

        currentAngle += 0.05;

        if (currentAngle <= 1.5) {
            tmHandle = window.setTimeout(draw, 1000 / FPS);
        } else {
            if (flag === 0) {
                flag = 1;
                draw();
            }
        }
    }


    function graph() {

        chart = [{
            x: [0],
            y: [0],
            type: 'lines+markers'
        }];

        let layout = {
            title: {
                text: "Torque v/s Angle"
            },
            yaxis: {
                title: "Torque (N-m)"
            },
            xaxis: {
                title: "Angle (deg)"
            },
        };
        Plotly.newPlot(chartContainer, chart, layout);
    }



    function updateChart() {

        let x = angle[step];
        let y = torque[step];
        document.getElementById("angle").innerHTML = angle[step].toString() + " Mpa";
        document.getElementById("torque").innerHTML = torque[step].toString();
        if (step < angle.length) {
            chart[0]['x'].push(x);
            chart[0]['y'].push(y);
            Plotly.redraw(chartContainer);
            step++;
        }
    }
});