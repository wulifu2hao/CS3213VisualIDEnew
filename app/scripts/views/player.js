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
        events: [],
        variables: [],

        bgImgs: [],
        spriteImgs: [],
        isDragging: false,

        initialize: function () {
            var that = this;
            this.events = [];
            this.variables = [];
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
                        angle: this.model.spriteModel.get('angle'),
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

            // window.addEventListener('keydown',doKeyDown,true);
            // function doKeyDown(evt){
            //     switch (evt.keyCode) {
            //     case 87:  /* w was pressed */
            //     console.log("up");
            //     that.current_status.yPos -= 5;
            //     that.draw();
            //     break;
            //     case 83:  /* s was pressed */
            //     console.log("down");
            //     that.current_status.yPos += 5;
            //     that.draw();
            //     break;
            //     case 65:  /* a was pressed */
            //     console.log("left");
            //     that.current_status.xPos -= 5;
            //     that.draw();
            //     break;
            //     case 68:  /* d was pressed */
            //     console.log("right");
            //     that.current_status.xPos += 5;
            //     that.draw();
            //     break;
            //     }
            // }
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

            // this.commands_list[0].name = "event";
            // this.commands_list[0].para[0] = 'i';
            // this.commands_list[0].para[1] = 1;


            // this.commands_list[2].name = "event";
            // this.commands_list[2].para[0] = 'k';
            // this.commands_list[2].para[1] = 2;


            // this.commands_list[5].name = "event";
            // this.commands_list[5].para[0] = 'j';
            // this.commands_list[5].para[1] = 1;           // for testing purpose
            
            var ind = this.inspectEvents();
            this.prepareEvents();
            this.executeFunctions(ind, this.commands_list.length-ind);
        },

        inspectEvents: function(){
            var ind = 0;
            while (this.commands_list[ind].name == "event"){
                console.log(this.commands_list[ind].para[0]);
                var object = { key: this.commands_list[ind].para[0], start: ind+1, number: this.commands_list[ind].para[1] };
                this.events.push(object);
                console.log(this.events);
                ind = object.start + object.number;
                console.log(ind);
            }
            console.log("Im out");

            return ind; 
        },

        prepareEvents: function(){

            var ind;
            window.addEventListener('keydown',doKeyDown,true);
                var that = this;
            function doKeyDown(evt){
                
                // console.log(that.events);
                console.log("I pressed:");
                console.log(evt.key);
                // console.log(this.events);
                for (ind = 0; ind < that.events.length; ind++){
                    console.log(ind);
                    // console.log(that.events[ind].key);
                    if (evt.key == that.events[ind].key){
                        console.log("I matched");
                        that.executeFunctions(that.events[ind].start, that.events[ind].number);
                        break;
                    }
                    else{
                        console.log("I missed");
                    }
                }
            }
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
                        this.current_status.xPos = this.getValueOf(command.para[0]);
                        this.draw();
                        break;

                    case "setYPos":
                        this.current_status.yPos = this.getValueOf(command.para[0]);
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
                        while (step < this.getValueOf(command.para[0])){
                            // this.current_status.xPos += Math.cos()*this.current_status.angle;
                            // this.current_status.yPos += Math.sin()*this.current_status.angle;
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
                         if(i < this.getValueOf(command.para[0])) {
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
                        var condition = this.getValueOf(command.para[0]);
                        var that = this;
                        
                        if (condition){
                            that.executeFunctions(id+1,command.para[1]);
                        }
                        else{
                            that.draw();
                        }   
                        break;

                        // if(!isNaN(obj)&&(obj===0))
                        //     that.draw();
                        // else{
                        //     //e.g {operator: "+", LHS:{}, RHS: 5}
                        //     var res = that.evaluateExpression(obj.operator,obj.LHS,obj.RHS);
                        //     if(res>0){
                        //         that.executeFunctions(id+1,n);
                        //     }else{
                        //         that.draw();
                        //     }
                        // }
                        // break;

                    case "ifElse":
                        //parameters: obj containing a boolean expression, $of commands in if, #of commands in else
                        var condition = this.getValueOf(command.para[0]);
                        var that = this;
                        
                        if (condition){
                            that.executeFunctions(id+1,command.para[1]);
                        }
                        else{
                            that.executeFunctions(id+1+command.para[1], command.para[2]);
                        }
                        break;

                        // if(!isNaN(obj)&&(obj===0))
                        //     that.draw();
                        // else{
                        //     //e.g {operator: "+", LHS:{}, RHS: 5}
                        //     var res = that.evaluateExpression(obj.operator,obj.LHS,obj.RHS);
                        //     if(res>0){
                        //         that.executeFunctions(id+1,n);
                        //     }else{
                        //         that.executeFunctions(id+n, command.para[2]);
                        //     }
                        // }
                        // break;

                    case "rotate":
                        //parameters: angle
                        this.clearCanvas();
                        this.ctx.rotate(this.getValueOf(command.para[0])*Math.PI/180);
                        this.current_status.angle = this.getValueOf(command.para[0]）*Math.PI/180;
                        this.draw();
                        break;

                    case "scale":
                        //parameters: x scale, y scale
                        this.clearCanvas();
                        this.drawBackground();
                        this.drawCharacterResize(this.getValueOf(command.para[0]),this.getValueOf(command.para[1]));
                        break;

                    case "assignment":
                        // name: assignment, para[0]: variable name, para[1]: number/operation obj{operator, LHS, RHS}. style: "x = a+b"
                        // if style is "x = y" set operator as 0.  
                        var vari_name = command.para[0];
                        var vari_value;
                        if (!isNAN(command.para[1])){
                            vari_value = command.para[1];
                        }
                        else if(command.para[1].operator==0){
                            vari_value = this.getValueOf(command.para[1].LHS);
                        }
                        else{
                            vari_value = evaluateExpression(command.para[1].operator, command.para[1].LHS, command.para[1].RHS);
                        }
                        if (vari_value!=null){
                            var vari = {name: vari_name, value: vari_value};
                            this.variables.push(vari);
                        }
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
                // leftRes = that.evaluateExpression(LHS.operator, LHS.LHS, LHS.RHS);
                leftRes = that.getValueOf(LHS);
                rightRes = RHS;
            }else if(!isNaN(LHS)&&isNaN(RHS)){
                // rightRes = that.evaluateExpression(RHS.operator, RHS.LHS, RHS.RHS);
                rightRes = that.getValueOf(RHS);
                leftRes = LHS;
            }else{
                leftRes = that.getValueOf(LHS);
                rightRes = that.getValueOf(RHS);
                // leftRes = that.evaluateExpression(LHS.operator, LHS.LHS, LHS.RHS);
                // rightRes = that.evaluateExpression(RHS.operator, RHS.LHS, RHS.RHS);
            }

            if (leftRes== null || rightRes==null){
                return null;
            }
            switch(operator){
                case "<":
                    if(leftRes<rightRes) return 1;
                    else return 0;
                case ">":
                    if(leftRes>rightRes) return 1;
                    else return 0;
                case "==":
                    if(leftRes===rightRes) return 1;
                    else return 0;
                case ">=":
                    if(leftRes>=rightRes) return 1;
                    else return 0;
                case "<=":
                    if(leftRes<=rightRes) return 1;
                    else return 0;

                case "+":
                    return leftRes+rightRes;
                case "-":
                    return leftRes-rightRes;
                case "*":
                    return leftRes*rightRes;
                case "/":
                    return leftRes/rightRes;
                case "%":
                    return leftRes%rightRes;                
                default:
                console.log("invalid expression");
            }
            return null;
        },

        getValueOf: function(x){
            if (!isNAN(x)){
                return x;
            }
            switch (x){
                case "xPos": return this.current_status.xPos;
                case "yPos": return this.current_status.yPos;
                default:
            }
            for(var k in this.variables) {
                var v = this.variables[k];
                if (v.name == x){
                    return v.value;
                }
            }
            return null;
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
