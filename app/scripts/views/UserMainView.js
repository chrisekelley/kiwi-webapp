define([
    'backbone',
    'marionette',
    "templates",
    "dust",
    'app'
],

function (Backbone, Marionette, compiledTemplates, dust, App) {

    return Backbone.Marionette.ItemView.extend({

        template: 'UserMainView',

        events: {},

        initialize: function () {}

    });
});
