(function () {
	var header = document.getElementsByTagName('header')[0],
		more = document.querySelector('.more'),
		rotate = document.querySelector('.rotate'),
		pre = document.querySelector('.pre'),
		next = document.querySelector('.next'),
		dot = document.querySelector('.dot'),
		dots = dot.getElementsByTagName('span'),
		lastScroll = 0;

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

	header.onclick = function (event) {
		var ev = event || window.event;
		ev.target = ev.target || ev.srcElement;
		if (ev.target.nodeName.toLowerCase() === 'a') {
			var arr = ev.target.href.split('#');
			Scroll(arr[1]);
			ev.preventDefault ? ev.preventDefault() : ev.returnVaule = false;
		}
	};

	more.onclick = function (event) {
		var ev = event || window.event;
		var arr = this.href.split('#');
		Scroll(arr[1]);
		ev.preventDefault ? ev.preventDefault() : ev.returnVaule = false;
	};

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
	};

	function scrolled() {
		var s = document.documentElement.scrollTop || document.body.scrollTop;

		if (s > lastScroll) {
			header.className = 'nav-down';
		} else {
			header.className = 'nav-up';
		}

		lastScroll = s;
	}

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
			console.log(1);
		}, 30);
	}

	function slider(w) {
		var current = parseInt(rotate.style.left) + w;
		if (current > 0 || current < -500) {
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

	/*
	 *移动端
	 */
	
	var wrap = document.querySelector('.wrapper'),
		nav = document.getElementsByTagName('nav')[0],
		demo = document.querySelector('.demo'),
		x,y,end_x,end_y;
	
	wrap.onclick = function () {
		if (nav.style.display === 'none') {
			nav.style.display = 'block';
		} else {
			nav.style.display = 'none';
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
			if (duration > 5 && Math.abs(self.endPos.x) > Math.abs(self.endPos.y)) {
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