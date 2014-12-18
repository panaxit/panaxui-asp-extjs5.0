Ext.define('KitchenSink.model.field.PhoneNumber', {
    extend: 'Ext.data.field.String',

    alias: 'data.field.phonenumber',

    validators: [
        { type: 'format', matcher: /^\d{3}-?\d{3}-?\d{4}$/ }
    ]
	
	, convert: function(value, record) {
		value=value.replace(/[^\d]/ig,'')
		return value.replace(/^(\d{3})-?(\d{3})-?(\d{4})$/ig, '($1) $2-$3')
	}
	, serialize: function(value, record) {
		return value.replace(/[^\d]/ig,'')
	}
});
