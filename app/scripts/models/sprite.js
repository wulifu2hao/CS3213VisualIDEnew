/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Sprite = Backbone.Model.extend({

        url: '/api/programs',
        costume: '',
        xPos: 0,
        yPos: 0,
        isShown: true,
        array_of_functions : [],

        name: "",

        commands: {},

        initialize: function() {
        },

        defaults: {
            xPos : 0,
            yPos : 0,
            isShown : true,
            costume : 'defaultLink',
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        add: function(index, position, parameters){
           switch(index){
                case 0:
                array_of_functions.splice(position,0,setXPos(parameters[0]));
                break;
                case 1:
                array_of_functions.splice(position,0,setYPos(parameters[0]));
                break;
                case 2:
                array_of_functions.splice(position, 0, changeCostume(parameters[0]));
                break;
           }
        },

        deleteCommand: function(position){

        },

        setXPos: function(xPosition){
            xPos = xPosition;
             var obj = {xPos: xPos, yPos: yPos, isShown: isShown, costume: costume};
            return obj;
        },

        setYPos: function(yPosition){
            yPos = yPosition;
            var obj = {xPos: xPos, yPos: yPos, isShown: isShown, costume: costume};
            return obj;
        },

        changeCostume: function(link){
            costume = link;
            var obj = {xPos: xPos, yPos: yPos, isShown: isShown, costume: costume};
            return obj;
        }


    });

})();
