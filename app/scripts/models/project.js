/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Project = Backbone.Model.extend({

        bgModel: null,
        spriteModel: [],
        audioModel: null,
        numOfSprite: 1,

        initialize: function() {
        },

        defaults: {
            bgModel: null,
            spriteModel: [],
            audioModel: null,
            numOfSprite: 1,
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

    });
    
})();
