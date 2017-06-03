!function () {
	var oInput = document.getElementById('add'),
	    oUl = document.getElementById('list'),
	    left = document.getElementById('left'),
	    count = document.getElementById('count'),
	    noTask = document.getElementById('noTask'),
	    cBox = oUl.getElementsByTagName('input'),
	    del = oUl.getElementsByTagName('span'),
	    c = 0;
	getStore();
	//	关闭刷新页面时本地缓存
	window.onunload = function () {
		localStorage.setItem('todo.html', oUl.innerHTML);
		localStorage.setItem('todo.count', c);
		for (i = 0; i < cBox.length; i++) {
			if (cBox[i].checked) {
				localStorage.setItem('todo.id'+i, cBox[i].id);
			}
		}
	};
	//	增加待办事项
	oInput.onkeydown = function (ev) {
		ev = event || window.event;
		if (ev.keyCode === 13) {
			var task = oInput.value;
			inList(task);
			c++;
			count.innerHTML = c;
			oInput.value = '';
		}
	};
	//	记录未完成事项数,以及删除事项
	oUl.onclick = function (ev) {
		ev = event || window.event;
		ev.target = ev.target || ev.srcElement;
		if (ev.target.nodeName === 'INPUT') {
			if (ev.target.checked) {
				c--;
			} else {
				c++;
			}
		}
		if (ev.target.nodeName === 'SPAN') {
			this.removeChild(ev.target.parentNode);
			if (!del.length) {
				noTask.style.display = 'block';
				left.style.display = 'none';
			}
			if (!ev.target.parentNode.firstChild.checked) {
				c--;
			}
		}
		count.innerHTML = c;
	};
	// 待办事项写入列表
	function inList(task) {
		noTask.style.display = 'none';
		left.style.display = 'block';
		var temp = document.createElement("div");
	 	temp.innerText ? (temp.innerText = task) : (temp.textContent = task);
	 	var output = temp.innerHTML;
	 	temp = null;
	 	var listIndex = Date.now();
		var str = 
			"<input type='checkbox' id='checkbox"+listIndex+"'>\
			<label for='checkbox"+listIndex+"'>\
				<em>"+output+"</em>\
			</label>\
			<span>&#215</span>";
		var oLi = document.createElement('li');
		oLi.innerHTML = str;
		oUl.appendChild(oLi);
	}
	//	读取本地缓存并清空
	function getStore() {
		if (localStorage.getItem('todo.html')) {
			noTask.style.display = 'none';
			left.style.display = 'block';
			var html = localStorage.getItem('todo.html');
			c = localStorage.getItem('todo.count');
			oUl.innerHTML = html;
			count.innerHTML = c;
			localStorage.removeItem('todo.html');
			localStorage.removeItem('todo.count');
			for (i = 0; i < cBox.length; i++) {
				if (localStorage.getItem('todo.id'+i)) {
					cBox[i].checked = true;
					localStorage.removeItem('todo.id'+i);
				}
			}
		}
	}
}();