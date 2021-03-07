const howToPlayButton = document.getElementById("howToPlayButton");
var showInstructionsMenu = false;

howToPlayButton.addEventListener("click", handleHowToPlayButtonClick);

function handleHowToPlayButtonClick() {
    debug("How To Play Button was clicked");

    //I'm feeling fancy.
    setTimeout(() => debug(""), 2000);

    showInstructionsMenu =! showInstructionsMenu;

}

