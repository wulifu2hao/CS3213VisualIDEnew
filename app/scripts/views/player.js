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
        bgsrc: '',

        initialize: function () {
            console.log(this.model.i);
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
                        yPos: this.model.get('yPos'),
                        isShown: this.model.get('isShown'), 
                        costumes: this.model.get('costumes'),
                        backgroundImg : this.model.get('backgroundImg'),
            };
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
            this.commands_list = this.model.array_of_commands;
            this.executeFunctions(0, this.commands_list.length);
        },

        executeFunctions: function(start, length){
            var ind;
            console.log("I am in exe functions!");
            console.log(this.model.array_of_commands);
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
                        if(this.model_bg.imgIndex<(this.model_bg.backgroundImgs.length-1)){
                            console.log("background change to next");
                            this.model_bg.imgIndex++;
                        }
                        else if(this.model_bg.imgIndex<(this.model_bg.backgroundImgs.length-1)){
                            console.log("background change back to 0");
                            this.model_bg.imgIndex=0;
                        }

                        this.drawBackground();
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

        drawBackground: function(){
            var that = this;
            var bg = document.createElement('img');
            bg.onload = function(){
                console.log("drawing background");
                that.ctx.drawImage(bg, 0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height); 
            }
            bg.src = this.model_bg.backgroundImgs[imgIndex];
        },

        draw: function(){
            var that = this;
            var character = document.createElement('img');
            var bg = document.createElement('img');
            var shown = this.current_status.isShown;
            this.clearCanvas();
            
            character.onload = function(){
                console.log("draw bg in character!", that.bgd);
                that.ctx.drawImage(bg, 0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);        // draw background if applicable
                console.log("Let's draw character in character!", that.current_status.isShown);
                    
                if(that.current_status.isShown){
                    that.ctx.drawImage(character,that.current_status.xPos, that.current_status.yPos); //character.width, character.height);     // draw costume if status isShown is true.
                }           
            };
            bg.src = this.current_status.backgroundImg[this.bgd];
            character.src = this.current_status.costumes[this.costume];    
           
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
