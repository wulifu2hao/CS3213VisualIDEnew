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
__p += '<ul class="nav nav-pills" role="tablist">\n    <li class="active"><a href="#motion-commands" role="tab" data-toggle="tab">Motion</a></li>\n    <li><a href="#control-commands" role="tab" data-toggle="tab">Control</a></li> \n    <li><a href="#look-commands" role="tab" data-toggle="tab">Looks</a></li>     \n    <li><a href="#operator-commands" role="tab" data-toggle="tab">Operators</a></li> \n    <li><a href="#variable-commands" role="tab" data-toggle="tab">Variables</a></li>\n    <li><a href="#assignment-commands" role="tab" data-toggle="tab">Assignment</a></li> \n    <li><a href="#event-commands" role="tab" data-toggle="tab">Event</a></li>  \n</ul>\n<div class="tab-content" id="toolbar-pane">\n\t<div id="motion-commands" class="tab-pane active">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable  command_set_x" id="command_set_x" >\n\t\t\t\t<div class="first-label">set to x</div>\n\t\t\t\t<input type="text" name="value_set_to_x" value="10" class="number-input input-droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_set_y" id="command_set_y" >\n\t\t\t\t<div class="first-label">set to y</div>\n\t\t\t\t<input type="text" name="value_set_to_y" value="10" class="number-input input-droppable"></input>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_move" id="command_move">\n\t\t\t\t<div class="first-label">move</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >steps</div> \n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_move" id="command_move">\n\t\t\t\t<div class="first-label">rotate</div>\n\t\t\t\t<input type="text" name="value_rotate" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >degrees</div> \n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-motion draggable_sortable command_move" id="command_move">\n\t\t\t\t<div class="first-label">scale x</div>\n\t\t\t\t<input type="text" name="value_scale_x" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div class="first-label">, y</div>\n\t\t\t\t<input type="text" name="value_scale_y" value="10" class="number-input input-droppable"></input>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="control-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_repeat" id="command_repeat">\n\t\t\t\t<div class="block-control-top">\n\t\t\t\t\t<div class="first-label">repeat</div>\n\t\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input input-droppable"></input>\n\t\t\t\t\t<div style="display:inline-block;" >times</div> \n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-control-botm"></div>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_forever" id="command_forever">\n\t\t\t\t<div class="block-control-top">\n\t\t\t\t\tforever\n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-control-botm"></div>\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-control draggable_sortable command_if" id="command_if">\n\t\t\t\t<div class="block-control-top">\n\t\t\t\t\t<div class="first-label">if</div>\n\t\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input input-droppable"></input>\n\t\t\t\t\t<div style="display:inline-block;" >then</div> \n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-control-botm"></div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="look-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_change_costume" id="command_change_costume">\n\t\t\t\tchange constume \n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_change_background" id="command_change_background">\n\t\t\t\tchange background\n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_show" id="command_show" >\n\t\t\t\tshow \n\t\t\t</li>\n\t\t\t<li class="toolbar-item toolbar-item-look draggable_sortable command_hide" id="command_hide">\n\t\t\t\thide \n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="operator-commands" class="tab-pane">\n\t\t<div class="toolbar">\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_plus" id="command_op_plus">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >+</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_minus" id="command_op_minus">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >-</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_multiply" id="command_op_multiply">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >*</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_divide" id="command_op_divide">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >/</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_mod" id="command_op_mod">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >%</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_lessthan" id="command_op_lessthan">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&lt;</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_greaterthan" id="command_op_greaterthan">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&gt;</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-operator operator-draggable command_op_equal" id="command_op_equal">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable"></input>\n\t\t\t\t<div style="display:inline-block;" >&#61;</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable"></input>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div id="variable-commands" class="tab-pane">\n\t\t<div class="toolbar">\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_xPos" id="command_var_xPos">\n\t\t\t\tx pos\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_yPos" id="command_var_yPos">\n\t\t\t\ty pos\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_mouseX" id="command_var_mouseX">\n\t\t\t\tmouse x \n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_mouseY" id="command_var_mouseY">\n\t\t\t\tmouse y\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_left" id="command_var_left">\n\t\t\t\tleft\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_right" id="command_var_right">\n\t\t\t\tright\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_top" id="command_var_top">\n\t\t\t\ttop\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_bottom" id="command_var_bottom">\n\t\t\t\tbottom\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div id="assignment-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-assignment draggable_sortable  command_assignment" id="command_assignment">\n\t\t\t\t<input type="text" name="value_variable" value="" class="number-input input-droppable" disabled></input>\n\t\t\t\t<div style="display:inline-block;">=</div>\n\t\t\t\t<input type="text" name="value_set_to_x" value="" class="number-input assignment-droppable input-droppable"></input>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="event-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="toolbar-item toolbar-item-event draggable_sortable command_onclick" id="command_onclick">\n\t\t\t\t<div class="block-event-top">\n\t\t\t\t\t<div class="first-label">when</div>\n\t\t\t\t\t<input type="text" name="value_clicked" value="10" class="number-input"></input>\n\t\t\t\t\t<div style="display:inline-block;" >clicked</div> \n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-event-botm"></div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>';

}
return __p
};