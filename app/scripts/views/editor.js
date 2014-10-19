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
            $(".draggable").draggable({
                helper: "clone",
                connectToSortable: "#workspace-sortable",
                tolerance: "touch",
                stop: function(event, ui) {
                    var blockLength = $("#workspace-sortable").find("li").length;
                    if (blockLength > 0) {
                        $("#drag-a-command-alert").hide();
                        $(".workspace-list").css("margin-top","0px");
                    } else {
                        $("#drag-a-command-alert").show();
                        $(".workspace-list").css("margin-top","-40px");
                    }
                    $("#editor_workspace li").removeClass("draggable ui-draggable ui-draggable-handle");
                    $("#editor_workspace ul").addClass("ui-sortable");
                    $("#editor_workspace ul").sortable({
                        connectWith: "#editor_workspace ul"
                    });
                    that.commandList = that.getCommandList();
                }
            });
            $("#editor_workspace ul").sortable({
                stop: function(event, ui) {
                    that.commandList = that.getCommandList();
                }
            });

            $("#save-button").click(function(e){
                e.preventDefault();
                that.saveToServer();
            });   
            $("#load-button").click(function(e){
                e.preventDefault();
                that.loadFromServer();
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
                var position = i;
                var repeatBlockLength = 0
                var value = parseInt($(command).find("input").first().val());
                if (type == "command_repeat") {
                    var repeatBlock = repeatBlocks.get(repeatBlockIndex);
                    repeatBlockLength = $(repeatBlock).find("li").length;
                    value = parseInt($(repeatBlock).find("input").first().val());
                    repeatBlockIndex = repeatBlockIndex + 1;
                }
                console.log(value, repeatBlockLength);
                this.model.add(type, position, [value, repeatBlockLength]);
                console.log(this.model.array_of_commands);
            }
        },

        loadFromServer: function(){
            var name = "default";
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

                    }
                    
                },
                error: function(err){
                    console.log(err);
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

        saveToServer: function() {
            this.updateModel();
            var name = "default";
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
                        that.model.name = name;
                    },
                    error: function(err){
                        console.log(err);
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
                    },
                    error: function(err){
                        console.log(err);
                     }
                });
            }
            
            console.log("save to server");
            // this.model.save({name:'default'});
        }
    });

})();
