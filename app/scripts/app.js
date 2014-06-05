/*jshint -W109 */
/*global define */
define([
    "underscore",
    "backbone",
    "marionette",
    "views/VerifyView",
    "views/UserRegistrationView",
    "views/UserMainView",
    "dust"
],

function (_, Backbone, Marionette, VerifyView, UserRegistrationView, UserMainView) {

    var App = new Backbone.Marionette.Application();
    console.log("Creating new Marionette App")

    // An init function for your main application object
    App.addInitializer(function () {
        this.root = '/';
    });

    App.Controller = {
        displayUserVerification: function(){
            var staticView = new VerifyView();
            App.mainRegion.show(staticView);
        },
        displayRegistration: function(){
            $( "#message").html("")
            var staticView = new UserRegistrationView();
            App.mainRegion.show(staticView);
        },
        displayUserMain: function(){
            $( "#message").html("")
            var staticView = new UserMainView();
            App.mainRegion.show(staticView);
        }
    };

    var API = {
        home: function(){
            App.Controller.displayUserVerification();
        },
        registration: function(){
            App.Controller.displayRegistration();
        },
        userMain: function(){
            App.Controller.displayUserMain();
        }
    };

    App.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "home": "home",
            "registration": "registration",
            "userMain": "userMain"
        }
    });

    App.on("home", function(){
         App.navigate("home");
         API.home();
         });
    App.on("registration", function(){
         App.navigate("registration");
         API.registration();
         });
    App.on("userMain", function(){
         App.navigate("userMain");
         API.userMain();
         });

    // Add as many of these as you like
    App.addInitializer(function () {
        new App.Router({
            controller: API
        });
    });

    App.addRegions({
        mainRegion: "#main-region"
    });

    App.navigate = function(route, options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function(){
        return Backbone.history.fragment
    };

    App.on("initialize:after", function(){


        if(Backbone.history){
//            Backbone.history.start();
            Backbone.history.start({ pushState: true, root: App.root });


            if(this.getCurrentRoute() === ""){
                App.trigger("home");
            }
        }
    });

    App.progressBar = {
        setValue:function(id, value) {
            $(id).val(value);
            $(id).slider("refresh");
        }
    }

    // Return the instantiated app (there should only be one)
    return App;

})
