# ToDo: SINCO + ExtJS v12.6

## ExtJS BUGS

**[ExtJS 5.x]**
- Remote filters in combo with gridfilter plugin ignores autoLoad false
	- `http://www.sencha.com/forum/showthread.php?292780-5.0.1-Remote-filters-in-combo-with-gridfilter-plugin-ignores-autoLoad-false`
+ Binding a store to a pagingtoolbar does not work
	+ `Fixed in ExtJS 5.1.0`
	+  `http://www.sencha.com/forum/showthread.php?289447-Binding-a-store-to-a-pagingtoolbar-does-not-work`

## IMPLEMENTATION KNOWN BUGS

### ExtJS 5.0.1 Vs 5.1.0

**[Cascaded Combo boxes]**
- `ExtJS 5.0`: Works with Formula fix, still UX issues:
	- When changing parents not seting to null children
	- When editing record not loading parents
	- ID field shown when clicked & store not loaded
- `ExtJS 5.1`: Works without Formula fix (dbinding: panax_record.), UX issues
	- GET request when selecting, disappears from UI

### MODELS & CRUD 

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

**["id" BUG (When identityProperty != "id")]**
- Debug::store
	- Store's id key is replaced?? why??
	- Data's id = null. Why?
- Many other bugs related when identityProperty != "Id"

**[MODEL]**
- When not identityKey (ex. some junctionTables): Concat(primary keys)

**[SESSION]**
- Still issues with junctionTables, foreignTables, foreignKeys

### PANAX CORE

**[WRONG controlType in 2nd request.asp]**
1. open `gridView/edit` catalog (ex. Sexos)
	- Second request.asp controlType === `formView` (ask Uriel)

### UI

**[GridView]**
- REMOTE filters
	- payload `filter` compuesto (ver ver12.0)
	- Ordering should/could be REMOTE as well (remoteSort=true) (ver ver12.0)
- ViewConfig buttons:
	- Save stateful (savestate())
	~ Summary SUM, AVG, ..., etc

**[FormView]**
- Fix tabs layouts: junctionTables and hasMany-foreignTables default in a separated tab, otherwise in fieldset?
- READONLY: Some fields are not shown

**[FormView/Filters]**
- Nested Results (still BUGGY)
	~ OPTION 1 (Enabled): GridView - Panax.getPanaxComponent
	~ OPTION 2 (Disabled): XSL PanaxGrid Template "Filters.ResultsGrid"
- Filters: >, >=, <, <=, =, BETWEEN, LIKE

**[CardView]**
 - Filters (sliders, checkboxes, etc) like cellphones example

**[SHELL]**
- Menu.asp : Global.js - ID for Navigation node not Title, but unique ID
- Autoscroll issue when Zoom > 100%
- Loading masks
	- Look at V12.0 AjaxStore listeners
	- Something implemented with freignKeys ajax comboboxes
	- User global loader animation @ bottom of contentPanel
		- like SapUI
		- Research loading UI paradigms
- Thumbnails
	- Icon/CSS for folders

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

### New generic use cases:

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

**[DashboardView]**
- Company Portal

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

**[Misc]**
- Remove
	- commented code (later)
	- junk code

**[SECURITY]**
- [Cross-site scripting (XSS) (Ex. cardView.xsl)]**

**[JSON.XSL & MODEL.XSL]**
- [Remove ["data"] and ["value"] mappings]**

**[Routing]**
- New XML structure -> New declared pre-defined routes
- sessionTimeout -> automatically logout and send to login page (models listeners involved?)
- Alternative via SIMManager???

### SAP TERP 

**[Revisar organizacion CCs]**
**[Revisar reglas de Purchasing Invoicing, Accounting, ordenes de compra, recepción, consumibles, pagos, pagos parciales, etx, factura**