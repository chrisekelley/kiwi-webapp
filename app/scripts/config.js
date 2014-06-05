/*global requirejs */

requirejs.config({
    deps: ['main'],
    paths: {
        backbone: '../bower_components/backbone/backbone',
        dust: '../bower_components/dustjs-linkedin/lib/dust',
        dustHelpers: '../bower_components/dustjs-linkedin-helpers/lib/dust-helpers',
        dustMarionette: '../bower_components/marionette-dust/src/amd/backbone.marionette.dust',
        jquery: '../bower_components/jquery/jquery',
        jquerymobile: '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2.min',
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        underscore: '../bower_components/lodash/lodash',
        'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.eventbinder' : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        templates: 'templates/compiled'
//        App: "../scripts/App"
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        dust: {
            exports: 'dust'
        },
        dustHelpers: ['dust'],
        templates: ['dust', 'dustMarionette']
    }
});
