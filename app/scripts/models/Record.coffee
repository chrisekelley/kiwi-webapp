#jshint -W109

#global define
define [
  'underscore'
  'backbone'
  'App'
], (_, Backbone, App) ->
#  'use strict';

  class Record extends Backbone.Model
    url: '',

    initialize: () ->

    defaults: {}

    validate: (attrs, options) ->

    parse: (response, options) ->
      response

    post: () ->
      this.save()
#      doc = this
#      request = App.db.post(this);
#      request.then(
#        (e) ->
#          console.log('saved' +  JSON.stringify(e))
#          App.trigger("userMain")
#        (err) ->
#          console.error('error saving', doc._id, err)
#      )

