//Point Class draw line and circle
var point = function(x, y) {
	var m_x, m_y;
	var m_nearPoint = [];

	var currentTick;
	var currentIndex;
	var animationPoint = [];
	var init = function(x, y) {
		m_x = x;
		m_y = y;

		initializeAnimation();
	}
	//animation initialize
	var initializeAnimation = function() {
		currentTick = 0;
		currentIndex = Math.floor(Math.random()*4);
		for(i = 0; i < 4; i++) {
			animationPoint.push(new animationData(Math.floor(Math.random()*100 + (m_x-50)), Math.floor(Math.random()*100 + (m_y-50)), Math.floor(Math.random()*100 + 70)));
		}
		changeAnimation();
	}
	var changeAnimation = function() {
		var i;

		i = Math.floor(Math.random()*4);

		currentTick = 0;
		currentIndex = i;
	}
	var animationProcess = function() {
		if(++currentTick == animationPoint[currentIndex].getTick())
			changeAnimation();

		m_x += (animationPoint[currentIndex].getX()-m_x)/animationPoint[currentIndex].getTick();
		m_y += (animationPoint[currentIndex].getY()-m_y)/animationPoint[currentIndex].getTick();
	}
	//find near points
	this.getNearPoints = function(list) {
		for(var i = 0; i < list.length; i++) {
			if(list[i] == this) continue;

			if(m_nearPoint.length < 5) {
				m_nearPoint.push(list[i]);
			}
			else {
				for(var j = 0; j < m_nearPoint.length; j++) {
					if(list[i].getDistance(this) < m_nearPoint[j].getDistance(this)){
						var maxIndex = 0;
						for(var o = 1; o < m_nearPoint.length; o++) {
							if(m_nearPoint[o].getDistance(this) > m_nearPoint[maxIndex].getDistance(this)) {
								maxIndex = o;
							}
						}
						m_nearPoint[maxIndex] = list[i];
						break;
					}
				}
			}
		}
	}
	this.getX = function() {
		return m_x;
	}
	this.getY = function() {
		return m_y;
	}
	this.getDistance = function(p1) {
		return Math.pow(m_x - p1.getX(), 2) + Math.pow(m_y - p1.getY(), 2);
	}
	//draw Circle
	this.drawCircle = function(context, x, y, enable) {
		if(enable) 
			animationProcess();
		if(!(this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) > 0)) {
			return;
		}
		context.beginPath();
		context.arc(m_x, m_y, 3, 0, 2 * Math.PI, false);
		//context.fillStyle = 'rgba(' + 255 + ',' + 0 + ',' + 0 + ',' + 1 +')';
		context.fillStyle = 'rgba(255, 255, 0,' + this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) +')';
		context.fill();	
	}
	//draw Line
	this.drawLine = function(context, x, y) {
		if(!(this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) > 0)) {
			return;
		}
		for(var i = 0; i < m_nearPoint.length; i++) {
			context.beginPath();
			context.moveTo(m_x, m_y);
			context.lineTo(m_nearPoint[i].getX(), m_nearPoint[i].getY());
			context.lineWidth = 0.5;
			//context.strokeStyle = 'rgba(' + 255 + ',' + 0 + ',' + 0 + ',' + 1 +')';
			context.strokeStyle = 'rgba(255, 255, 0,' + this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) +')';
			context.stroke();
		}
	}
	this.reverseVariable = function(num) {
		return 1-num;
	}
	init(x, y);
}