/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Costumespane = Backbone.View.extend({

        template: JST['app/scripts/templates/costumesPane.ejs'],

        el: "#costumes-pane",

        events: {},

        initialize: function () {
            this.render();
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
