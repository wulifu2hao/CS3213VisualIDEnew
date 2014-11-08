/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Audio = Backbone.View.extend({

        template: JST['app/scripts/templates/audio.ejs'],

        tagName: 'div',

        el: '#audio_workspace',

        className: '',

        events: {},

        initialize: function () {
            var options = { 
                  target: '#uploader_iframe',
                  // beforeSubmit:  showRequest,
                  success:       function(data) { 
                    console.log(data);
                        alert('Thanks for your comment!'); 
                    } 
            }; 
            $('#audioUploadForm').ajaxForm(options); 

            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var sounds = this.model.sounds;
            var contents = "";
            for (var i = 0; i < sounds.length; i++) {
                var curEle = "<div><img src=\"images/audio.png\" alt=\"audio\" height=\"48\" width=\"48\"><p>"
                            +sounds[i]+
                            "</p></div>";
                contents+= curEle;
            };
            console.log(contents);
            // this.$el.html(contents);
            this.$el.html(this.template({sounds:sounds}));
        }

    });

})();
