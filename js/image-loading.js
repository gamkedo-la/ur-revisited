var backgroundSelect = document.getElementById("backgroundSelect");
var menuButtons = document.getElementById("menuButtonsDiv");

var pauseButton = document.getElementById("pauseButton");

var background_modernWood = document.createElement("img");
var background_sandStone = document.createElement("img");
var background_rocks = document.createElement("img");
var background_whitewash = document.createElement("img");
var background_grayMarble = document.createElement("img");
var background_silicate = document.createElement("img");
var background_woodTile = document.createElement("img");
var player1Piece = document.createElement("img");
var player2Piece = document.createElement("img");
var highlight_green = document.createElement("img");

var dice0 = document.createElement("img");
var dice1 = document.createElement("img");

var help_screen = document.createElement("img");

var pause_background = document.createElement("img");

var tilePics = [];

var picsToLoad = 0; //set automatically based on number of imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = "images/" + fileName;
}

function loadImageForTileCode(tileCode, fileName) {
	tilePics[tileCode] = document.createElement("img");
	beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {

	var imageList = [
		{varName: background_modernWood, theFile: "modern_wood.png"},
		{varName: background_sandStone, theFile: "sand_stone.png"},
		{varName: background_rocks, theFile: "background_rocks.png"},
		{varName: background_whitewash, theFile: "background_whitewash.png"},
		{varName: background_grayMarble, theFile: "background_marble.png"},
		{varName: background_silicate, theFile: "background_silicate.png"},
		{varName: background_woodTile, theFile: "bacgkround_woodTile.png"},
		{varName: player1Piece, theFile: "ur_player1_piece.png"},
		{varName: player2Piece, theFile: "ur_player2_piece.png"},
		{varName: highlight_green, theFile: "ur_highlight_green.png"},

		{varName: dice0, theFile: "ur_dice_0.png"},
		{varName: dice1, theFile: "ur_dice_1.png"},

		{tileType: TILE_BLANK, theFile: "ur_blank.png"},
		{tileType: TILE_START, theFile: "ur_blank.png"},
		{tileType: TILE_END, theFile: "transparent_block.png"},
		{tileType: TILE_ROSARY, theFile: "ur_rosary.png"},
		{tileType: PLAYER_1_HOME_ROW, theFile: "ur_blank.png"},
		{tileType: PLAYER_2_HOME_ROW, theFile: "ur_blank.png"},

		{tileType: ROLL_BUTTON, theFile: "ur_roll.png"},
		{tileType: DICE_SPOT, theFile: "ur_dice_0.png"},
		{tileType: DICE_0, theFile: "ur_dice_0.png"},
		{tileType: DICE_1, theFile: "ur_dice_1.png"},

		// Extra tiles
		{tileType: TILE_GATE, theFile: "ur_gate.png"},
		{tileType: TILE_HOUSE, theFile: "ur_house.png"},
		{tileType: TILE_MARKET, theFile: "ur_market.png"},
		{tileType: TILE_TEMPLE, theFile: "ur_temple.png"},
		{tileType: TILE_TREASURY, theFile: "ur_treasury.png"},

		// Help 
		{varName: help_screen, theFile: "help_screen.png"},

		// Pause
		{varName: pause_background, theFile: "pause_background.png"},

		//{tileType: BOARD_EMPTY_SPACE, 
      //theFile: "transparent_block.png"},
		];

	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) { 
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTileCode( imageList[i].tileType, imageList[i].theFile );
		}	
	}
}
