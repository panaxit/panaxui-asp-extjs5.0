# ToDo: SINCO + ExtJS v12.6

## SINCO v2 Use Cases

### CHEQUERA

**[Chequera]**
	+ Operaciones: Ingresos/Egresos/Transferencias
	- Chequera
		- vista filters
			- Busqueda (formView/filters)
				- datetime CONTROL (ver primero: [Fields] ABSTRACCION FieldContainer)
				- Opciones: >, >=, <, <=, =, BETWEEN, LIKE
			- busqueda y resultados en misma pagina (iframe, u otro panel con su jerarquia?)

**[Centros de Costos]**
	- cardView: `Ex. http://sincodb/sincodev/`
		- Filters (sliders, checkboxes, etc) like cellphones example
		- Nested in formView (apply-templates)
	- formview:
		- imagefield
		- tabs expandidos (ver layouts [FormView])
		- Cc padre/Nested CardView (CC hijos)

## BUGS

### ExtJS 5.0.1 vs 5.1.0

**[Cascaded Combo boxes]**
	- `ExtJS 5.0`: Works with Formula fix, still UX issues:
    	- When changing parents not seting to null children
    	- When editing record not loading parents
    	- ID field shown when clicked & store not loaded
    - `ExtJS 5.1`: Works without Formula fix (dbinding: panax_record.), UX issues
    	- GET request when selecting, disappears from UI
**[[E] Layout run failed]**
	- `ExtJS 5.1` in grids, windows, etc

### MODELS & CRUD

**["id" BUG (When identityProperty != "id")]**
	- Debug::store
		- Store's id key is replaced?? why??
		- Data's id = null. Why?
	- Many other bugs related when identityProperty != "Id"

**[MODEL]**
	- When not identityKey (ex. some junctionTables): Concat(primary keys)

**[SESSION]**
	- Still issues with junctionTables, foreignTables, foreignKeys

### GridView

**[REMOTE filters]**
	- payload `filter` compuesto (ver ver12.0)
	- Ordering should/could be REMOTE as well (remoteSort=true) (ver ver12.0)
	- 2 calls to request.asp with Remote Filters (why?)
	- Combination of mode=filters (chequera) then remotefiltering (headers) replace original filters?

**[Paging Toolbar not loaded @ start]**

### CardView

**[CardView]**
	- onEditRecordClick not loading nested grids (Logs, etc... )

### UI

**[GridView]**
	- ViewConfig buttons:
		- Save stateful (savestate())
		~ Summary SUM, AVG, ..., etc

**[FormView]**
	- Fix tabs layouts: junctionTables and hasMany-foreignTables default in a separated tab, otherwise in fieldset with maxHeightsessions?

**[SHELL]**
	- Menu.asp : Global.js - ID for Navigation node not Title, but unique ID

**[AutoScroll issues]**
	- Autoscroll issue when Zoom > 100%

**[Loading masks]**
	- Look at V12.0 AjaxStore listeners
	- Something implemented with freignKeys ajax comboboxes
	- User global loader animation @ bottom of contentPanel
		- like SapUI
		- Research loading UI paradigms

**[Thumbnails]**
	- Icon/CSS for folders

**[DashboardView]**
	- Company Portal

### PANAX CORE

**[WRONG controlType in 2nd request.asp]**
	1. open `gridView/edit` catalog (ex. Sexos)
	- Second request.asp controlType === `formView` (ask Uriel)

### FormView:

**[Catalgos ForeignKeys (combobox)]**
	- Engrane (*) (catalogs with combobox)	
		- Nuevo
		- Actualizar
		- Editar (when selected)
		- Borrar (when selected)

**[Fields]**
	- REFACTORING: ABSTRACCION FieldContainer:
		- Ext.Container +Mixin: form.FieldContainer
		- Siempre regresan un valor para persistir
		- Incluyen 1 o + controles
		- Pueden incluir otros components anidados
		- Ver ejemplo Uriel (dataField.xsl)
	- MONEY textfield: Ext.ux.form.CurrencyField (components.js)
	- DATETIME: Extend it like CurrencyField? (see FieldContainer)
		- https://github.com/zombeerose/DateTime/tree/master/source/form/field
		- https://github.com/NLeSC/ExtJS-DateTime
	- READONLY: Display controls as labels?
	
**[Validations]**
	- http://dev.sencha.com/ext/5.1.0/examples/kitchensink/?theme=neptune#form-advtypes

## MISCELANEOUS

### New generic use cases - associations:

**[ASSOC: auto referenced tables]**
	- treeview many levels

			  .--.
		[Perfil]-'

**[ASSOC: junctionTables + auto referenced tables]**
	- treview many levels + checkboxes

		          		[EmpConDisc]               .--.
		[Empleado]------^       ^----[Discapacidad]-' 
		                                    ^-------------[Otra Categoria]

**[printView]**
	- `(HTML? PDF? CSS Printer) (Reportes ER, BG, etc)`
	- https://github.com/grafikchaos/Ext.ux.Printer

**[scheduleView]**
	- `(Proyectos)`
	- Calendarios

### CLEANUP & REFACTORING

**[ROADMAP: Version 13.0 Refactoring]**
	- Start with stripped-down Kitchensink Shell
		- clean it
	- Refactor components.js to app/PanaxCore.js and ExtJS components (controls, models, etc)
		- Move JS functionalities to pure-js libraries
		- Remove REQUIRES from Application.js and load dynamically when needed 
	- Add ASP and XSL functionality progressively
		- XSL call pure-js libraries
		- XSL files: Clean and separate in logic & atomic parts
	- ......

**[Exception Handling: Everywhere]**
	- Try/Catch blocks in critical areas
		- `Already in Panax.getInstance?`
	- Investigate howTo in ExtJS

**[Pure-JS Files]**
	- Kitchensink legacy: Clean according to kitchensink sandbox
	- Enable theme switcher
		- Remove Microloader, bootstrap stuff?
	- components.js: separate in logical files (categories):
		- Move Ext initializers (top) to app.js booter
		- Panax.* core functions (panax-core.js)
		- Base models, stores (panax-datamodel.js)
		- Views + Controls (panax-widgets, or alike)
	- Use ExtJS hierarchy? (app/[views,models,etc])
		- REQUIRE dinamically from app.js? (check extjs docs)
	- overrides.js: rename to panax-overrides.js

**[All]**
	- Remove
		- commented code (later)
		- junk code

### SECURITY

**[Cross-site scripting (XSS) (Ex. cardView.xsl)]**

### JSON.XSL & MODEL.XSL

**[Remove ["data"] and ["value"] mappings]**

### CRUD

**[Callbacks]**
	- Unify callbacks & message boxes alerts
	- Unify loadingmasks 
	- FormView:
		-Create: Save, close(destroy+back) window/panel and/or redirect to formView/Edit
		-DONE: Update: Update and stay (as it is now)
		-Delete [***new button]: Delete and close(destroy+back) window/panel
	- GridView:
		-Create [modal window]: Save, close(destroy+back) modal window, refresh grid store
		-DONE: Update [modal window]: Save, close(destroy+back) modal window, refresh grid store (as it is now)
		-DONE: Delete [save button]: Batch session delete  (as it is now)

### Routing

**[New XML structure -> New declared pre-defined routes]**
**[sessionTimeout -> automatically logout and send to login page (models listeners involved?)]**
**[Alternative via SIMManager???]**

### SAP TERP 

**[Revisar organizacion CCs]**
**[Revisar reglas de Purchasing Invoicing, Accounting, ordenes de compra, recepción, consumibles, pagos, pagos parciales, etx, factura**