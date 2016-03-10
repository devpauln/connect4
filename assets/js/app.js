$(document).ready(function(){

	var slots = Array(7);

	slots[0] = [ 0, 0, 0, 0, 0, 0 ];
	slots[1] = [ 0, 0, 0, 0, 0, 0 ];
	slots[2] = [ 0, 0, 0, 0, 0, 0 ];
	slots[3] = [ 0, 0, 0, 0, 0, 0 ];
	slots[4] = [ 0, 0, 0, 0, 0, 0 ];
	slots[5] = [ 0, 0, 0, 0, 0, 0 ];
	slots[6] = [ 0, 0, 0, 0, 0, 0 ];

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
	
	generate_magical_circles();

	var check_availability = function(){
		
	}


	$(".circle").live('click', function(){
		var get_x_axis = $(this).data('xaxis');
		var get_y_axis = $(this).data('yaxis');
		

	});

});