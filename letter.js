// this function will reveal the letter in main.js or will keep it hidden 
function Letter(letterGuessed) {
	this.letterGuessed = letterGuessed;
	this.show = false;

	this.letterReturn = function() {
		return this.letterGuessed;
	};
}

module.exports = Letter;