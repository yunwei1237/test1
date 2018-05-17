var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimerUtil = (function () {
    function TimerUtil() {
    }
    /**
     * 获得定时器对象
     * @param interval 间隔时间
     * @param times 执行次数
     */
    TimerUtil.getTimer = function (interval, times, perFun, endFun) {
        var timer = new egret.Timer(interval, times);
        timer.addEventListener(egret.TimerEvent.TIMER, perFun, this);
        if (endFun != null)
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, endFun, this);
        return timer;
    };
    return TimerUtil;
}());
__reflect(TimerUtil.prototype, "TimerUtil");
//# sourceMappingURL=TimerUtil.js.map