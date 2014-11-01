/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',
        
        current_status : {},                  // draw this status in current frame
        func_name : '',                       // current function executing
        commands_list : [],                   // list of functions need to be executed
        index : 0,                              
        ctx : null,
        w : null,
        h : null,
        costume: 0,

        bgImgs: [],
        spriteImgs: [],
        isDragging: false,

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
                        width : this.model.spriteModel.get('width'),
                        height: this.model.spriteModel.get('height'),
            };

            this.render();   
            this.loadImgs();
            this.draw();

            $('#player_canvas').mousedown(function(event){
                // console.log("mousedown");
                var mouseX = parseInt(event.clientX - event.target.offsetLeft);
                var mouseY = parseInt(event.clientY - event.target.offsetTop);
                var x = that.current_status.xPos;
                var y = that.current_status.yPos;
                var w = that.current_status.width;
                var h = that.current_status.height;
                if((mouseX > (x )) && (mouseX < (x + w)) && (mouseY > (y )) && (mouseY < (y+h))){
                    that.isDragging = true;
                }
            });
            
            $('#player_canvas').mouseup(function(){
                // console.log("mouseup");
                that.isDragging = false;
            });
            
            $('#player_canvas').mousemove(function(event){
                var mouseX = parseInt(event.clientX - event.target.offsetLeft);
                var mouseY = parseInt(event.clientY - event.target.offsetTop);
                var x = that.current_status.xPos;
                var y = that.current_status.yPos;
                var w = that.current_status.width;
                var h = that.current_status.height;
                if(that.isDragging){
                    that.current_status.xPos = mouseX - w/2;
                    that.current_status.yPos = mouseY - h/2;
                    that.draw();
                }
            });

            window.addEventListener('keydown',doKeyDown,true);
            function doKeyDown(evt){
                switch (evt.keyCode) {
                case 87:  /* w was pressed */
                console.log("up");
                that.current_status.yPos -= 5;
                that.draw();
                break;
                case 83:  /* s was pressed */
                console.log("down");
                that.current_status.yPos += 5;
                that.draw();
                break;
                case 65:  /* a was pressed */
                console.log("left");
                that.current_status.xPos -= 5;
                that.draw();
                break;
                case 68:  /* d was pressed */
                console.log("right");
                that.current_status.xPos += 5;
                that.draw();
                break;
                }
            }
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
            console.log("Executing functions!");
            for(ind = start; ind < (start+length); ind++){
                var command = this.commands_list[ind];
                this.executeCommand(ind, command);
            }
        },

        executeCommand: function(id, command){ 
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

                    case "repeatForever":
                        var that = this;
                        var timer = function(){
                            that.executeFunctions(id+1, command.para[0]);
                        };
                        setInterval(timer, 500);
                        break;

                    case "ifThen":
                        //parameters: obj containing a boolean expression, #of commands to be executed
                        var obj = command.para[0];
                        var n = command.para[1];
                        var that = this;
                        if(!isNaN(obj)&&(obj===0))
                            that.draw();
                        else{
                            //e.g {operator: "+", LHS:{}, RHS: 5}
                            var res = that.evaluateExpression(obj.operator,obj.LHS,obj.RHS);
                            if(res>0){
                                that.executeFunctions(id+1,n);
                            }else{
                                that.draw();
                            }
                        }
                        break;

                    case "ifElse":
                        //parameters: obj containing a boolean expression, $of commands in if, #of commands in else
                        var obj = command.para[0];
                        var n = command.para[1];
                        var that = this;
                        if(!isNaN(obj)&&(obj===0))
                            that.draw();
                        else{
                            //e.g {operator: "+", LHS:{}, RHS: 5}
                            var res = that.evaluateExpression(obj.operator,obj.LHS,obj.RHS);
                            if(res>0){
                                that.executeFunctions(id+1,n);
                            }else{
                                that.executeFunctions(id+n, command.para[2]);
                            }
                        }
                        break;

                    case "rotate":
                        //parameters: angle
                        this.clearCanvas();
                        this.ctx.rotate(command.para[0]*Math.PI/180);
                        this.draw();
                        break;

                    case "scale":
                        //parameters: x scale, y scale
                        this.clearCanvas();
                        this.drawBackground();
                        this.drawCharacterResize(command.para[0],command.para[1]);
                        break;
                    default:
                        console.log("invalid command, error in code somewhere");
                }
        },

        evaluateExpression: function(operator, LHS, RHS){
            var leftRes = 0;
            var rightRes = 0;
            var that = this;

            console.log(LHS);
            console.log(RHS);
            console.log(isNaN(LHS));
            console.log(isNaN(RHS));
            if(!isNaN(LHS)&&!isNaN(RHS)){
                leftRes = LHS;
                rightRes = RHS;
            }else if(isNaN(LHS)&&!isNaN(RHS)){
                leftRes = that.evaluateExpression(LHS.operator, LHS.LHS, LHS.RHS);
                rightRes = RHS;
            }else if(!isNaN(LHS)&&isNaN(RHS)){
                rightRes = that.evaluateExpression(RHS.operator, RHS.LHS, RHS.RHS);
                leftRes = LHS;
            }else{
                leftRes = that.evaluateExpression(LHS.operator, LHS.LHS, LHS.RHS);
                rightRes = that.evaluateExpression(RHS.operator, RHS.LHS, RHS.RHS);
            }

            switch(operator){
                case "<":
                if(leftRes<rightRes) return 1;
                case ">":
                if(leftRes>rightRes) return 1;
                case "=":
                if(leftRes===rightRes) return 1;
                case "+":
                return leftRes+rightRes;
                case "-":
                return leftRes-rightRes;
                case "*":
                return leftRes*rightRes;
                default:
                console.log("invalid expression");
            }
        },

        clearCanvas: function(){
            this.ctx.clearRect(0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);
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
                     that.ctx.drawImage(this.spriteImgs[this.costume],that.current_status.xPos, that.current_status.yPos, that.current_status.width, that.current_status.height); //character.width, character.height);     // draw costume if status isShown is true.
                 }     
        },

        drawCharacterResize: function(x, y){
            var that = this;
            var shown = this.current_status.isShown;
            if(that.current_status.isShown){
                     that.ctx.drawImage(this.spriteImgs[this.costume],that.current_status.xPos, that.current_status.yPos, x*80, y*150); //character.width, character.height);     // draw costume if status isShown is true.
                 }   
        },

        draw: function(){
            this.clearCanvas();
            this.drawBackground();
            this.drawCharacter();
        },
    });

})();
