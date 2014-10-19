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

        initialize: function () {
            var that = this;
            $("#play_button").click(function(e){
           //     e.preventDefault();
                that.updateCanvas();       
            });

            $("#save-button").click(function(e){
                e.preventDefault();
                that.saveToServer();
            });   
            this.current_status = {              // init status
                        xPos: this.model.get('xPos'),
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

        saveToServer: function() {
            console.log("saveToServer");
        },

        updateCanvas: function(){
            console.log("Player view: play button clicked!");
            this.commands_list = this.model.array_of_commands;
            this.executeFunctions(0, this.commands_list.length);
            // window.setInterval(this.gameLoop, 1000/30);

            /* deleted gameloop, not necessary
            (function (window) {
                function gameLoop() {
                console.log("Entering game loop");
                console.log(this);
                this.drawAtCurrentPosition();
                


                }
             window.setInterval(gameLoop, 1000 / 60); // 60fps
            } (window));
*/
        },

        // gameLoop : function(){
        //     this.draw();
        //     this.executeCommand();
        // }

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
                        if(this.bgd<(this.current_status.backgroundImg.length-1)){
                            console.log("background change to next");
                            this.bgd ++;
                        }
                        else if(this.bgd===(this.current_status.backgroundImg.length-1)){
                            console.log("background change back to 0");
                            this.bgd = 0;
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


                   
                       
                        // this.loop_layer++;
                        // this.iteration[this.loop_layer] = command.para[0];
                        // this.commands_iter[this.loop_layer] = command.para[1];
                        // console.log("in", this.iteration[this.loop_layer], "times", this.commands_iter[this.loop_layer], "commands");   
                        // // if (this.iteration[this.loop_layer] ==='forever'){
                        // //     while (1){
                        // //         this.executeFunctions(id+1, this.commands_iter[this.loop_layer]);      // infinite loop case, only wait for stop.
                        // //     }
                        // // }
                        // // else {
                        //     console.log("in", this.iteration[this.loop_layer], "times", this.commands_iter[this.loop_layer], "commands");
                        //     for (j = 0; this.iteration[this.loop_layer]; j++){
                        //         this.executeFunctions(id+1, this.commands_iter[this.loop_layer]);      // finite loop case
                        //     }
                        //     this.loop_layer--;  
                        // // }                                 // after jumped out, reduce layer.                     
                        break;
                    default:
                        console.log("invalid command, error in code somewhere");
                }
        },

        clearCanvas: function(){
            this.ctx.clearRect(0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);
            console.log("canvas cleared!");
        },

        draw: function(){
            var that = this;
            var character = document.createElement('img');
            var bg = document.createElement('img');
            var shown = this.current_status.isShown;
            console.log("second clear");
            this.clearCanvas();
            
            
            if (bg != ''){  
                bg.onload = function(){
                    console.log("draw bg!", that.bgd);
                    that.ctx.drawImage(bg, 0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);        // draw background if applicable
                    if(that.current_status.isShown){
                        console.log("Let's draw!", that.current_status.isShown);
                        that.ctx.drawImage(character,that.current_status.xPos, that.current_status.yPos); 
                    }
                }
            }; 
            character.onload = function(){
                that.ctx.drawImage(bg, 0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);        // draw background if applicable
                if(that.current_status.isShown){
                    console.log("Let's draw!", that.current_status.isShown);
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
