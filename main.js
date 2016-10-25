//npm package inquirer
var inquirer = require('inquirer');
//require the wordbank from game.js
var WordBank = require('./game.js');
//require constructors created in word.js
var Word = require('./word.js');

//
var words = new WordBank();
//number of guesses
var numGuess = 12;
//create a random word from the wordbank constructor
var randomWord = new Word(words[Math.floor(Math.random() * words.length)]);
//guesses array
var userGuess = [];
//place correct letters here
randomWord.getLetters();

var playHangman = function() {
	
	if (numGuess > 0 && randomWord.found === false) {

		console.log("Welcome to Hangman");
		console.log("You have " + numGuess + " guesses left.");
		console.log(randomWord.wordRender() + '\n');

		inquirer.prompt([{
			type: 'text',
			name: 'letterGuessed',
			message: "Pick a letter to solve Hangman.",
			
		}]).then(function(answers) {
			//checks to see if letter is valid
			var isLetter = letterValidation(answers.letterGuessed);
			if (isLetter) {
				userGuess.push(answers.letterGuessed);
				var guardAgainstDuplicatesArr = noDuplicatesinuserGuess(userGuess);
				
				var guessesAmount = randomWord.checkIfLetterFound(answers.letterGuessed);
				console.log(randomWord.wordRender());

				if (guessesAmount === 0) {
					console.log("You guessed wrong!\n");
					numGuess--;
				} else {
					console.log("You guessed right!!!");
					if (randomWord.didWeFindTheWord()) {
						console.log("You won!!!\n");
						console.log("The coffee was " + displayWord(randomWord) + "!");
						return;
					}
				}
				console.log("You have " + numGuess + " guesses.");
				console.log(randomWord.wordRender());
				console.log("Here are the letters already guessed: " + guardAgainstDuplicatesArr.join(", "));
				playHangman();
			} else {
				console.log("That's not a letter. Please choose a letter");
				playHangman();
			}
		})
	} else {
		console.log("Sorry, better luck next time.\n");
		console.log("The coffee was " + displayWord(randomWord) + "...");
	}
}

//this will check for duplicates the user inputs
function noDuplicatesinUserGuesses(userGuessesArr) {
	var duplicatesArr = [];
	for (var i = 0; i < userGuessesArr.length; i++) {
		if (duplicatesArr.indexOf(userGuessesArr[i]) === -1) {
			duplicatesArr.push(userGuessesArr[i]);
		}	
	}
	return duplicatesArr;
}

//displays the word at end of game
function displayWord(hangmanWord) {
	var showWord = "";
	for (var i = 0; i < hangmanWord.correctLetters.length; i++) {
		showWord += hangmanWord.correctLetters[i].letterGuessed;
	}
	return showWord;
}

//makes sure user guesses only letters
function letterValidation(letter) {
	var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
	for (var i = 0; i < validLetters.length; i++) {
		if (validLetters[i] === letter) {
			return true;
		}
	}
	return false;
}

playHangman();
