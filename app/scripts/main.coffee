#jshint -W109
#/*global require*/
'use strict'

requirejs.config
  deps: ["main"]
  paths:
    backbone: "../bower_components/backbone/backbone"
    dust: "../bower_components/dustjs-linkedin/lib/dust"
    dustHelpers: "../bower_components/dustjs-linkedin-helpers/lib/dust-helpers"
    dustMarionette: "../bower_components/marionette-dust/src/amd/backbone.marionette.dust"
    jquery: "../bower_components/jquery/jquery"

  #        jquerymobile: '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2.min',
    marionette: "../bower_components/marionette/lib/core/amd/backbone.marionette"
    underscore: "../bower_components/lodash/lodash"
    "backbone.wreqr": "../bower_components/backbone.wreqr/lib/amd/backbone.wreqr"
    "backbone.eventbinder": "../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder"
    "backbone.babysitter": "../bower_components/backbone.babysitter/lib/amd/backbone.babysitter"
    BackbonePouch: "../bower_components/backbone-pouch/index"
    PouchDB: "../bower_components/pouchdb/dist/pouchdb-nightly"
    templates: "templates/compiled"


#        platform: '../bower_components/platform/platform',
#        polymer: '../bower_components/polymer/polymer',
#        wc: '../bower_components/requirejs-plugin-wc/wc',
#        text: '../bower_components/requirejs-text/text'
#        App: "../scripts/App"
  shim:
    backbone:
      deps: [
        "underscore"
        "jquery"
      ]
      exports: "Backbone"


  #Marionette
  #        "marionette":{
  #            "deps":["underscore", "backbone", "jquery"],
  #            "exports":"Marionette"
  #        },
    BackbonePouch:
      deps: [
        "backbone"
        "PouchDB"
      ]
      exports: "BackbonePouch"

    PouchDB:
      deps: ["backbone"]
      exports: "PouchDB"

    underscore:
      exports: "_"

    dust:
      exports: "dust"

    dustHelpers: ["dust"]
    templates: [
      "dust"
      "dustMarionette"
    ]

require [
  "jquery"
  "backbone"
  "app"
  "marionette"

#    "jquerymobile"
], ($, Backbone, App) ->
  
  #    // Prevents all anchor click handling
  #    $.mobile.linkBindingEnabled = false;
  #
  #    // Disabling this will prevent jQuery Mobile from handling hash changes
  #    $.mobile.hashListeningEnabled = false;
  #
  #    $(document).bind("mobileinit", function () {
  #        $.mobile.linkBindingEnabled = false;
  #    });
  
  # Define your master router on the application namespace and trigger all
  # navigation from this instance.
  console.log "Starting App"
  App.start()
  
  # Trigger the initial route and enable HTML5 History API support
  #    Backbone.history.start({ pushState: true, root: App.root });
  
  #    if(Backbone.history.fragment === ""){
  #        Backbone.history.navigate("home");
  #        App.List.Controller.listContacts();
  #    }
  
  # All navigation that is relative should be passed through the navigate
  # method, to be processed by the router. If the link has a `data-bypass`
  # attribute, bypass the delegation completely.
  $(document).on "click", "a:not([data-bypass])", (e) ->
    
    # Get the absolute anchor href.
    href =
      prop: $(this).prop("href")
      attr: $(this).attr("href")

    root = location.protocol + "//" + location.host + App.root
    
    # Ensure the root is part of the anchor href, meaning it's relative.
    if href.prop and href.prop.slice(0, root.length) is root
      e.preventDefault()
      Backbone.history.navigate href.attr, true
    return

  $(document).on "click", "a[data-bypass]", (e) ->
    e.preventDefault()
    return

  document.addEventListener "deviceready", ((e) ->
    console.log "gonna try to launch SecugenPlugin.coolMethod now."
    console.log "deviceready"
    cordova.plugins.SecugenPlugin.coolMethod "hey there!"
    cordova.plugins.SecugenPlugin.requestPermission (results) ->
      
      #              app.display(JSON.stringify(results),errorCallback);
      console.log "requestPermission results: " + JSON.stringify(results)
      return

    return
  ), false
  return


#    $(document).on('pagebeforeshow', '#index', function(){
#        $('<input>').appendTo('[ data-role="content"]').attr({'name':'slider','id':'slider','data-highlight':'true','min':'0','max':'100','value':'50','type':'range'}).slider({
#            create: function( event, ui ) {
#                $(this).parent().find('input').hide();
#                $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
#                $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
#                $(this).parent().find('.ui-slider-handle').hide();
#            }
#        }).slider("refresh");
#
#        // Test
#        var i = 1;
#        var interval = setInterval(function(){
#            progressBar.setValue('#slider',i);
#            if(i === 100) {
#                clearInterval(interval);
#            }
#            i++;
#        },100);
#    });
#
#    var progressBar = {
#        setValue:function(id, value) {
#            $(id).val(value);
#            $(id).slider("refresh");
#        }
#    }
