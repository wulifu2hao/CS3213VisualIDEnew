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
                    var controlBlocks = $("#workspace-sortable li").has("li");
                    var subBlocks = controlBlocks.find("li");
                    var height = 97;
                    if (subBlocks.length>1) {
                        height =  97 + (subBlocks.length-1)*33;
                    }
                    that.commandList = that.getCommandList();
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
            for(var i=0; i<this.commandList.length; i++) {
                var command = this.commandList[i];
                var type = $(command).attr('class').split(' ').pop();
                var position = i;
                var repeatBlockLength = $("#workspace-sortable li").has("li").find("li").length;
                var value = parseInt($(command).find("input").last().val());
                console.log(value, repeatBlockLength);
                this.model.add(type, position, [value, repeatBlockLength]);
                console.log(this.model.array_of_commands);
            }
        }
    });

})();
