class TextUtil {
	public constructor() {
	}
	/**
	 * 添加文本信息
	 * @param container 容器
	 * @param x 文本的x
	 * @param y 文本的y
	 * @param str 文本的内容
	 * @param size   [可选]文本的大小,默认14
	 * @param color  [可选]颜色,默认0x000000,黑色
	 * @param family [可选]文本的字体类型，默认宋体
	 * @param italic [可选]文本倾斜,默认false
	 * @param bold   [可选]文本加粗,默认false
	 */
	public static addTextView(container:egret.DisplayObjectContainer,x:number,y:number,str:string,size?:number,color?:number,
		family?:string,italic?:boolean,bold?:boolean):egret.TextField{
		var text:egret.TextField = new egret.TextField();
		text.x = x;
		text.y = y;
		text.text = str;
		text.size = size == void 0 ? 14 : size;
		text.textColor = color == void 0 ? 0x000000 : color;
		text.fontFamily = family == void 0 ? "宋体" : family;
		text.italic = italic == void 0 ? false : true;
		text.bold = bold == void 0 ? false : true;
		container.addChild(text);
		return text;
	}
	/**
	 * 添加文本输入框
	 * @param container 容器
	 * @param x 文本的x
	 * @param y 文本的y
	 * @param size   [可选]文本的大小,默认14
	 * @param color  [可选]颜色,默认0x000000,黑色
	 * @param family [可选]文本的字体类型，默认宋体
	 * @param italic [可选]文本倾斜,默认false
	 * @param bold   [可选]文本加粗,默认false
	 */
	public static addTextEdit(container:egret.DisplayObjectContainer,x:number,y:number,size?:number,color?:number,
		family?:string,italic?:boolean,bold?:boolean):egret.TextField{
		var text:egret.TextField = new egret.TextField();
		//调用相应的键盘样式
		text.inputType = egret.TextFieldInputType.TEXT;
		//设置文本类型，以便可以输入数据
		text.type = egret.TextFieldType.INPUT;
		text.x = x;
		text.y = y;
		
		text.size = size == void 0 ? 14 : size;
		text.textColor = color == void 0 ? 0x000000 : color;
		text.fontFamily = family == void 0 ? "宋体" : family;
		text.italic = italic == void 0 ? false : true;
		text.bold = bold == void 0 ? false : true;
		text.background = true;
		text.backgroundColor = Color.Gray;
		text.border = true;
		text.borderColor = Color.Black;
		text.text="text:";

		text.width = 400;
		text.height = text.size;
		//事件：
		text.touchEnabled = true;
		text.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event:egret.TouchEvent){
			text.setFocus();
		},container);
		container.addChild(text);
		return text;
	}

	/**
	 * 添加电话输入框
	 * @param container 容器
	 * @param x 文本的x
	 * @param y 文本的y
	 * @param size   [可选]文本的大小,默认14
	 * @param color  [可选]颜色,默认0x000000,黑色
	 * @param family [可选]文本的字体类型，默认宋体
	 * @param italic [可选]文本倾斜,默认false
	 * @param bold   [可选]文本加粗,默认false
	 */
	public static addTextPhone(container:egret.DisplayObjectContainer,x:number,y:number,size?:number,color?:number,
		family?:string,italic?:boolean,bold?:boolean):egret.TextField{
		var text:egret.TextField = new egret.TextField();
		//调用相应的键盘样式
		text.inputType = egret.TextFieldInputType.TEL;
		//设置文本类型，以便可以输入数据
		text.type = egret.TextFieldType.INPUT;
		text.x = x;
		text.y = y;
		
		text.size = size == void 0 ? 14 : size;
		text.textColor = color == void 0 ? 0x000000 : color;
		text.fontFamily = family == void 0 ? "宋体" : family;
		text.italic = italic == void 0 ? false : true;
		text.bold = bold == void 0 ? false : true;
		text.background = true;
		text.backgroundColor = Color.Gray;
		text.border = true;
		text.borderColor = Color.Black;
		text.text="phone:";

		text.width = 400;
		text.height = text.size;
		//事件：
		text.touchEnabled = true;
		text.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event:egret.TouchEvent){
			text.setFocus();
		},container);
		container.addChild(text);
		return text;
	}
	/**
	 * 添加密码输入框
	 * @param container 容器
	 * @param x 文本的x
	 * @param y 文本的y
	 * @param size   [可选]文本的大小,默认14
	 * @param color  [可选]颜色,默认0x000000,黑色
	 * @param family [可选]文本的字体类型，默认宋体
	 * @param italic [可选]文本倾斜,默认false
	 * @param bold   [可选]文本加粗,默认false
	 */
	public static addTextPassword(container:egret.DisplayObjectContainer,x:number,y:number,size?:number,color?:number,
		family?:string,italic?:boolean,bold?:boolean):egret.TextField{
		var text:egret.TextField = new egret.TextField();
		//调用相应的键盘样式
		text.inputType = egret.TextFieldInputType.PASSWORD;
		//设置文本类型，以便可以输入数据
		text.type = egret.TextFieldType.INPUT;
		text.x = x;
		text.y = y;
		
		text.size = size == void 0 ? 14 : size;
		text.textColor = color == void 0 ? 0x000000 : color;
		text.fontFamily = family == void 0 ? "宋体" : family;
		text.italic = italic == void 0 ? false : true;
		text.bold = bold == void 0 ? false : true;
		text.background = true;
		text.backgroundColor = Color.Gray;
		text.border = true;
		text.borderColor = Color.Black;
		text.text="phone:";
		text.displayAsPassword = true;//将文本内容显示成*
		text.width = 400;
		text.height = text.size;
		//事件：
		text.touchEnabled = true;
		text.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event:egret.TouchEvent){
			text.setFocus();
		},container);
		container.addChild(text);
		return text;
	}



	/**
	 * 添加文本输入框
	 * @param container 容器
	 * @param x 文本的x
	 * @param y 文本的y
	 * @param size   [可选]文本的大小,默认14
	 * @param color  [可选]颜色,默认0x000000,黑色
	 * @param family [可选]文本的字体类型，默认宋体
	 * @param italic [可选]文本倾斜,默认false
	 * @param bold   [可选]文本加粗,默认false
	 */
	public static addBitmapTextEdit(container:egret.DisplayObjectContainer,x:number,y:number,str:string,font:egret.BitmapFont):egret.BitmapText{
		var text:egret.BitmapText = new egret.BitmapText();
		text.x = x;
		text.y = y;
		text.text = str;
		text.font = font;
		container.addChild(text);
		return text;
	}
}