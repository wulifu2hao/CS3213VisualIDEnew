/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Sprite = Backbone.Model.extend({
        xPos : 0,
        yPos : 0,
        isShown :true,
        costumes :[],  //each sprite has its own set of costumes
        // costumes :['../images/move1.png','../images/move2.png','../images/move3.png','../images/move4.png','../images/hit.png'],  //each sprite has its own set of costumes
        url: '',
        array_of_commands: [],
        angle: 0,
        width: 80,
        height: 150,
        commandString: "",
        current_costume: 0,

        name:"",

        initialize: function() {
        },

        getData: function() {
            var data = {
                "xPos": this.xPos,
                "yPos": this.yPos,
                "isShown": this.isShown,
                "costumes": this.costumes,
                "array_of_commands": this.array_of_commands,
                "angle": 0,
                "width": 80,
                "height": 150,
                "commandString": this.commandString
            };
            console.log("doing getdata");
            console.log(this.array_of_commands);
            return JSON.stringify(data);
        },

        setCommandString: function(string) {
            this.commandString = string;
        },

        setData: function(data) {
            var data = JSON.parse(data);
            console.log(data);
            this.xPos = data.xPos;
            this.yPos = data.yPos;
            this.isShown = data.isShown;
            this.costumes = data.costumes;
            this.array_of_commands = data.array_of_commands;
            this.angle = data.angle;
            this.width = data.width;
            this.height = data.height;
            this.commandString = data.commandString;
        },

        defaults: {
            xPos : 0,
            yPos : 0,
            isShown :true,
            // costumes :['../images/move1.png','../images/move2.png','../images/move3.png','../images/move4.png','../images/hit.png'],
            costumes :[],
            url: '',
            array_of_commands: [],
            angle: 0,
            width: 80,
            height: 150,
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
                case "command_wait":
                console.log("add fourth type of function: wait");
                this.array_of_commands.splice(position,0,{name: "wait", para: parameters});
                break;
                case "command_repeat":
                console.log("add fourth type of function: repeat");
                this.array_of_commands.splice(position,0,{name: "repeat", para: parameters});
                break;
                case "command_forever":
                console.log("command_repeat_forever");
                this.array_of_commands.splice(position,0,{name: "repeatForever", para: parameters});
                break;
                case "command_if":
                console.log("command_if_then");
                this.array_of_commands.splice(position,0,{name: "ifThen", para: parameters});
                break;
                case "command_onclick":
                console.log("command_event");
                this.array_of_commands.splice(position,0,{name: "event", para: parameters});
                break;
                case "command_rotate":
                console.log("command_rotate");
                this.array_of_commands.splice(position,0,{name: "rotate", para: parameters});
                case "command_scale":
                console.log("command_scale");
                this.array_of_commands.splice(position,0,{name: "scale", para: parameters});
                break;
                // case "command_op_plus":
                // case "command_op_minus":
                // case "command_op_multiply":
                // case "command_op_divide":
                // case "command_op_mod":
                // case "command_op_lessthan":
                // case "command_op_greaterthan":
                // case "command_op_equal":
                case "command_assignment":
                console.log("command_assignment");
                this.array_of_commands.splice(position,0,{name: "assignment", para: parameters});
                break;
                case "command_playsound":
                console.log("command_playsound");
                this.array_of_commands.splice(position,0,{name: "playsound", para: parameters});   
                break;
                case "command_stopsound":
                console.log("command_stopsound");
                this.array_of_commands.splice(position,0,{name: "stopsound", para: parameters});   
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
