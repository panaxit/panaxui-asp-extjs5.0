<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:str="http://exslt.org/str"
	extension-element-prefixes="str"
>

<xsl:include href="views/model.xsl" />

<xsl:include href="views/panaxPanel.xsl" />

<!-- GridView -->
<xsl:include href="views/gridView.xsl" />
<xsl:include href="gridview/column.xsl" />
<xsl:include href="gridview/column.renderer.xsl" />

<!-- CardView -->
<xsl:include href="views/cardView.xsl" />

<!-- FormView -->
<xsl:include href="views/formView.xsl" />
<xsl:include href="formView/control.xsl" />
<xsl:include href="formView/textField.xsl" />
<xsl:include href="formView/imageField.xsl" />
<xsl:include href="formView/dateField.xsl" />
<xsl:include href="formView/radioGroup.xsl" />
<xsl:include href="formView/checkBox.xsl" />
<xsl:include href="formView/comboBox.xsl" />
<xsl:include href="formView/junctionTable.xsl" />


</xsl:stylesheet>