const Utils = {
    //防抖
    debounce(fn, delay, immediate = false) { //防抖
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            if (immediate) { //连续动作只初次生效
                //如果启动了定时器 表示已经执行过，不再执行
                !timer && fn.apply(context, args)
                //启动定时器标识 delay时间后的动作才能执行下一次
                timer = setTimeout(function () {
                    timer = null;
                }, delay)
            } else { //连续动作只末次生效
                timer = setTimeout(function () {
                    fn.apply(context, args)
                }, delay)
            }
        }
    },
    //去除两边空格
    trim(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
};
export default Utils;
