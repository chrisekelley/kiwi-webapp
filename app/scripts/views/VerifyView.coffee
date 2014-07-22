define [
  "backbone"
  "marionette"
  "templates"
  "dust"

#    "polymer",
#    "platform"
#     'wc!../../bower_components/paper-progress/paper-progress.html!dec!polymer'
#     'wc!../../bower_components/paper-progress/paper-progress.html!dec,'
], (Backbone, Marionette, compiledTemplates, dust) ->
  
  #function (Backbone, Marionette, compiledTemplates, dust, polymer, platform, paper_progress) {
  #function (Backbone, Marionette, compiledTemplates, dust, platform, paper_progress) {
  Backbone.Marionette.ItemView.extend
    template: "VerifyView"
    className: "itemView" # this class will be added to the wrapping div when you render the view
    events:
      "click #verify": "scan"
      "click #scan": "scanNewIndividual"
      "click #verifyYes": "displayNewUserRegistration"
      "click #verifyNo": "displayNewUserRegistration"

    initialize: ->

    displayNewUserRegistration: ->
      App.trigger "userRegistration"
      return

    diplayNewReportMenu: ->

    scanNewIndividual: ->
      @scan "userRegistration"
      return

    scan: (next, sliderId) ->
      console.log "Register clicked "
      display = (message) ->
        console.log "display message: " + message
        display = document.getElementById("message") # the message div
        lineBreak = document.createElement("br") # a line break
        label = document.createTextNode(message) # create the label
        display.appendChild lineBreak # add a line break
        display.appendChild label # add the message node
        return

      revealSlider = (next, sliderId) ->
        
        #                progress.show();
        nextProgress = ->
          if progress.value < progress.max
            progress.value += (progress.step or 1)
            requestAnimationFrame nextProgress
          else
            window.setTimeout (->
              if typeof next is "string"
                App.trigger next
              else
                App.trigger "registration"
              return
            ), 500
          return
        startProgress = ->
          repeat = 0
          progress.value = progress.min
          
          #                    button.disabled = true;
          nextProgress()
          return
        console.log "revealSlider"
        progress = document.querySelector("paper-progress")
        button = document.querySelector("paper-button")
        thisSliderId = sliderId  if typeof sliderId isnt "undefined"
        startProgress()
        repeat = undefined
        maxRepeat = 5
        addEventListener "polymer-ready", ->
          startProgress()
          return

        return

      if not typeof cordova is "undefined"
        cordova.plugins.SecugenPlugin.register ((results) ->
          
          #                display(JSON.stringify(results));
          $("#message").html results
          return
        
        #                revealSlider();
        ), (e) ->
          console.log "Error: " + e
          $("#message").html "Error:" + results
          return

      
      #                display("Error: " + e);
      else
        console.log "Cordova is not initialised. Plugins will not work."
        revealSlider next, sliderId
      return

    
    #        revealSlider: function(e) {
    #            console.log("click scan.")
    #
    #            $( "#slider" ).show();
    #
    #            $( "#slider" ).parent().find('input').hide();
    #            $( "#slider" ).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
    #            $( "#slider" ).parent().find('.ui-slider-handle').hide();
    #            $( "#slider" ).slider({
    #                value: 0
    #                // setup the rest ...
    #            });
    #
    #            var i = 1;
    #            var interval = setInterval(function(){
    #                App.progressBar.setValue('#slider',i);
    #                if(i === 50) {
    #                    console.log("Go to next page.")
    #                    $( "#message").html("Scanning complete!")
    #                    window.setTimeout(function() { App.trigger("registration")}, 2000);
    #                    clearInterval(interval);
    #                }
    #                i++;
    #            },50);
    #        },
    
    #
    #         appends @message to the message div:
    #         
    display: (message) ->
      console.log "display message."
      display = document.getElementById("message") # the message div
      lineBreak = document.createElement("br") # a line break
      label = document.createTextNode(message) # create the label
      display.appendChild lineBreak # add a line break
      display.appendChild label # add the message node
      return



#        initSlider: function () {
#            $('<input>').appendTo('[ data-role="content"]').attr({'name':'slider','id':'slider','data-highlight':'true','min':'0','max':'100','value':'50','type':'range'}).slider({
#                create: function( event, ui ) {
#                    $(this).parent().find('input').hide();
#                    $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
#                    $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
#                    $(this).parent().find('.ui-slider-handle').hide();
#                }
#            }).slider("refresh");
#
#            // Test
#            var i = 1;
#            var interval = setInterval(function(){
#                App.progressBar.setValue('#slider',i);
#                if(i === 99) {
#                    console.log("Go to next page.")
#                    $( "#message").html("Scanning complete!")
#                    clearInterval(interval);
#                }
#                i++;
#            },100);
#        }
