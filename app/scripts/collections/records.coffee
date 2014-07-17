define [
  'underscore'
  'backbone'
  'models/Records-model'
], (_, Backbone, RecordsModel) ->

  class RecordsCollection extends Backbone.Collection
    model: RecordsModel