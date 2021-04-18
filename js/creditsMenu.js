const creditsButton = document.getElementById("creditsButton");
var showCredits = false;

creditsButton.addEventListener("click", handleCreditsButtonClick);

function handleCreditsButtonClick() {
    showCredits =! showCredits;
    showMainMenu = false;
}

let creditsList = [
"Jonathan Peterson: Project lead, core gameplay, input refactor, turns system, piece selection and movement, rosary tile logic, main menu structure, end of game, instructions screen design, music and sound effects toggle buttons",
"Philip Greene: Tile art (rosary/rosette, house, gate, market, temple, treasury), wood background, tile loading, dice art with variations, piece art, sound loading, dice roll sounds, highlights, sandstone texture, pause background fade, pause menu, background selector, music loop & music pause implementation,",
"Rami Bukhari: Sound effects (piece selection, piece move), piece knockback when landed on, how to play overlay support, instructions screen implementation",
"Ryan Cahela: Font selection and integration, menu title, bit of code cleanup",
"Alan Zaring: Gameplay music",
"Filipe Dottori: 5 background variations, bug fix during how to play menu, credits screen hookup",
"Chris DeLeon: Compiled credits"," ",
"Created by members in HomeTeamGameDev Outpost"];
let creditsMaxCharWidthToWrap = 54;

function wrapCredits() { // note: gets calling immediately after definition
    let newCut = [];
    let findEnd;
    for(var i=0;i<creditsList.length;i++) {
        while(creditsList[i].length > 0) {
            findEnd = creditsMaxCharWidthToWrap;
            if(creditsList[i].length > creditsMaxCharWidthToWrap) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditsList[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditsList[i].substring(0, findEnd));
            creditsList[i] = creditsList[i].substring(findEnd, creditsList[i].length);
        }
    }
    creditsList = newCut;
}
wrapCredits(); // calling once right at start

