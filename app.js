/*
	Project_Name : Layer7
	Date : 2016/9/03
	author : Choi jae young
	discription : Layer7, Codepen에 올라와있는 애니메이션 구현

	using HTML CSS JAVASCRIPT
*/
var app = function() {
	var canvas;
	var context;
	var pointList = [];
	var mouseX = 0;
	var mouseY = 0	;
	var circleNum = 200;
	// Initialize canvas and Add Events
	var init = function() {
		canvas = document.getElementById('myCanvas');
		context = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener('resize', resizeEvent);
		window.addEventListener('mousemove', mouseMove);
		window.requestAnimationFrame(draw);
		createPoint(circleNum)
	}
	var mouseMove = function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
		Mousedraw();
	}

	//Create Point  Limit = max(default: 200);
	var createPoint = function(max) {
		var maxWidth = window.innerWidth;
		var maxHeight = window.innerHeight;

		for(var i = 0; i < max; i++) {
			pointList.push(new point(Math.floor(Math.random()*maxWidth+1), Math.floor(Math.random()*maxHeight+1)));
		}

		for(var i = 0; i < max; i++) {
			pointList[i].getNearPoints(pointList);
		}
		draw(max);
	}
	var draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		//draw
		for(var i = 0; i < circleNum; i++) {
			pointList[i].drawCircle(context, mouseX, mouseY, true);
			pointList[i].drawLine(context, mouseX, mouseY);
		}

		/*var grd=context.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,180);
		grd.addColorStop(0,"rgba(0, 0, 0, 0)");
		grd.addColorStop(1,"rgba(0, 0, 0, 1)");
		context.fillStyle = grd;
		context.fillRect(0,0,canvas.width,canvas.height);*/

		window.requestAnimationFrame(draw);

	}
	//repaint when mouse move
	var Mousedraw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < circleNum; i++) {
			pointList[i].drawCircle(context, mouseX, mouseY, false);
			pointList[i].drawLine(context, mouseX, mouseY);
		}	
	}
	var resizeEvent = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	var getDistance = function(p1, p2) {
		return Math.pow(p1.getX() - p2.getX(), 2) + Math.pow(p1.getY() - p2.getY(), 2);
	}
	init();
}
new app();