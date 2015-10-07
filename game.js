"use strict";

// if dealer has > 17 and is going to lose.. dealer should hit
// check hand at beginning of game
// allow for more cards and make card positioning better
// redesign ace logic... 2 aces sometimes comes out to 11 and 1
  // instead of 1 and 1
// possibly hideAll() and showAll() functions for dom api
  // instead of toggleButton
// 21 on deal should automatically stop game and win
// if dealer has 17 with an ace they should hit again?


var player      = new User('Yag');
var dealer      = new Dealer();
var allPlayers  = [player, dealer];


Dom.updateBalance(player);


function newGame() {
  refreshHands();
  Dom.newGame();
  Dom.toggleButton(event.target, '#betControls');
}

function postBet() {
  event.preventDefault();
  var bet = Dom.getBet(event.target);

  player.postBet(bet);
  Dom.updateBalance(player);
  Dom.toggleButton(event.target, '#deal');
}

function dealHands() {
  dealer.dealHands(allPlayers);
  Dom.dealAllHands(allPlayers);
  Dom.toggleButton(event.target, '.hitStay');

  if (player.twentyOne())
    playerWins();
  else if (dealer.twentyOne())
    playerLoses();
}

function hitPlayer() {
  dealer.dealCard(player);
  Dom.updateHand(player);

  if (player.twentyOne())
    playerWins();
  else if (player.bust())
    playerLoses();
}

function dealerTurn() {
  while (dealer.hitting) {
    dealer.dealCard(dealer);
    Dom.updateHand(dealer);
  }

  if (dealer.twentyOne())
    playerLoses();
  else if (dealer.bust())
    playerWins();
  else
    findWinner();
}





// private
function findWinner() {
  player.handTotal() > dealer.handTotal() ? playerWins() : playerLoses()
}

function refreshHands() {
  allPlayers.forEach(function (player) {
    player.discardHand();
  })
}

function playerWins() {
  Dom.gameMessage('You win!');
  player.winBet();
  Dom.updateBalance(player);
  Dom.newGamePrompt();
}

function playerLoses() {
  Dom.gameMessage('You lose!');
  player.loseBet();
  Dom.updateBalance(player);
  Dom.newGamePrompt();
}