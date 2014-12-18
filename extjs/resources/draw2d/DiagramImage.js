draw2d.diagramImage=function(url){
this.url="../../../../resources/images/proyectos/"+url;
this.inputPort1=null;
this.inputPort2=null;
this.outputPort1=null;
this.outputPort2=null;
this.img=null;
draw2d.Node.call(this);
this.setDimension(75,100);
this.setColor(null);
};
draw2d.diagramImage.prototype=new draw2d.Node;
draw2d.diagramImage.prototype.type="draw2d.diagramImage";
draw2d.diagramImage.prototype.createHTMLElement=function(){
	var item=draw2d.Node.prototype.createHTMLElement.call(this);
	if(navigator.appName.toUpperCase()=="MICROSOFT INTERNET EXPLORER"){
		this.d=document.createElement("div");
		this.d.style.position="absolute";
		this.d.style.left="0px";
		this.d.style.top="0px";
		this.d.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader (src='"+this.url+"', sizingMethod='scale')";
		item.appendChild(this.d);
	}else{
		this.img=document.createElement("img");
		this.img.style.position="absolute";
		this.img.style.left="0px";
		this.img.style.top="0px";
		this.img.src=this.url;
		item.appendChild(this.img);
		this.d=document.createElement("div");
		this.d.style.position="absolute";
		this.d.style.left="0px";
		this.d.style.top="0px";
		item.appendChild(this.d);
	}
	item.style.left=this.x+"px";
	item.style.top=this.y+"px";
	return item;
};

draw2d.diagramImage.prototype.setDimension=function(w,h){
	draw2d.Node.prototype.setDimension.call(this,w,h);
	if(this.d!==null){
		this.d.style.width=this.width+"px";
		this.d.style.height=this.height+"px";
	}
	if(this.img!==null){
		this.img.width=this.width;
		this.img.height=this.height;
	}
	if(this.outputPort1!==null){
		this.outputPort1.setPosition(this.width+3,this.height/3);
		this.outputPort2.setPosition(this.width+3,this.height/3*2);
	}
};
draw2d.diagramImage.prototype.setWorkflow=function(_2845){
	draw2d.Node.prototype.setWorkflow.call(this,_2845);
	if(_2845!==null){
		this.inputPort1=new draw2d.InputPort();
		this.inputPort1.setName("input1");
		this.inputPort1.setWorkflow(_2845);
		this.inputPort1.setBackgroundColor(new draw2d.Color(115,115,245));
		this.inputPort1.setColor(null);
		this.addPort(this.inputPort1,-3,this.height/3*2);

		this.inputPort2=new draw2d.InputPort();
		this.inputPort2.setName("input2");
		this.inputPort2.setWorkflow(_2845);
		this.inputPort2.setBackgroundColor(new draw2d.Color(115,115,245));
		this.inputPort2.setColor(null);
		this.addPort(this.inputPort2,-3,this.height/3);

		this.inputPort3=new draw2d.InputPort();
		this.inputPort3.setName("input3");
		this.inputPort3.setWorkflow(_2845);
		this.inputPort3.setBackgroundColor(new draw2d.Color(115,115,245));
		this.inputPort3.setColor(null);
		this.addPort(this.inputPort3,this.width/3,0);

		this.inputPort4=new draw2d.InputPort();
		this.inputPort4.setName("input4");
		this.inputPort4.setWorkflow(_2845);
		this.inputPort4.setBackgroundColor(new draw2d.Color(115,115,245));
		this.inputPort4.setColor(null);
		this.addPort(this.inputPort4,this.width/3*2,0);

		this.outputPort1=new draw2d.OutputPort();
		this.outputPort1.setName("output1");
		this.outputPort1.setMaxFanOut(1);
		this.outputPort1.setWorkflow(_2845);
		this.outputPort1.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.outputPort1,this.width/3,this.height+3);

		this.outputPort2=new draw2d.OutputPort();
		this.outputPort2.setName("output2");
		this.outputPort2.setMaxFanOut(1);
		this.outputPort2.setWorkflow(_2845);
		this.outputPort2.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.outputPort2,this.width/3*2,this.height+3);

		this.outputPort3=new draw2d.OutputPort();
		this.outputPort3.setName("output3");
		this.outputPort3.setMaxFanOut(1)
		this.outputPort3.setWorkflow(_2845);
		this.outputPort3.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.outputPort3,this.width+3,this.height/3*2);

		this.outputPort4=new draw2d.OutputPort();
		this.outputPort4.setName("output4");
		this.outputPort4.setMaxFanOut(1);
		this.outputPort4.setWorkflow(_2845);
		this.outputPort4.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.outputPort4,this.width+3,this.height/3);
	}
};
