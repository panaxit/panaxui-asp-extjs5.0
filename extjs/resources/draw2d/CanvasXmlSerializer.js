draw2d.CanvasXmlSerializer=function(){
};
draw2d.CanvasXmlSerializer.prototype.type="CanvasXmlSerializer";
draw2d.CanvasXmlSerializer.prototype.toXML=function(canvas){
var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";
xml=xml+"<diagram>\n";
var figures=canvas.getFigures();
for(var i=0;i<figures.getSize();i++){
	var singleFigure=figures.get(i);
	xml=xml+"<"+singleFigure.type+" x=\""+singleFigure.getX()+"\" y=\""+singleFigure.getY()+"\" id=\""+singleFigure.getId()+"\">\n";
	xml=xml+this.getPropertyXML(singleFigure,"   ");
	var ports=singleFigure.getPorts();
	xml=xml+"<connections>"
	for(var j=0;j<ports.getSize();j++){
		var singlePort=ports.get(j)
		xml=xml+this.getConnectionXML(singlePort,"   ");
	}
	xml=xml+"</connections>"
	if(singleFigure instanceof draw2d.CompartmentFigure){
		xml=xml+this.getChildXML(singleFigure,"   ");
	}
	xml=xml+"</"+singleFigure.type+">\n";
}
xml=xml+"</diagram>\n";
return xml;
};

draw2d.CanvasXmlSerializer.prototype.getChildXML=function(singleFigure, xmlSeparator){
var xml="";
var figureChildren=singleFigure.getChildren();
for (var i=0;i<figureChildren.getSize();i++){
	var figureChild=figureChildren.get(i);
	xml=xml+xmlSeparator+"<"+figureChild.type+" x=\""+figureChild.getX()+"\" y=\""+figureChild.getY()+"\" id=\""+figureChild.getId()+"\">\n";
	xml=xml+this.getPropertyXML(figureChild,"   "+xmlSeparator);
	if (figureChild instanceof draw2d.CompartmentFigure){
		xml=xml+this.getChildXML(figureChild,"   "+xmlSeparator);
	}
	xml=xml+xmlSeparator+"</"+figureChild.type+">\n";
}
return xml;
};

draw2d.CanvasXmlSerializer.prototype.getPropertyXML=function(singleFigure,xmlSeparator){
var xml="";
var figureProperties=singleFigure.getProperties();
for(key in figureProperties){
var value=figureProperties[key];
if(value!==null){
xml=xml+xmlSeparator+"<property name=\""+key+"\" value=\""+value+"\"/>\n";
}
}
return xml;
};

draw2d.CanvasXmlSerializer.prototype.getConnectionXML=function(singlePort,xmlSeparator){
var xml="";
var connections = singlePort.getConnections();
if (singlePort instanceof draw2d.InputPort) { return ''; }
for(var i=0;i<connections.getSize();i++)
	{
	var c = connections.get(i)
	xml=xml+xmlSeparator+'<connection sourcePort="'+c.sourcePort.getName()+'" target="'+c.targetPort.parentNode.id+'" targetPort="'+c.targetPort.getName()+'" router="'+c.router.type+'" stroke="'+c.stroke+'" sourceDecorator="'+ function() { return c.sourceDecorator?c.sourceDecorator.type:'null' }() +'" targetDecorator="'+ function() { return c.targetDecorator?c.targetDecorator.type:'null' }() +'" />\n';
	}
return xml;
};