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
const DICE_0 = 10;
const DICE_1 = 11;

const EMPTY_TILES = [ TILE_END, BOARD_EMPTY_SPACE ]

// Extra tiles
const TILE_GATE = 12;
const TILE_HOUSE = 13;
const TILE_MARKET = 14;
const TILE_TEMPLE = 15;
const TILE_TREASURY = 16;

const BOARD_TILES = [
  TILE_BLANK,
  TILE_GATE,
  TILE_HOUSE,
  TILE_MARKET,
  TILE_TEMPLE,
  TILE_TREASURY,
  PLAYER_1_HOME_ROW,
  PLAYER_2_HOME_ROW,
];

var player1PieceIndices = [];
var player2PieceIndices = [];

function setupBoard() {
  //clear the board
  player1PieceIndices = [];
  player2PieceIndices = [];

  // add player pieces to home rows
  for(var i=0;i<GAME_BOARD.length;i++) {
    if(GAME_BOARD[i] == PLAYER_1_HOME_ROW) {
      player1PieceIndices.push(i);
    }
    if(GAME_BOARD[i] == PLAYER_2_HOME_ROW) {
      player2PieceIndices.push(i);
    }
  }
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
                // if a piece is here, draw it too
                if(player1PieceIndices.includes(arrayIndex)) {
                  canvasContext.drawImage(player1Piece, drawTileX,drawTileY);
                }
                if(player2PieceIndices.includes(arrayIndex)) {
                  canvasContext.drawImage(player2Piece, drawTileX,drawTileY);
                }

                // if the selected piece can move here
                if(selectedCanMoveToIdx == arrayIndex) {
                  colorRect(drawTileX+3,drawTileY+3, TILE_W - 6,TILE_H - 6, rgba(0, 255, 0, 0.5));
                }
                
                
                drawTileX += TILE_W;
                arrayIndex++;

        } // end of for each col
    drawTileY += TILE_H;
    var drawTileX = BOARD_X_OFFSET;
    } // end of for each row
  drawMainTitle();
} // end of draw board 

function drawPieces() {
  //
}

function   drawInstructionsMenu(){
  if(showInstructionsMenu)
  {
    var width = 300;
    var height = 300;
  
    colorRect(canvas.width / 2 - (width/2), canvas.width / 4, width, height , 'rgba(255, 0, 0, 0.8)');
    drawText(15, 'white', 'center', 'Instructions', canvas.width / 2, canvas.width / 4+3);
  }
}

function drawMainTitle() {
  drawText(20, 'black', 'center', 'The Game of UR', canvas.width / 2, 15);
}
