<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:px="urn:panax"
	xmlns:session="urn:session"
	xmlns:custom="urn:custom"
	xmlns:str="http://exslt.org/strings"
	xmlns="http://www.w3.org/TR/xhtml1/strict"
	exclude-result-prefixes="px"
	>
	<xsl:import href="keys.xsl" />
	<xsl:import href="html/global_variables.xsl" />
	<xsl:import href="functions.xsl" />
	<xsl:output omit-xml-declaration="yes" method="text" indent="no" />

	<xsl:strip-space elements="*"/>

	<xsl:template match="/">
		{ <xsl:apply-templates select="*" mode="json"></xsl:apply-templates> }
	</xsl:template>

	<xsl:template match="@*" mode="json">
		<xsl:if test="position()&gt;1">,</xsl:if> <xsl:value-of disable-output-escaping="yes" select="local-name(.)"/>:<xsl:apply-templates select="." mode="json.value"/>
	</xsl:template>

	<xsl:template match="@*" mode="json.value">
		<xsl:value-of select="." disable-output-escaping="no"/>
	</xsl:template>

	<xsl:template match="@*[string(number(.))='NaN']" mode="json.value">
		"<xsl:value-of select="." disable-output-escaping="no"/>"
	</xsl:template>

	<xsl:template match="*[@dataType='table']" mode="json">
		"total": "<xsl:value-of select="@totalRecords"/>"
		, success: true
		, catalog: {
		dbId: '<xsl:value-of select="@dbId"/>'
		,catalogName: '<xsl:value-of select="@Table_Schema"/>.<xsl:value-of select="@Table_Name"/>'
		,mode: '<xsl:value-of select="@mode"/>'
		,controlType: '<xsl:value-of select="@controlType"/>'
		,lang: '<xsl:value-of select="@xml:lang"/>'
		}
		,"metadata": {<xsl:apply-templates select="@supportsInsert|@supportsUpdate|@supportsDelete|@disableInsert|@disableUpdate|@disableDelete" mode="json"/>}
		, "data<!-- <xsl:value-of select="@Table_Name"/> -->": [
		<xsl:apply-templates select="px:data/px:dataRow" mode="json" />
		]
	</xsl:template>

	<xsl:template match="*" mode="metadata">
		<!-- ,metaData:{id:"<xsl:value-of select="generate-id()"/>",<xsl:apply-templates select="@disableInsert|@disableUpdate|@disableDelete" mode="json"/> <xsl:apply-templates select="*[not(name(.)='px:data')]" mode="metadata"/>} -->
	</xsl:template>

	<xsl:template match="px:data/px:dataRow|px:fields" mode="json">
		<xsl:variable name="parentTable" select="ancestor::*[key('fields',@fieldId)/@dataType='foreignTable' or key('fields',@fieldId)/@dataType='junctionTable']"/>
		<xsl:if test="position()&gt;1">,</xsl:if>
		{
		"rowNumber":"<xsl:value-of select="@rowNumber"/>"
		/*,readOnly:true*/
		<!-- Identity Key -->
		, "<xsl:value-of select="translate(ancestor::*[@dataType='table'][1]/@identityKey, $uppercase, $smallcase)"/>":<!-- {text:-->
		<xsl:choose>
			<xsl:when test="string(@identity)!=''">
				"<xsl:value-of select="@identity"/>"
			</xsl:when>
			<xsl:otherwise>null</xsl:otherwise>
		</xsl:choose>
		<!--Include Foreign Key-->
		<xsl:if test="$parentTable">
			, "<xsl:value-of select="translate(ancestor::*[@dataType='table'][1]/@foreignReference, $uppercase, $smallcase)"/>": '<xsl:value-of select="ancestor::*[@identity][1]/@identity"/>'
		</xsl:if>

		<xsl:if test="ancestor::*[key('fields',@fieldId)/@dataType='junctionTable']">
			<xsl:variable name="data" select="self::*[key('junctionSelfReferenced',*/@fieldId)]/../px:dataRow[*[key('junctionField',@fieldId)]/*/@foreignValue=current()/*[key('junctionField',@fieldId)]/@value]"/>
			<!-- <xsl:choose>
				<xsl:when test="$data">expanded:true</xsl:when>
				<xsl:otherwise>leaf:true</xsl:otherwise>
			</xsl:choose>
			,iconCls:'task' -->
			,checked:
			<xsl:choose>
				<xsl:when test="string(@identity)!=''">true</xsl:when>
				<xsl:otherwise>false</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="key('junctionSelfReferenced',*/@fieldId)">
				,data:[<xsl:apply-templates select="$data" mode="json"/>]
			</xsl:if>
		</xsl:if>
		
		<xsl:choose>
			<xsl:when test="local-name()='fields'">
				<xsl:apply-templates select="*" mode="json">
					<xsl:with-param name="isPhantomRecord" select="true()"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="*" mode="json"/>
			</xsl:otherwise>
		</xsl:choose>
		}<!-- [string(@value)!=''] -->
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*|px:fields/*" mode="json">
		<xsl:param name="isPhantomRecord" select="false()"/>,"<xsl:value-of disable-output-escaping="yes" select="translate(key('fields',@fieldId)/@Column_Name, $uppercase, $smallcase)"/>":<xsl:choose>
			<xsl:when test="$isPhantomRecord">{value:null}</xsl:when>
			<xsl:when test="key('fields', @fieldId)/@dataType='foreignTable' or key('fields', @fieldId)/@dataType='junctionTable'">
				<xsl:apply-templates select="." mode="json.value"/>
			</xsl:when>
			<xsl:otherwise>
				{value:<xsl:apply-templates select="." mode="json.value"/><xsl:if test="key('fields',@fieldId)/@dataType='date'">,hidden:true</xsl:if><xsl:if test="1=0 or key('fields',@fieldId)/@mode='readonly' or key('readonlyField',generate-id(.))">,readOnly:true</xsl:if><xsl:if test="px:data">
					,data:[<xsl:apply-templates select="px:data/*[not(self::*[key('fields',@fieldId)/@referencesItself='true']) or self::*[key('fields',@fieldId)/@referencesItself='true'] and not(@foreignValue)]" mode="json.fk.data"/>]<xsl:apply-templates select="." mode="metadata"/>
				</xsl:if>}
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!--<xsl:template match="px:data/px:dataRow/*" mode="json.value">null</xsl:template>-->

	<xsl:template match="px:data/px:dataRow/*" mode="json.value">
		'<xsl:value-of disable-output-escaping="no" select="str:escapeString(string(@value))"/>'
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[string(@value)='']" mode="json.value">
		<!--/*4*/-->''
	</xsl:template>

	<xsl:template match="*" mode="json.fkPair">
		{"id":'<xsl:value-of disable-output-escaping="yes" select="@value"/>',"text":'<xsl:choose>
			<xsl:when test="string(@value)!=''">
				<xsl:value-of disable-output-escaping="no" select="str:escapeApostrophe(string(@text))"/>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>'<xsl:choose>
			<xsl:when test="*[not(name(.)='px:data')]">
				,fk:<xsl:apply-templates select="*[not(name(.)='px:data')]" mode="json.fkPair"/>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>}
	</xsl:template>

	<xsl:template match="*" mode="json.fk.data">
		<xsl:if test="position()&gt;1">,</xsl:if>{id:'<xsl:value-of disable-output-escaping="yes" select="@value"/>',text:'<xsl:choose>
			<xsl:when test="string(@value)!=''">
				<xsl:value-of disable-output-escaping="no" select="str:escapeApostrophe(string(@text))"/>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>',fk:<xsl:choose>
			<xsl:when test="@foreignValue">
				"<xsl:value-of disable-output-escaping="yes" select="@foreignValue"/>"
			</xsl:when>
			<xsl:otherwise>null</xsl:otherwise>
		</xsl:choose><xsl:choose>
			<xsl:when test="*[not(name(.)='px:data')] or self::*[key('fields',@fieldId)/@referencesItself='true']/../*[@foreignValue=current()/@value]">
				,data:[<xsl:apply-templates select="*|self::*[key('fields',@fieldId)/@referencesItself='true']/../*[@foreignValue=current()/@value]" mode="json.fk.data"/>],expanded:true,checked:false
			</xsl:when>
			<xsl:otherwise>,leaf:true,checked:false,iconCls:'task'</xsl:otherwise>
		</xsl:choose>,metaData:{<xsl:apply-templates select="@custom:*" mode="json"/>}}
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)/@dataType='money' or key('fields',@fieldId)/@dataType='smallmoney' or key('fields',@fieldId)/@dataType='int' or key('fields',@fieldId)/@dataType='identity' or key('fields',@fieldId)/@dataType='float'][@value]" mode="json.value">
		<!--/*2*/--><!-- {text:-->'<xsl:value-of disable-output-escaping="yes" select="@value"/>'<!-- } -->
	</xsl:template>
	<!-- 
<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)/@controlType='monthpicker'][@value]" mode="json.value">{id:'<xsl:value-of disable-output-escaping="yes" select="@value"/>'}</xsl:template> -->
	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)/@dataType='int' or key('fields',@fieldId)/@dataType='tinyint'][string(@value)!='']" mode="json.value">
		<!--/*3*/-->
		<!-- {text:-->
		<xsl:value-of disable-output-escaping="yes" select="@value"/>
		<!-- } -->
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)/@dataType='foreignKey' and (key('fields',@fieldId)/@controlType='default' or key('fields',@fieldId)/@controlType='selectBox' or key('fields',@fieldId)/@controlType='combobox')]" mode="json.value">
		<!--/*7*/-->
		<xsl:apply-templates select="." mode="json.fkPair"/>
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)/@dataType='foreignKey' and (key('fields',@fieldId)/@controlType='default' or key('fields',@fieldId)/@controlType='selectBox' or key('fields',@fieldId)/@controlType='combobox')][*[not(name(.)='px:data')]]" mode="json.value">
		<!--/*8*/-->
		<!-- '<xsl:value-of disable-output-escaping="yes" select="@value"/>' -->
		<xsl:apply-templates select="*[not(name(.)='px:data')]" mode="json.fkPair"/>
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)/@dataType='date' or key('fields',@fieldId)/@dataType='datetime' or key('fields',@fieldId)/@dataType='smalldatetime']" mode="json.value">
		<!--/*1*/-->
		<xsl:choose>
			<xsl:when test="string(@value)!=''">
				<!-- new Date('<xsl:value-of select="translate(@value,'-','/')"/>') -->
				'<xsl:value-of select="translate(@value,'-','/')"/>'
			</xsl:when>
			<xsl:otherwise>null</xsl:otherwise>
		</xsl:choose>
	</xsl:template>


	<xsl:template match="*[key('junctionSelfReferenced',@fieldId)/@relationshipType='hasOne']/*/px:data/px:dataRow" mode="json.hasOne">
		/*hasone*/
		<xsl:apply-templates select="*" mode="json"/>
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)[@dataType='foreignTable']]" mode="json.value">
		<!--/*5*/-->{data:[<xsl:apply-templates select="*/px:data/px:dataRow" mode="json" />]}
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('junctionSelfReferenced',@fieldId)[@relationshipType='hasOne']]" mode="json.value">
		<xsl:choose>
			<xsl:when test="*/px:data/px:dataRow">
				<xsl:apply-templates select="*/px:data/px:dataRow[1]" mode="json" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="key('fields',@fieldId)/*/px:fields" mode="json" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="px:data/px:dataRow/*[key('oneToOne',@fieldId)]" mode="json.value">
		/*hasone*/<xsl:apply-templates select="*/px:data/px:dataRow" mode="json">
			<xsl:with-param name="isPhantomRecord" select="true()"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="px:data/px:dataRow/*[key('fields',@fieldId)[@dataType='junctionTable']]" mode="json.value">
		<!--/*6*/--><!-- {"text":".","children": -->{<xsl:if test="self::*[key('junctionSelfReferenced',@fieldId)/@relationshipType='hasOne']">
			rowNumber:1/*hasOne*/<xsl:apply-templates select="self::*[key('junctionSelfReferenced',@fieldId)/@relationshipType='hasOne']/*/px:data/px:dataRow[1]" mode="json.hasOne">
				<xsl:sort select="number(boolean(../@identity))" order="descending"/>
			</xsl:apply-templates>,
		</xsl:if>data:[<xsl:apply-templates select="*/px:data/px:dataRow[not(key('junctionSelfReferenced',*/@fieldId)) or key('junctionSelfReferenced',*/@fieldId) and *[key('junctionField',@fieldId)]/*[not(@foreignValue)] ]" mode="json" />]}<!-- } -->
	</xsl:template>

</xsl:stylesheet>