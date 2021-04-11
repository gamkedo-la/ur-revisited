const creditsButton = document.getElementById("creditsButton");
var showCredits = false;

creditsButton.addEventListener("click", handleCreditsButtonClick);

function handleCreditsButtonClick() {
    showCredits =! showCredits;
    showMainMenu = false;
}
