const howToPlayButton = document.getElementById("howToPlayButton");
var showInstructionsMenu = false;

howToPlayButton.addEventListener("click", handleHowToPlayButtonClick);

function handleHowToPlayButtonClick() {
    showInstructionsMenu =! showInstructionsMenu;
    showMainMenu = false;

}

