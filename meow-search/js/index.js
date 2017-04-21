//获取dom
function getDOM(id) {
	return document.getElementById(id);
}

//绑定事件
function addEvent(id, event, fn) {
	var el = getDOM(id) || document;
	if (el.addEventListener) {
		el.addEventListener(event, fn, false);
	} else if (el.attachEvent) {
		el.attachEvent('on'+event, fn);
	}
}

var k = getDOM('keyword');
var li = getDOM('list').getElementsByTagName('li');
//l=列表长度
var l;
//列表标志位
var index = -1;
//获取原先的关键词
var oldValue = '';

//输入关键词,获取相关列表
addEvent('keyword', 'keyup', search);

//失去焦点,隐藏列表
addEvent(document, 'click', function () {
	getDOM('more').style.display = 'none';
	index = -1;
	clearLi();
});

//获得焦点,重新获取搜索项列表并显示
addEvent('keyword', 'click', function (event) {
	var e = event || window.event;
	e.stopPropagation();
	search();
});

//鼠标移入事件,鼠标经过时增加css样式,点击时跳转链接
addEvent('more', 'mouseenter', function (event) {
	var e = event || window.event;
	e.stopPropagation();
	for (var i = 0; i < l; i++) {
		li[i].onmouseover = function () {
			clearLi();
			var that = this;
			this.className = 'active';
			index = this.getAttribute('selectid');
		};
		li[i].onclick = function () {
			var that = this;
			getDOM('audio').play();
			getDOM('audio').onended = function () {
				location.href = "http://cn.bing.com/search?q=" + that.innerText;
			};
		};
	}
});

//enter键,跳转搜索链接
addEvent('btn', 'click', function (event) {
	if (k.value) {
		var e = event || window.event;
		e.preventDefault();
		getDOM('audio').play();
		getDOM('audio').onended = function () {
			location.href = "http://cn.bing.com/search?q=" + k.value;
		};
	}
});

//清除列表的css样式函数
function clearLi() {
	for (var i = 0; i < l; i++) {
		li[i].className = '';
	}
}

//通过ajax获取搜索列表函数
function search(event) {
	var e = event || window.event;
	if (k.value) {
		getDOM('more').style.display = 'block';
		getDOM('icon').style.display = 'none';
//如果关键词改变,进行异步传输
	    if (k.value !== oldValue && e.keyCode!==40 && e.keyCode!==38 && e.keyCode!==13) {
			$.ajax({
				url: "http://cn.bing.com/qsonhs.aspx?type=cb&q=" + k.value,
				type: 'GET',
				dataType: 'jsonp',
				jsonp:'cb',
				success: function (data) {
//获得服务器的JSON格式返回值,更新html内容
					var d = data.AS.Results[0].Suggests;
					var list = '';
					l=d.length;
					for (var i = 0; i < l; i++){
						list += ('<li selectid="' + i + '">' + d[i].Txt + '</li>');
					}
					$('#list').html(list);
				},
				error: function() {
					alert('错误:' + readyState);
				}
			});
			index = -1;
			oldValue = k.value;
//按↓键,选择列表下一个关键词
		}else if (e.keyCode===40) {
			clearLi();
			index++;
			if (index > l-1) {index = 0;}
	        li[index].className = 'active';
	        k.value = li[index].innerHTML;
//按↑键,选择列表上一个关键词
	    }else if (e.keyCode===38) {
	    	clearLi();
	      	index--;
	      	if (index < 0) {index = l-1;}
	      	li[index].className = 'active';
	      	k.value = li[index].innerHTML;
		}
	}else {
		getDOM('more').style.display = 'none';
		getDOM('icon').style.display = 'block';
	}

}




		// var xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = function () {
		// 	if (xhr.readyState === 4) {
		// 		if (xhr.status === 200) {
		// 			var data = xhr.responseText.AS.Results[0].Suggests;
		// 			var html = '';
		// 			l=data.length;
		// 			for (var i = 0; i < data.length; i++) {
		// 				html += ('<li>' + d[i].Txt + '</li>');
		// 			}
		// 			getDOM('list').innerHTML = html;
		// 		}
		// 	}
		// };

		// var url = "http://api.bing.com/qsonhs.aspx?type=cb&q=" + k.value;
		// var script = document.createElement('script');
		// script.setAttribute('src', url);
		// document.getElementsByTagName('body')[0].appendChild(script);
		// xhr.open('GET', url);
		// xhr.send(null); 