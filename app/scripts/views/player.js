/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',
        
        current_status : [],                  // draw this status in current frame
        func_name : '',                       // current function executing
        commands_list : [],                   // list of functions need to be executed
        index : 0,                              
        ctx : null,
        w : null,
        h : null,
        costume: 0,
        events: [],
        variables: [],
        executionFlags: [],

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
            
            for (var n=0; n<this.model.spriteModel.length; n++){
                console.log("length: ", this.model.spriteModel.length);
                this.current_status[n] = {              // init status
                        xPos: this.model.spriteModel[n].get('xPos'),
                        yPos: this.model.spriteModel[n].get('yPos'),
                        angle: this.model.spriteModel[n].get('angle'),
                        isShown: this.model.spriteModel[n].get('isShown'), 
                        costumes: this.model.spriteModel[n].get('costumes'),
                        width : this.model.spriteModel[n].get('width'),
                        height: this.model.spriteModel[n].get('height'),
                };
                this.commands_list[n] = [];
                this.events[n] = [];
                this.spriteImgs[n] = [];
                this.executionFlags.push(n);
            };
            this.render();   
            this.loadImgs();
            this.draw();

            $('#player_canvas').mousedown(function(event){
                // console.log("mousedown");
                var mouseX = parseInt(event.clientX - event.target.offsetLeft);
                var mouseY = parseInt(event.clientY - event.target.offsetTop);
                var x = that.current_status[0].xPos;
                var y = that.current_status[0].yPos;
                var w = that.current_status[0].width;
                var h = that.current_status[0].height;
                if((mouseX > (x )) && (mouseX < (x + w)) && (mouseY > (y )) && (mouseY < (y+h))){
                    that.isDragging = true;
                }
            });

            $( ".canvas-droppable" ).droppable({
                drop: function( event, ui ) {
                    console.log("dropped!");
                },
            });
            
            $('#player_canvas').mouseup(function(){
                // console.log("mouseup");
                that.isDragging = false;
            });
            
            $('#player_canvas').mousemove(function(event){
                var mouseX = parseInt(event.clientX - event.target.offsetLeft);
                var mouseY = parseInt(event.clientY - event.target.offsetTop);
                var x = that.current_status[0].xPos;
                var y = that.current_status[0].yPos;
                var w = that.current_status[0].width;
                var h = that.current_status[0].height;
                if(that.isDragging){
                    that.current_status[0].xPos = mouseX - w/2;
                    that.current_status[0].yPos = mouseY - h/2;
                    that.draw();
                }
            });

            $('#sprite-upload-button').click(function(e){
                console.log("draw!");
                that.draw();
            });

            // window.addEventListener('keydown',doKeyDown,true);
            // function doKeyDown(evt){
            //     switch (evt.keyCode) {
            //     case 87:  /* w was pressed */
            //     console.log("up");
            //     that.current_status[0].yPos -= 5;
            //     that.draw();
            //     break;
            //     case 83:  /* s was pressed */
            //     console.log("down");
            //     that.current_status[0].yPos += 5;
            //     that.draw();
            //     break;
            //     case 65:  /* a was pressed */
            //     console.log("left");
            //     that.current_status[0].xPos -= 5;
            //     that.draw();
            //     break;
            //     case 68:  /* d was pressed */
            //     console.log("right");
            //     that.current_status[0].xPos += 5;
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
            this.events[0] = [];
            this.variables = [];
            console.log("Player view: play button clicked!");
            var ind = [];
            for (var n = 0; n < this.model.spriteModel.length; n++){
                this.commands_list[n] = this.model.spriteModel[n].array_of_commands;
                console.log("command list:", this.commands_list[n]);
                ind[n] = this.inspectEvents(n);
                console.log("return:", ind[n]);
            }
            // console.log("XF says: ", this.commands_list[0]);
            // this.commands_list[0][0].name = "ifThen";
            // this.commands_list[0][0].para[0] = 0;
            // this.commands_list[0][0].para[1] = 2;


            // this.commands_list[0][2].name = "event";
            // this.commands_list[0][2].para[0] = 'k';
            // this.commands_list[0][2].para[1] = 2;


            // this.commands_list[0][5].name = "event";
            // this.commands_list[0][5].para[0] = 'j';
            // this.commands_list[0][5].para[1] = 1;           // for testing purpose
            
            this.prepareEvents();
            
            var that = this;
            
            for (var n = 0; n < this.model.spriteModel.length; n++){
                console.log("ready for exe...", n, ind[n]);
                // Thread.create(that.executeSprite, n, ind[n]);
                that.executeSprite(n, ind[n]);
            }
        },

        executeSprite: function(n, m){
            console.log("Im executing!", n, m, this.commands_list[n].length-m);
            this.executeFunctions(n, m, this.commands_list[n].length-m);
        
        },

        inspectEvents: function(x){
            console.log("inspect event...");
            var ind = 0;
            while (this.commands_list[x][ind]!= null && this.commands_list[x][ind].name == "event"){
                console.log(this.commands_list[x][ind].para[0]);
                var object = { key: this.commands_list[x][ind].para[0], start: ind+1, number: this.commands_list[x][ind].para[1] };
                this.events[x].push(object);
                console.log("event in:", this.events[x]);
                ind = object.start + object.number;
                console.log("analyze: ", ind);
            }
            console.log("Im out at: ", ind);

            return ind; 
        },

        prepareEvents: function(){
            console.log("preparing events...");
            var ind, n;
            window.addEventListener('keydown',doKeyDown,true);
                var that = this;
            console.log(this.events);
            function doKeyDown(evt){
                
                // console.log(that.events);
                console.log("I pressed:" ,evt.key);
                // console.log(evt.key);
                // console.log(this.events);
                for (n = 0; n < that.events.length; n++){
                    for (ind = 0; ind < that.events[n].length; ind++){

                        // console.log("command index: ", ind);
                        // console.log(that.events[ind].key);
                        if (evt.key == that.events[n][ind].key){
                            console.log("I matched at index: ", ind);
                            that.executeFunctions(n, that.events[n][ind].start, that.events[n][ind].number);
                            break;
                        }
                        else{
                            console.log("I missed");
                        }
                    }
                }
            }
        },
    
        executeFunctions: function(x, start, length){
            var ind;
            console.log("Executing functions! from, length: ", start, length);
            for(ind = start; ind < (start+length); ind++){
                var command = this.commands_list[x][ind];
                console.log("executing cmd: " , ind, command.name, command);
                if (command.name === "ifThen"){
                        //parameters: obj containing a boolean expression, #of commands to be executed
                        var condition = this.getValueOf(command.para[0]);
                        var that = this;
                        
                        if (condition){
                            console.log("True! I come to ", ind+1);
                            continue;
                            // that.executeFunctions(id+1,command.para[1]);
                        }
                        else{
                            if (ind+1+command.para[1] < that.commands_list[x].length){
                                console.log("XF says: Some more! I come to", ind+1+command.para[1]);
                                ind+= command.para[1];
                                continue;
                                
                            console.log("False! I jump to", ind);
                                // that.executeFunctions(ind+1+command.para[1], that.commands_list[0].length-(ind+1+command.para[1]));        
                            }
                            else{
                                console.log("XF says: No more at ", ind);
                                that.draw();
                                break;
                            }
                        }   
                }
                
                this.executeCommand(x, ind);
            }
        },

        executeCommand: function(x, id){
            var command = this.commands_list[x][id]; 
            console.log("exe single cmd: ", id, command.name, command.para);
             switch(command.name){
                    
                    case "setXPos":                  
                        this.current_status[x].xPos = this.getValueOf(command.para[0]);
                        console.log(this.current_status[x]);
                        this.draw();
                        break;

                    case "setYPos":
                        this.current_status[x].yPos = this.getValueOf(command.para[0]);
                        this.draw();
                        break;

                    case "show":
                        this.current_status[x].isShown = true;
                        this.draw();
                        break;

                    case "hide":
                        this.current_status[x].isShown = false;
                        this.draw();
                        break;

                    case "move":
                        //move in current facing direction
                        var step = 0;
                        console.log(this.getValueOf(command.para[0]));
                        if (this.getValueOf(command.para[0])>0){
                        while (step < this.getValueOf(command.para[0])){
                            this.current_status[x].xPos += Math.cos(this.current_status[x].angle);
                            this.current_status[x].yPos += Math.sin(this.current_status[x].angle);
                            // this.current_status[x].xPos++;
                            // console.log("current pos", this.current_status[x].xPos);
                            this.draw();
                            step++;
                        }
                        }
                        if (this.getValueOf(command.para[0])<0){
                        while (step > this.getValueOf(command.para[0])){
                            this.current_status[x].xPos -= Math.cos(this.current_status[x].angle);
                            this.current_status[x].yPos -= Math.sin(this.current_status[x].angle);
                            // this.current_status[x].xPos++;
                            // console.log("current pos", this.current_status[x].xPos);
                            this.draw();
                            step--;
                        }
                        }
                        break;

                    case "changeCostume":
                        if(this.costume<(this.current_status[x].costumes.length-1)){
                            console.log("costume change to next");
                            this.costume ++;
                        }
                        else if(this.costume===(this.current_status[x].costumes.length-1)){
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
                         if(i < that.getValueOf(command.para[0])) {
                              i++;
                              that.executeFunctions(x, id+1, command.para[1]);
                         } else {
                              clearInterval(timer);
                         }
                        };
                        setInterval(timer, 500);                   
                        break;

                    case "repeatForever":
                        console.log("n lines:", command.para[0]);
                        var that = this;
                        var timer = function(){
                            that.executeFunctions(x, id+1, command.para[0]);
                        };
                        setInterval(timer, 500);
                        break;

                    case "rotate":
                        //parameters: angle
                        this.clearCanvas();
                        this.ctx.rotate(this.getValueOf(command.para[0])*Math.PI/180);
                        this.current_status[x].angle = this.getValueOf(command.para[0])*Math.PI/180;
                        this.draw();
                        break;

                    case "scale":
                        //parameters: x scale, y scale
                        this.clearCanvas();
                        this.drawBackground();  
                        console.log("start to draw character", command.para[0], command.para[1]);        
                        this.drawCharacterResize(x, this.getValueOf(command.para[0]),this.getValueOf(command.para[1]));
                        break;

					case "playsound":
                        console.log("play sound");
                        // console.log("command.para[0]");
                        if (soundManager) {
                            console.log("play sound!!!");
                            soundManager.play(command.para[0]);
                        };
                        break;

                    case "stopsound":
                        console.log("stopsound");
                        // console.log("command.para[0]");
                        if (soundManager) {
                            soundManager.stop(command.para[0]);
                        };
                        break;

                    case "assignment":
                        // name: assignment, para[0]: variable name, para[1]: number/operation obj{operator, LHS, RHS}. style: "x = a+b"
                        // if style is "x = y" set operator as 0. 
                        //if it is random number, para[1]: obj{operator, lowerBound, upperBound}, operator is ran,
                        var vari_name = command.para[0];
                        console.log("assignment: ", command.para[0],command.para[1]);
                        var vari_value;
                        if (!isNaN(command.para[1])){
                            vari_value = command.para[1];
                            console.log("value is number: ", vari_value)
                        }
                        else{
                            var flag = 0;
                            for (var j=0; j<this.variables.length; j++){
                                if (this.variables[j].name == vari_value){
                                    vari_value = this.variables[j].value;
                                    console.log("value is parameter: ", vari_value);
                                    break;
                                }
                            }

                            if (vari_value == "xpos"){
                                flag = 1;
                                vari_value = this.current_status[x].xPos;   
                                console.log("value is xpos: ", vari_value);
                            }
                            if (vari_value == "ypos"){
                                flag = 1;
                                vari_value = this.current_status[x].yPos; 
                                console.log("value is ypos: ", vari_value);  
                            }
                            if (command.para[1][0]=="to"){
                                flag = 1;
                                vari_value = this.random(command.para[1][1],command.para[1][2]);
                                console.log("value is randomed: ", vari_value);
                            }
                            if (!flag){
                                vari_value = this.evaluateExpression(command.para);
                                flag = 1;
                                console.log("value is expression: ", vari_value);
                            }
                        }
                            var vari = {name: vari_name, value: vari_value};
                            var updated = 0;
                            for (var j=0; j<this.variables.length; j++){
                                if (this.variables[j].name == vari.name){
                                    this.variables[j].value = vari.value;
                                    console.log("update existing para: ", vari_name, vari_value);
                                    updated = 1;
                                }   
                            }
                            if (!updated){
                                console.log("create new para: ", vari_name, vari_value);
                                this.variables.push(vari);
                            }
                        break;

                    default:
                        console.log("invalid command, error in code somewhere", command);
                }
        },

        random : function(x,y){
            return Math.floor((Math.random() * y) + x); 
        },

        evaluateExpression: function(arr){
            var leftRes = 0;
            var rightRes = 0;
            var that = this;

            console.log("expressing operation:", arr[1][1], arr[1][0], arr[1][2]);
            // console.log(arr[1][2]);
       
                leftRes = that.getValueOf(arr[1][1]);
                rightRes = that.getValueOf(arr[1][2]);
                // leftRes = that.evaluateExpression(LHS.operator, LHS.LHS, LHS.RHS);
                // rightRes = that.evaluateExpression(RHS.operator, RHS.LHS, RHS.RHS);
            

            if (leftRes== null || rightRes==null){
                return null;
            }
            switch(arr[1][0]){
                case "<":
                    if(leftRes<rightRes) return 1;
                    else return 0;
                case ">":
                    if(leftRes>rightRes) return 1;
                    else return 0;
                case "=":
                    if(leftRes===rightRes) return 1;
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
            console.log("getting value of: ", x);
            if (!isNaN(x)){
                return x;
            }
            switch (x){
                case "xpos": console.log("value is xpos: ", this.current_status[0].xPos); return this.current_status[0].xPos;
                case "ypos": console.log("value is ypos: ", this.current_status[0].yPos); return this.current_status[0].yPos;
                default:
            }
            for (var j=0; j<this.variables.length; j++){
                if (this.variables[j].name == x){
                    console.log("value is para: ", this.variables[j].value);
                return this.variables[j].value;
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

            for (var n=0; n<this.model.spriteModel.length; n++){
                i=0;
                while(i<this.current_status[n].costumes.length){
                    this.spriteImgs[n][i] = new Image();
                    this.spriteImgs[n][i].onload = function(){
                        console.log("load sprites imgs");
                    }
                    this.spriteImgs[n][i].src = this.current_status[0].costumes[i];
                    i++;
                }
            }
        },

        drawBackground: function(){
            this.ctx.drawImage(this.bgImgs[this.model.bgModel.imgIndex], 0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height); 
        },

        drawCharacter: function(n){
            var that = this;
            var shown = this.current_status[n].isShown;
            console.log("I draw: " , that.current_status[n].xPos, that.current_status[n].yPos);
            if(that.current_status[n].isShown){
                     that.ctx.drawImage(this.spriteImgs[n][this.costume],that.current_status[n].xPos, that.current_status[n].yPos, that.current_status[n].width, that.current_status[n].height); //character.width, character.height);     // draw costume if status isShown is true.
                 }     
        },

        drawCharacterResize: function(n, x, y){
            var that = this;
            console.log(this.current_status[n].isShown);
            if(that.current_status[n].isShown){
                console.log(this.spriteImgs[n][this.costume], x, y);
                that.ctx.drawImage(this.spriteImgs[n][this.costume],that.current_status[n].xPos, that.current_status[n].yPos, x*(that.current_status[n].width), y*(that.current_status[n].height)); //character.width, character.height);     // draw costume if status isShown is true.
                that.current_status[n].width*= x;
                that.current_status[n].height*= y;
            }   
        },

        draw: function(){
            this.clearCanvas();
            this.drawBackground();
            for (var n=0; n<this.model.spriteModel.length; n++){ 
                this.drawCharacter(n);
            }
        },
    });

})();
