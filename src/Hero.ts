/**
 * 英雄的姿势
 */
enum HeroPosture {
    /**
     * 向上移动
     */
    movTop = 0,
    /**
     * 向下移动
     */
    movBottom,
    /**
     * 向左移动
     */
    movLeft,
    /**
    * 向右移动，没有对应的图片，只能将向左移动水平反转
    */
    movRight,
    /**
    * 面向上面站立
    */
    movStandTop,
    /**
    * 面向下面站立
    */
    movStandBottom,
    /**
    * 面向左面站立
    */
    movStandLeft,
    /**
    * 面向右面站立，没有对应的图片，只能将向左站立水平反转
    */
    movStandRight,
    /**
    * 虚弱时
    */
    movWeak,
    /**
     * 向下攻击
     */
    atkBottom,
    /**
     * 向上攻击
     */
    atkTop,
    /**
     * 向右攻击，没有对应的图片，只能将向左攻击水平反转
     */
    atkRight,
    /**
     * 向左攻击
     */
    atkLeft,
    /**
     * 防御上边
     */
    spcDefenseTop,
    /**
     * 防御下边
     */
    spcDefenseBottom,
    /**
     * 防御左边
     */
    spcDefenseLeft,
    /**
     * 防御右边，没有对应的图片，只能将向左防御水平反转
     */
    spcDefenseRight,
	/**
	 * 防御失败
	 */
    spcDefensiveFailure,
	/**
	 * 振奋
	 */
    spcDefenseHearten
}
/**
 * 人物当前的状态
 */
enum HeroState {
    /**
     * 无事状态，站立中
     */
    none,
    /**
     * 移动中
     */
    moving,
    /**
     * 攻击中
     */
    attacking,
    /**
     * 虚弱中
     */
    inWeakness,
    /**
     * 被攻击
     */
    beAttacked,
    /**
     * 振奋中
     */
    inExhilarating,
    /**
     * 格挡中
     */
    defending,
    /**
     * 格挡失败中
     */
    defensesInFailure
}
/**
 * 人物所对应的方向
 */
enum Direction {
    left,
    right,
    top,
    bottom
}
/**
 * 代表一组动作
 */
class Action{
    /**
     * 要执行的影片
     */
    private _movieClip:egret.MovieClip;
    /**
     * 回调函数
     */
    private _callback:Function;
    private _replaceableAction:{[index:string]: HeroPosture} = {
        
    };
    /**
     * 创建一个动作
     * @param movieClip 影片剪辑对象
     */
    public constructor(movieClip:egret.MovieClip){
        this._movieClip = movieClip;
    }
    /**
     * 快速创建一个动作
     * @param movieClip 影片剪辑对象
     */
    public static getAction(movieClip:egret.MovieClip):Action{
        return new Action(movieClip);
    }
    /**
     * 执行指定姿势的动作指定的次数
     * @param posture 指定的姿势
     * @param times 指定的次数,默认1次
     * @param callback 回调函数，默认不执行任何函数
     */
    public execute(posture:HeroPosture,times?:number,callback?:Function):Action{
        this._movieClip.gotoAndPlay(HeroPosture[posture], times == void 0?1:times);
        if(callback != null){
            this._callback = callback;
            this._movieClip.addEventListener(egret.Event.COMPLETE,this.runCallBack,this);
        }
        return this;
    }
    /**
     * 中断该动作，不可恢复，会执行回调函数
     */
    public interrupt(){
       this._movieClip.stop();//停止动作
       this._movieClip.dispatchEvent(new egret.Event(egret.Event.COMPLETE));//分发完成事件
    }
    /**
     * 暂停该动作,可以继续执行该动作，不会执行回调函数
     */
    public pause(){
        this._movieClip.stop();
    }
    /**
     * 继续该动作
     */
    public play(){
        this._movieClip.play();
    }
    /**
     * 用于绑定事件监听和移除事件监听
     */
    private runCallBack(){
        this._callback();
        this._movieClip.removeEventListener(egret.Event.COMPLETE,this.runCallBack,this);
    }

}
/**
 * 动作链
 * 用于一次执行多个动作
 */
class ActionLink{
     /**
     * 要执行的影片
     */
    private _movieClip:egret.MovieClip;
    /**
     * 动作集合
     */
    private _actions:Array<Action> = [];
    /**
     * 姿势集合
     */
    private _postures:Array<HeroPosture> = [];
    /**
     * 次数集合
     */
    private _times:Array<number> = [];
    /**
     * 回调函数
     */
    private _callbackes:Array<Function> = [];
    /**
     * 即将要插入的动作下标
     */
    private _index = 0;
    /**
     * 即将要执行的动作的下标
     */
    private _exeIndex = 0;
    /**
     * @param movieClip 动作链中的影片剪辑
     */
    private constructor(movieClip:egret.MovieClip){
        this._movieClip = movieClip;
    }
    /**
     * 获得一个动作链
     * @param movieClip 动作链中的影片剪辑
     */
    public static getActionLink(movieClip:egret.MovieClip):ActionLink{
        return new ActionLink(movieClip);
    }
    /**
     * 为动作链增加一个动作
     * @param posture 指定的姿势
     * @param times 指定的次数,默认1次
     * @param callback 回调函数，默认不执行任何函数
     */
    public addAction(posture:HeroPosture,times?:number,callback?:Function):ActionLink{
        //新增动作
        this._postures[this._index] = posture;
        //新增次数
        this._times[this._index] = times;
        //新增回调
        this._callbackes[this._index] = callback;
        //新增动作
        this._actions[this._index++] = Action.getAction(this._movieClip);
        return this;
    }
    /**
     * 将动作链中的动作一个接一个执行完成
     */
    public execute(){
        var action:Action = this._actions[this._exeIndex];
        action.execute(this._postures[this._exeIndex],this._times[this._exeIndex],()=>{
            //执行回调函数，并将即将执行的下标向下移动一位
            let callback = this._callbackes[this._exeIndex++];
            if(callback != null) callback();
            //如果动作没有执行完成，就执行下一个动作
            if(this._exeIndex<this._index){
                this.execute();
            }
        }); 
    }
}
/**
 * 角色对象
 */
class HeroRole {
    private appearance: egret.MovieClip;
    public constructor(appearance: egret.MovieClip) {
        this.appearance = appearance;
        //设置水平翻转的中心点
        this.appearance.anchorOffsetX = this.appearance.width / 2;
        this.appearance.anchorOffsetY = this.appearance.height / 2;
        //保存图片原来的位置
        this.appearance.x += this.appearance.anchorOffsetX;
        this.appearance.y += this.appearance.anchorOffsetY;
    }

    set x(x:number){
        this.appearance.x = x;
    }
    set y(y:number){
        this.appearance.y = y;
    }
    get x(){
        return this.appearance.x;
    }
    get y(){
        return this.appearance.y;
    }
    /**
     * 播放行走动画
     */
    public playWalk(direction:Direction): void {
        this.prev();
        switch (direction) {
            case Direction.left:
                //ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movLeft,99999).execute();
                Action.getAction(this.appearance).execute(HeroPosture.movLeft,99999);
                break;
            case Direction.right:
                this.appearance.skewY = 180;
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movLeft,99999).execute();
                break;
            case Direction.top:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movTop,99999).execute();
                break;
            case Direction.bottom:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movBottom,99999).execute();
                break;
        }
    }
    /**
     * 播放站立动画
     */
    public playStand(direction:Direction): void {
        this.prev();
        switch (direction) {
            case Direction.left:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandLeft,1).execute();
                break;
            case Direction.right:
                this.appearance.skewY = 180;
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandLeft,1).execute();
                break;
            case Direction.top:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandTop,1).execute();
                break;
            case Direction.bottom:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandBottom,1).execute();
                break;
        }
    }
    /**
     * 播放攻击动画
     */
    public playAtk(direction:Direction): void {
        this.prev();
        switch (direction) {
            case Direction.left:
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.atkLeft], 1);
                break;
            case Direction.right:
                this.appearance.skewY = 180;
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.atkLeft], 1);
                break;
            case Direction.top:
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.atkTop], 1);
                break;
            case Direction.bottom:
                this.appearance.skewY = 0;
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.atkBottom], 1);
                break;
        }
    }
    /**
     * 播放防御动画
     */
    public playDefense(direction:Direction): void {
        this.prev();
        switch (direction) {
            case Direction.left:
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefenseLeft], 99999);
                break;
            case Direction.right:
                this.appearance.skewY = 180;
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefenseLeft], 99999);
                break;
            case Direction.top:
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefenseTop], 99999);
                break;
            case Direction.bottom:
                this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefenseBottom], 99999);
                break;
        }
    }
    /**
     * 播放防御失败动画
     */
    public playDefensiveFailure(): void {
        this.prev();
        this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefensiveFailure], 99999);
    }
    /**
     * 播放振奋动画
     */
    public playHearten(): void {
        this.prev();
        this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefenseHearten], 99999);
    }
    /**
     * 播放虚弱动画
     */
    public playWeak(): void {
        this.prev();
        this.appearance.gotoAndPlay(HeroPosture[HeroPosture.movWeak], 99999);
    }
    //每次动作执行前
    private prev(): void {
        this.appearance.skewY = 0;//设置反转为正常状态
    }
    //打断动画执行
    private interrupt(): void {
        this.appearance.stop();//停止以前的动画剪辑
    }

}
class Thing{
    public constructor(name:string){
        this.name = name;
    }
    /**
     * 英雄名字
     */
    public name:string;
    /**
     * 是否死亡
     */
    public isDead:boolean;
}
/**
 * 英雄的数据
 */
class HeroData extends Thing{
    public constructor(name:string,health:number,magic:number,attack:number){
        super(name);
        this.health = health;
        this.magic = magic;
        this.attack = attack;
    }
    /**
     * 英雄健康值
     */
    public health:number;
    /**
     * 英雄魔法值
     */
    public magic:number;
    /**
     * 英雄攻击力;
     */
    public attack:number;

}
/**
 * 英雄对象
 */
class Hero extends HeroData {
    public constructor(name:string,health:number,magic:number,attack:number,role:HeroRole) {
        super(name,health,magic,attack);
        this.role = role;
    }
    /**
     * 英雄移动速度
     */
    public speed: number = 1;
    /**
     * 英雄当前的状态
     */
    public state: HeroState;
    /**
     * 英雄当前所面对的方向
     */
    public direction: Direction = Direction.right;
    /**
     * 英雄对应的外貌
     */
    private role:HeroRole;
    /**
     * 根据当前的方向移动
     */
    public walk(direction?:Direction): void {
        if(direction != null){
            this.direction = direction;
        }
        this.role.playWalk(this.direction);
        this.state = HeroState.moving;
    }
    public walkTop(): void {
        this.walk(Direction.top);
    }
    public walkRight(): void {
        this.walk(Direction.right);
    }
    public walkBottom(): void {
        this.walk(Direction.bottom);
    }
    public walkLeft(): void {
        this.walk(Direction.left);
        this.state = HeroState.moving;
    }
    public atk(direction?:Direction): void {
        if(direction != null){
            this.direction = direction;
        }
        if(this.state != HeroState.attacking){
            this.role.playAtk(this.direction);
            this.state = HeroState.attacking;
        }
    }
    public atkTop(): void {
        this.atk(Direction.top)
    }
    public atkRight(): void {
        this.atk(Direction.right)
    }
    public atkBottom(): void {
        this.atk(Direction.bottom)
    }
    public atkLeft(): void {
        this.atk(Direction.left)
    }
    public defense(direction?:Direction): void {
        if(direction != null){
            this.direction = direction;
        }
        if(this.state != HeroState.defending){
            this.role.playDefense(this.direction);
            this.state = HeroState.defending;
        }
    }
    public defenseTop(): void {
        this.defense(Direction.top);
    }
    public defenseRight(): void {
        this.defense(Direction.right);
    }
    public defenseBottom(): void {
        this.defense(Direction.bottom);
    }
    public defenseLeft(): void {
        this.defense(Direction.left);
    }
    public stand(direction?:Direction) {
        if(direction != null){
            this.direction = direction;
        }
        if(this.state != HeroState.none){
            this.role.playStand(this.direction);
            this.state = HeroState.none;
        }
    }
    public standTop() {
        this.stand(Direction.top);
    }
    public standRight() {
        this.stand(Direction.right);
    }
    public standBottom() {
        this.stand(Direction.bottom);
    }
    public standLeft() {
        this.stand(Direction.left);
    }
    public defensiveFailure() {
        this.role.playDefensiveFailure();
        this.state = HeroState.defensesInFailure;
    }
    public hearten() {
        this.role.playHearten();
        this.state = HeroState.inExhilarating;
    }
    public weak() {
        if(this.state != HeroState.inWeakness){
            this.role.playWeak();
            this.state = HeroState.inWeakness;
        }
    }
    /**
     * 活动
     */
    public live(){
        switch(this.state){
            //如果英雄的状态是正在移动中，就根据英雄的方向改变英雄的位置
            case HeroState.moving:
                switch (this.direction) {
                    case Direction.left:
                        this.role.x -= this.speed;
                        break;
                    case Direction.right:
                        this.role.x += this.speed;
                        break;
                    case Direction.top:
                        this.role.y -= this.speed;
                        break;
                    case Direction.bottom:
                        this.role.y += this.speed;
                        break;
                }
            break;
        }
    }
}
class HeroFactory{
    
}
class Game {
    public static start(container: egret.DisplayObjectContainer) {
        var data = RES.getRes("lvbu_json");
        var txtr = RES.getRes("gongshou_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
        container.addChild(mc1);
        var role: HeroRole = new HeroRole(mc1);
        role.x += 200;
        role.y += 200;
        //设置角色
        var hero: Hero = new Hero("吕布",100,100,20,role);
        hero.speed = 2;

        var btn2: egret.TextField = TextUtil.addTextView(container, 0, 50, "攻击", 40, Color.Red);
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            ActionLink.getActionLink(mc1).addAction(HeroPosture.atkLeft,3).addAction(HeroPosture.atkBottom,3).addAction(HeroPosture.movStandBottom).execute();
        }, this);
        var btn3: egret.TextField = TextUtil.addTextView(container, 0, 100, "格挡", 40, Color.Red);
        btn3.touchEnabled = true;
        btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.defense();
        }, this);


        var left: egret.TextField = TextUtil.addTextView(container, 0, 150, "左边", 40, Color.Red);
        left.touchEnabled = true;
        left.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.walkLeft();
        }, this);
        left.addEventListener(egret.TouchEvent.TOUCH_END, (ent: egret.TouchEvent) => {
            hero.stand();
        }, this);
        var right: egret.TextField = TextUtil.addTextView(container, 0, 200, "右边", 40, Color.Red);
        right.touchEnabled = true;
        right.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.walkRight();
        }, this);
        right.addEventListener(egret.TouchEvent.TOUCH_END, (ent: egret.TouchEvent) => {
            hero.stand();
        }, this);
        var top: egret.TextField = TextUtil.addTextView(container, 0, 250, "上边", 40, Color.Red);
        top.touchEnabled = true;
        top.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.walkTop();
        }, this);
        top.addEventListener(egret.TouchEvent.TOUCH_END, (ent: egret.TouchEvent) => {
            hero.stand();
        }, this);
        var bottom: egret.TextField = TextUtil.addTextView(container, 0, 300, "下边", 40, Color.Red);
        bottom.touchEnabled = true;
        bottom.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.walkBottom();
        }, this);
        bottom.addEventListener(egret.TouchEvent.TOUCH_END, (ent: egret.TouchEvent) => {
            hero.stand();
        }, this);
        var defensiveFailure: egret.TextField = TextUtil.addTextView(container, 0, 350, "格挡失败", 40, Color.Red);
        defensiveFailure.touchEnabled = true;
        defensiveFailure.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.defensiveFailure();
        }, this);

        var spcDefenseHearten: egret.TextField = TextUtil.addTextView(container, 0, 400, "振奋", 40, Color.Red);
        spcDefenseHearten.touchEnabled = true;
        spcDefenseHearten.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.hearten();
        }, this);

        var weak: egret.TextField = TextUtil.addTextView(container, 0, 450, "虚弱", 40, Color.Red);
        weak.touchEnabled = true;
        weak.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (ent: egret.TouchEvent) => {
            hero.weak();
        }, this);
        //按键按下
        var lastKey = "";
        document.onkeydown= function(event){
            var key = String.fromCharCode(event.keyCode);
            console.log(key);
            if(lastKey != key){
                lastKey = key;
                switch(key){
                    case "A":
                        hero.walkLeft();
                    break;
                    case "W":
                        hero.walkTop();
                    break;
                    case "S":
                        hero.walkBottom();
                    break;
                    case "D":
                        hero.walkRight();
                    break;
                }
            }
            switch(key){
                    case "J":
                        hero.atk();
                    break;
                    case "U":
                        hero.hearten();
                    break;
                    case "K":
                        hero.defense();
                    break;
             }
        }
        //按键弹起
        document.onkeyup= function(event){
            var key = String.fromCharCode(event.keyCode);
            console.log(key);
            switch(key){
                case "A":
                    hero.standLeft();
                break;
                case "W":
                   hero.standTop();
                break;
                case "S":
                    hero.standBottom();
                break;
                case "D":
                    hero.standRight();
                break;
                case "U":
                case "K":
                // case "J":
                    hero.stand();
                break;
            }
            lastKey = null;
        }
        //心跳事件
        var timer:egret.Timer = TimerUtil.getTimer(16,0,function(){
            hero.live();
        });
        timer.start();
    }
}