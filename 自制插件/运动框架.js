//获取css样式
function getStyle(obj, name) {
    return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, null)[name];
}

//参数:对象, 属性, 目标值, 速度量, 结束函数
function startMove(obj, attr, iTarget, ispeed, fnEnd) {
    //防止重复动作引起的定时器叠加
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //获得物体当前量
        var cur;
        if (attr === 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, attr))*100);
        } else {
            cur = parseInt(getStyle(obj, attr));
        }
        //对象运动速度
        var speed = (iTarget - cur)/ispeed;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (cur === iTarget) {
            clearInterval(obj.timer);
            if (fnEnd) {fnEnd();}
        } else {
            if (attr === 'opacity'){
                obj.style.filter = 'alpha(opacity:'+(cur + speed)+')';
                obj.style[attr] = (cur + speed)/100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);
}