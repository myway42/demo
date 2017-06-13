!function () {
	function $(id) {
		return document.getElementById(id);
	}
	var oInput = $('add'),
	    oUl = $('list'),
	    left = $('left'),
	    count = $('count'),
	    noTask = $('noTask'),
		nav = document.getElementsByTagName('nav')[0],
		a = nav.getElementsByTagName('a'),
	    cBox = oUl.getElementsByTagName('input'),
	    del = oUl.getElementsByTagName('span'),
	    c = 0,
	    dataList = [];
	//	加载时设置哈希值为空,并获取缓存
	window.location.hash = '';
	getAll();
	//	增加待办事项
	oInput.onkeydown = function (ev) {
		ev = event || window.event;
		if (ev.keyCode === 13) {
			var task = oInput.value;
			inList(task);
			c++;
			setStore();
			noTask.style.display = 'none';
			left.style.display = 'block';
			count.innerHTML = c;
			oInput.value = '';
		}
	};
	//	记录未完成事项数,以及删除事项
	oUl.onclick = function (ev) {
		ev = event || window.event;
		ev.target = ev.target || ev.srcElement;
		changeList(ev.target);
		count.innerHTML = c;
		if (!c) {
			left.style.display = 'none';
		} else {
			left.style.display = 'block';
		}
		if (!del.length) {
			noTask.style.display = 'block';
		}
		setStore();
	};
	//	监听哈希值变化并做出相应动作
	window.addEventListener('hashchange', function () {
		if (!c) {
			left.style.display = 'none';
		}
		var hash = window.location.hash.slice(1);
		if (hash === 'All') {
			clearClass();
			a[0].className = 'active';
			getAll();
		} else if (hash === 'Todo') {
			clearClass();
			a[1].className = 'active';
			getTodo();
		} else if (hash === 'Done') {
			clearClass();
			a[2].className = 'active';
			getDone();
		}
	});
	//	待办事项写入列表
	function inList(task) {
		var temp = document.createElement("div");
	 	temp.innerText ? (temp.innerText = task) : (temp.textContent = task);
	 	var output = temp.innerHTML;
	 	temp = null;
	 	var listIndex = Date.now();
		var str =
			"<li><input type='checkbox' id='checkbox"+listIndex+"'>\
				<label for='checkbox"+listIndex+"'>\
					<em>"+output+"</em>\
				</label>\
				<span>&#215</span>\
			</li>";
		var html = oUl.innerHTML;
		oUl.innerHTML = html + str;
		var obj = {};
		obj.id = 'checkbox'+listIndex;
		obj.task = output;
		obj.isChecked = '';
		dataList.push(obj);
		obj = null; 
	}
	//	一些改变判断
	function changeList(target) {
		if (target.nodeName === 'INPUT') {
			if (target.checked) {
				c--;
				for (var i = 0; i < dataList.length; i++) {
					if (target.id === dataList[i].id) {
						dataList[i].isChecked = 'checked';
						break;
					}
				}
			} else {
				c++;
				for (i = 0; i < dataList.length; i++) {
					if (target.id === dataList[i].id) {
						dataList[i].isChecked = '';
						break;
					}
				}
			}
		}
		if (target.nodeName === 'SPAN') {
			oUl.removeChild(target.parentNode);
			for (i = 0; i < dataList.length; i++) {
				if (target.parentNode.firstChild.id === dataList[i].id) {
					dataList.splice(i, 1);
				}
			}
			if (!target.parentNode.firstChild.checked) {
				c--;
			}
		}
	}
	//	设置本地缓存
	function setStore() {
		localStorage.setItem('todo.list', JSON.stringify(dataList));
		localStorage.setItem('todo.count', c);
	}
	//	读取本地缓存
	function getAll() {
		if (localStorage.getItem('todo.list') === '[]') {
			return;
		} else {
			dataList = JSON.parse(localStorage.getItem('todo.list'));
			c = parseInt(localStorage.getItem('todo.count'));
			noTask.style.display = 'none';
			if (c) {
				left.style.display = 'block';
			}
			var html = '';
			for (var i = 0; i < dataList.length; i++) {
				var str =
					"<li><input type='checkbox' id='"+dataList[i].id+"' "+dataList[i].isChecked+">\
						<label for='"+dataList[i].id+"'>\
							<em>"+dataList[i].task+"</em>\
						</label>\
						<span>&#215</span>\
					</li>";
				html += str;
			}
			oUl.innerHTML = html;
			count.innerHTML = c;
		}
	}
	function getTodo() {
		dataList = JSON.parse(localStorage.getItem('todo.list'));
		c = parseInt(localStorage.getItem('todo.count'));
		var html = '';
		for (var i = 0; i < dataList.length; i++) {
			if (!dataList[i].isChecked) {
				var str =
					"<li><input type='checkbox' id='"+dataList[i].id+"'>\
						<label for='"+dataList[i].id+"'>\
							<em>"+dataList[i].task+"</em>\
						</label>\
						<span>&#215</span>\
					</li>";
				html += str;
			}
		}
		oUl.innerHTML = html;
		count.innerHTML = c;
	}
	function getDone() {
		dataList = JSON.parse(localStorage.getItem('todo.list'));
		c = parseInt(localStorage.getItem('todo.count'));
		var html = '';
		for (i = 0; i < dataList.length; i++) {
			if (dataList[i].isChecked) {
				str =
					"<li><input type='checkbox' id='"+dataList[i].id+"' checked>\
						<label for='"+dataList[i].id+"'>\
							<em>"+dataList[i].task+"</em>\
						</label>\
						<span>&#215</span>\
					</li>";
				html += str;
			}
		}
		oUl.innerHTML = html;
		count.innerHTML = c;
	}
	// 清除a标签样式
	function clearClass() {
		for (var i = 0; i < a.length; i++) {
			a[i].className = '';
		}
	}
}();