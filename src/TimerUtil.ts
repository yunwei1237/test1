class TimerUtil {
	public constructor() {
	}
	/**
     * 获得定时器对象
     * @param interval 间隔时间
     * @param times 执行次数
     */
    public static getTimer(interval:number,times:number,perFun:Function,endFun?:Function):egret.Timer{
        var timer:egret.Timer = new egret.Timer(interval,times);
        timer.addEventListener(egret.TimerEvent.TIMER,perFun,this);
        if(endFun != null)
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,endFun,this);
        return timer;
    }
}