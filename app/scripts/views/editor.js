/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Editor = Backbone.View.extend({

        template: JST['app/scripts/templates/editor.ejs'],

        el: '#editor_workspace',

        commandList: [],

        initialize: function () {
            window.addEventListener('input',function(e){
                $(e.target).attr("value",$(e.target).val());
            console.log("keyup event detected! coming from this element:", e.target);
            }, false);
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
                console.log("name");
                console.log(name);
                if (!name || name == "") {
                    var name = prompt("enter a name for your project");
                };
                that.saveToServer(name);
            });   
            $("#save-new-button").click(function(e){
                e.preventDefault();
                var name = prompt("enter a name for your project");
                if (name != null) {
                    that.saveToServer(name);
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
            this.model.variableString = $("#variable-commands").find(".toolbar").first().html();
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
                    case "command_wait":
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
                        repeatBlockIndex = repeatBlockIndex + 1;
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
                        console.log("editors:", first, second);
                        this.model.add(type,position,[first,second]);
                        break;
                    case "command_onclick":
                        var key = $(command).find("input").first().val();
                        var repeatBlock = repeatBlocks.get(repeatBlockIndex);
                        repeatBlockLength = $(repeatBlock).find("li").length;
                        repeatBlockIndex = repeatBlockIndex + 1;
                        this.model.add(type,position,[key, repeatBlockLength]);
                }
            }
        },

        getValuesOfCommand: function(command) {
            var input = $(command).find("input");
            var values = [];
            console.log(input, values);
            for (var i = 0; i < input.length; i++) {
                var el = input.get(i);
                var value = parseInt($(el).val());
                value = isNaN(value) ? 10 : value;
                if(!$(el).is(":visible")) {
                    if($(el).next().hasClass("toolbar-item-variable")) {
                        value = $(el).next().text().replace(/\s+/g, '');
                    } else if($(el).next().hasClass("toolbar-item-operator")) {
                        var vs = $(el).next().find("input");
                        var type = $(vs.get(1)).prev().text().replace(/\s+/g, '');
                        var v1 = parseInt($(vs.get(0)).val());
                        v1 = isNaN(v1) ? 10 : v1;
                        var v2 = parseInt($(vs.get(1)).val());
                        v2 = isNaN(v2) ? 10 : v2;
                        if(!$(vs.get(0)).is(":visible")) {
                            v1 = $(vs.get(0)).next().text().replace(/\s+/g, '');
                        }
                        if(!$(vs.get(1)).is(":visible")) {
                            v2 = $(vs.get(1)).next().text().replace(/\s+/g, '');
                        }
                        value = [type,v1,v2];
                    }
                }
                console.log(value);
                values.push(value);
            };
            return values;
        },

        loadFromServer: function(name){
            var name = name;
            var that = this;
            var url = '/api/programs/'+name;

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    console.log(data);
                    if (data.message == "success") {
                        that.model.setData(data.program.data);
                        that.model.name = data.program.name;
                        that.addCommandBlocksToWorkspace(that.model.commandString);
                        that.addVariablesToToolbar(that.model.variableString);
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

        addCommandBlocksToWorkspace: function(commandString) {
            $("#workspace-sortable").empty().append(commandString);
            // this.reEvaluateDraggable();
            var shouldDeleteCommand = false;
            $("#editor_workspace ul").sortable({
                connectWith: "#editor_workspace ul",
                placeholder: "ui-state-highlight",
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
                stop: function(event, ui) {
                    that.commandList = that.getCommandList();
                }
            });
            $(".variable-draggable-inlist").draggable({
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
            });
            $(".operator-draggable-inlist").draggable({
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
            });
        },

        addVariablesToToolbar: function(variableString) {
            $("#variable-commands").find(".toolbar").first().empty();
            $("#variable-commands").find(".toolbar").append(variableString);
            this.reEvaluateDraggable();
            var that = this;
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
        },

        saveToServer: function(name) {
            this.updateModel();
            var name = name;
            var that = this;
            this.model.setCommandString($("#workspace-sortable").html());
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
            }
            
            console.log("save to server");
            // this.model.save({name:'default'});
        }
    });

})();
