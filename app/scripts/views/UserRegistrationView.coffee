define [
  "backbone"
  "marionette"
  "templates"
  "dust"
  "PouchDB"
], (Backbone, Marionette, compiledTemplates, dust, PouchDB) ->
  Backbone.Marionette.ItemView.extend
    template: "UserRegistrationView"
    events:
      "click #submitUserRegistration": "submitUserRegistration"
      "click #submitAdminRegistration": "submitAdminRegistration"

    userType: null
    PouchDB: null
    initialize: ->
      console.log "init"
      return

    submitUserRegistration: ->
      App.trigger "postUserRegistrationMenu"
      return

    submitAdminRegistration: ->
      App.trigger "userMain"
      return


