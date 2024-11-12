var canvas, canvasContext;
var singlePlayerMode = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadImages();
    loadSounds();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupMouseInput();
    setupBoard();
    // hack to skip main menu
    handleTwoPlayerButtonClick();
}

function updateAll() {
    moveEverything();
    drawEverything();
}

function moveEverything() {
    //
}

function drawEverything() {
    // draw background
    //colorRect(0, 0, canvas.width, canvas.height, 'tan');
    //canvasContext.drawImage(background_modernWood, 0, 0);
    //canvasContext.drawImage(background_sandStone, 0, 0);
    drawBackground();
    drawBoard();
    drawPieces();
    drawPauseMenu();
    drawPauseButton();
    drawMainMenu();
    drawCreditsMenu()
    drawInstructionsMenu();
    drawBackToMenuButton();
}

// quick debug function for debugging while working on
// a mobile device without access to `console.log()`
function debug(text) {
    //document.getElementById('debugText').innerHTML = text;
}

function winTester() {
    player1PieceIndices = [0];
    player2PieceIndices = [6];
}

function randomIdx(arrayArg) {
    let max = arrayArg.length - 1;

    let idx = Math.floor(Math.random()*max);

    return idx;
}
