/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Sprite = Backbone.Model.extend({

        xPos : 0,
        yPos : 0,
        isShown :true,
        costumes :['../images/costume1.png','../images/costume2.png'],
        backgroundImg: [],
        url: '',
        array_of_commands: [],

        initialize: function() {
        },

        defaults: {
            xPos : 0,
            yPos : 0,
            isShown :true,
            costumes :['../images/costume1.png','../images/costume2.png'],
            backgroundImg: [],
            url: '',
            array_of_commands: [],
            
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        add: function(type, position, parameters){
           switch(type){
                case "command_set_x":
                console.log("add first type of function: setXPos");
                this.array_of_commands.splice(position,0,{name: "setXPos", para: parameters});
                break;
                case "command_set_y":
                console.log("add second type of function: setYPos");
                this.array_of_commands.splice(position,0,{name: "setYPos", para: parameters});
                break;
                case "command_change_costume":
                console.log("add third type of function: changeCostume");
                this.array_of_commands.splice(position,0,{name: "changeCostume", para: parameters});
                break;
                case "command_change_background":
                console.log("add fourth type of function: changeBackground");
                this.array_of_commands.splice(position,0,{name: "changeBackground", para: parameters});
                break;
                case "command_hide":
                console.log("add fourth type of function: hide");
                this.array_of_commands.splice(position,0,{name: "hide", para: parameters});
                break;
                case "command_show":
                console.log("add fourth type of function: show");
                this.array_of_commands.splice(position,0,{name: "show", para: parameters});
                break;
                case "command_move":
                console.log("add fourth type of function: move");
                this.array_of_commands.splice(position,0,{name: "move", para: parameters});
                break;
                case "command_repeat":
                console.log("add fourth type of function: repeat");
                this.array_of_commands.splice(position,0,{name: "repeat", para: parameters});
                break;
                default:
                console.log("invalid command: "+type);
            }
        },

        deleteCommand: function(position){
            delete this.array_of_commands[position];
            console.log(this.array_of_commands);
        },

    });
})();
