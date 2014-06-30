define([
    'backbone',
    'marionette',
    "templates",
    "dust"
],

function (Backbone, Marionette, compiledTemplates, dust) {

    return Backbone.Marionette.ItemView.extend({

        template: 'UserRegistrationView',

        events: {
            'click #submitUserRegistration': "submitUserRegistration",
            'click #submitAdminRegistration': "submitAdminRegistration"
        },

        userType: null,

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
