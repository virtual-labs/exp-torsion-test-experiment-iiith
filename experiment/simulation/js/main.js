'use strict';

document.addEventListener('DOMContentLoaded', function(){

	const angle = [0.3 , 1.2 , 2.1 , 2.7 , 3.6 , 4.5 , 5.4 , 6.3 , 7.2 , 8.1 , 9 , 9.9 , 10.8 , 11.7 , 12.6 , 13.5 , 14.4 , 18 , 27 , 36 , 45 , 51 , 60 , 150 , 240 , 600 , 1500 , 1800 , 1887];
	const torque = [0.2 , 0.9 , 1.7 , 2.2 , 3.1 , 3.8 , 4.6 , 4.8 , 5.3 , 5.5 , 5.6 , 6 , 5.8 , 5.9 , 5.8 , 5.9 , 5.9 , 5.8 , 5.8 , 5.8 , 5.9 , 6 , 6 , 6.3 , 6.3 , 6.3 , 6.4 , 6.5 , 6.5];
	const charts = [{xx:0.0,yy:0.0},{xx:0.3,yy:0.2},{xx:1.2,yy:0.9},{xx:2.1,yy:1.7},{xx:2.7,yy:2.2},{xx:3.6,yy:3.1},{xx:4.5,yy:3.8},{xx:5.4,yy:4.6},{xx:6.3,yy:4.8},{xx:7.2,yy:5.3},{xx:8.1,yy:5.5},{xx:9,yy:5.6},{xx:9.9,yy:6},{xx:10.8,yy:5.8},{xx:11.7,yy:5.9},{xx:12.6,yy:5.8},{xx:13.5,yy:5.9},{xx:14.4,yy:5.9},{xx:18,yy:5.8},{xx:27,yy:5.8},{xx:36,yy:5.8},{xx:45,yy:5.9},{xx:51,yy:6},{xx:60,yy:6},{xx:150,yy:6.3},{xx:240,yy:6.3},{xx:600,yy:6.3},{xx:1500,yy:6.4},{xx:1800,yy:6.5},{xx:1887,yy:6.5}];;

	const restartButton = document.getElementById('restart');

	restartButton.addEventListener('click', function() {restart();});

	function restart() 
	{ 
		window.clearTimeout(tmHandle); 
		window.clearTimeout(id);
		graph();
		flag = 0;
		current_angle = 0;
		tmHandle = window.setTimeout(draw, 1000 / fps); 
	}
	

	function drawobj(ctx, obj ,color)
	{
		ctx.save();
		ctx.fillStyle = color;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(obj[0][0], obj[0][1]);

		for(let i = 0; i < obj.length; ++i)
		{
			const next = (i + 1) % obj.length;
			ctx.lineTo(obj[next][0], obj[next][1]);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	
	const canvas = document.getElementById("main");
	canvas.width = 900;
	canvas.height = 100;
	canvas.style = "border:3px solid;";
	const ctx = canvas.getContext("2d");

	const fill = "#A9A9A9";
	const border = "black";
	const lineWidth = 1.5;
	const fps = 20;
	let id;

	const mid = 50;
	const startx = 200;
	const radius = 20;
	let current_angle = 0;
	// heights starting from the left side 
	const ht = [20,10,25,10,15,8,13,15,13,25,6,2,6,23];
	const width = [0,10,50,100,220,230,380,395,405,410,430,435,465,470,490];
	let flag = 0;

	const rod1 = [
		[startx + width[10] , mid+17],
		[startx + width[13] , mid+17],
		[startx + width[13], mid+15],
		[startx + width[10], mid+15]
	]

	const rod2 = [
		[startx + width[10] , mid-17],
		[startx + width[13] , mid-17],
		[startx + width[13], mid-15],
		[startx + width[10], mid-15]
	]

	const part1 = [
		[startx + width[5] , mid-ht[5]],
		[startx + width[5]+95 , mid-ht[5]],
		[startx + width[6]-50, mid+ht[5]],
		[startx + width[5], mid+ht[5]]
	]

	const part2 = [
		[startx + width[5] + 100 , mid-ht[5]],
		[startx + width[6] , mid-ht[5]],
		[startx + width[6], mid+ht[5]],
		[startx + width[6]-45, mid+ht[5]]
	]

	function drawoval()
	{
		ctx.beginPath();
		ctx.scale(0.5,1);
		ctx.arc(1300,50,9,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle  = fill;
	}
	function drawheel(angle)
	{
		ctx.beginPath();
		ctx.arc(startx + 75,50,radius,0,2*Math.PI);
		ctx.moveTo(startx+75,50);
		let dx = Math.cos(angle)*radius;
		let dy = Math.sin(angle)*radius;
		ctx.lineTo(startx+75+dx,50+dy);

		ctx.moveTo(startx+75,50);
		dx = Math.cos(90+angle)*radius;
		dy = Math.sin(90+angle)*radius;
		ctx.lineTo(startx+75+dx,50+dy);

		ctx.moveTo(startx+75,50);
		dx = Math.cos(180+angle)*radius;
		dy = Math.sin(180+angle)*radius;
		ctx.lineTo(startx+75+dx,50+dy);

		ctx.stroke();
	}
	
	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = fill;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		let j = 0;

		while( j < 15)
		{
			let curr = [
				[startx + width[j],mid - ht[j]],
				[startx + width[j+1],mid-ht[j]],
				[startx + width[j+1],mid+ht[j]],
				[startx + width[j],mid+ht[j]]
			]
				if(flag==1)
				{
					
					if(j==5)
					{
						drawobj(ctx,part1,"grey");
						drawobj(ctx,part2,"grey");
						j++;
						continue;
					}
				}
				if(j==2 || j==5 || j== 9 || j==13)
					drawobj(ctx,curr,"grey");
				else
					drawobj(ctx,curr,"black");
			j++;
		}
		
		drawobj(ctx,rod1,"black")
		drawobj(ctx,rod2,"black")
		drawoval();
		drawheel(current_angle);
		current_angle+=0.05;
		 if(current_angle <= 7)
			tmHandle = window.setTimeout(draw, 1000 / fps);
		else
		{
			if(flag == 0){
				flag = 1;
				draw();
			}
		}
	}

	let tmHandle = window.setTimeout(draw, 1000 / fps);

	function graph() 
	{
		let dps = []; 
		let chart = new CanvasJS.Chart("chartContainer", 
		{
			title :{
				text: "Stress v/s Strain" 
			},
			axisY: {
				includeZero: true,
				title: "Stress (MPa)"
			},
			axisX: {
				includeZero: true,
				title: "Strain"
			},      
			data: [{
				type: "line",
				dataPoints: dps
			}]
		});
		let j=0;
		let xVal = 0;
		let yVal = 0; 
		let updateChart = function () 
		{
			xVal = charts[j].xx;            
			yVal = charts[j].yy;        
			dps.push({
						x: xVal,
						y: yVal
				});
			
	
			if (dps.length > 100)
				dps.shift();
			document.getElementById("angle").innerHTML = angle[j].toString() + " deg";
			document.getElementById("torque").innerHTML = torque[j].toString() + " N-m";
			if(j<angle.length -1)
			{
				chart.render();
				j++;
				id = window.setTimeout(updateChart, 5000 / fps);
			}
		};		
		let id = window.setTimeout(updateChart, 5000 / fps);
	}
	graph();
	
})
