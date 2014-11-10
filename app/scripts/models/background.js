/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Background = Backbone.Model.extend({

        backgroundImgs: ['../images/game_bg.jpg', '../images/background1.jpg'],
        imgIndex: 0,

        initialize: function() {
        },

        defaults: {
            imgIndex: 0,
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        getData: function() {
            var data = {
                "imgIndex": this.imgIndex,
                "backgroundImgs": this.backgroundImgs,
            };
            console.log("[background model] doing getdata");
            return JSON.stringify(data);
        },

        setData: function(data) {
            var data = JSON.parse(data);
            console.log("[background model] got data is: "+data);
            this.backgroundImgs = data.backgroundImgs;
            this.imgIndex = data.imgIndex;
        },

    });
    
})();
