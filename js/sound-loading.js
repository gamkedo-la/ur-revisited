var diceRoll1 = new Audio("sounds/dice_roll_1.wav");
var diceRoll2 = new Audio("sounds/dice_roll_2.wav");
var diceRoll3 = new Audio("sounds/dice_roll_3.wav");
var pieceMovementSFX = new Audio("sounds/moveSFX.wav");
var pieceSelectSFX = new Audio("sounds/selectSFX.wav");
var gameplayMusic = new Audio("sounds/gameplayMusic.mp3");

var prevDiceRollSound = 0;

var diceRollSounds = [diceRoll1, diceRoll2, diceRoll3];

function loadSounds() {
	for (var i = 0; i < diceRollSounds.length; i++) {
		diceRollSounds[i].volume = .25;
		diceRollSounds[i].load();
	}
	pieceMovementSFX.volume = .25;
	pieceMovementSFX.load();
	pieceSelectSFX.volume = .25;
	pieceSelectSFX.load();

	gameplayMusic.volume = .2;
	gameplayMusic.loop = true;
	gameplayMusic.load();
	gameplayMusic.play();
}