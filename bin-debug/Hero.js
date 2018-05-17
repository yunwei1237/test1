var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 英雄的姿势
 */
var HeroPosture;
(function (HeroPosture) {
    /**
     * 向上移动
     */
    HeroPosture[HeroPosture["movTop"] = 0] = "movTop";
    /**
     * 向下移动
     */
    HeroPosture[HeroPosture["movBottom"] = 1] = "movBottom";
    /**
     * 向左移动
     */
    HeroPosture[HeroPosture["movLeft"] = 2] = "movLeft";
    /**
    * 向右移动，没有对应的图片，只能将向左移动水平反转
    */
    HeroPosture[HeroPosture["movRight"] = 3] = "movRight";
    /**
    * 面向上面站立
    */
    HeroPosture[HeroPosture["movStandTop"] = 4] = "movStandTop";
    /**
    * 面向下面站立
    */
    HeroPosture[HeroPosture["movStandBottom"] = 5] = "movStandBottom";
    /**
    * 面向左面站立
    */
    HeroPosture[HeroPosture["movStandLeft"] = 6] = "movStandLeft";
    /**
    * 面向右面站立，没有对应的图片，只能将向左站立水平反转
    */
    HeroPosture[HeroPosture["movStandRight"] = 7] = "movStandRight";
    /**
    * 虚弱时
    */
    HeroPosture[HeroPosture["movWeak"] = 8] = "movWeak";
    /**
     * 向下攻击
     */
    HeroPosture[HeroPosture["atkBottom"] = 9] = "atkBottom";
    /**
     * 向上攻击
     */
    HeroPosture[HeroPosture["atkTop"] = 10] = "atkTop";
    /**
     * 向右攻击，没有对应的图片，只能将向左攻击水平反转
     */
    HeroPosture[HeroPosture["atkRight"] = 11] = "atkRight";
    /**
     * 向左攻击
     */
    HeroPosture[HeroPosture["atkLeft"] = 12] = "atkLeft";
    /**
     * 防御上边
     */
    HeroPosture[HeroPosture["spcDefenseTop"] = 13] = "spcDefenseTop";
    /**
     * 防御下边
     */
    HeroPosture[HeroPosture["spcDefenseBottom"] = 14] = "spcDefenseBottom";
    /**
     * 防御左边
     */
    HeroPosture[HeroPosture["spcDefenseLeft"] = 15] = "spcDefenseLeft";
    /**
     * 防御右边，没有对应的图片，只能将向左防御水平反转
     */
    HeroPosture[HeroPosture["spcDefenseRight"] = 16] = "spcDefenseRight";
    /**
     * 防御失败
     */
    HeroPosture[HeroPosture["spcDefensiveFailure"] = 17] = "spcDefensiveFailure";
    /**
     * 振奋
     */
    HeroPosture[HeroPosture["spcDefenseHearten"] = 18] = "spcDefenseHearten";
})(HeroPosture || (HeroPosture = {}));
/**
 * 人物当前的状态
 */
var HeroState;
(function (HeroState) {
    /**
     * 无事状态，站立中
     */
    HeroState[HeroState["none"] = 0] = "none";
    /**
     * 移动中
     */
    HeroState[HeroState["moving"] = 1] = "moving";
    /**
     * 攻击中
     */
    HeroState[HeroState["attacking"] = 2] = "attacking";
    /**
     * 虚弱中
     */
    HeroState[HeroState["inWeakness"] = 3] = "inWeakness";
    /**
     * 被攻击
     */
    HeroState[HeroState["beAttacked"] = 4] = "beAttacked";
    /**
     * 振奋中
     */
    HeroState[HeroState["inExhilarating"] = 5] = "inExhilarating";
    /**
     * 格挡中
     */
    HeroState[HeroState["defending"] = 6] = "defending";
    /**
     * 格挡失败中
     */
    HeroState[HeroState["defensesInFailure"] = 7] = "defensesInFailure";
})(HeroState || (HeroState = {}));
/**
 * 人物所对应的方向
 */
var Direction;
(function (Direction) {
    Direction[Direction["left"] = 0] = "left";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["top"] = 2] = "top";
    Direction[Direction["bottom"] = 3] = "bottom";
})(Direction || (Direction = {}));
/**
 * 代表一组动作
 */
var Action = (function () {
    /**
     * 创建一个动作
     * @param movieClip 影片剪辑对象
     */
    function Action(movieClip) {
        this._movieClip = movieClip;
    }
    /**
     * 快速创建一个动作
     * @param movieClip 影片剪辑对象
     */
    Action.getAction = function (movieClip) {
        return new Action(movieClip);
    };
    /**
     * 执行指定姿势的动作指定的次数
     * @param posture 指定的姿势
     * @param times 指定的次数,默认1次
     * @param callback 回调函数，默认不执行任何函数
     */
    Action.prototype.execute = function (posture, times, callback) {
        this._movieClip.gotoAndPlay(HeroPosture[posture], times == void 0 ? 1 : times);
        if (callback != null) {
            this._callback = callback;
            this._movieClip.addEventListener(egret.Event.COMPLETE, this.runCallBack, this);
        }
        return this;
    };
    /**
     * 中断该动作，不可恢复，会执行回调函数
     */
    Action.prototype.interrupt = function () {
        this._movieClip.stop(); //停止动作
        this._movieClip.dispatchEvent(new egret.Event(egret.Event.COMPLETE)); //分发完成事件
    };
    /**
     * 暂停该动作,可以继续执行该动作，不会执行回调函数
     */
    Action.prototype.pause = function () {
        this._movieClip.stop();
    };
    /**
     * 继续该动作
     */
    Action.prototype.play = function () {
        this._movieClip.play();
    };
    /**
     * 用于绑定事件监听和移除事件监听
     */
    Action.prototype.runCallBack = function () {
        this._callback();
        this._movieClip.removeEventListener(egret.Event.COMPLETE, this.runCallBack, this);
    };
    return Action;
}());
__reflect(Action.prototype, "Action");
/**
 * 动作链
 * 用于一次执行多个动作
 */
var ActionLink = (function () {
    /**
     * @param movieClip 动作链中的影片剪辑
     */
    function ActionLink(movieClip) {
        /**
         * 动作集合
         */
        this._actions = [];
        /**
         * 姿势集合
         */
        this._postures = [];
        /**
         * 次数集合
         */
        this._times = [];
        /**
         * 回调函数
         */
        this._callbackes = [];
        /**
         * 即将要插入的动作下标
         */
        this._index = 0;
        /**
         * 即将要执行的动作的下标
         */
        this._exeIndex = 0;
        this._movieClip = movieClip;
    }
    /**
     * 获得一个动作链
     * @param movieClip 动作链中的影片剪辑
     */
    ActionLink.getActionLink = function (movieClip) {
        return new ActionLink(movieClip);
    };
    /**
     * 为动作链增加一个动作
     * @param posture 指定的姿势
     * @param times 指定的次数,默认1次
     * @param callback 回调函数，默认不执行任何函数
     */
    ActionLink.prototype.addAction = function (posture, times, callback) {
        //新增动作
        this._postures[this._index] = posture;
        //新增次数
        this._times[this._index] = times;
        //新增回调
        this._callbackes[this._index] = callback;
        //新增动作
        this._actions[this._index++] = Action.getAction(this._movieClip);
        return this;
    };
    /**
     * 将动作链中的动作一个接一个执行完成
     */
    ActionLink.prototype.execute = function () {
        var _this = this;
        var action = this._actions[this._exeIndex];
        action.execute(this._postures[this._exeIndex], this._times[this._exeIndex], function () {
            //执行回调函数，并将即将执行的下标向下移动一位
            var callback = _this._callbackes[_this._exeIndex++];
            if (callback != null)
                callback();
            //如果动作没有执行完成，就执行下一个动作
            if (_this._exeIndex < _this._index) {
                _this.execute();
            }
        });
    };
    return ActionLink;
}());
__reflect(ActionLink.prototype, "ActionLink");
/**
 * 角色对象
 */
var HeroRole = (function () {
    function HeroRole(appearance) {
        this.appearance = appearance;
        //设置水平翻转的中心点
        this.appearance.anchorOffsetX = this.appearance.width / 2;
        this.appearance.anchorOffsetY = this.appearance.height / 2;
        //保存图片原来的位置
        this.appearance.x += this.appearance.anchorOffsetX;
        this.appearance.y += this.appearance.anchorOffsetY;
    }
    Object.defineProperty(HeroRole.prototype, "x", {
        get: function () {
            return this.appearance.x;
        },
        set: function (x) {
            this.appearance.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroRole.prototype, "y", {
        get: function () {
            return this.appearance.y;
        },
        set: function (y) {
            this.appearance.y = y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放行走动画
     */
    HeroRole.prototype.playWalk = function (direction) {
        this.prev();
        switch (direction) {
            case Direction.left:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movLeft, 99999).execute();
                break;
            case Direction.right:
                this.appearance.skewY = 180;
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movLeft, 99999).execute();
                break;
            case Direction.top:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movTop, 99999).execute();
                break;
            case Direction.bottom:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movBottom, 99999).execute();
                break;
        }
    };
    /**
     * 播放站立动画
     */
    HeroRole.prototype.playStand = function (direction) {
        this.prev();
        switch (direction) {
            case Direction.left:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandLeft, 1).execute();
                break;
            case Direction.right:
                this.appearance.skewY = 180;
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandLeft, 1).execute();
                break;
            case Direction.top:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandTop, 1).execute();
                break;
            case Direction.bottom:
                ActionLink.getActionLink(this.appearance).addAction(HeroPosture.movStandBottom, 1).execute();
                break;
        }
    };
    /**
     * 播放攻击动画
     */
    HeroRole.prototype.playAtk = function (direction) {
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
    };
    /**
     * 播放防御动画
     */
    HeroRole.prototype.playDefense = function (direction) {
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
    };
    /**
     * 播放防御失败动画
     */
    HeroRole.prototype.playDefensiveFailure = function () {
        this.prev();
        this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefensiveFailure], 99999);
    };
    /**
     * 播放振奋动画
     */
    HeroRole.prototype.playHearten = function () {
        this.prev();
        this.appearance.gotoAndPlay(HeroPosture[HeroPosture.spcDefenseHearten], 99999);
    };
    /**
     * 播放虚弱动画
     */
    HeroRole.prototype.playWeak = function () {
        this.prev();
        this.appearance.gotoAndPlay(HeroPosture[HeroPosture.movWeak], 99999);
    };
    //每次动作执行前
    HeroRole.prototype.prev = function () {
        this.appearance.skewY = 0; //设置反转为正常状态
    };
    //打断动画执行
    HeroRole.prototype.interrupt = function () {
        this.appearance.stop(); //停止以前的动画剪辑
    };
    return HeroRole;
}());
__reflect(HeroRole.prototype, "HeroRole");
var Thing = (function () {
    function Thing(name) {
        this.name = name;
    }
    return Thing;
}());
__reflect(Thing.prototype, "Thing");
/**
 * 英雄的数据
 */
var HeroData = (function (_super) {
    __extends(HeroData, _super);
    function HeroData(name, health, magic, attack) {
        var _this = _super.call(this, name) || this;
        _this.health = health;
        _this.magic = magic;
        _this.attack = attack;
        return _this;
    }
    return HeroData;
}(Thing));
__reflect(HeroData.prototype, "HeroData");
/**
 * 英雄对象
 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(name, health, magic, attack, role) {
        var _this = _super.call(this, name, health, magic, attack) || this;
        /**
         * 英雄移动速度
         */
        _this.speed = 1;
        /**
         * 英雄当前所面对的方向
         */
        _this.direction = Direction.right;
        _this.role = role;
        return _this;
    }
    /**
     * 根据当前的方向移动
     */
    Hero.prototype.walk = function (direction) {
        if (direction != null) {
            this.direction = direction;
        }
        this.role.playWalk(this.direction);
        this.state = HeroState.moving;
    };
    Hero.prototype.walkTop = function () {
        this.walk(Direction.top);
    };
    Hero.prototype.walkRight = function () {
        this.walk(Direction.right);
    };
    Hero.prototype.walkBottom = function () {
        this.walk(Direction.bottom);
    };
    Hero.prototype.walkLeft = function () {
        this.walk(Direction.left);
        this.state = HeroState.moving;
    };
    Hero.prototype.atk = function (direction) {
        if (direction != null) {
            this.direction = direction;
        }
        if (this.state != HeroState.attacking) {
            this.role.playAtk(this.direction);
            this.state = HeroState.attacking;
        }
    };
    Hero.prototype.atkTop = function () {
        this.atk(Direction.top);
    };
    Hero.prototype.atkRight = function () {
        this.atk(Direction.right);
    };
    Hero.prototype.atkBottom = function () {
        this.atk(Direction.bottom);
    };
    Hero.prototype.atkLeft = function () {
        this.atk(Direction.left);
    };
    Hero.prototype.defense = function (direction) {
        if (direction != null) {
            this.direction = direction;
        }
        if (this.state != HeroState.defending) {
            this.role.playDefense(this.direction);
            this.state = HeroState.defending;
        }
    };
    Hero.prototype.defenseTop = function () {
        this.defense(Direction.top);
    };
    Hero.prototype.defenseRight = function () {
        this.defense(Direction.right);
    };
    Hero.prototype.defenseBottom = function () {
        this.defense(Direction.bottom);
    };
    Hero.prototype.defenseLeft = function () {
        this.defense(Direction.left);
    };
    Hero.prototype.stand = function (direction) {
        if (direction != null) {
            this.direction = direction;
        }
        if (this.state != HeroState.none) {
            this.role.playStand(this.direction);
            this.state = HeroState.none;
        }
    };
    Hero.prototype.standTop = function () {
        this.stand(Direction.top);
    };
    Hero.prototype.standRight = function () {
        this.stand(Direction.right);
    };
    Hero.prototype.standBottom = function () {
        this.stand(Direction.bottom);
    };
    Hero.prototype.standLeft = function () {
        this.stand(Direction.left);
    };
    Hero.prototype.defensiveFailure = function () {
        this.role.playDefensiveFailure();
        this.state = HeroState.defensesInFailure;
    };
    Hero.prototype.hearten = function () {
        this.role.playHearten();
        this.state = HeroState.inExhilarating;
    };
    Hero.prototype.weak = function () {
        if (this.state != HeroState.inWeakness) {
            this.role.playWeak();
            this.state = HeroState.inWeakness;
        }
    };
    /**
     * 活动
     */
    Hero.prototype.live = function () {
        switch (this.state) {
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
    };
    return Hero;
}(HeroData));
__reflect(Hero.prototype, "Hero");
var HeroFactory = (function () {
    function HeroFactory() {
    }
    return HeroFactory;
}());
__reflect(HeroFactory.prototype, "HeroFactory");
var Game = (function () {
    function Game() {
    }
    Game.start = function (container) {
        var data = RES.getRes("lvbu_json");
        var txtr = RES.getRes("gongshou_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData());
        container.addChild(mc1);
        var role = new HeroRole(mc1);
        role.x += 200;
        role.y += 200;
        //设置角色
        var hero = new Hero("吕布", 100, 100, 20, role);
        hero.speed = 2;
        var btn2 = TextUtil.addTextView(container, 0, 50, "攻击", 40, Color.Red);
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            ActionLink.getActionLink(mc1).addAction(HeroPosture.atkLeft, 3).addAction(HeroPosture.atkBottom, 3).addAction(HeroPosture.movStandBottom).execute();
        }, this);
        var btn3 = TextUtil.addTextView(container, 0, 100, "格挡", 40, Color.Red);
        btn3.touchEnabled = true;
        btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.defense();
        }, this);
        var left = TextUtil.addTextView(container, 0, 150, "左边", 40, Color.Red);
        left.touchEnabled = true;
        left.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.walkLeft();
        }, this);
        left.addEventListener(egret.TouchEvent.TOUCH_END, function (ent) {
            hero.stand();
        }, this);
        var right = TextUtil.addTextView(container, 0, 200, "右边", 40, Color.Red);
        right.touchEnabled = true;
        right.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.walkRight();
        }, this);
        right.addEventListener(egret.TouchEvent.TOUCH_END, function (ent) {
            hero.stand();
        }, this);
        var top = TextUtil.addTextView(container, 0, 250, "上边", 40, Color.Red);
        top.touchEnabled = true;
        top.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.walkTop();
        }, this);
        top.addEventListener(egret.TouchEvent.TOUCH_END, function (ent) {
            hero.stand();
        }, this);
        var bottom = TextUtil.addTextView(container, 0, 300, "下边", 40, Color.Red);
        bottom.touchEnabled = true;
        bottom.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.walkBottom();
        }, this);
        bottom.addEventListener(egret.TouchEvent.TOUCH_END, function (ent) {
            hero.stand();
        }, this);
        var defensiveFailure = TextUtil.addTextView(container, 0, 350, "格挡失败", 40, Color.Red);
        defensiveFailure.touchEnabled = true;
        defensiveFailure.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.defensiveFailure();
        }, this);
        var spcDefenseHearten = TextUtil.addTextView(container, 0, 400, "振奋", 40, Color.Red);
        spcDefenseHearten.touchEnabled = true;
        spcDefenseHearten.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.hearten();
        }, this);
        var weak = TextUtil.addTextView(container, 0, 450, "虚弱", 40, Color.Red);
        weak.touchEnabled = true;
        weak.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ent) {
            hero.weak();
        }, this);
        //按键按下
        var lastKey = "";
        document.onkeydown = function (event) {
            var key = String.fromCharCode(event.keyCode);
            console.log(key);
            if (lastKey != key) {
                lastKey = key;
                switch (key) {
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
            switch (key) {
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
        };
        //按键弹起
        document.onkeyup = function (event) {
            var key = String.fromCharCode(event.keyCode);
            console.log(key);
            switch (key) {
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
        };
        //心跳事件
        var timer = TimerUtil.getTimer(16, 0, function () {
            hero.live();
        });
        timer.start();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Hero.js.map