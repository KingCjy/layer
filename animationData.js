//animation class
var animationData = function(x, y, animationTick) {
	var m_x;
	var m_y;
	var m_animationTick;
	var init = function(x, y, animationTick) {
		m_x = x;
		m_y = y;
		m_animationTick = animationTick;
	}
	this.getX = function() {
		return m_x;
	}
	this.getY = function() {
		return m_y;
	}
	this.getTick = function() {
		return m_animationTick;
	}
	init(x, y, animationTick);
}