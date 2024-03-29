var currentPlayer = 1;
var turnStage = 'roll'; // 'roll' or 'move'

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
    // find out where the click was
    var mousePos = calculateMousePos(evt);
    var clickedIdx = boardIdxFromMousePos(mousePos);

    var tileKindClicked = GAME_BOARD[clickedIdx];
    //console.log("tile clicked", clickedIdx, tileKindClicked);
  // idea: switch case: what was clicked? (tile type)
  // better idea if/else for array includes
  if (!gamePaused && !showCredits && !showInstructionsMenu) {
    // is click on the board?
    if(clickedIdx < 0 || clickedIdx >= GAME_BOARD.length) { // invalid or off board
      return;
    } 

    // is click on the roll button?
    if(tileKindClicked === ROLL_BUTTON) {
      //console.log("clicked roll button");
        if(turnStage == 'roll') {
          rollDice();
        }
    }

    // is click on a board tile?
    if(BOARD_TILES.includes(tileKindClicked)) {
      //console.log("Clicked a board tile");
      if(turnStage === 'move') {
        if(selectedIdx == -1 || currentPlayerPieceList.includes(clickedIdx)) {
          tryToSelectPiece(clickedIdx);
        } else { 
          tryToMoveSelectedPiece(clickedIdx);
        }
      }
      //resolveBoardClick(selectedIdx);
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

function boardIdxFromMousePos(mousePos) {
    var tileOverCol = Math.floor( (mousePos.x - BOARD_X_OFFSET) / TILE_W);
    var tileOverRow = Math.floor( (mousePos.y - BOARD_Y_OFFSET) / TILE_H);    

    return tileCoordToIndex(tileOverCol,tileOverRow);
}

function tryToSelectPiece(clickedIdx) {
  console.log("trying to select at idx", clickedIdx);
  if(currentPlayerPieceList.includes(clickedIdx)) {
      selectedIdx = clickedIdx;
      selectedCanMoveToIdx = getAvailableMove(clickedIdx)
      if(soundsOn) {
        pieceSelectSFX.play();
      }
  }
}

function tryToMoveSelectedPiece(clickedIdx) {
  console.log("trying to move to idx", clickedIdx);
  if(currentPlayerPieceList.includes(selectedIdx) && 
    selectedCanMoveToIdx == clickedIdx) {
    //
        if(opponentPlayerPieceList.includes(clickedIdx) &&
          clickedIdx == 31) {

          console.log("opponent's piece on central rosary");
          // abort movement
          return;
          
        }
        currentPlayerPieceList.splice(
          currentPlayerPieceList.indexOf(selectedIdx), 1
        );
        currentPlayerPieceList.push(clickedIdx);
        checkIfOpponentPieceExist(clickedIdx);
        selectedIdx = -1; // clear selection
        selectedCanMoveToIdx = -1; // clear movement marker
        if(soundsOn) {
          pieceMovementSFX.play(); // play movement SFX
        }

        if(GAME_BOARD[clickedIdx] == TILE_ROSARY) {
            // player gets to roll again
            console.log("rosary hit");
            turnStage = 'roll';
            playerMovementPoints = 0;
        } else if(GAME_BOARD[clickedIdx] == TILE_END) {
            currentPlayerPieceList.splice(
              currentPlayerPieceList.indexOf(clickedIdx), 1
            );
            checkForGameEnd();
            endPlayerTurn();
        } else {
            endPlayerTurn();
        }
  }
}

function checkIfOpponentPieceExist(clickedIdx){
  if(opponentPlayerPieceList.includes(clickedIdx)){
    
    // Remove it:
    opponentPlayerPieceList.splice(
      opponentPlayerPieceList.indexOf(clickedIdx), 1
    );

    // Return it to an empty player slot:
    if(currentPlayer==1){
      for(var i of player2HomePieceIndices){
        if(opponentPlayerPieceList.includes(i)==false){
          opponentPlayerPieceList.push(i);
          break;
        }
      }
    }
    else{
      for(var i of player1HomePieceIndices){
        if(opponentPlayerPieceList.includes(i)==false){
          opponentPlayerPieceList.push(i);
          break;
        }
      }
    }
  }
}

async function rollDice() {
  let diceRolls = [];
  let diceStartIdx = 72;
  let rollTotal = 0;
  let diceRollSound = 0;
  let dice_0_values = [10, 17, 18];
  let dice_1_values = [11, 19, 20];
  
  for(var i=0;i<4;i++) {
    let roll = Math.floor(Math.random()*2);
    let diceImgIdx = Math.floor(Math.random()*3); 
    //console.log("roll", roll);
    if( roll == 0 ){
      GAME_BOARD[diceStartIdx + i] = dice_0_values[diceImgIdx];
    } else { // roll == 1
      GAME_BOARD[diceStartIdx + i] = dice_1_values[diceImgIdx];
      rollTotal += 1;
    }
    //diceRolls.push(roll);
  }
  //console.log("Dice Rolls: ", diceRolls);
  playerMovementPoints = rollTotal;
  turnStage = 'move';
  debug("Roll Total: "+ rollTotal);


    
  // Play random dice roll sound  
  while (diceRollSound == prevDiceRollSound) {
    diceRollSound = Math.floor(Math.random()*diceRollSounds.length);
  }


  if(soundsOn) {
    diceRollSounds[diceRollSound].play();
  }
  prevDiceRollSound = diceRollSound;
  //console.log("Playing dice roll sound " + diceRollSound);

  if(playerMovementPoints === 0 || getAvailablePlayerMoves(currentPlayer).length < 1) {
    await waitOneSecond();
    endPlayerTurn();
  }

}

function checkForGameEnd() {
  console.log("check for game end");
  if(currentPlayerPieceList.length === 0) {
    console.log("Player "+ currentPlayer +" wins!");
    triggerGameEnd();
  }
}

function endPlayerTurn() {
	if(currentPlayer === 1) {
		currentPlayer = 2;
                currentPlayerPath = PLAYER_2_PATH;
                currentPlayerPieceList = player2PieceIndices;
                opponentPlayerPieceList = player1PieceIndices;
	} else {
		currentPlayer = 1;
                currentPlayerPath = PLAYER_1_PATH;
                currentPlayerPieceList = player1PieceIndices;
                opponentPlayerPieceList = player2PieceIndices;
	}

  playerMovementPoints = 0;
  turnStage = 'roll';

	debug("Player " + currentPlayer + "'s turn.");
	console.log("Player " + currentPlayer + "'s turn.");
    if(currentPlayer === 2 && singlePlayerMode === true) {
        runAIPlayerTurn();
    }
}

function triggerGameEnd() {
  winText.innerHTML = 'Player '+ currentPlayer +' wins!!';
  if(currentPlayer === 1) {
    gameEndScreen.style.backgroundColor = 'rgba(156, 0, 7, 0.8)';
  } else {
    gameEndScreen.style.backgroundColor = 'rgba(15, 0, 159, 0.8)';
  }
  gameEndScreen.style.display = 'block';
}
