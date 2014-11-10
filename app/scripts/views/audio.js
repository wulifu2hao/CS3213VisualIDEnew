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
            var that = this;
            soundManager.setup({
                url: './bower_components/soundmanager2/swf/',
                flashVersion: 9, // optional: shiny features (default = 8)
                // optional: ignore Flash where possible, use 100% HTML5 mode
                preferFlash: false,
                onready: function() {
                  var url = '/api/audios';
                  $.ajax({
                      type: 'GET',
                      url: url,
                      success: function(data) {
                          if (data.message == "success") {
                            var id = data.googleId;
                            for (var i = 0; i < data.audios.length; i++) {
                              var name = data.audios[i].name;
                              var shortName = name;

                              if (name.length > 10) {
                                  shortName = name.substring(0,7)+"...";
                              };

                              that.model.sounds.push(name);
                              that.render();

                              for (var j = 0; j < $(".sound-select").length; j++) {
                                  var x = $(".sound-select")[j];
                                  var option = document.createElement("option");
                                  option.value = name;
                                  option.text = shortName;
                                  x.add(option);
                              };
                              // that.model.sounds.push(name);
                              var audioUrl = './audioUploaded/' + id + "/" + name;
                              console.log(audioUrl);

                              soundManager.createSound({
                                id: name,
                                url: audioUrl,
                                autoLoad: true,
                                autoPlay: false,
                                onload: function() {
                                    
                                },
                                onfinish: function(e){
                                    console.log(e);
                                },
                                volume: 50
                              });
                            };
                          } else {
                            console.log(data.message);
                          }
                      },
                      error: function(err){
                        console.log(err);
                      }
                  });
                }
            });

            this.render();
            // this.listenTo(this.model, 'change', this.render);
            // this.on( "change:sounds", this.render, this);
            // this.model.on('change', this.render, this);
            var that = this;
            var options = { 
                  target: '#uploader_iframe',
                  beforeSubmit:  function(){
                    that.render("uploading...");
                    $('#audioUploadButton').attr('disabled','disabled');
                  },
                  success: function(data) { 
                    $('#audioUploadButton').removeAttr('disabled');
                    if (data.message == "success") {
                        var id = data.googleId;
                        var name = data.name;
                        that.model.sounds.push(name);
                        that.render("upload successfully");

                        var audioUrl = './audioUploaded/' + id + "/" + name;

                        soundManager.createSound({
                          id: name,
                          url: audioUrl,
                          autoLoad: true,
                          autoPlay: false,
                          onload: function() {
                            var shortName = name;
                            if (name.length > 10) {
                                shortName = name.substring(0,7)+"...";
                            };
                            for (var i = 0; i < $(".sound-select").length; i++) {
                                var x = $(".sound-select")[i];
                                var option = document.createElement("option");
                                option.value = name;
                                option.text = shortName;
                                x.add(option);
                            };
                          },
                          volume: 50
                        });

                    } else {
                        that.render(data.message);
                    }
                  } , 
                error: function(err){
                    $('#audioUploadButton').removeAttr('disabled');
                    that.render("error");
                    alert(err);
                }
            }; 
            $('#audioUploadForm').ajaxForm(options);
        },

        render: function (message) {
            var sounds = this.model.sounds;
            var contents = "";
            var that = this;
            // var message = "";
            // contents+=message;

            // for (var i = 0; i < sounds.length; i++) {
            //     var curEle = "<div><img src=\"images/audio.png\" alt=\"audio\" height=\"48\" width=\"48\">"
            //                 +sounds[i]+
            //                 "</div>";

            //     contents+= curEle;
            // };
            // console.log(contents);
            // this.$el.html(contents);
            this.$el.html(this.template({message:message, sounds:sounds}));
            var list = $(".delete-audio-button");
            for (var i = 0; i < list.length; i++) {
                // console.log(list[i]);
                
                // console.log(document.getElementById(id));
                list[i].onclick = function(){
                    var id = this.value;
                    var url = '/api/audios/'+id;
                    that.render("deleting..." + id);

                    $.ajax({
                        type: 'DELETE',
                        url: url,
                        success: function(data) {
                            console.log(data);
                            if (data.message == "success") {
                                var index = that.model.sounds.indexOf(id);
                                console.log(id);
                                console.log(that.model.sounds);
                                console.log(index);
                                if (index != -1) {
                                    that.model.sounds.splice(index, 1);
                                }
                                for (var i = 0; i < $(".sound-select").length; i++) {
                                    var x = $(".sound-select")[i];
                                    for (var j = 0; j < x.length; j++) {
                                        if (x[j].value == id) {
                                            x.remove(x[j]);
                                            break;
                                        };
                                    };
                                };
                                that.render("sucecssfully deleted");
                            } else{
                                that.render(data.message);
                            }
                            
                        },
                        error: function(err){
                            console.log(err);
                            this.render("fail to delete audio");
                         }
                    });
                };
            };
        }, 
        deleteAudio: function(name){
            console.log("testing");
            alert("testing");
        }

    });

})();
