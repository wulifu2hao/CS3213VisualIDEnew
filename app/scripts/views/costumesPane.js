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
            $("#selectable").selectable({
            selected: function (event, ui) {
                if ($(ui.selected).hasClass('click-selected')) {
                    $(ui.selected).removeClass('ui-selected click-selected');

                } else {
                    $(ui.selected).addClass('click-selected');

                }
            },
            unselected: function (event, ui) {
                $(ui.unselected).removeClass('click-selected');
            }
            });
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
