//npm package inquirer
var inquirer = require('inquirer');
//require the wordbank from game.js
var wordbank = require('./game.js');
//require constructors created in word.js
var letters = require('./word.js');

//
var word = new Wordbank();
//number of guesses
var numGuess = 12;
//create a random word from the wordbank constructor
var randomWord = new letters(word.word[Math.floor(Math.random() * word.word.length)]);
//guesses array
var userGuess = [];
//place correct letters here
randomWord.getLetters();
