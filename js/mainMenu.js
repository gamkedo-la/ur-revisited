const playButton = document.getElementById("playButton");
const backToMenuButton = document.getElementById("backToMenuButton");

var showMainMenu = true;

playButton.addEventListener("click", handlePlayButtonClick);
backToMenuButton.addEventListener("click", handleBackToMenuButtonClick);

function handlePlayButtonClick() {
    showMainMenu = false;
}

function handleBackToMenuButtonClick() {
    showMainMenu = true;
    showCredits = false;
    showInstructionsMenu = false;
}

