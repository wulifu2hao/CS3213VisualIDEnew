/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',
        
        current_status : {},                  // draw this status in current frame
        func_name : '',                            // current function executing
        commands_list : [],                     // list of functions need to be executed
        index : 0,                              // index in function_list
        loop_layer : -1,                        // -1 for sequensial, 0 indicates i'm in single loop, 1 means i'm inside double loop
        iteration : [],                         // it[0] indicates num of iterations for single loop 
        commands_iter : [],                     // cmd[0] indicates num of commands included in the single loop.
        FPS : 30,                               // frame per second
        ctx : null,
        w : null,
        h : null,
        costume: 0,
        bgd: 0,

        bgImgs: [],
        spriteImgs: [],

        initialize: function () {
            var that = this;
            $("#play_button").click(function(e){
                that.updateCanvas();       
            });

            
            $("#login-button").click(function(e){
                e.preventDefault();
                window.location = (window.location + 'auth/google');
            });

            this.current_status = {              // init status
                        xPos: this.model.spriteModel.get('xPos'),
                        yPos: this.model.spriteModel.get('yPos'),
                        isShown: this.model.spriteModel.get('isShown'), 
                        costumes: this.model.spriteModel.get('costumes'),
                        backgroundImg : this.model.spriteModel.get('backgroundImg'),
            };


            this.loadImgs();

            this.render();
            this.draw();
        },

        render: function () {

            this.w = this.$el.width();
            this.h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width: this.w,height: this.h}));
            this.ctx = document.getElementById('player_canvas').getContext("2d");
        },

        updateCanvas: function(){
            console.log("Player view: play button clicked!");
            this.commands_list = this.model.spriteModel.array_of_commands;
            this.executeFunctions(0, this.commands_list.length);
        },

        executeFunctions: function(start, length){
            var ind;
            console.log("I am in exe functions!");
            console.log(this.model.spriteModel.array_of_commands);
            for(ind = start; ind < (start+length); ind++){
                console.log("first clear");
                this.clearCanvas();
                var command = this.commands_list[ind];
                console.log(ind, command);
                this.executeCommand(ind, command);
            }
        },

        executeCommand: function(id, command){
            console.log(command.name);
            
             switch(command.name){
                    case "setXPos":
                        this.current_status.xPos = command.para[0];
                        this.draw();
                        break;
                    case "setYPos":
                        this.current_status.yPos = command.para[0];
                        this.draw();
                        break;
                    case "show":
                        this.current_status.isShown = true;
                        this.draw();
                        break;
                    case "hide":
                        this.current_status.isShown = false;
                        this.draw();
                        break;
                    case "move":
                        //move in current facing direction
                        var step = 0;
                        while (step < command.para[0]){
                            this.current_status.xPos++;
                            console.log("current pos", this.current_status.xPos);
                            this.draw();
                            step++;
                        }
                        break;
                    case "changeCostume":
                        if(this.costume<(this.current_status.costumes.length-1)){
                            console.log("costume change to next");
                            this.costume ++;
                        }
                        else if(this.costume===(this.current_status.costumes.length-1)){
                            console.log("costume change back to 0");
                            this.costume = 0;
                        }
                        this.draw();
                        break;
                    case "changeBackground":
                        //get from background model
                        if(this.model.bgModel.imgIndex<(this.model.bgModel.backgroundImgs.length-1)){
                            console.log("background change to next");
                            this.model.bgModel.imgIndex++;
                        }
                        else if(this.model.bgModel.imgIndex===(this.model.bgModel.backgroundImgs.length-1)){
                            console.log("background change back to 0");
                            this.model.bgModel.imgIndex=0;
                        }
                        this.draw();
                        break;
                    case "repeat":
                        console.log(command.para[0], command.para[1]);
                        var i = 1;

                        var that = this;
                            // for(j=id+1; j<(id+command.para[1]+1); j++){
                            //     that.executeCommand(j, that.commands_list[j]);
                            // }

                        var timer = function(){
                         if(i < command.para[0]) {
                              i++;
                              that.executeFunctions(id+1, command.para[1]);
                         } else {
                              clearInterval(timer);
                         }
                        };

                        setInterval(timer, 500);                   
                        break;
                    default:
                        console.log("invalid command, error in code somewhere");
                }
        },

        clearCanvas: function(){
            this.ctx.clearRect(0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);
            console.log("canvas cleared!");
        },


        loadImgs: function() {
            var i = 0;
            while(i<this.model.bgModel.backgroundImgs.length){
                //load image
                this.bgImgs[i] = new Image();
                this.bgImgs[i].onload = function(){
                    console.log("loaded bg img ");
                };
                this.bgImgs[i].src = this.model.bgModel.backgroundImgs[i];
                i++;
            }

            i=0;
            console.log(this.current_status);
            while(i<this.current_status.costumes.length){
                this.spriteImgs[i] = new Image();
                this.spriteImgs[i].onload = function(){
                    console.log("load sprites imgs");
                }
                this.spriteImgs[i].src = this.current_status.costumes[i];
                i++;
            }
        },

        drawBackground: function(){
            this.ctx.drawImage(this.bgImgs[this.model.bgModel.imgIndex], 0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height); 
        },

        drawCharacter: function(){
            var that = this;
            var shown = this.current_status.isShown;
            if(that.current_status.isShown){
                     that.ctx.drawImage(this.spriteImgs[this.costume],that.current_status.xPos, that.current_status.yPos); //character.width, character.height);     // draw costume if status isShown is true.
                 }     
        },

        draw: function(){
            this.clearCanvas();
            this.drawBackground();
            this.drawCharacter();
        },
        
        sleep: function(milliseconds) {
            var start = new Date().getTime();
            console.log("start", start);
            for (var i = 0; i < 1e7; i++) {
                var cur = new Date().getTime(); 
                if ((cur - start) > milliseconds){
                    console.log("timeout", cur);
                    break;
                }
            }
        }
    });

})();
