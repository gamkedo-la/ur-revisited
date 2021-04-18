var gamePaused = false;

pauseButton.addEventListener("click", handlePauseButtonClick);

function handlePauseButtonClick() {
    gamePaused =! gamePaused;

    if (gameplayMusic.paused) {
        gameplayMusic.play();
    } else {
        gameplayMusic.pause();
    }
}

