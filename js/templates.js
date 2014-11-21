define(['handlebars'], function(Handlebars) {

this["Templates"] = this["Templates"] || {};

this["Templates"]["colorpicker"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"colorpicker\">\n	<div class=\"btn-group\">\n		<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n			<span class=\"glyphicon glyphicon-colorpicker current-color\"></span> <span class=\"sr-only\">Toggle Color Picker</span>\n			<span class=\"caret\"></span>\n		</button>\n		<div class=\"dropdown-menu dropdown-menu-left colorpicker-wrapper\" role=\"menu\">\n			<!-- Tab nav -->\n			<ul class=\"nav nav-tabs nav-justified\" role=\"tablist\">\n				<li role=\"presentation\" class=\"active\"><a href=\"#basic\" role=\"tab\" data-toggle=\"tab\">Basic</a></li>\n				<li role=\"presentation\"><a href=\"#saved\" role=\"tab\" data-toggle=\"tab\">Saved</a></li>\n				<li role=\"presentation\"><a href=\"#recent\" role=\"tab\" data-toggle=\"tab\">Recent</a></li>\n				<li role=\"presentation\"><a href=\"#advanced\" role=\"tab\" data-toggle=\"tab\">Advanced</a></li>\n			</ul>\n			<!-- Tab panes -->\n			<div class=\"tab-content\">\n				<div role=\"tabpanel\" class=\"tab-pane active\" id=\"basic\">\n					<div class=\"colorpicker-palette\">\n						<div class=\"container-fluid\">\n							<span class=\"palette-color\" style=\"background-color:#000000\" data-color=\"#000000\" title=\"Black\"></span>\n							<span class=\"palette-color\" style=\"background-color:#993300\" data-color=\"#993300\" title=\"Brown\"></span>\n							<span class=\"palette-color\" style=\"background-color:#333300\" data-color=\"#333300\" title=\"Olive Green\"></span>\n							<span class=\"palette-color\" style=\"background-color:#003300\" data-color=\"#003300\" title=\"Dark Green\"></span>\n							<span class=\"palette-color\" style=\"background-color:#003366\" data-color=\"#003366\" title=\"Dark Teal\"></span>\n							<span class=\"palette-color\" style=\"background-color:#000080\" data-color=\"#000080\" title=\"Dark Blue\"></span>\n							<span class=\"palette-color\" style=\"background-color:#333399\" data-color=\"#333399\" title=\"Indigo\"></span>\n							<span class=\"palette-color\" style=\"background-color:#333333\" data-color=\"#333333\" title=\"Gray\"></span>\n						</div>\n						<div class=\"container-fluid\">\n							<span class=\"palette-color\" style=\"background-color:#800000\" data-color=\"#800000\" title=\"Dark Red\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FF6600\" data-color=\"#FF6600\" title=\"Orange\"></span>\n							<span class=\"palette-color\" style=\"background-color:#808000\" data-color=\"#808000\" title=\"Dark Yellow\"></span>\n							<span class=\"palette-color\" style=\"background-color:#008000\" data-color=\"#008000\" title=\"Green\"></span>\n							<span class=\"palette-color\" style=\"background-color:#008080\" data-color=\"#008080\" title=\"Teal\"></span>\n							<span class=\"palette-color\" style=\"background-color:#0000FF\" data-color=\"#0000FF\" title=\"Blue\"></span>\n							<span class=\"palette-color\" style=\"background-color:#666699\" data-color=\"#666699\" title=\"Blue-Gray\"></span>\n							<span class=\"palette-color\" style=\"background-color:#808080\" data-color=\"#808080\" title=\"Gray-50%\"></span>\n						</div>\n						<div class=\"container-fluid\">\n							<span class=\"palette-color\" style=\"background-color:#FF0000\" data-color=\"#FF0000\" title=\"Red\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FF9900\" data-color=\"#FF9900\" title=\"Light Orange\"></span>\n							<span class=\"palette-color\" style=\"background-color:#99CC00\" data-color=\"#99CC00\" title=\"Lime\"></span>\n							<span class=\"palette-color\" style=\"background-color:#339966\" data-color=\"#339966\" title=\"Sea Green\"></span>\n							<span class=\"palette-color\" style=\"background-color:#33CCCC\" data-color=\"#33CCCC\" title=\"Aqua\"></span>\n							<span class=\"palette-color\" style=\"background-color:#3366FF\" data-color=\"#3366FF\" title=\"Light Blue\"></span>\n							<span class=\"palette-color\" style=\"background-color:#800080\" data-color=\"#800080\" title=\"Violet\"></span>\n							<span class=\"palette-color\" style=\"background-color:#999999\" data-color=\"#999999\" title=\"Gray-40%\"></span>\n						</div>\n						<div class=\"container-fluid\">\n							<span class=\"palette-color\" style=\"background-color:#FF00FF\" data-color=\"#FF00FF\" title=\"Pink\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FFCC00\" data-color=\"#FFCC00\" title=\"Gold\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FFFF00\" data-color=\"#FFFF00\" title=\"Yellow\"></span>\n							<span class=\"palette-color\" style=\"background-color:#00FF00\" data-color=\"#00FF00\" title=\"Bright Green\"></span>\n							<span class=\"palette-color\" style=\"background-color:#00FFFF\" data-color=\"#00FFFF\" title=\"Turquoise\"></span>\n							<span class=\"palette-color\" style=\"background-color:#00CCFF\" data-color=\"#00CCFF\" title=\"Sky Blue\"></span>\n							<span class=\"palette-color\" style=\"background-color:#993366\" data-color=\"#993366\" title=\"Plum\"></span>\n							<span class=\"palette-color\" style=\"background-color:#C0C0C0\" data-color=\"#C0C0C0\" title=\"Gray-25%\"></span>\n						</div>\n						<div class=\"container-fluid\">\n							<span class=\"palette-color\" style=\"background-color:#FF99CC\" data-color=\"#FF99CC\" title=\"Rose\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FFCC99\" data-color=\"#FFCC99\" title=\"Tan\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FFFF99\" data-color=\"#FFFF99\" title=\"Light Yellow\"></span>\n							<span class=\"palette-color\" style=\"background-color:#CCFFCC\" data-color=\"#CCFFCC\" title=\"Light Green\"></span>\n							<span class=\"palette-color\" style=\"background-color:#CCFFFF\" data-color=\"#CCFFFF\" title=\"Light Turquoise\"></span>\n							<span class=\"palette-color\" style=\"background-color:#99CCFF\" data-color=\"#99CCFF\" title=\"Pale Blue\"></span>\n							<span class=\"palette-color\" style=\"background-color:#CC99FF\" data-color=\"#CC99FF\" title=\"Lavendar\"></span>\n							<span class=\"palette-color\" style=\"background-color:#FFFFFF\" data-color=\"#FFFFFF\" title=\"White\"></span>\n						</div>\n					</div>\n				</div>\n				<div role=\"tabpanel\" class=\"tab-pane\" id=\"saved\">\n					<div class=\"colorpicker-saved\">\n					</div>\n				</div>\n				<div role=\"tabpanel\" class=\"tab-pane\" id=\"recent\">\n					<div class=\"colorpicker-recent\">\n					</div>\n				</div>\n				<div role=\"tabpanel\" class=\"tab-pane\" id=\"advanced\">\n					<div class=\"colorpicker-advanced\">\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>";
  },"useData":true});

return this["Templates"];

});