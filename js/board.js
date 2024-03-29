const TILE_W = 40;
const TILE_H = 40;
const TILE_GAP = 2;
const BOARD_COLS = 7;
const BOARD_ROWS = 12;
const BOARD_X_OFFSET = 60;
const BOARD_Y_OFFSET = 60;

const GAME_BOARD = [
   5,0, 0, 0, 0,0,6,
   5,0, 2,12, 2,0,6,
   5,0,15,13,15,0,6,
   5,0,13,14,13,0,6,
   5,0,15, 2,15,0,6,
   5,0, 0,13, 0,0,6,
   5,0, 4,14, 4,0,6,
   0,0, 2,15, 2,0,0,
   0,0,16,13,16,0,0,
   0,0, 0, 0, 0,0,0,
   0,8, 7, 7, 7,7,0,
   0,0, 0, 0, 0,0,0,
];

const BOARD_EMPTY_SPACE = 0;
const TILE_BLANK = 1;
const TILE_ROSARY = 2;
const TILE_START = 3;
const TILE_END = 4;
const PLAYER_1_HOME_ROW = 5;
const PLAYER_2_HOME_ROW = 6;
const DICE_SPOT = 7;
const ROLL_BUTTON = 8;
const DICE_0_0 = 10;
const DICE_0_1 = 17;
const DICE_0_2 = 18;
const DICE_1_0 = 11;
const DICE_1_1 = 19;
const DICE_1_2 = 20;

const EMPTY_TILES = [ TILE_END, BOARD_EMPTY_SPACE ]

// Extra tiles
const TILE_GATE = 12;
const TILE_HOUSE = 13;
const TILE_MARKET = 14;
const TILE_TEMPLE = 15;
const TILE_TREASURY = 16;

const BOARD_TILES = [
  TILE_BLANK,
  TILE_ROSARY,
  TILE_GATE,
  TILE_HOUSE,
  TILE_MARKET,
  TILE_TEMPLE,
  TILE_TREASURY,
  PLAYER_1_HOME_ROW,
  PLAYER_2_HOME_ROW,
  TILE_END,
];

var player1HomePieceIndices = [];
var player2HomePieceIndices = [];
var player1PieceIndices = [];
var player2PieceIndices = [];

function setupBoard() {
  //clear the board
  player1PieceIndices = [];
  player2PieceIndices = [];
  player1HomePieceIndices = [];
  player2HomePieceIndices = [];

  // add player pieces to home rows
  for(var i=0;i<GAME_BOARD.length;i++) {
    if(GAME_BOARD[i] == PLAYER_1_HOME_ROW) {
      player1PieceIndices.push(i);
      player1HomePieceIndices.push(i);
    }
    if(GAME_BOARD[i] == PLAYER_2_HOME_ROW) {
      player2PieceIndices.push(i);
      player2HomePieceIndices.push(i);
    }
  }
  currentPlayerPieceList = player1PieceIndices; // player 1 goes first
}

function returnTileTypeAtColRow(col,row) {
    if(col >= 0 && col < BOARD_COLS &&
        row >= 0 && row < BOARD_ROWS) {

        var tileIndexUnderCoord = rowColToArrayIndex(col, row);
        return (GAME_BOARD[tileIndexUnderCoord]);
    } else {
        return BOARD_EMPTY_SPACE;
    }
}

function rowColToArrayIndex(col, row) {
        return col + BOARD_COLS * row;
}

function drawBackground() {
  //console.log(backgroundSelect.value);
  switch(backgroundSelect.value) {
    case 'sandStone':
      canvasContext.drawImage(background_sandStone, 0, 0);
      break;
    case 'modernWood':
      canvasContext.drawImage(background_modernWood, 0, 0);
      break;
    case 'rockTiles':
      canvasContext.drawImage(background_rocks, 0, 0);
      break;
    case 'whiteWash':
      canvasContext.drawImage(background_whitewash, 0, 0);
      break;
    case 'grayMarble':
      canvasContext.drawImage(background_grayMarble, 0, 0);
      break;
    case 'silicate':
      canvasContext.drawImage(background_silicate, 0, 0);
      break;
    case 'woodTile':
      canvasContext.drawImage(background_woodTile, 0, 0);
      break;
    default:
  }
}

function drawBoard() {
  //console.log("called drawBoard");
    var arrayIndex = 0;
    var drawTileX = BOARD_X_OFFSET;
    var drawTileY = BOARD_Y_OFFSET;

    for(var eachRow=0;eachRow<BOARD_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<BOARD_COLS;eachCol++) {                 
                var tileKindHere = GAME_BOARD[arrayIndex];
                if(!EMPTY_TILES.includes(tileKindHere)) {
                  var useImg = tilePics[tileKindHere];
                  //console.log("useImg", useImg, "tileKindHere", tileKindHere);
                  canvasContext.drawImage(useImg, drawTileX,drawTileY);
                  // uncomment this line to label tile indecies for debugging
                  //drawText(12, 'darkblue', 'left', arrayIndex, drawTileX+3, drawTileY+3);
                }

                // if tile selected, draw box
                if(selectedIdx == arrayIndex) {
                  colorRect(drawTileX+3,drawTileY+3, TILE_W - 6,TILE_H - 6, 'yellow');
                }
                // if the selected piece can move here, draw a different box
                if(selectedCanMoveToIdx == arrayIndex) {
                    if(!currentPlayerPieceList.includes(selectedCanMoveToIdx) && 
                      !(selectedCanMoveToIdx == 31 && opponentPlayerPieceList.includes(31))) {
                // player has no piece at dest & dest is not center rosary with opponent piece
                      colorRect(drawTileX+3,drawTileY+3, TILE_W - 6,TILE_H - 6, 'lightblue');
                    } else {
                      // player cannot move here
                      colorRect(drawTileX+3,drawTileY+3, TILE_W - 6,TILE_H - 6, '#ff6565');
                    }
                }

                // if a piece is here, draw it too
                if(player1PieceIndices.includes(arrayIndex)) {
                  canvasContext.drawImage(player1Piece, drawTileX,drawTileY);
                }
                if(player2PieceIndices.includes(arrayIndex)) {
                  canvasContext.drawImage(player2Piece, drawTileX,drawTileY);
                }               

                if (turnStage === 'roll')
                {
                  if(tileKindHere === ROLL_BUTTON) {
                    if(currentPlayer === 1) {
                      canvasContext.drawImage(highlight_dk_red, drawTileX,drawTileY);
                    } else { // currentPlayer === 2
                      canvasContext.drawImage(highlight_dk_blue, drawTileX,drawTileY);
                    }
                  }
                }

                if(currentPlayer === 1) {
                  if(tileKindHere === PLAYER_1_HOME_ROW) {
                    canvasContext.drawImage(highlight_dk_red, drawTileX,drawTileY);
                  }
                } else if(currentPlayer === 2) {
                  if(tileKindHere === PLAYER_2_HOME_ROW) {
                    canvasContext.drawImage(highlight_dk_blue, drawTileX,drawTileY);
                  }
                }
                
                drawTileX += TILE_W;
                arrayIndex++;

        } // end of for each col
    drawTileY += TILE_H;
    var drawTileX = BOARD_X_OFFSET;
    } // end of for each row
    drawMainTitle();

    // draw player number of moves
    if(turnStage === 'move') {
        console.log("drawing text", 'Total: '+playerMovementPoints);
        drawText(14, 'black', 'center', 'Total: '+playerMovementPoints, 
            canvas.width / 2, 500);
    }

} // end of draw board 

function drawPieces() {
  //
}

function drawCreditsMenu(){
  if(showCredits)
  {
    //@todo: insert actual credits
    canvasContext.drawImage(pause_background, 0,0);
    drawText(24, 'white', 'center', 'CREDITS', canvas.width / 2, 80);

    var leftX = 14;
    var topY = 135;
    var skipY = 18;
    for(let i=0; i<creditsList.length; i++) {
      drawText(11, 'white', 'left', creditsList[i], leftX, topY+i*skipY);
    }

    pauseMenuButtons.style.display = 'none';
  }
}

function drawInstructionsMenu(){
  if(showInstructionsMenu)
  {
    canvasContext.drawImage(help_screen, 0,0);
  }
}

function drawPauseMenu(){
  if(gamePaused)
  {
    canvasContext.drawImage(pause_background, 0,0);
    pauseMenuButtons.style.display = 'block';
    drawText(24, 'white', 'center', 'PAUSED', canvas.width / 2, 150);
    drawText(18, 'white', 'center', 'Background', 125, canvas.height / 2);
    backgroundSelect.style.display = "block";
  }
  else
  {
    pauseMenuButtons.style.display = 'none';
  }
}

function drawPauseButton() {
  if(roundStarted)
  {
    pauseButton.style.display = "block";
  } else {
    pauseButton.style.display = "none";
  }
}

function drawMainMenu() {
  if(showMainMenu) 
  {
    drawBackground();
    drawMainTitle(); 
    menuButtonsDiv.style.display = 'block';
  } else {
    menuButtonsDiv.style.display = 'none';
  }
}

function drawBackToMenuButton() {
  if(!showMainMenu && (showCredits || showInstructionsMenu)) {
    backToMenuButton.style.display = 'block';
  } else {
    backToMenuButton.style.display = 'none';
  }
}

function drawMainTitle() {
  drawText(20, 'black', 'center', 'The Game of UR', canvas.width / 2, 15);
}
