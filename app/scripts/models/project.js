/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Project = Backbone.Model.extend({

        bgModel: null,
        spriteModel: null,
        audioModel: null,

        initialize: function() {
        },

        defaults: {
            bgModel: null,
            spriteModel: null,
            audioModel: null,
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

    });
    
})();
