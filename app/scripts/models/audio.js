/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Audio = Backbone.Model.extend({
        
        sounds: ["sound1", "sound2", "sound3", "sound4", "sound5"],

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

    });
    
})();
