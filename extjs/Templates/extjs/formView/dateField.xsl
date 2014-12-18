<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:px="urn:panax"
    xmlns:str="http://exslt.org/strings"
	xmlns="http://www.w3.org/TR/xhtml1/strict"
	exclude-result-prefixes="px">

	<xsl:template match="*[(@controlType='default') and (@dataType='date') ]" mode="formView.control">
		<xsl:apply-templates select="." mode="formView.control.date"/>
	</xsl:template>

	<xsl:template match="*[(@controlType='default') and (@dataType='datetime') ]" mode="formView.control">
        xtype: 'fieldcontainer',
        layout: 'hbox',
		name: '<xsl:value-of select="translate(@fieldName, $uppercase, $smallcase)"/>',
        defaults: {
            hideLabel: 'true'
        },
        items: [
        	{<xsl:apply-templates select="." mode="formView.control.date"/>},
        	{<xsl:apply-templates select="." mode="formView.control.time"/>}
        ]
	</xsl:template>

	<xsl:template match="*" mode="formView.control.date">
			xtype: 'datefield'
			, bind: {
				value: '{panax_record.<xsl:apply-templates select="." mode="bindName"/>}'
			}
			<!-- EDITABLE/READONLY -->
			<xsl:call-template name="control.readOnly" />
	</xsl:template>

	<xsl:template match="*" mode="formView.control.time">
			xtype: 'timefield'
			, bind: {
				value: '{panax_record.<xsl:apply-templates select="." mode="bindName"/>}'
			}
			<!-- EDITABLE/READONLY -->
			<xsl:call-template name="control.readOnly" />
	</xsl:template>

</xsl:stylesheet>