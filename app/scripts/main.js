/*global Playground, $*/


window.Playground = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        new this.Views.Player();
        new this.Views.Toolbar();
        new this.Views.Editor();
        new this.Views.Costumespane();

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
            }
        });
    }
};

$(document).ready(function () {
    'use strict';
    Playground.init();
    Backbone.history.start();
});
