(function () {
	var header = document.getElementsByTagName('header')[0],
		more = document.querySelector('.more'),
		color1 = document.querySelector('.color1'),
		color2 = document.querySelector('.color2'),
		color3 = document.querySelector('.color3'),
		skill = document.getElementById('skill'),
		rotate = document.querySelector('.rotate'),
		pre = document.querySelector('.pre'),
		next = document.querySelector('.next'),
		dot = document.querySelector('.dot'),
		dots = dot.getElementsByTagName('span'),
		lastScroll = 0;
//监听页面滚动,改变顶部导航栏状态
	window.onscroll = function () {
		var s = document.documentElement.scrollTop || document.body.scrollTop;
		if (s === 0) {
			header.className = '';
		} else {
			t1 = setTimeout(function () {
				scrolled();
			}, 10);
		}
	};
//点击导航栏链接平滑滚动到对应元素
	header.onclick = function (event) {
		var ev = event || window.event;
		ev.target = ev.target || ev.srcElement;
		if (ev.target.nodeName.toLowerCase() === 'a') {
			var arr = ev.target.href.split('#');
			Scroll(arr[1]);
			var prevent = ev.preventDefault ? ev.preventDefault() : ev.returnVaule = false;
		}
	};
//点击链接平滑滚动
	more.onclick = function (event) {
		var ev = event || window.event;
		var arr = this.href.split('#');
		Scroll(arr[1]);
		var prevent = ev.preventDefault ? ev.preventDefault() : ev.returnVaule = false;
	};
//点击按钮点亮技能树
	skill.onclick = function () {
		color1.classList.add('color11');
		color2.classList.add('color22');
		color3.classList.add('color33');
		skill.style.opacity = 0;
		skill.style.cursor = 'default';
	};
//点击项目滑动
	next.onclick = function () {
		slider(-100);
	};

	pre.onclick = function () {
		slider(100);
	};

	dot.onclick = function (event) {
		var ev = event || window.event;
		ev.target = ev.target || ev.srcElement;
		if (ev.target.nodeName.toLowerCase() === 'span') {
			clearActive();
			ev.target.className = 'active';
			rotate.style.left = ev.target.index*-100 + '%';
		}

		if (ev.target.index === 0) {
			pre.style.display = 'none';
			next.style.display = 'inline-block';
		} else if (ev.target.index > 0 && ev.target.index <dots.length-1) {
			pre.style.display = 'inline-block';
			next.style.display = 'inline-block';
		} else if (ev.target.index === dots.length-1) {
			pre.style.display = 'inline-block';
			next.style.display = 'none';
		}
	};
//改变导航栏状态函数
	function scrolled() {
		var s = document.documentElement.scrollTop || document.body.scrollTop;

		if (s > lastScroll) {
			header.className = 'nav-down';
		} else {
			header.className = 'nav-up';
		}

		lastScroll = s;
	}
//平滑滚动函数
	function Scroll(obj) {
		document.documentElement.scrollTop += 1;
		document.body.scrollTop += 1;
		var	d = document.documentElement.scrollTop ? document.documentElement : document.body,
			attr = document.getElementById(obj).offsetTop,
			bottom = document.body.clientHeight - document.documentElement.clientHeight;
			t = setInterval(function () {
			if (d.scrollTop === attr || d.scrollTop === bottom) {
				clearInterval(t);
			} else if (d.scrollTop < attr) {
				d.scrollTop += Math.ceil((attr - d.scrollTop)/7);
			} else if (d.scrollTop > attr) {
				d.scrollTop -= Math.ceil((d.scrollTop - attr)/7);
			}
		}, 30);
	}
//滑动项目函数
	function slider(w) {
		var current = parseInt(rotate.style.left) + w;
		if (current > 0 || current < -600) {
			return;
		}
		rotate.style.left = current + '%';

		var n = Math.abs(current)/100;
		clearActive();
		dots[n].className = 'active';

		if (n === 0) {
			pre.style.display = 'none';
			next.style.display = 'inline-block';
		} else if (n > 0 && n <dots.length-1) {
			pre.style.display = 'inline-block';
			next.style.display = 'inline-block';
		} else if (n === dots.length-1) {
			pre.style.display = 'inline-block';
			next.style.display = 'none';
		}
	}

	function clearActive() {
		for (var i = dots.length - 1; i >= 0; i--) {
			dots[i].className = '';
			dots[i].index = i;
		}
	}
//一个小idea
	function hello() {
	   console.log("%c","background: #9B59B6; font-size: 12px; color: #f0f0f0");
	   console.log("%c ==== Welcome ====","background: #9B59B6; padding:5px; font-size: 12px; color: #ffffff");
	   console.log("%c Site developed -`ღ´- by Joki","background: #9B59B6; padding:5px; font-size: 12px; color: #ffffff");
	   console.log("%c > github: https://github.com/myway42","background: #9B59B6; padding:5px; font-size: 12px; color: #ffffff");
	   console.log("%c > Email: maoway42@gmail.com","background: #9B59B6; padding:5px; font-size: 12px; color: #ffffff");
	   console.log("%c","background: #9B59B6; font-size: 12px; color: #f0f0f0");
	}

	hello();

	/*
	 * 移动端
	 */
	
	var wrap = document.querySelector('.wrapper'),
		nav = document.getElementsByTagName('nav')[0],
		demo = document.querySelector('.demo'),
		x,y,end_x,end_y;
	
	wrap.ontouchstart = function () {
		if (nav.style.display === 'block') {
			nav.style.display = 'none';
		} else {
			nav.style.display = 'block';
		}
	};

	var sliders = {
		obj: document.querySelector('.demo'),
		index: 0,

		init: function () {
			self = this;
			if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
				this.obj.addEventListener('touchstart', self.start, false);
			}
		},

		start: function (ev) {
			var touch = ev.targetTouches[0];
			self.startPos = {
				x: touch.pageX,
				y: touch.pageY,
				time: Date.now()
			};
			self.obj.addEventListener('touchmove', self.move, false);
		},

		move: function (ev) {
			var touch = ev.targetTouches[0];
			self.endPos = {
				x: touch.pageX - self.startPos.x,
				y: touch.pageY - self.startPos.y
			};
			if (Math.abs(self.endPos.x) > Math.abs(self.endPos.y)) {
				ev.preventDefault();
			}
			self.obj.addEventListener('touchend', self.end, false);
		},

		end: function (ev) {
			var duration = Date.now() - self.startPos.time;
			if (duration > 10 && Math.abs(self.endPos.x) > Math.abs(self.endPos.y)) {
				ev.preventDefault();
				if (self.endPos.x > 10) {
					self.index = 100;
				} else if (self.endPos.x < -10) {
					self.index = -100;
				}
				slider(self.index);
			}
			self.obj.removeEventListener('touchmove', self.move);
			self.obj.removeEventListener('touchend', self.end);
		}
	};

	sliders.init();
})();