define([
    'backbone',
    'marionette',
    "templates",
    "dust",
    "PouchDB"
],

function (Backbone, Marionette, compiledTemplates, dust, PouchDB) {

    return Backbone.Marionette.ItemView.extend({

        template: 'UserRegistrationView',

        events: {
            'click #submitUserRegistration': "submitUserRegistration",
            'click #submitAdminRegistration': "submitAdminRegistration"
        },

        userType: null,
        PouchDB: null,

        initialize: function () {
            console.log("init")
        },

        submitUserRegistration: function() {
            App.trigger("postUserRegistrationMenu");
        },

        submitAdminRegistration: function() {
            App.trigger("userMain");
        }

    });
});
