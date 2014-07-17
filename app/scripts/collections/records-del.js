/*global kiwiWebapp, Backbone*/

kiwiWebapp.Collections = kiwiWebapp.Collections || {};

(function () {
    'use strict';

    kiwiWebapp.Collections.Records = Backbone.Collection.extend({

        model: kiwiWebapp.Models.Records

    });

})();
