/*global Playground, $*/


window.Playground = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var sprite = new this.Models.Sprite();
        
        new this.Views.Toolbar();
        new this.Views.Editor({model: sprite});
        new this.Views.Player({model: sprite});
        new this.Views.Costumespane({model: sprite});
    }
};

$(document).ready(function () {
    'use strict';
    Playground.init();
    Backbone.history.start();
});
