/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Editor = Backbone.View.extend({

        template: JST['app/scripts/templates/editor.ejs'],

        el: '#editor_workspace',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
