this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/audio.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p +=
((__t = ( message )) == null ? '' : __t) +
'\n</br>\n';
 _.each(sounds, function(sound, index) { ;
__p += '\n\t';
 if (index%6 == 0) { ;
__p += '\n\t\t<div class="row">\n\t';
 } ;
__p += '\n\t<div class="span2">\n\t    <img src="images/audio.png" alt="audio" height="48" width="48">\n\t    ' +
((__t = ( sound )) == null ? '' : __t) +
'\n\t    <input type="image" src="images/delete_button.png" alt="delete" height="24" width="24" id="delete_' +
((__t = ( sound )) == null ? '' : __t) +
'" class="delete-audio-button">\n\n\t</div>\n\t';
 if (index%6 == 5) { ;
__p += '\n\t\t</div>\n\t';
 } ;
__p += '\n';
 }); ;
__p += '\n\n';

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
__p += '<ul id="workspace-sortable" class="workspace-list">\n</ul>\n';

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

this["JST"]["app/scripts/templates/toolbar.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="nav nav-pills" role="tablist">\n    <li class="active"><a href="#motion-commands" role="tab" data-toggle="tab">Motion</a></li>\n    <li><a href="#control-commands" role="tab" data-toggle="tab">Control</a></li> \n    <li><a href="#look-commands" role="tab" data-toggle="tab">Looks</a></li>     \n    <li><a href="#operator-commands" role="tab" data-toggle="tab">Operators</a></li> \n    <li><a href="#variable-commands" role="tab" data-toggle="tab">Variables</a></li> \n    <li><a href="#sound-commands" role="tab" data-toggle="tab">Sound</a></li> \n</ul>\n<div class="tab-content" id="toolbar-pane">\n\t<div id="motion-commands" class="tab-pane active">\n\t<ul class="list-group toolbar">\n\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable  command_set_x" id="command_set_x" >\n\t\t\t<div class="first-label">set to x</div>\n\t\t\t<input type="text" name="value_set_to_x" value="10" class="number-input droppable"></input>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_set_y" id="command_set_y" >\n\t\t\t<div class="first-label">set to y</div>\n\t\t\t<input type="text" name="value_set_to_y" value="10" class="number-input droppable"></input>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_move" id="command_move">\n\t\t\t<div class="first-label">move</div>\n\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t<div style="display:inline-block;" >steps</div> \n\t\t</li>\n\t</ul>\n\t</div>\n\t<div id="control-commands" class="tab-pane">\n\t<ul class="list-group toolbar">\n\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_repeat" id="command_repeat">\n\t\t\t<div class="block-control-top">\n\t\t\t\t<div class="first-label">repeat</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >times</div> \n\t\t\t</div>\n\t\t\t<ul>\n\t\t\t</ul>\n\t\t\t<div class="block-control-botm"></div>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_forever" id="command_forever">\n\t\t\t<div class="block-control-top">\n\t\t\t\tforever\n\t\t\t</div>\n\t\t\t<ul>\n\t\t\t</ul>\n\t\t\t<div class="block-control-botm"></div>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_if" id="command_if">\n\t\t\t<div class="block-control-top">\n\t\t\t\t<div class="first-label">if</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >then</div> \n\t\t\t</div>\n\t\t\t<ul>\n\t\t\t</ul>\n\t\t\t<div class="block-control-botm"></div>\n\t\t</li>\n\t</ul>\n\t</div>\n\t<div id="look-commands" class="tab-pane">\n\t<ul class="list-group toolbar">\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_change_costume" id="command_change_costume">\n\t\t\tchange constume \n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_change_background" id="command_change_background">\n\t\t\tchange background\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_show" id="command_show" >\n\t\t\tshow \n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_hide" id="command_hide">\n\t\t\thide \n\t\t</li>\n\t</ul>\n\t</div>\n\t<div id="operator-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >+</div> \n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >-</div> \n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >*</div> \n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >/</div> \n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >mod</div> \n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&lt;</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&gt;</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&#61;&#61;</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&#61;</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input droppable"></input>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="variable-commands" class="tab-pane">\n\t\t<div class="toolbar">\n\t\t\t<div class="toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tx pos\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_yPos" id="command_var_yPos">\n\t\t\t\ty pos\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_mouseX" id="command_var_mouseX">\n\t\t\t\tmouse x \n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_mouseY" id="command_var_mouseY">\n\t\t\t\tmouse y\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_left" id="command_var_left">\n\t\t\t\tleft\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_right" id="command_var_right">\n\t\t\t\tright\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_top" id="command_var_top">\n\t\t\t\ttop\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable draggable command_var_bottom" id="command_var_bottom">\n\t\t\t\tbottom\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- don\'t know how to do ! -->\n\t<div id="sound-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_playsound" id="command_playsound">\n\t\t\t\t<div class="first-label">Play sound</div>\n\t\t\t\t<select class="sound-select">\n\t\t\t\t  <!-- <option value="volvo">12345678901</option> -->\n\t\t\t\t  <!-- <option value="volvo">test</option> -->\n\t\t\t\t</select>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>';

}
return __p
};