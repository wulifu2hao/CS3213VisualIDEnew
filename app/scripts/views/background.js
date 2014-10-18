/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Background = Backbone.View.extend({

        template: JST['app/scripts/templates/background.ejs'],

        events: {},

        initialize: function () {
            this.render();
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html("<img src='images/commandBG.png'>");
            //this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();
