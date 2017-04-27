//参数:键,值,保存天数
function setCookie(name, value, iDay) {
    var mydate = new Date();
    mydate.setDate(mydate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + mydate;
}
//cookie保存形式:name=***; keyword=***
function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i=arr.length-1; i>=0; i--) {
        var arr2 = arr[i].split('=');
        if (arr2[0] === name) {
            return arr2[1];
        }
    }
    return '未找到该参数';
}
//日期-1即已过期
function removeCookie(name) {
    setCookie(name, 1, -1);
}
