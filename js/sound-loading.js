var diceRoll1 = new Audio("sounds/dice_roll_1.wav");
var diceRoll2 = new Audio("sounds/dice_roll_2.wav");
var diceRoll3 = new Audio("sounds/dice_roll_3.wav");

var diceRollSounds = [diceRoll1, diceRoll2, diceRoll3];

function loadSounds() {
	for (var i = 0; i < diceRollSounds.length; i++) {
		diceRollSounds[i].volume = .25;
		diceRollSounds[i].load();
	}
}