var Announcer = require('./util/announcer').Announcer;

var Player = function(marker, board) {
  this._rows = [];
  this._columns = [];
  for(var i = 0; i < 3; i++) {
    this._rows[i] = new CellTracker(3);
    this._columns[i] = new CellTracker(3);
  }
  this._topDiagonal = new CellTracker(3);
  this._bottomDiagonal = new CellTracker(3);
  this._marker = marker;
  this._board = board;
  this._annoucer = new Announcer();
};

Player.prototype = {
  addListener: function(event, listener) {
    this._annoucer.addListener(event, listener);
  },

  receiveCell: function(cellInformation) {
    this._board.markCell(cellInformation.row, cellInformation.column, this._marker);
    this._annoucer.announce('playerOwnsNewCell', cellInformation);
    this._rows[cellInformation.row].takeCell();
    this._columns[cellInformation.column].takeCell();
    if (this._isInTopDiagonal(cellInformation)) {
      this._topDiagonal.takeCell();
    };
    if (this._isInBottomDiagonal(cellInformation)) {
      this._bottomDiagonal.takeCell();
    }
    if (this._hasWonGame(cellInformation)) {
      this._annoucer.announce('playerWonGame', {player: this._marker});
    }
  },

  _hasWonGame: function(cellInformation) {
    return (this._rows[cellInformation.row].hasAllCells() ||
            this._columns[cellInformation.column].hasAllCells() ||
            this._topDiagonal.hasAllCells() ||
            this._bottomDiagonal.hasAllCells()
           );

  },

  _isInBottomDiagonal: function(cellInformation) {
    return cellInformation.row + cellInformation.column == 2;
  },

  _isInTopDiagonal: function(cellInformation) {
    return cellInformation.row === cellInformation.column;
  }
};

var CellTracker = function(totalCells) {
  this._remainingCells = totalCells;
};

CellTracker.prototype = {
  takeCell: function() {
    this._remainingCells -= 1;
  },

  hasAllCells: function() {
    return this._remainingCells === 0;
  }
};

exports.Player = Player;
