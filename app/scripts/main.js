/*global Playground, $*/


window.Playground = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var sprite = new this.Models.Sprite();
        var bg = new this.Models.Background();
        var audio = new this.Models.Audio();
        var project = new this.Models.Project();
        project.spriteModel = sprite;
        project.bgModel = bg;
        project.audioModel = audio;
        // console.log(this.Views);

        new this.Views.Toolbar();
        new this.Views.Editor({model: sprite});
        new this.Views.Player({model: project});
        new this.Views.Costumespane({model: sprite});
        new this.Views.Audio({model: audio});

        
    }
};

    

    



$(document).ready(function () {
    'use strict';

    Playground.init();
    Backbone.history.start();  

    // init the programs to load, haven't finish
    var url = '/api/programs';
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            if (data.message == "success") {
                var ul = document.getElementById('projectList');
                  if (ul) {
                    while (ul.firstChild) {
                      ul.removeChild(ul.firstChild);
                    }
                  }
                for (var i = 0; i < data.names.length; i++) {
                    var item = "<li><a href=\"\">"+data.names[i]+"</a></li>";
                    $("#projectList").append(item);
                };
            } 
        },
        error: function(err){

        }
    });
});
