const onePlayerButton = document.getElementById("playButton1");
const twoPlayerButton = document.getElementById("playButton2");
const backToMenuButton = document.getElementById("backToMenuButton");

var showMainMenu = true;
var roundStarted = false;

onePlayerButton.addEventListener("click", handleOnePlayerButtonClick);
twoPlayerButton.addEventListener("click", handleTwoPlayerButtonClick);
backToMenuButton.addEventListener("click", handleBackToMenuButtonClick);

gameResetButton.addEventListener("click", resetGame);

function handleOnePlayerButtonClick() {
    singlePlayerMode = true;
    showMainMenu = false;
    roundStarted = true;
}

function handleTwoPlayerButtonClick() {
    showMainMenu = false;
    roundStarted = true;
}

function handleBackToMenuButtonClick() {
    showMainMenu = true;
    showCredits = false;
    showInstructionsMenu = false;
    singlePlayerMode = false;
}

function resetGame() {
    window.location.reload();
}
