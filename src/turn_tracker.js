var Announcer = require('./util/announcer').Announcer;

var STATES = {
  PLAYER1_TURN: {
    playerOwnsNewCell: function(newCellInformation) {
      this._announcer.announce('newPlayersTurn', this._player2);
      this._currentState = STATES.PLAYER2_TURN;
    }
  },

  PLAYER2_TURN: {
    playerOwnsNewCell: function(newCellInformation) {
      this._announcer.announce('newPlayersTurn', this._player1);
      this._currentState = STATES.PLAYER1_TURN;
    }
  }
};

var TurnTracker = function(player1, player2) {
  this._announcer = new Announcer();
  this._player1 = player1;
  this._player2 = player2;
  this._currentState = STATES.PLAYER1_TURN;
};

TurnTracker.prototype = {
  addListener: function(event, listener) {
    this._announcer.addListener(event, listener);
  },

  playerOwnsNewCell: function(newCellInformation) {
    this._currentState.playerOwnsNewCell.call(this, newCellInformation);
  },

  startNewGame: function() {
    this._announcer.announce('newPlayersTurn', this._player1);
    this._currentState = STATES.PLAYER1_TURN;
  }
};

exports.TurnTracker = TurnTracker;
