$(document).ready(function(){

	var slots = Array(7);

	slots[0] = [ 0, 0, 0, 0, 0, 0 ];
	slots[1] = [ 0, 0, 0, 0, 0, 0 ];
	slots[2] = [ 0, 0, 0, 0, 0, 0 ];
	slots[3] = [ 0, 0, 0, 0, 0, 0 ];
	slots[4] = [ 0, 0, 0, 0, 0, 0 ];
	slots[5] = [ 0, 0, 0, 0, 0, 0 ];
	slots[6] = [ 0, 0, 0, 0, 0, 0 ];

	var players = ['red', 'yellow'];

	var current_player = players[Math.floor(Math.random()*players.length)];

	var generate_magical_circles = function(){
		
		var f_template = "<div class='col-sm-1 column'>";
		var e_template = "</div>"

		var append_col = "";

		for(var slot = 0; slot < slots.length; slot++){
			append_col += f_template;
			for(var c_item = slots[slot].length - 1; c_item >= 0; c_item--){
				var c_template = "<div class='circle' data-yaxis='"+slot+"' data-xaxis='"+c_item+"'></div>";
				append_col += c_template;
			}
			append_col += e_template;
			$(".board").append(append_col);

			//Reset back template to blank
			append_col = "";
		}
	}

	// Player switch method
	var player_switch = function(){
		if (current_player === 'red'){
			current_player = 'yellow';
		}else{
			current_player = 'red';
		}
	}
	
	// Populate board area with magical circles
	generate_magical_circles();

	alert(current_player + " starts first!");

	// Drop magical circle
	var drop_magical_circle = function(x_axis, y_axis){
		for(var element = 0; element < slots[y_axis].length; element++){
			if (slots[y_axis][element] === 0){
				if(current_player === 'red'){
					slots[y_axis][element] = 1;
				}
				else{
					slots[y_axis][element] = 2;
				}
				return [ y_axis, element, current_player ];
				break
			}
		}
	}

	$(".circle").live('click', function(){
		var get_x_axis = $(this).data('xaxis');
		var get_y_axis = $(this).data('yaxis');
		
		var get_coordinates = drop_magical_circle(get_x_axis, get_y_axis);

		// Plot magical circles
		$("[data-xaxis='"+get_coordinates[1]+"'][data-yaxis='"+get_coordinates[0]+"']").addClass(get_coordinates[2]);

		// Activate Player Switch
		player_switch();

	});

});