

var BOARD_HEIGHT = 8
var BOARD_WIDTH  = 8

var TOKEN = {
    EMPTY  : {value: 0, string: "Empty",    userId: 0 },
    RED    : {value: 1, string: "Red",      userId: -1 },
    YELLOW : {value: 2, string: "Yellow",   userId: -1 },
    BLUE   : {value: 3, string: "Blue",     userId: -1 },
    GREEN  : {value: 4, string: "Green",    userId: -1 }
}





var selected_token=TOKEN.RED;

/*function selectToken(token){
    document.getElementById('player_color').innerHTML = token.string;
    selected_token = token;
    
    $.post($SCRIPT_ROOT + '/choose_color', { token : token.string },
    function(data) {
    $("#resultColor").text(data.result);
    });
  }*/

function test_userId(token){ 
    alert(token.userId)
    //get_token_by_id(token.userId);
}


function assign_colors(friends, userId, playerPos) {
    selected_token.userId = userId
    var length = friends.length,
    element = null;
    teststring = ""
    for (var i = 0; i < length; i++) {
        element = friends[i]; 
        teststring = teststring + element + " i: "+ i + "\n";
        if (i==0) { TOKEN.YELLOW.userId = element }
        if (i==1) { TOKEN.BLUE.userId   = element }
        if (i==2) { TOKEN.GREEN.userId  = element }
    }
    drawBoard(playerPos);                                   //since it should be done onload but after assign_colors.
alert(teststring);
}



function create_token(token) {

    token_img = document.createElement("img");
    token_img.setAttribute("height", "64");
    token_img.setAttribute("width", "64");
    token_img.setAttribute("src", "/static/img/BoardCell_" + token.string + ".png");
    
    return token_img        
}

var board = new Array(BOARD_HEIGHT)
for (var i = 0; i < board.length; i++) {
    board[i] = new Array(BOARD_WIDTH)
}

function drawBoard(playerPos){  
  //  board_element = document.getElementById("square_"+ 2+"_"+2);
  //  board_element.appendChild(create_token(TOKEN.RED));
  //  $('#result').text(playerPos[1]);
    for (var y =0; y<BOARD_HEIGHT; y++ ){
        for (var x=0; x<BOARD_WIDTH; x++){
            board_element = document.getElementById("square_"+ x+"_"+y);
            index = y*BOARD_HEIGHT +x;

            if(TOKEN.RED.userId == playerPos[index]){
                board_element.appendChild(create_token(TOKEN.RED));
            }
            if(TOKEN.YELLOW.userId == playerPos[index]){
                board_element.appendChild(create_token(TOKEN.YELLOW));
            }
            if(TOKEN.BLUE.userId == playerPos[index]){
                board_element.appendChild(create_token(TOKEN.BLUE));
            }
            if(TOKEN.GREEN.userId == playerPos[index]){
                board_element.appendChild(create_token(TOKEN.GREEN));
            }
        }
    }
}

function addTokens(gameId,x,y) {            //Send  gameId, x and y coordinates to run_web
 /*   player_color    = document.getElementById('player_color').innerHTML;
    board_element   = document.getElementById("square_" + x + "_" + y);    
    
    if (board[x][y] == null && selected_token != null) {
        board[x][y] = selected_token;

        board_element.appendChild(create_token(selected_token));*/
        
        $.post($SCRIPT_ROOT + '/game_board', {gameId: gameId, x: x, y: y },
        function(data) {
        $("#result").text(data.result);
      });
  //  }
}


