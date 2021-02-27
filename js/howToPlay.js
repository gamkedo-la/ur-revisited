const howToPlayButton = document.getElementById("howToPlayButton");

howToPlayButton.addEventListener("click", handleHowToPlayButtonClick);

function handleHowToPlayButtonClick() {
    debug("How To Play Button was clicked");

    //I'm feeling fancy.
    setTimeout(() => debug(""), 2000);
}

