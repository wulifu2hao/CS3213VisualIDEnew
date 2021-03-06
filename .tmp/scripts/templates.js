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
'\n\t    <input type="image" src="images/delete_button.png" alt="delete" height="24" width="24" value="' +
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
__p += '\n<div class="costumes_view">\n\t<div class="toolbar_costumes">\n\t\t<h5>Costumes</h5>\n\t\t<!-- <button id="costume-upload-button" class="sprite-button" type="button">\n\t\t\t<img  src="../images/upload.png" height="20" width="24"> </img>\n\t\t</button> -->\n\t\t<div style="padding-left: 10px; padding-top: 3px;">\n            <form id="costumeUploadForm" method=\'post\' action=\'/api/costume\' enctype="multipart/form-data">\n            <input type=\'file\' id="costumeToUpload" name=\'fileUploaded\' accept="image/*">\n            <input type=\'submit\' id="costumeUploadButton" class="btn btn-default btn-sm" style="margin-top:5px;">\n            </form>\n            <button id="costume-delete-button" class="sprite-button" type="button">\n\t\t\t\t<img  src="../images/delete.png" height="20" width="24"> </img>\n\t\t\t</button>\n\t\t</div>\n\t\t\n\t</div> <!-- div costumes toolbar end -->\n\t<div>\n\t\t<ol class="costumes-selectable">\n\t\t</ol>\n\t</div>\n</div>\n\n';

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
__p += '<canvas class="canvas-droppable" id="' +
((__t = ( id )) == null ? '' : __t) +
'" width="' +
((__t = ( width )) == null ? '' : __t) +
'" height="' +
((__t = ( height )) == null ? '' : __t) +
'">\n</canvas>\n<div class="costumes_list">\n\t<h5>Draw</h5>\n\t<button id="sprite-upload-button" type="button">\n\t\t<img  src="../images/draw.png" height="20" width="24"> </img>\n\t</button>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/toolbar.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="nav nav-pills toolbar-tab" role="tablist">\n    <li class="active"><a href="#motion-commands" role="tab" data-toggle="tab">Motion</a></li>\n    <li><a href="#control-commands" role="tab" data-toggle="tab">Control</a></li> \n    <li><a href="#look-commands" role="tab" data-toggle="tab">Looks</a></li>     \n    <li><a href="#operator-commands" role="tab" data-toggle="tab">Operators</a></li> \n    <li><a href="#variable-commands" role="tab" data-toggle="tab">Variables</a></li>\n    <li><a href="#assignment-commands" role="tab" data-toggle="tab">Assignment</a></li> \n    <li><a href="#event-commands" role="tab" data-toggle="tab">Event</a></li>\n\t<li><a href="#sound-commands" role="tab" data-toggle="tab">Sound</a></li>  \n</ul>\n<div class="tab-content" id="toolbar-pane">\n\t<div id="motion-commands" class="tab-pane active">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="command_set_x toolbar-item toolbar-item-motion draggable_sortable" id="command_set_x" >\n\t\t\t\t<div class="first-label">set to x</div>\n\t\t\t\t<input type="text" name="value_set_to_x" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</li>\n\t\t\t<li class="command_set_y toolbar-item toolbar-item-motion draggable_sortable " id="command_set_y" >\n\t\t\t\t<div class="first-label">set to y</div>\n\t\t\t\t<input type="text" name="value_set_to_y" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</li>\n\t\t\t<li class="command_move toolbar-item toolbar-item-motion draggable_sortable " id="command_move">\n\t\t\t\t<div class="first-label">move</div>\n\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >steps</div> \n\t\t\t</li>\n\t\t\t<li class="command_rotate toolbar-item toolbar-item-motion draggable_sortable " id="command_rotate">\n\t\t\t\t<div class="first-label">rotate</div>\n\t\t\t\t<input type="text" name="value_rotate" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >degrees</div> \n\t\t\t</li>\n\t\t\t<li class="command_scale toolbar-item toolbar-item-motion draggable_sortable " id="command_scale">\n\t\t\t\t<div class="first-label">scale x</div>\n\t\t\t\t<input type="text" name="value_scale_x" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div class="first-label">, y</div>\n\t\t\t\t<input type="text" name="value_scale_y" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="control-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="command_repeat toolbar-item toolbar-item-control draggable_sortable " id="command_repeat">\n\t\t\t\t<div class="block-control-top">\n\t\t\t\t\t<div class="first-label">repeat</div>\n\t\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t\t<div style="display:inline-block;" >times</div> \n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-control-botm"></div>\n\t\t\t</li>\n\t\t\t<li class="command_forever toolbar-item toolbar-item-control draggable_sortable " id="command_forever">\n\t\t\t\t<div class="block-control-top">\n\t\t\t\t\tforever\n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-control-botm"></div>\n\t\t\t</li>\n\t\t\t<li class="command_if toolbar-item toolbar-item-control draggable_sortable " id="command_if">\n\t\t\t\t<div class="block-control-top">\n\t\t\t\t\t<div class="first-label">if</div>\n\t\t\t\t\t<input type="text" name="value_move_steps" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t\t<div style="display:inline-block;" >then</div> \n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-control-botm"></div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="look-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="command_change_costume toolbar-item toolbar-item-look draggable_sortable " id="command_change_costume">\n\t\t\t\tchange constume \n\t\t\t</li>\n\t\t\t<li class="command_change_background toolbar-item toolbar-item-look draggable_sortable " id="command_change_background">\n\t\t\t\tchange background\n\t\t\t</li>\n\t\t\t<li class="command_show toolbar-item toolbar-item-look draggable_sortable " id="command_show" >\n\t\t\t\tshow \n\t\t\t</li>\n\t\t\t<li class="command_hide toolbar-item toolbar-item-look draggable_sortable " id="command_hide">\n\t\t\t\thide \n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="operator-commands" class="tab-pane">\n\t\t<div class="toolbar">\n\t\t\t<div class="command_op_random toolbar-item-operator operator-draggable " id="command_op_random">\n\t\t\t\t<div class="first-label">random</div>\n\t\t\t\t<input type="text" name="value_first" value="1" class="number-input" style="width:24px;"></input>\n\t\t\t\t<div style="display:inline-block;" >to</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input" style="width:24px;"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_plus toolbar-item-operator operator-draggable " id="command_op_plus">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >+</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_minus toolbar-item-operator operator-draggable " id="command_op_minus">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >-</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_multiply toolbar-item-operator operator-draggable " id="command_op_multiply">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >*</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_divide toolbar-item-operator operator-draggable " id="command_op_divide">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >/</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_mod toolbar-item-operator operator-draggable " id="command_op_mod">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >%</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_lessthan toolbar-item-operator operator-draggable " id="command_op_lessthan">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >&lt;</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_greaterthan toolbar-item-operator operator-draggable " id="command_op_greaterthan">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >&gt;</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t\t<div class="command_op_equal toolbar-item-operator operator-draggable " id="command_op_equal">\n\t\t\t\t<input type="text" name="value_first" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t\t<div style="display:inline-block;" >&#61;</div> \n\t\t\t\t<input type="text" name="value_second" value="10" class="number-input input-droppable input-droppable-inlist"></input>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div id="variable-commands" class="tab-pane">\n\t\t<div class="toolbar">\n\t\t\t<button id="create_new_var" type="button" class="btn btn-success btn-xs">New variable</button>\n\t\t\t<div class="command_var_xPos toolbar-item-variable variable-draggable " id="command_var_xPos">\n\t\t\t\tx pos\n\t\t\t</div>\n\t\t\t<div class="command_var_yPos toolbar-item-variable variable-draggable " id="command_var_yPos">\n\t\t\t\ty pos\n\t\t\t</div>\n<!-- \t\t\t<div class="toolbar-item-variable variable-draggable command_var_left" id="command_var_left">\n\t\t\t\tleft\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_right" id="command_var_right">\n\t\t\t\tright\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_top" id="command_var_top">\n\t\t\t\ttop\n\t\t\t</div>\n\t\t\t<div class="toolbar-item-variable variable-draggable command_var_bottom" id="command_var_bottom">\n\t\t\t\tbottom\n\t\t\t</div> -->\n\t\t</div>\n\t</div>\n\t<div id="assignment-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="command_assignment toolbar-item toolbar-item-assignment draggable_sortable  " id="command_assignment">\n\t\t\t\t<input type="text" name="value_variable" value="" class="number-input input-droppable input-droppable-inlist" disabled></input>\n\t\t\t\t<div style="display:inline-block;">=</div>\n\t\t\t\t<input type="text" name="value_set_to_x" value="" class="number-input assignment-droppable assignment-droppable-inlist input-droppable input-droppable-inlist"></input>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div id="event-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="command_onclick toolbar-item toolbar-item-event draggable_sortable " id="command_onclick">\n\t\t\t\t<div class="block-event-top">\n\t\t\t\t\t<div class="first-label">when</div>\n\t\t\t\t\t<input type="text" name="value_clicked" value="10" class="number-input"></input>\n\t\t\t\t\t<div style="display:inline-block;" >clicked</div> \n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t</ul>\n\t\t\t\t<div class="block-event-botm"></div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<!-- don\'t know how to do ! -->\n\t<div id="sound-commands" class="tab-pane">\n\t\t<ul class="list-group toolbar">\n\t\t\t<li class="command_playsound toolbar-item toolbar-item-audio draggable_sortable " id="command_playsound">\n\t\t\t\t<div class="first-label">Play sound</div>\n\t\t\t\t<select class="sound-select">\n\t\t\t\t</select>\n\t\t\t</li>\n\t\t\t<li class="command_stopsound toolbar-item toolbar-item-audio draggable_sortable " id="command_stopSound">\n\t\t\t\t<div class="first-label">Stop sound</div>\n\t\t\t\t<select class="sound-select">\n\t\t\t\t</select>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>';

}
return __p
};