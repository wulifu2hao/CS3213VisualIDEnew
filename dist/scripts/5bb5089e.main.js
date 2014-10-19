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

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/background.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img src="' +
((__t = ( src )) == null ? '' : __t) +
'">\n';

}
return __p
};

this["JST"]["app/scripts/templates/command.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/costumesPane.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\n\tcostumes here\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/editor.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h4><span class="label label-success" id="drag-a-command-alert">Drag a command here to start</span></h4>\n<ul id="workspace-sortable" class="workspace-list">\n</ul>\n';

}
return __p
};

this["JST"]["app/scripts/templates/player.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<canvas id="' +
((__t = ( id )) == null ? '' : __t) +
'" width="' +
((__t = ( width )) == null ? '' : __t) +
'" height="' +
((__t = ( height )) == null ? '' : __t) +
'">\n\n</canvas>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/sprite.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/toolbar.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="list-group toolbar">\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_set_x" >\n\t\tset to x\n\t\t<input type="text" name="value_set_to_x" value="10" class="number-input"></input>\n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_set_y" >\n\t\tset to y\n\t\t<input type="text" name="value_set_to_y" value="10" class="number-input"></input>\n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_show" >\n\t\tshow \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_hide">\n\t\thide \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_move">\n\t\tmove\n\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\tsteps \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_change_constume">\n\t\tchange constume \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable" id="command_change_background">\n\t\tchange background\n\t</li>\n\t<li class="toolbar-item toolbar-item-control draggable" id="command_repeat">\n\t\t<div class="block-control-top">\n\t\t\trepeat\n\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\ttimes\n\t\t</div>\n\t\t<ul>\n\t\t</ul>\n\t\t<div class="block-control-botm"></div>\n\t</li>\n</ul>';

}
return __p
};
/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Editor = Backbone.View.extend({

        template: JST['app/scripts/templates/editor.ejs'],

        el: '#editor_workspace',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();

/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            var w = this.$el.width();
            var h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width:w,height:h}));
        }

    });

})();

/*global Playground, Backbone*/

Playground.Collections = Playground.Collections || {};

(function () {
    'use strict';

    Playground.Collections.Sprites = Backbone.Collection.extend({

        model: Playground.Models.Sprites

    });

})();

/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Sprite = Backbone.Model.extend({

        url: '',
        costume: '',
        xPos: 0,
        yPos: 0,
        isShown: true,
        var array_of_functions = [],

        commands: {},

        initialize: function() {
        },

        defaults: {
            xPos = 0;
            yPos = 0;
            isShown = true;
            costume = 'defaultLink';
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }

        add: function(index, position, parameters){
           switch(index){
                case 0:
                array_of_functions.splice(position,0,setXPos(parameters[0]));
                break;
                case 1:
                array_of_functions.splice(position,0,setYPos(parameters[0]));
                break;
                case 2:
                array_of_functions.splice(position, 0, changeCostume(parameters[0]));
                break;
           }
        }

        deleteCommand: function(position){

        }

        setXPos: function(xPosition){
            xPos = xPosition;
             var obj = {xPos: xPos, yPos: yPos, isShown: isShown, costume: costume};
            return obj;
        }

        setYPos: function(yPosition){
            yPos = yPosition;
            var obj = {xPos: xPos, yPos: yPos, isShown: isShown, costume: costume};
            return obj;
        }

        changeCostume: function(link){
            costume = link;
            var obj = {xPos: xPos, yPos: yPos, isShown: isShown, costume: costume};
            return obj;
        }


    });

})();

/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Sprite = Backbone.View.extend({

        template: JST['app/scripts/templates/sprite.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();

/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Background = Backbone.View.extend({

        template: JST['app/scripts/templates/background.ejs'],

        events: {},

        initialize: function () {
            this.render();
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html("<img src='images/commandBG.png'>");
            //this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();

/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Command = Backbone.View.extend({

        template: JST['app/scripts/templates/command.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();

/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Toolbar = Backbone.View.extend({

        template: JST['app/scripts/templates/toolbar.ejs'],

        el: '#editor_toolbar',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();

/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Costumespane = Backbone.View.extend({

        template: JST['app/scripts/templates/costumesPane.ejs'],

        el: "#costumes-pane",

        events: {},

        initialize: function () {
            this.render();
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
