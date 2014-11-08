this["JST"] = this["JST"] || {};

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
__p += '<ul class="nav nav-pills" role="tablist">\n    <li class="active"><a href="#motion-commands" role="tab" data-toggle="tab">Motion</a></li>\n    <li><a href="#control-commands" role="tab" data-toggle="tab">Control</a></li> \n    <li><a href="#look-commands" role="tab" data-toggle="tab">Looks</a></li>     \n    <li><a href="#operator-commands" role="tab" data-toggle="tab">Operators</a></li> \n    <li><a href="#variable-commands" role="tab" data-toggle="tab">Variables</a></li> \n</ul>\n<div class="tab-content" id="toolbar-pane">\n\t<div id="motion-commands" class="tab-pane active">\n\t<ul class="list-group toolbar">\n\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable  command_set_x" id="command_set_x" >\n\t\t\tset to x\n\t\t\t<input type="text" name="value_set_to_x" value="10" class="number-input droppable"></input>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_set_y" id="command_set_y" >\n\t\t\tset to y\n\t\t\t<input type="text" name="value_set_to_y" value="10" class="number-input"></input>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_move" id="command_move">\n\t\t\tmove\n\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\tsteps \n\t\t</li>\n\t</ul>\n\t</div>\n\t<div id="control-commands" class="tab-pane">\n\t<ul class="list-group toolbar">\n\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_repeat" id="command_repeat">\n\t\t\t<div class="block-control-top">\n\t\t\t\trepeat\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\ttimes\n\t\t\t</div>\n\t\t\t<ul>\n\t\t\t</ul>\n\t\t\t<div class="block-control-botm"></div>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_forever" id="command_forever">\n\t\t\t<div class="block-control-top">\n\t\t\t\tforever\n\t\t\t</div>\n\t\t\t<ul>\n\t\t\t</ul>\n\t\t\t<div class="block-control-botm"></div>\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_if" id="command_if">\n\t\t\t<div class="block-control-top">\n\t\t\t\tif\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\tthen\n\t\t\t</div>\n\t\t\t<ul>\n\t\t\t</ul>\n\t\t\t<div class="block-control-botm"></div>\n\t\t</li>\n\t</ul>\n\t</div>\n\t<div id="look-commands" class="tab-pane">\n\t<ul class="list-group toolbar">\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_change_costume" id="command_change_costume">\n\t\t\tchange constume \n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_change_background" id="command_change_background">\n\t\t\tchange background\n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_show" id="command_show" >\n\t\t\tshow \n\t\t</li>\n\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_hide" id="command_hide">\n\t\t\thide \n\t\t</li>\n\t</ul>\n\t</div>\n\t<div id="operator-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t+\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t-\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t*\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t/\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\tmod\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t&lt;\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t&gt;\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t&#61;&#61;\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-operator draggable_sortable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t\t&#61;\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input"></input>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="variable-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tx pos\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\ty pos\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tmouse pos x \n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tmouse pos y\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tcanvas left\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tcanvas right\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tcanvas top\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-variable draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tcanvas bottom\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>';

}
return __p
};