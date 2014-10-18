/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            var w = this.$el.width();
            var h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width:w,height:h}));
        }

    });

})();
