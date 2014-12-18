<% DIM id, success %>
<% 
 DIM xmlDoc
 Set xmlDoc=Server.CreateObject("MSXML2.DOMDocument")
 xmlDoc.async="false"
 xmlDoc.load(Request) 
 'xmlDoc.setProperty "SelectionNamespaces", "xmlns:px='urn:panax'"
 xmlDoc.setProperty "SelectionLanguage", "XPath"
 
' DIM id
' xmlDoc.xml
DIM i, xmlNodes, xmlNode: Set xmlNodes=xmlDoc.documentElement.selectNodes("//*[local-name()='deleteRow' or local-name()='dataRow']")
' id=
' identityValue
%>
{
	message: "El sistema guardó los cambios"
	,data:[
<%	For Each xmlNode In xmlNodes 
		success="true"
		i=i+1
		id=xmlNode.getAttribute("identityValue")
		IF id="NULL" THEN
			id=i&request.querystring("_dc")
		ELSE
			id=id
		END IF
%>
		<% if i>1 then %>,<% end if %>
		<% IF xmlNode.nodeName="deleteRow" THEN 
			success="true"
		%><%= id %><% ELSE %>
		{
			"id": <%= id %>
		}<% END IF %>
<%	Next %>
	]
	, success: <%= success %>
	, callback: function() {
		alert()
	}
}
