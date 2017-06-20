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
		pre.style.display = 'inline-block';
		slider(-100);
	};

	pre.onclick = function () {
		next.style.display = 'inline-block';
		slider(100);
	};

	dot.onclick = function (event) {
		var ev = event || window.event;
		ev.target = ev.target || ev.srcElement;
		if (ev.target.nodeName.toLowerCase() === 'span') {
			clearActive();
			ev.target.className = 'active';
			rotate.style.left = ev.target.index*-100 + '%';
			if (ev.target.index === dots.length-1) {
				pre.style.display = 'inline-block';
				next.style.display = 'none';
			} else if (!ev.target.index) {
				next.style.display = 'inline-block';
				pre.style.display = 'none';
			}
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
		rotate.style.left = parseInt(rotate.style.left) + w + '%';

		var n = Math.abs(parseInt(rotate.style.left))/100;
		clearActive();
		dots[n].className = 'active';

		if (n === 0) {
			pre.style.display = 'none';
		} else if (n === dots.length-1) {
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
		demo = document.querySelector('demo'),
		x,y,end_x,end_y;
	
	wrap.onclick = function () {
		if (nav.style.display === 'none') {
			nav.style.display = 'block';
		} else {
			nav.style.display = 'none';
		}
	};

	demo.addEventListener('touchstart', function (ev) {
		var touch = ev.targetTouches[0];
	})
})();