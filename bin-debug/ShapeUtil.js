var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShapeUtil = (function () {
    function ShapeUtil() {
    }
    ShapeUtil.drawGrid = function (container, h, lines) {
        for (var i = 0; i < lines; i++) {
            var obj = new egret.Shape();
            var graphic = obj.graphics;
            graphic.lineStyle(1, 0x000000);
            graphic.moveTo(0, i * h);
            graphic.lineTo(10000, i * h);
            graphic.endFill();
            container.addChild(obj);
        }
    };
    ShapeUtil.drawRect = function (container, x, y, w, h, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.beginFill(color);
        graphic.drawRect(x, y, w, h);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    ShapeUtil.drawCircle = function (container, x, y, r, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.beginFill(color);
        graphic.drawCircle(x, y, r);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    ShapeUtil.drawArc = function (container, x, y, r, start, end, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.beginFill(color);
        graphic.drawArc(x, y, r, start, end, false);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    /**
     * 绘制扇形
     * @param container 容器
     * @param x 圆心的x
     * @param y 圆心的y
     * @param start 开始的弧度
     * @param end 结束的弧度
     * @param color 颜色
     */
    ShapeUtil.drawArcFan = function (container, x, y, r, start, end, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.beginFill(color);
        graphic.lineStyle(1, color);
        //将画点移动到圆心
        graphic.moveTo(x, y);
        //x+r：从圆心画到右边弧线画一条水平线
        graphic.lineTo(x + r, y);
        //从刚画的水平线右端点向下画弧线
        graphic.drawArc(x, y, r, start, end, false);
        //将刚画弧线结束的点连接到圆心
        graphic.lineTo(x, y);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    /**
     * 绘制扇形
     * @param container 容器
     * @param x 圆心的x
     * @param y 圆心的y
     * @param start 开始的角度
     * @param end 结束的角度
     * @param color 颜色
     */
    ShapeUtil.drawArcFan2 = function (container, x, y, r, start, end, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.beginFill(color);
        graphic.lineStyle(1, color);
        //将画点移动到圆心
        graphic.moveTo(x, y);
        //x+r：从圆心画到右边弧线画一条水平线
        graphic.lineTo(x + r, y);
        //从刚画的水平线右端点向下画弧线
        graphic.drawArc(x, y, r, start * Math.PI / 180, end * Math.PI / 180, false);
        //将刚画弧线结束的点连接到圆心
        graphic.lineTo(x, y);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    ShapeUtil.drawArcLine = function (container, x, y, r, start, end, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.lineStyle(1, 0x000000);
        graphic.drawArc(x, y, r, start, end, false);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    ShapeUtil.drawLine = function (container, x1, y1, x2, y2, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.lineStyle(1, color);
        graphic.moveTo(x1, y1);
        graphic.lineTo(x2, y2);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    ShapeUtil.drawCurveLine = function (container, x1, y1, cx, cy, x2, y2, color) {
        var obj = new egret.Shape();
        var graphic = obj.graphics;
        graphic.lineStyle(1, color);
        graphic.moveTo(x1, y1);
        graphic.curveTo(cx, cy, x2, y2);
        graphic.endFill();
        container.addChild(obj);
        return obj;
    };
    /**
     * 绘制圆形进度条
     * @param container 容器
     * @param x 圆形中心的x
     * @param y 圆形中心的y
     * @param r 圆形的半径
     * @param color 颜色
     */
    ShapeUtil.drawArcProgress = function (container, x, y, r, color) {
        var shape = new egret.Shape();
        var angle = 0;
        egret.startTick(function (timeStamp) {
            angle += 1;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(color);
            shape.graphics.lineStyle(2, color, 1);
            shape.graphics.moveTo(x, y);
            shape.graphics.lineTo(x + r, y);
            shape.graphics.drawArc(x, y, r, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(x, y);
            shape.graphics.endFill();
        }
        container.addChild(shape);
        return shape;
    };
    /**
     * 绘制方形进度条
     * @param container 容器
     * @param x 矩形中心的x
     * @param y 矩形中心的y
     * @param r 矩形的宽度
     * @param color 颜色
     */
    ShapeUtil.drawRectProgress = function (container, x, y, r, color) {
        var shape = new egret.Shape();
        var angle = 0;
        egret.startTick(function (timeStamp) {
            angle += 1;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(color);
            shape.graphics.lineStyle(2, color, 1);
            shape.graphics.moveTo(x, y);
            shape.graphics.lineTo(x + r, y);
            shape.graphics.drawArc(x, y, r, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(x, y);
            shape.graphics.endFill();
        }
        var diff = r * 0.6;
        shape.mask = this.drawRect(container, x - r + diff / 2, y - r + diff / 2, r * 2 - diff, r * 2 - diff, color);
        container.addChild(shape);
        return shape;
    };
    return ShapeUtil;
}());
__reflect(ShapeUtil.prototype, "ShapeUtil");
//# sourceMappingURL=ShapeUtil.js.map