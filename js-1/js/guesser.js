'use strict'

var GIVEN_NUMBER = 18

var isAnotherRound = true;
var userGuess;

while (isAnotherRound) {
  userGuess = parseFloat(prompt('Try to guess the given number'));
  switch (true) {
    case ( GIVEN_NUMBER < userGuess ):
      alert('given numger is lesser than your guess. Try more')
      break;

    case ( GIVEN_NUMBER > userGuess ):
      alert('given numger is greater than your guess. Try more')
      break;
    case ( GIVEN_NUMBER === userGuess ):
      isAnotherRound = confirm('Yes! Next try?')
      break;
    default:
      break;
  }
}
