/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Command = Backbone.View.extend({

        template: JST['app/scripts/templates/command.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
