/**
 * This example shows data binding using formulas that can be edited. That is, "virtual
 * properties"!
 */
Ext.define('KitchenSink.view.binding.TwoWayFormulas', {
    extend: 'Ext.panel.Panel',
    xtype: 'binding-two-way-formulas',
    //<example>
    otherContent: [{
        type: 'ViewModel',
        path: 'app/view/binding/TwoWayFormulasModel.js'
    }],
    bodyPadding: 10,
    //</example>

    title: 'Two-Way Formulas',

    autoScroll: true,
    width: 450,
    frame: true,
    resizable: true,
    
    viewModel: {
        // Formulas are defined by the ViewModel:
        type: 'binding-two-way-formulas',

        data: {
            birthDate: new Date(1971, 4, 3),
            firstName: 'John',
            lastName: 'Doe'
        }
    },

    // The form layout makes labelWidth automatic
    layout: 'form',

    defaultType: 'textfield',
    items: [{
        fieldLabel: 'First Name',
        bind: '{firstName}'
    }, {
        fieldLabel: 'Last Name',
        bind: '{lastName}'
    }, {
        fieldLabel: 'Full Name (virtual)',
        bind: '{fullName}'
    }, {
        xtype: 'fieldcontainer',
        fieldLabel: 'Age',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [{
            xtype: 'numberfield',
            width: 100,
            bind: '{age}',
            minValue: 0
        }, {
            xtype: 'slider',
            width: 80,
            margin: '0 0 0 8',
            bind: '{age}'
        }, {
            xtype: 'slider',
            width: 80,
            publishOnComplete: false,
            margin: '0 0 0 8',
            bind: '{age}'
        }]
    }, {
        xtype: 'datefield',
        format: 'm/d/Y',
        fieldLabel: 'Birth Date',
        bind: '{birthDate}',
        maxValue: new Date()
    }]
});


Ext.define('KitchenSink.view.binding.TwoWayFormulasModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.binding-two-way-formulas',

    formulas: {
        age: {
            get: function (get) {
                return this.getAge(get('birthDate'));
            },

            set: function (age) {
                var date = this.getData().birthDate,
                    now = new Date();

                if (!date) {
                    date = Ext.Date.add(now, Ext.Date.YEAR, -age);
                } else {
                    date = new Date(now.getFullYear() - age, date.getMonth(), date.getDate());
                    if (this.getAge(date) !== age) {
                        date = new Date(now.getFullYear() - age - 1, date.getMonth(), date.getDate());
                    }
                }

                this.set('birthDate', date);
            }
        },

        fullName: {
            get: function (get) {
                var ret = get('firstName') || '',
                    last = get('lastName');

                if (last) {
                    ret += ' ' +  last;
                }

                return ret;
            },

            // By providing the set method "fullName" is two-way bindable.
            set: function (value) {
                var space = value.indexOf(' '),
                    split = (space < 0) ? value.length : space;

                this.set({
                    firstName: value.substring(0, split),
                    lastName: value.substring(split + 1)
                });
            }
        }
    },

    getAge: function (date) {
        var now = new Date(),
            age, birth;

        if (date) {
            age = now.getFullYear() - date.getFullYear();
            now = now.getMonth() * 100 + now.getDate();
            birth = date.getMonth() * 100 + date.getDate();
            if (now < birth) {
                --age;
            }
        }
        return age || 0;
    }
});
