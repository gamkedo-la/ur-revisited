var selectedPiece = null;

var rollButton = document.createElement("button");


// MouseClick/Touch input Handling Code
  var selectedIdx = -1;
  var clickedIdx = -1;

function setupMouseInput() {

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    //document.getElementById("debugText").innerHTML = "("+mousePos.x+","+mousePos.y+")";
  } );

  canvas.addEventListener('click', mouseClickHandler);
}

function mouseClickHandler(evt) {
    var mousePos = calculateMousePos(evt);

    var tileOverCol = Math.floor( (mousePos.x - BOARD_X_OFFSET) / TILE_W);
    var tileOverRow = Math.floor( (mousePos.y - BOARD_Y_OFFSET) / TILE_H);    

    clickedIdx = tileCoordToIndex(tileOverCol,tileOverRow);

    if(clickedIdx < 0 || clickedIdx >= GAME_BOARD.length) { // invalid or off board
      return;
    } 

    if(clickedIdx == GAME_BOARD.indexOf(ROLL_BUTTON)) {
      rollDice();
      //document.getElementById("debugText").innerHTML = 
       // "Clicked Index " + clickedIdx;
    }

    if(selectedIdx == -1) {
      if( player1PieceIndices.includes(clickedIdx) || 
          player2PieceIndices.includes(clickedIdx) ) {

        selectedIdx = clickedIdx;
        //console.log("selectedIdx", selectedIdx, tileOverCol, tileOverRow);
      }
    } else { //selectedIdx != -1
      if(player1PieceIndices.includes(selectedIdx)) {
        player1PieceIndices.splice(player1PieceIndices.indexOf(selectedIdx), 1)
        player1PieceIndices.push(clickedIdx);
        selectedIdx = -1; // clear selection
      }
      if(player2PieceIndices.includes(selectedIdx)) {
        player2PieceIndices.splice(player2PieceIndices.indexOf(selectedIdx), 1)
        player2PieceIndices.push(clickedIdx);
        selectedIdx = -1; // clear selection
      }
    }
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function tileCoordToIndex(tileCol, tileRow) {
  return (tileCol + BOARD_COLS*tileRow);
}

function rollDice() {
  let diceRolls = [];
  let diceStartIdx = 72;

  for(var i=0;i<4;i++) {
    let roll = Math.floor(Math.random()*2);
    console.log("roll", roll);
    if( roll == 0 ){
      GAME_BOARD[diceStartIdx + i] = DICE_0;
    } else {
      GAME_BOARD[diceStartIdx + i] = DICE_1;
    }
    //diceRolls.push(roll);
  }
  console.log("Dice Rolls: ", diceRolls);
}
