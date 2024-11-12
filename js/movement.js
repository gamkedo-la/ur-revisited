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

var currentPlayerPath = PLAYER_1_PATH;
var currentPlayerPieceList = []; // initial value set in setupBoard() in js/board.js
var opponentPlayerPieceList = [];


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
  var movesArray = [];

    // for each piece in current player's list
  for(var i=0;i<currentPlayerPieceList.length;i++) {
      // if this piece won't land on another friendly piece when moved...
    if(!currentPlayerPieceList.includes(getAvailableMove(currentPlayerPieceList[i]))
        // and it will not land on an occupied center rosary piece
      && !(currentPlayerPieceList[i] == 31 && opponentPlayerPieceList.includes(31)) 
        // and endIdx will still be on the board
      && typeof(getAvailableMove(currentPlayerPieceList[i])) != "undefined" ) {

        movesArray.push({
          startIdx: currentPlayerPieceList[i],
          endIdx: getAvailableMove(currentPlayerPieceList[i])
        });
    }
  }
  return movesArray;
}

function waitOneSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('done');
        }, 1000);
    });
}

async function runAIPlayerTurn() {
    while(currentPlayer === 2) {
        rollDice();

        await waitOneSecond();

        let possibleMoves = getAvailablePlayerMoves(2);

        makeAIPlayerMove(possibleMoves);

        await waitOneSecond();
    }

}

function makeAIPlayerMove(possibleMoves) {
    console.log("possible moves", possibleMoves);
    if(possibleMoves.length > 0) {
        let pickedMove = possibleMoves[randomIdx(possibleMoves)];
        console.log("picked move", pickedMove)

        // make the move
        tryToSelectPiece(pickedMove.startIdx);
        tryToMoveSelectedPiece(pickedMove.endIdx);

        console.log("made move");

    } else { // ie - no available moves
        // end player turn 
    }
}
