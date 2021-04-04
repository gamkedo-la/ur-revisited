const pauseButton = document.getElementById("pauseButton");
var gamePaused = false;

pauseButton.addEventListener("click", handlePauseButtonClick);

function handlePauseButtonClick() {
    gamePaused =! gamePaused;
}

