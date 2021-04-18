const playButton = document.getElementById("playButton");
const backToMenuButton = document.getElementById("backToMenuButton");

var showMainMenu = true;
var roundStarted = false;

playButton.addEventListener("click", handlePlayButtonClick);
backToMenuButton.addEventListener("click", handleBackToMenuButtonClick);

gameResetButton.addEventListener("click", resetGame);

function handlePlayButtonClick() {
    showMainMenu = false;
    roundStarted = true;
}

function handleBackToMenuButtonClick() {
    showMainMenu = true;
    showCredits = false;
    showInstructionsMenu = false;
}

function resetGame() {
    window.location.reload();
}
