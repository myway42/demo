// 妙味官网：www.miaov.com
// 技术交流：bbs.miaov.com

$(function (){
	// 切换搜索框
	(function (){
		var aLi = $('#menu li');
		var oText = $('#search').find('.form .text');
		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var iNow = 0;
		
		oText.val(arrText[iNow]);
		
		aLi.each(function ( index ){
			$(this).click(function (){
				aLi.attr('class', 'gradient');
				$(this).attr('class', 'active');
				
				iNow = index;
				
				oText.val(arrText[iNow]);
			});
		});
		
		oText.focus(function (){
			if( $(this).val() == arrText[iNow] ) {
				$(this).val('');
			}
		});
		oText.blur(function (){
			if( $(this).val() === '' ) {
				oText.val(arrText[iNow]);
			}
		});
	})();
	
	// options 选项卡切换
	(function (){
		
		fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
		fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
		fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
		fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );
		
		function fnTab( oNav, aCon, sEvent ) {
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){
				
				$(this).on(sEvent, function (){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class', 'triangle_down_gray');
					$(this).find('a').attr('class', 'triangle_down_red');
					
					aCon.hide().eq( index ).show();
				});
				
			});
		}
	})();
	
	// 自动播放的焦点图
	(function (){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var iNow = 0;
		var timer = null;
		
		fnFade();
		
		aOlLi.click(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');

				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
				}
			});
			oP.text(arr[iNow]);
		}
	})();
	
	//日历提示说明
	(function (){
		var aSpan = $('.calendar h3 span');
		var aImg = $('.calendar .img');
		var oPrompt = $('.today_info');
		var oImg = oPrompt.find('img');
		var oStrong = oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function (){
			var iTop = $(this).parent().position().top - 30;
			var iLeft = $(this).parent().position().left + 55;
			var index = $(this).parent().index()%aSpan.size();
			
			// console.log( $(this).parent().index()%aSpan.size() );
			
			oPrompt.show().css({ 'left': iLeft, 'top': iTop });
			oP.text($(this).attr('info'));
			oImg.attr('src', $(this).attr('src'));
			oStrong.text( aSpan.eq(index).text() );
			
			
		}, function (){
			oPrompt.hide();
		});
	})();
	
	// BBS高亮显示
	(function (){
		$('.bbs ol li').mouseover(function (){
			$('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
		});
	})();
	
	// HOT鼠标提示效果
	(function (){
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$('.hot_area li').mouseover(function (){
			
			if ( $(this).index() == 0 ) return;
			
			$('.hot_area li p').remove();
			
			$(this).append('<p style="width:'+ ($(this).width()-12) +'px; height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');
		});
	})();
});