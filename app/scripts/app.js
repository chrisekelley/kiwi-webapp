/*jshint -W109 */
/*global define */
define([
    "underscore",
    "backbone",
    "marionette",
//    "platform",
    "views/VerifyView",
    "views/UserRegistrationView",
    "views/UserMainView",
    "views/UserFormView",
    "PouchDB",
    "models/record",
    "dust"
  ],

function (_, Backbone, Marionette, VerifyView, UserRegistrationView, UserMainView, UserFormView, PouchDB, Record) {

    window.App = new Marionette.Application();
    console.log("Creating new Marionette App")

    App.PouchDB = PouchDB;

    App.db = new App.PouchDB('kiwi');

    App.Controller = {
        displayScanner: function(user){
            var staticView;
            if (typeof user !== 'undefined') {
                staticView = new VerifyView({template: 'ScanVerifyView'});
            } else {
                staticView = new VerifyView({template: 'VerifyView'});
            }

            App.mainRegion.show(staticView);
        },
        displayRegistration: function(user){
            $( "#message").html("")
            var staticView = null;
            if (typeof user !== 'undefined') {
                staticView = new UserRegistrationView({template: 'UserRegistrationView'});
            } else {
                staticView = new UserRegistrationView({template: 'AdminUserRegistrationView'});
            }
            staticView.PouchDB = PouchDB;
            staticView.userType = user;
            App.mainRegion.show(staticView);
        },
        displayUserMain: function(){
            $( "#message").html("")
            var staticView = new UserMainView();
            App.mainRegion.show(staticView);
        },
        postUserRegistrationMenu: function(){
            $( "#message").html("")
            var staticView = new UserMainView({template: 'PostUserRegistrationMenuView'});
            App.mainRegion.show(staticView);
        },
        displayReportMenu: function(){
            $( "#message").html("")
            var staticView = new UserFormView({template: 'UserReportMenu'});
            App.mainRegion.show(staticView);
        },
        displayImmunization: function(){
            $( "#message").html("")
            var staticView = new UserFormView({template: 'ImmunizationForm'});
            App.mainRegion.show(staticView);
        },
        saveRecord: function(record){
            $( "#message").html("")
            var record = new Record(record);
            record.post();
        }
};


    App.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "home",
            "home": "home",
            "registration": "registration",
            "userScan": "userScan",
            "userMain": "userMain",
            "postUserRegistrationMenu": "postUserRegistrationMenu",
            "displayReportMenu": "displayReportMenu",
            "displayImmunization": "displayImmunization"
        }
    });

    var API = {
        home: function(){
            App.Controller.displayScanner();
        },
        registration: function(user){
            App.Controller.displayRegistration(user);
        },
        userScan: function(user){
            App.Controller.displayScanner("user");
        },
        userMain: function(){
            App.Controller.displayUserMain();
        },
        postUserRegistrationMenu: function(){
            App.Controller.postUserRegistrationMenu();
        },
        displayReportMenu: function(){
            App.Controller.displayReportMenu();
        },
        displayImmunization: function(){
            App.Controller.displayImmunization();
        },
        saveRecord: function(record){
            App.Controller.saveRecord(record);
        }
    };

    App.on("home", function(){
        App.navigate("#home");
        API.home();
    });
    App.on("registration", function(){
        App.navigate("#registration");
        API.registration();
    });
    App.on("userRegistration", function(){
        App.navigate("userRegistration");
        API.registration("user");
    });
    App.on("userScan", function(){
        App.navigate("userScan");
        API.userScan("user");
    });
    App.on("userMain", function(){
        App.navigate("userMain");
        API.userMain();
    });
    App.on("postUserRegistrationMenu", function(){
        App.navigate("postUserRegistrationMenu");
        API.postUserRegistrationMenu();
    });
    App.on("displayReportMenu", function(){
        App.navigate("displayReportMenu");
        API.displayReportMenu();
    });
    App.on("displayImmunization", function(){
        App.navigate("displayImmunization");
        API.displayImmunization();
    });

    App.API = API;

    // Add as many of these as you like
    App.addInitializer(function () {

        // Adds any methods to be run after the app was initialized.
//            this.initAppEvents();
        new App.Router({
            controller: API
        });

        this.root = '/';
    });

    App.addRegions({
        mainRegion: "#main-region"
    });

    App.navigate = function(route, options){
        options || (options = {});
        console.log("App.navigate to " + route);
        Backbone.history.navigate(route, options);
//        history.pushState({}, null, "#" + route);
    };

    App.getCurrentRoute = function(){
        return Backbone.history.fragment
    };

    App.on("initialize:after", function(){
        console.log("initialize:after");

        if(Backbone.history){
            Backbone.history.start();
            // Trigger the initial route and enable HTML5 History API support
//            Backbone.history.start({ pushState: true, root: App.root });
//            Backbone.history.start({ pushState: false, root: App.root });
//            Backbone.history.start({ pushState: true });

            console.log("this.getCurrentRoute(): " + this.getCurrentRoute())
//            if(this.getCurrentRoute() === ""){
//                App.trigger("home");
//            }
        }
    });


//    App.on('start', function () {
//        if(Backbone.history){
//            Backbone.history.start({ pushState: true, root: App.root });
////            Backbone.history.start();
////            Backbone.history.start({ pushState: false, root: App.root });
////            Backbone.history.start({ pushState: true, root: App.root });
////            Backbone.history.start({ pushState: true });
//            var hash = window.location.hash;
//            console.log("this.getCurrentRoute(): " + this.getCurrentRoute() + " hash: " + hash);
//            if(this.getCurrentRoute() === ""){
//                App.trigger("home");
//            }
//        }
//    });

    $('#verify').click(function(e) {
        console.log("clicked verify ya fool.")
        e.preventDefault();
    });

    App.progressBar = {
        setValue:function(id, value) {
            $(id).val(value);
            $(id).slider("refresh");
        }
    }

    // kudos: https://github.com/net-uk-sweet/bbb-phonegap-marionette-jqm-boilerplate
//    App.initAppEvents = function() {
//
//        new App.Router({
//            controller: API
//        });


        // All links with the role attribute set to nav-main will be
        // handled by the application's router.
//        $('a[data-role="nav-main"]').live('click', function(/*e*/) {
//            App.navigate($(this).attr('href'));
//        });

//        App.vent.on('navigate', function(e) {
//            App.navigate(e);
//        });

//        function navigate(url) {
//            App.Router.navigate(url, { trigger: true });
//        }

        // Remove page from DOM when it's being replaced
//        $('div[data-role="page"]').live('pagehide', function (e /*, ui */) {
//            $(e.currentTarget).remove();
//        });
//
//        // Triggering a create on pageshow ensures any dynamic content is JQM-ified
//        $('div[data-role="page"]').live('pageshow', function (/* event, ui */) {
//            $(this).trigger('create');
//        });
//    };

    // Return the instantiated app (there should only be one)
    return App;

})
