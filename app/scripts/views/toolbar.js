/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Toolbar = Backbone.View.extend({

        template: JST['app/scripts/templates/toolbar.ejs'],

        el: '#editor_toolbar',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
