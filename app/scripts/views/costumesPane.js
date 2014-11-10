/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Costumespane = Backbone.View.extend({

        template: JST['app/scripts/templates/costumesPane.ejs'],

        el: "#costumes-pane",

        events: {},

        initialize: function () {
            var that = this;
            var selected_sprite=-1;
            var selected_costume=-1;
            this.render();
            $(".selectable").selectable({
            selected: function (event, ui) {
                if ($(ui.selected).hasClass('click-selected')) {
                    $(ui.selected).removeClass('ui-selected click-selected');
                } else {
                    $(ui.selected).addClass('click-selected');
                    selected_sprite = parseInt(ui.selected.id);
                    console.log("sprite selected"+selected_sprite);
                    that.loadCostume(selected_sprite);
                }
            },

            unselected: function (event, ui) {
                $(ui.unselected).removeClass('click-selected');
            }
            });

            $(".costumes-selectable").selectable({
            selected: function (event, ui) {
                if ($(ui.selected).hasClass('click-selected')) {
                    $(ui.selected).removeClass('ui-selected click-selected');

                } else {
                    $(ui.selected).addClass('click-selected');
                    selected_costume = parseInt(ui.selected.id);
                    console.log("costume selected"+selected_costume);
                }
            },

            unselected: function (event, ui) {
                $(ui.unselected).removeClass('click-selected');
            }
            });

            $("#sprite-upload-button").click(function(e){
                console.log("add new sprite"); 
                var sprite = new window.Playground.Models.Sprite();
                that.model.spriteModel.push(sprite);
                sprite.costumes = ['../images/costume1.png','../images/costume2.png'];
                that.loadSprites();
            });

            $("#costume-delete-button").click(function(e){
                that.model.spriteModel[selected_sprite].costumes.splice(selected_costume, 1);
                that.loadCostume(selected_sprite);
            });

            $("#sprite-delete-button").click(function(e){
                that.model.spriteModel.splice(selected_sprite, 1);
                that.loadSprites();
            });

            this.loadSprites();

        },

        render: function () {
            this.$el.html(this.template());
        },

        loadSprites: function() {
            $(".selectable").empty();
            var length = this.model.spriteModel.length;
            var that = this;
            var i =0 ;
            for(i=0; i<length; i++){
                var imgSrc = that.model.spriteModel[i].costumes[0];
                var img = "<li id='"+i+"'> <img class='ui-widget-content' src='" +imgSrc + " ' height='80px' width='40px'>" + " </img> </li>";
                $(".selectable").append(img); 
            }
        },

        loadCostume: function(i) {
            $(".costumes-selectable").empty();
            var that = this;
            var length = that.model.spriteModel[i].costumes.length;
            for(var j=0; j<length; j++){
                var imgSrc = that.model.spriteModel[i].costumes[j];
                var img = "<li id='"+j+"'> <img class='ui-widget-content' src='" +imgSrc + " ' height='80px' width='40px'>" + " </img> </li>";
                $(".costumes-selectable").append(img); 
            }
        },

    });

})();
