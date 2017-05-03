//获取css样式
function getStyle(obj, name) {
    return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, null)[name];
}

//参数:对象, {样式属性: 目标值}, 速度量, 结束函数
function startMove(obj, json, ispeed, fnEnd) {
    //防止重复动作引起的定时器叠加
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //保证对象所有属性都达到目标值后停止
        var stop = true;
        for (var attr in json) {
            //获得物体当前量
            var cur;
            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr))*100);
            } else {
                cur = parseInt(getStyle(obj, attr));
            }
            if (cur !== json[attr]) {
                stop = false;
            }
            //对象运动速度
            var speed = (json[attr] - cur)/ispeed;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //执行运动
            if (attr === 'opacity'){
                obj.style.filter = 'alpha(opacity:'+(cur + speed)+')';
                obj.style[attr] = (cur + speed)/100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (stop) {
            clearInterval(obj.timer);
            if (fnEnd) {
                fnEnd();
            }
        }
    }, 30);
}