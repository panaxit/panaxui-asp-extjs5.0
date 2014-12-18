draw2d.CanvasXmlSerializer=function(){
};
draw2d.CanvasXmlSerializer.prototype.type="CanvasXmlSerializer";
draw2d.CanvasXmlSerializer.prototype.diagram={}
draw2d.CanvasXmlSerializer.prototype.diagram.catalogName="Folder";
draw2d.CanvasXmlSerializer.prototype.connections={}
draw2d.CanvasXmlSerializer.prototype.connections.catalogName="DependenciasFolder";
draw2d.CanvasXmlSerializer.prototype.connectionsTag="connections";
draw2d.CanvasXmlSerializer.prototype.toXML=function(canvas){
var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";
xml=xml+'<dataTable name="'+this.diagram.catalogName+'" primaryKey="IdFolder" identityKey="IdFolder">\n';
var figures=canvas.getFigures();
for(var i=0;i<figures.getSize();i++){
	var singleFigure=figures.get(i);
	xml=xml+this.getFigureXML(singleFigure, '	')
}
xml=xml+"</dataTable>\n";
var request = Ext.Ajax.request({
	url: '../Scripts/update.asp',//url: '../Templates/diagrama.js',
	method: 'POST',
	xmlData: xml,
	async: false,
	params: {
		output: 'json'
	},
	success: function(xhr) {
		var response=Ext.JSON.decode(xhr.responseText); 
		if (response.results) {
			Ext.Object.each(response.results, function(index, result) {
				var figure = canvas.getFigure(result.objectId)
				figure.identityValue=result.identityValue;
				figure.primaryValue=result.primaryValue;
			});
		}
	},
	failure: function() {
		Ext.Msg.alert("Error de comunicación", "No se pudo completar la transacción");
	}
});
var xml=''
xml=xml+'<dataTable name="DependenciasFolder" primaryKey="IdDependencia" identityKey="IdDependencia">'
var figures=canvas.getFigures();
for(var i=0;i<figures.getSize();i++) {
	var singleFigure=figures.get(i);
	var ports=singleFigure.getPorts();
	for (var p=0; p<ports.getSize();p++) {
		var singlePort=ports.get(p);
		xml=xml+this.getConnectionXML(singlePort,"   ");
	}
}
xml=xml+"</dataTable>\n";
var request = Ext.Ajax.request({
	url: '../Scripts/update.asp',//url: '../Templates/diagrama.js',
	method: 'POST',
	xmlData: xml,
	async: false,
	params: {
		output: 'json'
	},
	success: function(xhr) {
		var response=Ext.JSON.decode(xhr.responseText); 
		if (response.success)
			{
			if (response.results) {
				Ext.Object.each(response.results, function(index, result) {
					var line = canvas.getLine(result.objectId)
					line.identityValue=result.identityValue;
					line.primaryValue=result.primaryValue;
				});
			}
		} else {
			Ext.MessageBox.show({
				title: 'ERROR!',
				msg: response.message,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	failure: function() {
		Ext.Msg.alert("Error de comunicación", "No se pudo completar la transacción");
	}
});
	
return xml;
};

draw2d.CanvasXmlSerializer.prototype.getFigureXML=function(singleFigure,xmlSeparator){
var xml = ''
	xml=xml+'<dataRow identityValue="'+function(){return (singleFigure.identityValue||'null') }()+'" primaryValue="'+function(){return (singleFigure.primaryValue||'null') }()+'" sourceObjectId="'+singleFigure.id+'">'
	xml=xml+'<dataField name="NombreFolder">'+function() { return singleFigure.name?singleFigure.name:'\'Folder '+singleFigure.identityValue}() +'\'</dataField>'
	xml=xml+'<dataField name="Proyecto">1</dataField>'
    xml=xml+'<dataField name="ConfigDiagrama">'
    xml=xml+"   <"+(singleFigure.tagName||singleFigure.type)+this.getObjectAttributes(singleFigure,{x:singleFigure.getX(), y:singleFigure.getY(), id:singleFigure.getId()})+"/>\n";
	xml=xml+'</dataField>'
	xml=xml+'</dataRow>';
return xml;
}

/* draw2d.CanvasXmlSerializer.prototype.getChildXML=function(singleFigure, xmlSeparator){
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
}; */

draw2d.CanvasXmlSerializer.prototype.getObjectAttributes=function(singleObject,defaults,xmlSeparator){
	var xml="";
	var objectProperties=singleObject.getProperties();
	xml=xml+this.getAttributes(defaults);
	xml=xml+this.getAttributes(objectProperties);
return xml;
};

draw2d.CanvasXmlSerializer.prototype.getAttributes=function(attribs) {
var xml="";
for(var key in attribs){
	var value=attribs[key];
	if(value!==null){
		xml=xml+" "+key+"=\""+value+"\"";
	}
}
return xml;
}


draw2d.CanvasXmlSerializer.prototype.getConnectionXML=function(singlePort,xmlSeparator){
var xml="";
var connections = singlePort.getConnections();
if (singlePort instanceof draw2d.InputPort) { return ''; }
for(var i=0;i<connections.getSize();i++)
	{
	var c = connections.get(i)
	xml=xml+'<dataRow identityValue="'+function(){return (c.identityValue||'null') }()+'" primaryValue="'+function(){return (c.primaryValue||'null') }()+'" sourceObjectId="'+c.id+'">'
	xml=xml+'	<dataField name="FolderDependencia">'+(c.sourcePort.parentNode.identityValue || c.sourcePort.parentNode.id)+'</dataField>'
	xml=xml+'	<dataField name="FolderDependiente">'+(c.targetPort.parentNode.identityValue || c.targetPort.parentNode.id)+'</dataField>'
    xml=xml+'	<dataField name="ConfigDiagrama">'
	xml=xml+"   <"+(c.tagName||c.type)+this.getObjectAttributes(c,{sourcePort: c.sourcePort.getName(), target: c.targetPort.parentNode.id, targetPort: c.targetPort.getName(), router: c.router.type, stroke: c.stroke, sourceDecorator:  function() { return c.sourceDecorator?c.sourceDecorator.type:'null' }(), targetDecorator: function() { return c.targetDecorator?c.targetDecorator.type:'null' }()})+"/>\n";
	xml=xml+'	</dataField>'
	xml=xml+'</dataRow>'
	}
return xml;
};