var gamePaused = false;
var musicOn = true;
var soundsOn = true;

pauseButton.addEventListener("click", handlePauseButtonClick);
musicToggleButton.addEventListener("click", handleMusicToggleButtonClick);
soundEffectsToggleButton.addEventListener("click", handleSoundsButtonClick);


function handlePauseButtonClick() {
    gamePaused =! gamePaused;

    if (gameplayMusic.paused && musicOn) {
        gameplayMusic.play();
    } else {
        gameplayMusic.pause();
    }
}

function handleMusicToggleButtonClick() {
    musicOn = !musicOn;

    if(musicOn == false) {
        //gameplayMusic.pause();
        musicToggleButton.innerHTML = "Music: off";
    } else {
        musicToggleButton.innerHTML = "Music: on";
    }
}

function handleSoundsButtonClick() {
    soundsOn = !soundsOn;

    if(soundsOn == false) {
        soundEffectsToggleButton.innerHTML = "Sound Effects: off";
    } else {
        soundEffectsToggleButton.innerHTML = "Sound Effects: on";
    }
}
