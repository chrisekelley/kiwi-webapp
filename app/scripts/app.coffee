#jshint -W109 

#global define 
define [
  "underscore"
  "backbone"
  "BackbonePouch"
  "marionette"
  #    "platform",
  "views/VerifyView"
  "views/UserRegistrationView"
  "views/UserMainView"
  "views/UserFormView"
  "PouchDB"
  "models/Record"
  "dust"
], (_, Backbone, BackbonePouch, Marionette, VerifyView, UserRegistrationView, UserMainView, UserFormView, PouchDB, Record) ->
  window.App = new Marionette.Application()
  console.log "Creating new Marionette App"
  Backbone.sync =  BackbonePouch.sync({
    db: PouchDB('kiwi'),
    fetch: 'query',
    options: {
      query: {
        include_docs: true,
        limit: 10
      }
    }
  });
  Backbone.Model.prototype.idAttribute = '_id';
  App.PouchDB = PouchDB
#  App.db = new App.PouchDB("kiwi")
  App.Controller =
    displayScanner: (user) ->
      staticView = undefined
      if typeof user isnt "undefined"
        staticView = new VerifyView(template: "ScanVerifyView")
      else
        staticView = new VerifyView(template: "VerifyView")
      App.mainRegion.show staticView
      return

    displayRegistration: (user) ->
      $("#message").html ""
      staticView = null
      if typeof user isnt "undefined"
        staticView = new UserRegistrationView(template: "UserRegistrationView")
      else
        staticView = new UserRegistrationView(template: "AdminUserRegistrationView")
      staticView.PouchDB = PouchDB
      staticView.userType = user
      App.mainRegion.show staticView
      return

    displayUserMain: ->
      $("#message").html ""
      staticView = new UserMainView()
      App.mainRegion.show staticView
      return

    postUserRegistrationMenu: ->
      $("#message").html ""
      staticView = new UserMainView(template: "PostUserRegistrationMenuView")
      App.mainRegion.show staticView
      return

    displayReportMenu: ->
      $("#message").html ""
      staticView = new UserFormView(template: "UserReportMenu")
      App.mainRegion.show staticView
      return

    displayImmunization: ->
      $("#message").html ""
      staticView = new UserFormView(template: "ImmunizationForm")
      App.mainRegion.show staticView
      return

    saveRecord: (record) ->
      $("#message").html ""
      record = new Record(record)
      record.post()
      console.log 'saved' +  JSON.stringify(record);
      App.trigger "userMain"
      return

  App.Router = Marionette.AppRouter.extend(appRoutes:
    "": "home"
    home: "home"
    registration: "registration"
    userScan: "userScan"
    userMain: "userMain"
    postUserRegistrationMenu: "postUserRegistrationMenu"
    displayReportMenu: "displayReportMenu"
    displayImmunization: "displayImmunization"
  )
  API =
    home: ->
      App.Controller.displayScanner()
      return

    registration: (user) ->
      App.Controller.displayRegistration user
      return

    userScan: (user) ->
      App.Controller.displayScanner "user"
      return

    userMain: ->
      App.Controller.displayUserMain()
      return

    postUserRegistrationMenu: ->
      App.Controller.postUserRegistrationMenu()
      return

    displayReportMenu: ->
      App.Controller.displayReportMenu()
      return

    displayImmunization: ->
      App.Controller.displayImmunization()
      return

    saveRecord: (record) ->
      App.Controller.saveRecord record
      return

  App.on "home", ->
    App.navigate "#home"
    API.home()
    return

  App.on "registration", ->
    App.navigate "#registration"
    API.registration()
    return

  App.on "userRegistration", ->
    App.navigate "userRegistration"
    API.registration "user"
    return

  App.on "userScan", ->
    App.navigate "userScan"
    API.userScan "user"
    return

  App.on "userMain", ->
    App.navigate "userMain"
    API.userMain()
    return

  App.on "postUserRegistrationMenu", ->
    App.navigate "postUserRegistrationMenu"
    API.postUserRegistrationMenu()
    return

  App.on "displayReportMenu", ->
    App.navigate "displayReportMenu"
    API.displayReportMenu()
    return

  App.on "displayImmunization", ->
    App.navigate "displayImmunization"
    API.displayImmunization()
    return

  App.API = API
  
  # Add as many of these as you like
  App.addInitializer ->
    
    # Adds any methods to be run after the app was initialized.
    #            this.initAppEvents();
    new App.Router(controller: API)
    @root = "/"
    return

  App.addRegions mainRegion: "#main-region"
  App.navigate = (route, options) ->
    options or (options = {})
    console.log "App.navigate to " + route
    Backbone.history.navigate route, options
    return

  
  #        history.pushState({}, null, "#" + route);
  App.getCurrentRoute = ->
    Backbone.history.fragment

  App.on "initialize:after", ->
    console.log "initialize:after"
    if Backbone.history
      Backbone.history.start()
      
      # Trigger the initial route and enable HTML5 History API support
      #            Backbone.history.start({ pushState: true, root: App.root });
      #            Backbone.history.start({ pushState: false, root: App.root });
      #            Backbone.history.start({ pushState: true });
      console.log "this.getCurrentRoute(): " + @getCurrentRoute()
    return

  
  #            if(this.getCurrentRoute() === ""){
  #                App.trigger("home");
  #            }
  
  #    App.on('start', function () {
  #        if(Backbone.history){
  #            Backbone.history.start({ pushState: true, root: App.root });
  #//            Backbone.history.start();
  #//            Backbone.history.start({ pushState: false, root: App.root });
  #//            Backbone.history.start({ pushState: true, root: App.root });
  #//            Backbone.history.start({ pushState: true });
  #            var hash = window.location.hash;
  #            console.log("this.getCurrentRoute(): " + this.getCurrentRoute() + " hash: " + hash);
  #            if(this.getCurrentRoute() === ""){
  #                App.trigger("home");
  #            }
  #        }
  #    });
  $("#verify").click (e) ->
    console.log "clicked verify ya fool."
    e.preventDefault()
    return

  App.progressBar = setValue: (id, value) ->
    $(id).val value
    $(id).slider "refresh"
    return

  
  # kudos: https://github.com/net-uk-sweet/bbb-phonegap-marionette-jqm-boilerplate
  #    App.initAppEvents = function() {
  #
  #        new App.Router({
  #            controller: API
  #        });
  
  # All links with the role attribute set to nav-main will be
  # handled by the application's router.
  #        $('a[data-role="nav-main"]').live('click', function(/*e*/) {
  #            App.navigate($(this).attr('href'));
  #        });
  
  #        App.vent.on('navigate', function(e) {
  #            App.navigate(e);
  #        });
  
  #        function navigate(url) {
  #            App.Router.navigate(url, { trigger: true });
  #        }
  
  # Remove page from DOM when it's being replaced
  #        $('div[data-role="page"]').live('pagehide', function (e /*, ui */) {
  #            $(e.currentTarget).remove();
  #        });
  #
  #        // Triggering a create on pageshow ensures any dynamic content is JQM-ified
  #        $('div[data-role="page"]').live('pageshow', function (/* event, ui */) {
  #            $(this).trigger('create');
  #        });
  #    };
  
  # Return the instantiated app (there should only be one)
  App

