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

	function generate_magical_circles(){
		
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
	function player_switch(){
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
	function drop_magical_circle(x_axis, y_axis){
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
		
		try{
			var get_coordinates = drop_magical_circle(get_x_axis, get_y_axis);

			// Plot magical circles
			$("[data-xaxis='"+get_coordinates[1]+"'][data-yaxis='"+get_coordinates[0]+"']").addClass(get_coordinates[2]);

			// Activate Player Switch
	        checkWin();
			player_switch();
		}
		catch(err){
			console.log("Out of bounds");
		}

	});
    
    function checkWin(){
        var current_player_code = current_player == 'red' ? 1 : 2;
        
        for(var x in slots){
            for(var y in slots[x]){
                if(slots[x][y] == current_player_code){
                    if(isVerticalWin(x,y,current_player_code) ||
                     isHorizontalWin(x,y,current_player_code) ||
                     isDiagonalWin(x,y,current_player_code)){
                        alert(current_player + " player wins");
                        resetBoard();
                    }
                }
            }
        }
    }
    
    function isVerticalWin(x,y,player_code)
    {
        var newY = parseInt(y) + 0;
        
        //Forward
        for(var i = 0; i < 3; i++){
            if(newY  + 1 < slots[x].length){
                newY++;
                if(slots[x][newY] != player_code){
                    return false;
                }
            }
        }
        
        //Backward
        for(var i = 0; i < 3; i++){
            if(newY  - 1 >= 0){
                newY--;
                if(slots[x][newY] != player_code){
                    return false;
                }
            }
        }
        
        
        return true;
    }
    
    function isHorizontalWin(x,y,player_code)
    {
        var newX = parseInt(x) + 0;
        
        //Forward
        for(var i = 0; i < 3; i++){
            if(newX  + 1 < slots.length){
                newX++;
                if(slots[newX][y] != player_code){
                    return false;
                }
            }
        }
        
        // //Backward
        for(var i = 0; i < 3; i++){
            if(newX  - 1 >= 0){
                newX--;
                if(slots[newX][y] != player_code){
                    return false;
                }
            }
        }

        return true;
    }
    
    function isDiagonalWin(x,y,player_code){
        var newX = parseInt(x) + 0;
        var newY = parseInt(y) + 0;

        //Forward
        for(var i = 0; i < 3; i++){
            if(newX  + 1 < slots.length && newY + 1 < slots[x].length){
                newX++;
                newY++;
                if(slots[newX][newY] != player_code){
                    return false;
                }
            }
        }
        
        // //Backward
        for(var i = 0; i < 3; i++){
            if(newX  - 1 > 0 && newY - 1 > 0){
                newX--;
                newY--;
                if(slots[newX][newY] != player_code){
                    return false;
                }
            }
        }   
        return true;
    }
    
    function resetBoard(){
        slots[0] = [ 0, 0, 0, 0, 0, 0 ];
        slots[1] = [ 0, 0, 0, 0, 0, 0 ];
        slots[2] = [ 0, 0, 0, 0, 0, 0 ];
        slots[3] = [ 0, 0, 0, 0, 0, 0 ];
        slots[4] = [ 0, 0, 0, 0, 0, 0 ];
        slots[5] = [ 0, 0, 0, 0, 0, 0 ];
        slots[6] = [ 0, 0, 0, 0, 0, 0 ];
        $('.red').removeClass('red');
        $('.yellow').removeClass('yellow');
    }

});