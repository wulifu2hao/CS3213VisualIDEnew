/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Editor = Backbone.View.extend({

        template: JST['app/scripts/templates/editor.ejs'],

        el: '#editor_workspace',

        commandList: [],

        initialize: function () {
            var that = this;
            $("#play_button").click(function(e){
                that.updateModel();       
            });
            this.render();
            //drag and drop handling
            var shouldDeleteCommand = false;
            $(".draggable_sortable").draggable({
                helper: "clone",
                connectToSortable: "#workspace-sortable",
                tolerance: "touch",
                cursor: "move",
                revert: "invalid",
                stop: function(event, ui) {
                    $("#editor_workspace li").removeClass("draggable ui-draggable ui-draggable-handle");
                    $("#editor_workspace ul").addClass("ui-sortable");
                    $("#editor_workspace ul").sortable({
                        connectWith: "#editor_workspace ul",
                        over: function(event,ui) {
                            shouldDeleteCommand = false;
                        },
                        out: function(event,ui) {
                            shouldDeleteCommand = true;
                        },
                        beforeStop: function(event,ui) {
                            if(shouldDeleteCommand) {
                                ui.item.remove();
                            }
                        },
                    });
                    $(".draggable").draggable({
                        helper: "clone",
                        cursor: "move",
                        revert: "invalid"
                    });
                    that.commandList = that.getCommandList();
                }
            });
            this.reEvaluateDraggable();
            $(".operator-draggable").draggable({
                helper: "clone",
                cursor: "move",
                revert: "invalid",
                start: function(event,ui) {
                    $(".assignment-droppable").droppable({
                        accept: ".operator-draggable",
                        hoverClass: "ui-state-hover",
                        drop: function(event,ui) {
                            console.log("drop");
                            $(this).after($(ui.draggable).clone(false).css({"display":"inline-block","margin-top":"0px"}).removeClass("draggable operator-draggable").addClass("operator-draggable-inlist").draggable({
                                cursor: "move",
                                revert: function(is_valid_drop) {
                                    var list_offset = $("#workspace-sortable").offset();
                                    var el_offset = $(this).offset();
                                    if((el_offset.left < list_offset.left-50)||(el_offset.top < list_offset.top-50)) {
                                        $(this).prev().show();
                                        $(this).remove();
                                        return false;
                                    }
                                    if(!is_valid_drop) {
                                        return true;
                                    }
                                    return false;
                                },
                                start: function(event, ui) {
                                    $(".assignment-droppable-inlist").droppable({
                                        accept: ".operator-draggable-inlist",
                                        hoverClass: "ui-state-hover",
                                        drop: function(event, ui) {
                                            $(ui.draggable).prev().show();
                                            $(this).after($(ui.draggable).css({"display":"inline-block","margin-top":"0px","position":"relative","top":"0px","left":"0px"}));
                                            $(this).hide();
                                        }
                                    });
                                }
                            }));
                            $(this).hide();
                        },
                        over: function(event,ui) {
                            console.log("over");
                        }
                    });
                }
            });
            $("#editor_workspace ul").sortable({
                placeholder: "ui-state-highlight",
                stop: function(event, ui) {
                    that.commandList = that.getCommandList();
                }
            });
            $("#create_new_var").click(function(){
                var toolbar = $("#variable-commands").find(".toolbar").first();
                var varname = prompt("Please enter a name: ");
                if(varname == null) {
                    return ;
                }
                varname = varname.replace(/\s+/g, '');
                while(!that.isUniqueVarName(varname)) {
                    varname = prompt("Naming conflict. Please enter another name: ");
                    if(varname == null) {
                        return ;
                    }
                    varname = varname.replace(/\s+/g, '');
                }
                $(toolbar).append("<div class='toolbar-item-variable variable-draggable command_var_"+varname+"' id='command_var_"+varname+"'>"+varname+"</div>");
                that.reEvaluateDraggable();
            });

            $("#save-button").click(function(e){
                e.preventDefault();
                var name = that.model.name;
                if (name || name == "") {
                    var name = prompt("enter a name for your project");
                };
                that.saveToServer(name);
            });   
            $("#save-new-button").click(function(e){
                e.preventDefault();
                var name = prompt("enter a name for your project");
                if (name != null) {
                    that.loadFromServer(name);
                }
            });  
            $("#seeAllProjects-button").click(function(e){
                e.preventDefault();
                that.loadNamesFromServer();
            });  


            this.loadProjects();

        },

        isUniqueVarName: function(varname) {
            var vars = [];
            $("#variable-commands").find(".toolbar").first().find("div").each(function(index,el){
                vars.push($(el).text().replace(/\s+/g, ''));
            });
            for(var i=0;i<vars.length;i++) {
                if(vars[i]==varname) {
                    return false;
                }
            }
            return true;
        },

        reEvaluateDraggable: function() {
            $(".variable-draggable").draggable({
                helper: "clone",
                cursor: "move",
                revert: "invalid",
                start: function(event,ui) {
                    $(".input-droppable").droppable({
                        accept: ".variable-draggable",
                        hoverClass: "ui-state-hover",
                        drop: function(event,ui) {
                            console.log("drop");
                            $(this).after($(ui.draggable).clone(false).css({"display":"inline-block","margin-top":"0px"}).removeClass("draggable variable-draggable").addClass("variable-draggable-inlist").draggable({
                                cursor: "move",
                                revert: function(is_valid_drop) {
                                    var list_offset = $("#workspace-sortable").offset();
                                    var el_offset = $(this).offset();
                                    if((el_offset.left < list_offset.left-50)||(el_offset.top < list_offset.top-50)) {
                                        $(this).prev().show();
                                        $(this).remove();
                                        return false;
                                    }
                                    if(!is_valid_drop) {
                                        return true;
                                    }
                                    return false;
                                },
                                start: function(event, ui) {
                                    $(".input-droppable-inlist").droppable({
                                        accept: ".variable-draggable-inlist",
                                        hoverClass: "ui-state-hover",
                                        drop: function(event, ui) {
                                            $(ui.draggable).prev().show();
                                            $(this).after($(ui.draggable).css({"display":"inline-block","margin-top":"0px","position":"relative","top":"0px","left":"0px"}));
                                            $(this).hide();
                                        }
                                    });
                                }
                            }));
                            $(this).hide();
                        }
                    });
                }
            });
        },

        loadProjects: function(){
            var url = '/api/programs';
            var that = this;
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                  // console.log("here!");
                    if (data.message == "success") {
                        var ul = document.getElementById('projectList');
                          if (ul) {
                            while (ul.firstChild) {
                              ul.removeChild(ul.firstChild);
                            }
                          }
                        for (var i = 0; i < data.names.length; i++) {
                            var item = "<li><a class=\"project-to-load\" id=\""+data.names[i]+"\">"+data.names[i]+"</a>"+"</li>";
                            $("#projectList").append(item);
                        };
                        var list = $(".project-to-load");
                        for (var i = 0; i < list.length; i++) {
                            var id = list[i].id;
                            console.log(document.getElementById(id));
                            document.getElementById(id).onclick = function(){
                                console.log("loading project" + this.id);
                                that.loadFromServer(this.id);
                            };
                        };
                    } 
                },
                error: function(err){

                }
            });
        },

        render: function () {
            this.$el.html(this.template());
        },

        getCommandList: function() {
            return $("#workspace-sortable li");
        },

        updateModel: function() {
            console.log("update model "+this.commandList.length);
            this.model.array_of_commands = [];
            console.log(this.commandList);
            var repeatBlockIndex = 0;
            var repeatBlocks = $("#workspace-sortable li").has("li");
            for(var i=0; i<this.commandList.length; i++) {
                var command = this.commandList[i];
                var type = $(command).attr('class').split(' ').pop();
                console.log("command passed in: ", type);
                var position = i;
                var repeatBlockLength = 0
                // var value = parseInt($(command).find("input").first().val());
                // if (type == "command_repeat") {
                //     var repeatBlock = repeatBlocks.get(repeatBlockIndex);
                //     repeatBlockLength = $(repeatBlock).find("li").length;
                //     value = parseInt($(repeatBlock).find("input").first().val());
                //     repeatBlockIndex = repeatBlockIndex + 1;
                // }
                switch (type) {
                    case "command_set_x":
                    case "command_set_y":
                    case "command_move":
                    case "command_rotate":
                        console.log("In switch");
                        var value = this.getValuesOfCommand(command)[0];
                        console.log(value);
                        this.model.add(type,position,[value]);
                        break;
                    case "command_scale":
                        var values = this.getValuesOfCommand(command);
                        var scale_x = values[0];
                        var scale_y = values[1];
                        this.model.add(type,position,[scale_x,scale_y]);
                        break;
                    case "command_repeat":
                    case "command_if":
                        var repeatBlock = repeatBlocks.get(repeatBlockIndex);
                        repeatBlockLength = $(repeatBlock).find("li").length;
                        var value = this.getValuesOfCommand(repeatBlock);
                        console.log("value:" ,value);
                        repeatBlockIndex = repeatBlockIndex + 1;
                        console.log("leng:", repeatBlockLength);
                        this.model.add(type,position,[value[0],repeatBlockLength]);
                        break;
                    case "command_forever":
                        var repeatBlock = repeatBlocks.get(repeatBlockIndex);
                        repeatBlockLength = $(repeatBlock).find("li").length;
                        this.model.add(type,position,[repeatBlockLength]);
                        break;
                    case "command_change_costume":
                    case "command_change_background":
                    case "command_show":
                    case "command_hide":
                        this.model.add(type,position,[]);
                        break;
                    case "command_op_plus":
                    case "command_op_minus":
                    case "command_op_multiply":
                    case "command_op_divide":
                    case "command_op_mod":
                    case "command_op_lessthan":
                    case "command_op_greaterthan":
                    case "command_op_equal":
                    case "command_assignment":
                        var values = this.getValuesOfCommand(command);
                        var first = values[0];
                        var second = values[1];
                        this.model.add(type,position,[first,second]);
                        break;
                    case "command_onclick":
                        var key = $(command).find("input").first().val();
                        var repeatBlock = repeatBlocks.get(repeatBlockIndex);
                        repeatBlockLength = $(repeatBlock).find("li").length;
                        this.model.add(type,position,[key, repeatBlockLength]);
                }
            }
        },

        getValuesOfCommand: function(command) {
            var input = $(command).find("input");
            var values = [];
            console.log(input, values);
            if (input.length>0) {
                for (var i = 0; i < input.length; i++) {
                    console.log("In loop");
                    console.log($(input.get(i)).val());
                    var value = parseInt($(input.get(i)).val());
                    value = isNaN(value) ? 10 : value;
                    console.log(value);
                    values.push(value);
                };
            } else {
                var vars = $(command).find("toolbar-item-variable");
                for (var i = 0; i < vars.length; i++) {
                    var value = vars[i].attr('class').split(' ').pop();
                    value = isNaN(value) ? 10 : value;
                    values.push(value);
                };
            }
            return values;
        },

        loadFromServer: function(name){
            var name = name;
            var that = this;
            var url = '/api/programs/'+name

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    console.log(data);
                    if (data.message == "success") {
                        that.model.setData(data.program.data);
                        that.model.name = data.name;
                        that.addCommandBlocksToWorkspace(that.model.array_of_commands);
                    } else{
                        alert ("fail to load the project with name '" + name + "'");
                    }
                    
                },
                error: function(err){
                    console.log(err);
                    alert ("fail to load the project with name '" + name + "'");
                 }
            });
        },

        loadNamesFromServer: function(){
            var that = this;
            var url = '/api/programs';

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    console.log(data);
                    if (data.message == "success") {
                        var message = "names of your project:\n";
                        for (var i = 0; i < data.names.length; i++) {
                            message += (data.names[i] + "\n")
                        };
                        alert (message);
                    } else{
                        alert (message);
                    }
                    
                },
                error: function(err){
                    console.log(err);
                    alert ("fail to load your project names");
                 }
            });
        },

        addCommandBlocksToWorkspace: function(array) {
            $("#workspace-sortable").empty();
            for (var i = 0; i < array.length; i++) {
                var command = array[i];
                var name = command.name;
                var params = command.para;
                var that = this;
                $("#workspace-sortable").append(that.createElement(name, params, []));
            };
        },

        createElement: function(name, params, subBlocks) {
            var element = null;
            switch (name) {
                case "setXPos":
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_set_x' id='command_set_x' >"+
                                    "set to x"+
                                    "<input type='text' name='value_set_to_x' value='"+params[0]+"' class='number-input'></input>"+
                                "</li>";
                break;
                case "setYPos": 
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_set_y' id='command_set_y' >"+
                                    "set to y"+
                                    "<input type='text' name='value_set_to_y' value='"+params[0]+"' class='number-input'></input>"+
                                "</li>";
                break;
                case "changeCostume":
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_change_costume' id='command_change_costume'>"+
                                    "change constume"+ 
                                "</li>";
                break;
                case "changeBackground":
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_change_background' id='command_change_background'>"+
                                    "change background"+
                                "</li>";
                break;
                case "hide":
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_hide' id='command_hide'>"+
                                    "hide"+ 
                                "</li>";
                break;
                case "show":
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_show' id='command_show'>"+
                                    "show"+ 
                                "</li>";
                break;
                case "move":
                    element = "<li class='toolbar-item toolbar-item-normal draggable command_move' id='command_move'>"+
                                    "move"+
                                    "<input type='text' name='value_move_steps' value='"+params[0]+"' class='number-input'></input>"+
                                    "steps"+ 
                                "</li>";
                break;
                case "repeat":
                    element = "<li class='toolbar-item toolbar-item-control draggable command_repeat' id='command_repeat'>"+
                                    "<div class='block-control-top'>"+
                                        "repeat"+
                                        "<input type='text' name='value_move_steps' value='"+params[0]+"' class='number-input'></input>"+
                                        "times"+
                                    "</div>"
                                    "<ul></ul>"+
                                    "<div class='block-control-botm'></div>"+
                                "</li>";
                break;
                default:
                console.log("Invalid command name.");
            }
            return element;
        },

        saveToServer: function(name) {
            this.updateModel();
            var name = name;
            var that = this;
            var data = this.model.getData();

            if (this.model.name == "") {
                // console.log("is post");
                $.ajax({
                    type: 'POST',
                    url: '/api/programs',
                    data: { name:name, data:data},
                    success: function(data) {
                        console.log(data);
                        if (data.message == "success") {
                            that.model.name = name;
                            alert("your project is successfully saved as '" + name + "'");
                        } else {
                            alert(data.message);
                        }
                    },
                    error: function(err){
                        console.log(err);
                        alert("your project is not saved");
                     }
                });
            } else {
                // console.log("is put");
                $.ajax({
                    type: 'PUT',
                    url: '/api/programs',
                    data: { name:name, data:data},
                    success: function(data) {
                        console.log(data);
                        if (data.message == "success") {
                            alert("your project is successfully saved as '" + name + "'");
                        } else {
                            alert(data.message);
                        }
                    },
                    error: function(err){
                        console.log(err);
                        alert("your project is not saved");
                     }
                });
            }
            
            console.log("save to server");
            // this.model.save({name:'default'});
        }
    });

})();
