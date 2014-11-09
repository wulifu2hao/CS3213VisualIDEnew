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
            this.render();
            $(".selectable").selectable({
            selected: function (event, ui) {
                if ($(ui.selected).hasClass('click-selected')) {
                    $(ui.selected).removeClass('ui-selected click-selected');
                    console.log("unselected");

                } else {
                    $(ui.selected).addClass('click-selected');
                    console.log("selected");
                    var last_selected = ui.selected.id;
                    console.log(last_selected);
                    
                }
            },

            unselected: function (event, ui) {
                $(ui.unselected).removeClass('click-selected');
            }
            });

            this.loadSprites();

            $("#sprite-upload-button").click(function(e){
                console.log("add new sprite"); 
                var sprite = new window.Playground.Models.Sprite();
                that.model.spriteModel.push(sprite);
                var img = "<li id='"+(that.model.spriteModel.length-1)+"'>> <img class='ui-widget-content' src='../images/costume1.png' height='80px' width='40px'>" + " </img> </li>";
                $(".selectable").append(img); 
            });
        },

        render: function () {
            this.$el.html(this.template());
        },

        loadSprites: function() {
            var length = this.model.spriteModel.length;
            var that = this;
            var i =0 ;
            for(i=0; i<length; i++){
                var imgSrc = that.model.spriteModel[i].costumes[0];
                var img = "<li id='"+i+"'> <img class='ui-widget-content' src='" +imgSrc + " ' height='80px' width='40px'>" + " </img> </li>";
                $(".selectable").append(img); 
            }
        },

    });

})();
