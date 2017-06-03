/*
绑定移除匿名事件处理函数
 */ 

function Manager() {        //构造原型对象
    this.handlers = {};     //事件集合
}

Manager.prototype = {
    add : function(type, handler){       //原型方法add:增加事件类型及处理函数到事件集合中
        if (!this.handlers[type]) {
            this.handlers[type] = [handler];
            return true;                 //有新的事件类型创建,返回true,绑定事件监听
        } else {
            this.handlers[type].push(handler);
        }
    },
    del : function(type, handler){       //原型方法del:删除相同字符串的处理函数
        var arr = this.handlers[type];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].toString() == handler.toString()) {
                this.handlers[type].splice(i, 1);
            }
        }
    }
};

function on(obj, type, handler) {       //给对象绑定事件
    if (!obj.manager) {
        obj.manager = new Manager();    //实例对象
    }
    var isNewType = obj.manager.add(type, handler);     //增加事件类型及函数给对象并判断是否是新类型
    var fire = function() {                             //执行该事件类型中所有函数
        for (var i = 0, len = obj.manager.handlers[type].length; i < len; i++) {
            obj.manager.handlers[type][i]();
        }
    };
    if (isNewType) {
        if ( obj.addEventListener){     //监听对象事件,触发fire
            obj.addEventListener(type, fire);
        } else {
            obj.attachEvent('on'+type, fire);
        }
    }
}

function off(obj, type, handler) {      //给对象解绑事件
    obj.manager.del(type, handler);
}