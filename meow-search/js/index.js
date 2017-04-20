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

//输入关键词,获取相关列表
addEvent('keyword', 'keyup', search);

//失去焦点,隐藏列表
addEvent('keyword', 'blur', function () {
	getDOM('more').style.display = 'none';
	index = -1;
});

//获得焦点,显示列表
addEvent('keyword', 'focus', search);

//l=列表长度
var l;
var li = getDOM('list').getElementsByTagName('li');

//清除列表的css样式
function clearLi() {
	for (var i = 0; i < l; i++) {
		li[i].className = '';
	}
}
//鼠标移入事件,优化修复鼠标移出后hover样式消失
function mouse() {
	for (var i = 0; i < l; i++) {
		li[i].onmouseenter = function () {
			clearLi();
			this.className = 'active';
			index = this.getAttribute('selectid');
		};
		li[i].onclick = function () {
			location.href = "http://cn.bing.com/search?q=" + this.innerText;
		};
	}
}

var index = -1;
var oldValue = '';

//通过ajax获取搜索列表
function search(event) {
	var e = event || window.event;

	// getDOM('more').style.display = 'none';
													//还需解决:鼠标和键盘选择关键词配合
	if (k.value) {
		
//使用键盘方向键选取列表关键字
		if (e.keyCode===40) {
			clearLi();
			index++;
			if (index > l-1) {index = 0;}
	        li[index].className = 'active';
	        k.value = li[index].innerHTML;
	    }else if (e.keyCode===38) {
	    	clearLi();
	      	index--;
	      	if (index < 0) {index = l-1;}
	      	li[index].className = 'active';
	      	k.value = li[index].innerHTML;
//如果关键词改变,进行异步传输
	    }else if (k.value !== oldValue) {
			$.ajax({
				url: "http://api.bing.com/qsonhs.aspx?type=cb&q=" + $('#keyword').val(),
				type: 'GET',
				dataType: 'jsonp',
				jsonp:'cb',
				success: function (data) {
//获得服务器的JSON格式返回值,更新html内容
					var d = data.AS.Results[0].Suggests;
					var list = '';
					l=d.length;
					for (var i = 0; i < l; i++){
						list += ('<li class="item" selectid="' + i + '">' + d[i].Txt + '</li>');
					}
					$('#list').html(list);
				},
				error: function() {
					alert('错误:' + readyState);
				}
			});
			index = -1;
		}
		getDOM('more').style.display = 'block';
		clearLi();
		mouse();	

//获取原关键词,以便比较
		oldValue = k.value;
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