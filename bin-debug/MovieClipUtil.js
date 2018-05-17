// console.log(MovieClipUtil.getRes("atk",0,0,64,64,12));
// console.log(MovieClipUtil.getRes("mov",65,0,48,48,16));
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// console.log(MovieClipUtil.getFrame("atk",12,15));
// console.log(MovieClipUtil.getFrame("mov",16,15));
var MovieClipUtil = (function () {
    function MovieClipUtil() {
    }
    /**
     *
     * @param type 类型 ：1.horizontal 2.vertical(默认)
     */
    MovieClipUtil.getRes = function (name, x, y, w, h, count, type) {
        var str = "";
        for (var i = 0; i < count; i++) {
            if (type == "horizontal") {
                str += "\"" + name + i + "\":{" + "\"x\":" + (x + w * i) + "," + "\"y\":" + y + "," + "\"w\":" + w + "," + "\"h\":" + h + "},";
            }
            else {
                str += "\"" + name + i + "\":{" + "\"x\":" + x + "," + "\"y\":" + (y + h * i) + "," + "\"w\":" + w + "," + "\"h\":" + h + "},";
            }
        }
        return str;
    };
    MovieClipUtil.getFrame = function (name, count, duration) {
        var str = "";
        for (var i = 0; i < count; i++) {
            str += "{\"res\":\"" + name + i + "\",\"x\":" + 0 + "," + "\"y\":" + 0 + "," + "\"duration\":" + duration + "},";
        }
        return str;
    };
    return MovieClipUtil;
}());
__reflect(MovieClipUtil.prototype, "MovieClipUtil");
//# sourceMappingURL=MovieClipUtil.js.map