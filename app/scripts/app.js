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
    "dust"
],

function (_, Backbone, Marionette, VerifyView, UserRegistrationView, UserMainView, UserFormView) {

    window.App = new Backbone.Marionette.Application();
    console.log("Creating new Marionette App")

    // An init function for your main application object
    App.addInitializer(function () {
        this.root = '';
    });

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
            $.mobile.changePage( "#userMenu" , { reverse: false, changeHash: true } );
            App.navigate("displayReportMenu");
//            $.mobile.linkBindingEnabled = false;
        },
        displayImmunization: function(){
            $( "#message").html("")
            var staticView = new UserFormView({template: 'ImmunizationForm'});
            App.mainRegion.show(staticView);
            $.mobile.changePage( "#userMenu" , { reverse: false, changeHash: true } );
            App.navigate("displayImmunization");
//            $.mobile.linkBindingEnabled = false;
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
        }
    };

    App.on("home", function(){
         App.navigate("home");
         API.home();
         });
    App.on("registration", function(){
         App.navigate("registration");
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
         API.displayReportMenu();
//         $.mobile.changePage( "#userMenu" , { reverse: false, changeHash: false } );
         });
    App.on("displayImmunization", function(){
         API.displayImmunization();
//         $.mobile.changePage( "#userMenu" , { reverse: false, changeHash: false } );
         });

    // Add as many of these as you like
    App.addInitializer(function () {

        // Adds any methods to be run after the app was initialized.
            this.initAppEvents();
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


//        if(Backbone.history){
//            Backbone.history.start();
////            Backbone.history.start({ pushState: false, root: App.root });
////            Backbone.history.start({ pushState: true, root: App.root });
////            Backbone.history.start({ pushState: true });
//
//            console.log("this.getCurrentRoute(): " + this.getCurrentRoute())
//            if(this.getCurrentRoute() === ""){
//                App.trigger("home");
//            }
//        }

//        console.log("initialize:after");
    });


    App.on('start', function () {
        if(Backbone.history){
            Backbone.history.start();
//            Backbone.history.start({ pushState: false, root: App.root });
//            Backbone.history.start({ pushState: true, root: App.root });
//            Backbone.history.start({ pushState: true });
            var hash = window.location.hash;
            console.log("this.getCurrentRoute(): " + this.getCurrentRoute() + " hash: " + hash);
            if(this.getCurrentRoute() === ""){
                App.trigger("home");
            }
        }
    });

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
    App.initAppEvents = function() {

        new App.Router({
            controller: API
        });


        // All links with the role attribute set to nav-main will be
        // handled by the application's router.
//        $('a[data-role="nav-main"]').live('click', function(/*e*/) {
//            App.navigate($(this).attr('href'));
//        });

        App.vent.on('navigate', function(e) {
            App.navigate(e);
        });

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
    };

    // Return the instantiated app (there should only be one)
    return App;

})
