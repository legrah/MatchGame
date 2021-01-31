/******************************************************************/
/* Matching Game using Pantone's Colour of the Year for 2015-2021 */
/******************************************************************/

var cells = document.getElementsByClassName("cell");
var cellsArray = [...cells];

var cellColours = document.getElementsByClassName("cellcolour");
var cellColoursArray = [...cellColours];

var selectedColours = [];
var matchedColours = [];

var matchattempts = 0;

// shuffle elements into random array positions
function shuffle(array) {
	var currentIndex = array.length,
		tempVal,
		randomIndex;

	//randomize the index position of all elements in the array
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		tempVal = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempVal;
	}
	return array;
}

// start the game. Hides and randomizes colours in the table
function startGame() {
	// clear these out in case gameover hasn't run
	selectedColours = [];
	matchedColours = [];
	
	var shuffled = shuffle(cellColoursArray);

	for (var i = 0; i < shuffled.length; i++) {
		// remove colour from cell
		cells[i].innerHTML = "";

		// add new colour to cell	
		cells[i].appendChild(shuffled[i]);

		// hide the colour
		shuffled[i].classList.add("hide");
	}

	// add event listener to show colours on click to each td element
	for (var i = 0; i < cellsArray.length; i++) {
		cellsArray[i].addEventListener("click", showColour);
	}
}

// show selected colour
function showColour() {
	// if colour has already been matched do nothing
	if (this.children[0].classList.contains("matched")) {
		return;
	}
	
	this.children[0].classList.remove("hide");
	checkMatch(this.children[0]);
}

// check if 2 colours are selected, and if so compare them to see if they match
function checkMatch(colour) {
	selectedColours.push(colour);	
	
	if (selectedColours.length == 2) {		
		matchattempts += 1; // increase the match count	
		
		//check if it's a match
		if (selectedColours[0].title == selectedColours[1].title) {
			match();
		} else {
			noMatch();
		}
	}
}

// colours don't match, show for 1 second then hide again
function noMatch() {
	// no clicking until colours are hidden
	for (var i = 0; i < cellsArray.length; i++) {
		cellsArray[i].classList.add("noclick");
	}

	// time out 1 second to view selected colours
	setTimeout(function() {
		selectedColours[0].classList.add("hide");
		selectedColours[1].classList.add("hide");

		selectedColours = [];

		// allow clicking now the colours are hidden
		for (var i = 0; i < cellsArray.length; i++) {
			cellsArray[i].classList.remove("noclick");
		}
	}, 1000);
}

// add colours to matched list and empty the selection array
function match() {
	matchedColours.push(selectedColours[0]);
	matchedColours.push(selectedColours[1]);
	selectedColours[0].classList.add("matched");
	selectedColours[1].classList.add("matched");
	
	selectedColours = [];

	// matched them all? Game over!
	if (matchedColours.length == 16) {
		gameOver();
	}
}

// show dialog with option to play again
function gameOver() {
	matchedColours = [];

	// time out to avoid colour not showing before message pops up
	setTimeout(function() {
		if (confirm("Congratulations! You matched all the colours in " + matchattempts.toString() + " attempts! Start a new game?")) {
			startGame();
		}
	}, 100);
}