"use strict";

// Game api
var Game = (function() {
  var exports = {};
  var deck;

  exports.newGame = function(players) {
    players.forEach(function (player) { player.discardHand(); });
    deck = new Deck();
  }

  exports.postBet = function(player, bet) {
    player.postBet(bet)
  }

  exports.dealHands = function(players) {
    players.forEach(function (player) {
      player.hit(deck.getCard());
      player.hit(deck.getCard());
    });
  }

  exports.dealCard = function(player) {
    player.hit(deck.getCard());
  }

  exports.checkHand = function(player) {
    if (player.bust()) return "bust";
    if (player.twentyOne()) return "21";
  }

  exports.playerWins = function(player, dealer) {
    return player.handTotal() > dealer.handTotal();
  }

  return exports;
})();



// Dom api
var Dom = (function() {
  var exports = {};

  exports.removeCards = function() {
    $('.card-slot').empty();
    $('.card-slot').addClass('free');
  }

  exports.toggleButton = function(turnOff, turnOn) {
    $(turnOff).hide();
    $(turnOn).show();
  }

  exports.getBet = function(target) {
    // need to uncheck radio button after it gets hidden
    var $button = $(target).children('input[type="radio"]:checked');
    return parseInt($button.val());
  }

  exports.updateBalance = function(player) {
    $('#balance').text(player.balance);
    $('#currentBet').text(player.bet);
  }

  exports.dealAllHands = function(players) {
    players.forEach(function (player) {
      this.updateHand(player);
    }, this);
  }

  // figure out a way to clean this up
  // also add more slots
  exports.updateHand = function(player) {
    var $freeSlots = $('.'+player.domClass+'-card-slot.free');
    player.unDealtCards().forEach(function (card, index) {
      appendCard(card, $($freeSlots[index]));
    })
  }

  // private
  function appendCard(card, slot) {
    slot.removeClass('free').append(imageFrom(card));
    card.dealt = true;
  }

  function imageFrom(card) {
    return $('<img>').attr('class', 'card').attr('src', card.image);
  }

  return exports;
})();