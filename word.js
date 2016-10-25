var Letter = require('./letter.js');

function Word(randomWord) {
	this.randomWord = randomWord;
	this.lettersGuessed = [];
	this.found = false;

	this.getLetters = function() {
		for (var i = 0; i < this.randomWord.length; i++) {
			var letterConstructor = new Letter(this.randomWord[i]);
			this.lettersGuessed.push(letterConstructor);
		}

		if (this.findWord()) {
			return true;
		} else {
			return false;
		}		
	};

	this.findWord = function() {
		var count = 0;
		for (var i = 0; i < this.lettersGuessed.length; i++) {
			if (this.lettersGuessed[i].appear === true) {
				count++;
			}
		}
		if (count === this.randomWord.length) {
			this.found = true;
		} 
		return this.found;
	};

	this.lettersFound = function(guessLetter) {
		var whatToReturn = 0;
		for (var i = 0; i < this.lettersGuessed.length; i++) {
			if (this.lettersGuessed[i].letterGuessed === guessLetter) {
				this.lettersGuessed[i].appear = true;
				whatToReturn++;
			}
		}
		return whatToReturn;
	};

	this.wordRender = function() {
		var str = "";
		for (var i = 0; i < this.lettersGuessed.length; i++) {
			if (this.lettersGuessed[i].appear) {
				str += this.lettersGuessed[i].letterGuessed;
			} else {
				str += "_ ";
			}
		}
		return str;
	};
}

module.exports = Word;
