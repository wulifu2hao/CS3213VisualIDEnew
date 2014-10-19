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
            var that = this;
            $("#save-button").click(function(e){
                e.preventDefault();
                that.saveToServer();
            });
            $("#load-button").click(function(e){
                e.preventDefault();
                that.loadFromServer();
            });
            $("#login-button").click(function(e){
                e.preventDefault();
                window.location = (window.location + 'auth/google');
            });
        },

        loadFromServer: function(){
            var name = "default";
            var that = this;
            var url = '/api/programs/'+name

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    console.log(data);
                    that.model.name = name;
                },
                error: function(err){
                    console.log(err);
                 }
            });
        },

        saveToServer: function() {
            var name = "default";
            var that = this;

            if (this.model.name == "") {
                console.log("is post");
                $.ajax({
                    type: 'POST',
                    url: '/api/programs',
                    data: { name:name},
                    success: function(data) {
                        console.log(data);
                        that.model.name = name;
                    },
                    error: function(err){
                        console.log(err);
                     }
                });
            } else {
                console.log("is put");
                $.ajax({
                    type: 'PUT',
                    url: '/api/programs',
                    data: { name:name},
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(err){
                        console.log(err);
                     }
                });
            }
            
            console.log("save to server");
            // this.model.save({name:'default'});
        },

        render: function () {
            var w = this.$el.width();
            var h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width:w,height:h}));
        }

    });

})();
