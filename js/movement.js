const PLAYER_1_PATH = [
// left col    center col              left col
  30,23,16,9, 10,17,24,31,38,45,52,59, 58,51, 44
];

const PLAYER_2_PATH = [
// right col   center col              right col
  32,25,18,11, 10,17,24,31,38,45,52,59, 60,53, 46
];

var playerMovementPoints = 0;
var selectedCanMoveToIdx = -1;


function getAvailableMove(pieceIdx) {
  if(currentPlayer == 1) {
    var pathIndexOfMoveStart = 
      PLAYER_1_PATH.indexOf(pieceIdx);
    return PLAYER_1_PATH[pathIndexOfMoveStart + playerMovementPoints];
  } else {
    var pathIndexOfMoveStart = 
      PLAYER_2_PATH.indexOf(pieceIdx);
    return PLAYER_2_PATH[pathIndexOfMoveStart + playerMovementPoints];
  }
}

// move to AI file?
function getAvailablePlayerMoves(playerNum) {
  var pieceIndexArray = [];
  var playerPath = [];
  var movesArray = [];

  if(playerNum == 1) {
    pieceIndexArray = player1PieceIndices;
    playerPath = PLAYER_1_PATH;
  } else {
    pieceIndexArray = player2PieceIndices;
    playerPath = PLAYER_2_PATH;
  }

  for(var i=0;i<pieceIndexArray.length;i++) {
    if(playerPath.includes(pieceIndexArray[i]){
      movesArray.push({
        startIdx: pieceIndexArray[i],
        endIdx: getAvailableMove(pieceIndexArray[i])
      });
    }
  }
  return movesArray;
}
