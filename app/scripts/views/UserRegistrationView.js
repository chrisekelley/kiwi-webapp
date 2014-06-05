define([
    'backbone',
    'marionette',
    "templates",
    "dust",
    'app'
],

function (Backbone, Marionette, compiledTemplates, dust, App) {

    return Backbone.Marionette.ItemView.extend({

        template: 'UserRegistrationView',

        events: {
            'click #submitUserRegistration': "submitUserRegistration"
        },

        initialize: function () {},

        submitUserRegistration: function() {
            App.trigger("userMain");
        }

    });
});
