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
            this.render();
            this.listenTo(this.model, 'change', this.render);
            var that = this;
            var options = { 
                  target: '#uploader_iframe',
                  // beforeSubmit:  showRequest,
                  success: function(data) { 
                    if (data.message == "success") {
                        var name = data.name;
                        that.model.sounds.push(name);

                        var audioUrl = './bower_components/soundmanager2/demo/_mp3/' + name;

                        soundManager.createSound({
                          id: name,
                          url: audioUrl,
                          autoLoad: true,
                          autoPlay: false,
                          onload: function() {
                            // alert('The sound '+this.id+' loaded!');
                          },
                          volume: 50
                        });

                    } else {
                        alert(data.message);
                    }
                  } 
            }; 
            $('#audioUploadForm').ajaxForm(options);
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
