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
__p += '<ul>\n\t<li>\n\t\t<img src="../../images/costume1.png">\n\t</li>\n\t<li>\n\t\t<img src="../../images/costume2.png">\n\t</li>\n</ul>\n\n';

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
'">\n</canvas>\n';

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
__p += '<ul class="list-group toolbar">\n\t<li class="toolbar-item toolbar-item-normal draggable command_set_x" id="command_set_x" >\n\t\tset to x\n\t\t<input type="text" name="value_set_to_x" value="10" class="number-input"></input>\n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable command_set_y" id="command_set_y" >\n\t\tset to y\n\t\t<input type="text" name="value_set_to_y" value="10" class="number-input"></input>\n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable command_show" id="command_show" >\n\t\tshow \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable command_hide" id="command_hide">\n\t\thide \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable command_move" id="command_move">\n\t\tmove\n\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\tsteps \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable command_change_costume" id="command_change_costume">\n\t\tchange constume \n\t</li>\n\t<li class="toolbar-item toolbar-item-normal draggable command_change_background" id="command_change_background">\n\t\tchange background\n\t</li>\n\t<li class="toolbar-item toolbar-item-control draggable command_repeat" id="command_repeat">\n\t\t<div class="block-control-top">\n\t\t\trepeat\n\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\ttimes\n\t\t</div>\n\t\t<ul>\n\t\t</ul>\n\t\t<div class="block-control-botm"></div>\n\t</li>\n</ul>';

}
return __p
};