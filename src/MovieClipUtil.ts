// console.log(MovieClipUtil.getRes("atk",0,0,64,64,12));
// console.log(MovieClipUtil.getRes("mov",65,0,48,48,16));

// console.log(MovieClipUtil.getFrame("atk",12,15));
// console.log(MovieClipUtil.getFrame("mov",16,15));
class MovieClipUtil {
	/**
	 * 
	 * @param type 类型 ：1.horizontal 2.vertical(默认)
	 */
	public static getRes(name:string,x:number,y:number,w:number,h:number,count:number,type?:string):string{
		var str:string = "";
		for(var i = 0;i<count;i++){
			if(type == "horizontal"){
				str += "\""+name+i+"\":{"+"\"x\":"+(x+w*i)+","+"\"y\":"+y+","+"\"w\":"+w+","+"\"h\":"+h+"},";
			}
			else{
				str += "\""+name+i+"\":{"+"\"x\":"+x+","+"\"y\":"+(y+h*i)+","+"\"w\":"+w+","+"\"h\":"+h+"},";
			}
		}
		return str;
	}
	public static getFrame(name:string,count:number,duration:number):string{
		var str:string = "";
		for(var i = 0;i<count;i++){
			str += "{\"res\":\""+name+i+"\",\"x\":"+0+","+"\"y\":"+0+","+"\"duration\":"+duration+"},";
		}
		return str;
	}
}