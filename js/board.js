const TILE_W = 40;
const TILE_H = 40;
const TILE_GAP = 2;
const BOARD_COLS = 7;
const BOARD_ROWS = 12;
const BOARD_X_OFFSET = 60;
const BOARD_Y_OFFSET = 60;

const GAME_BOARD = [
   5,0,0,0,0,0,6,
   5,0,2,1,2,0,6,
   5,0,1,1,1,0,6,
   5,0,1,1,1,0,6,
   5,0,3,2,3,0,6,
   5,0,0,1,0,0,6,
   5,0,4,1,4,0,6,
   0,0,2,1,2,0,0,
   0,0,1,1,1,0,0,
   0,0,0,0,0,0,0,
   0,8,7,7,7,7,0,
   0,0,0,0,0,0,0,
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
                
                
                drawTileX += TILE_W;
                arrayIndex++;

        } // end of for each col
    drawTileY += TILE_H;
    var drawTileX = BOARD_X_OFFSET;
    } // end of for each row
} // end of draw board 

function drawPieces() {
  //
}
