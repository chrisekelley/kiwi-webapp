define [
  "backbone"
  "marionette"
  "templates"
  "dust"
], (Backbone, Marionette, compiledTemplates, dust) ->
  Backbone.Marionette.ItemView.extend
    template: "UserMainView"
    
    #        el: "#userMenu",
    
    #        className: 'app ui-content', // this class will be added to the wrapping div when you render the view
    events:
      "click #registrationLink": "submitRegistration"
      "click #newReportLink": "newReportLink"

    initialize: ->

    
    #            $('input[type=checkbox]').button();
    #            $(function() {
    #                $(":checkbox").checkbox();
    #            });
    submitRegistration: ->
      console.log "submitRegistration"
      App.trigger "userScan"
      return

    newReportLink: ->
      console.log "newReportLink"
      App.trigger "displayReportMenu"
      return

    ui:
      checkboxes: "input[type=checkbox]"


