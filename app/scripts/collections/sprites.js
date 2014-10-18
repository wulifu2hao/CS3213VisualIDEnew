/*global Playground, Backbone*/

Playground.Collections = Playground.Collections || {};

(function () {
    'use strict';

    Playground.Collections.Sprites = Backbone.Collection.extend({

        model: Playground.Models.Sprites

    });

})();
