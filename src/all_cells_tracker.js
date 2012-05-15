var AllCellsTracker = function() {
  this._selectedCells = [];
};

AllCellsTracker.prototype = {
  cellSelected: function(cellInformation) {
    if (this._cellHasNotBeenSelected(cellInformation)) {
      this._currentPlayer.receiveCell(cellInformation);
      this._selectedCells.push(cellInformation);
    }
  },

  newPlayersTurn: function(player) {
    this._currentPlayer = player;
  },

  _cellHasNotBeenSelected: function(cellInformation) {
    return this._selectedCells.filter(cellsAreEqual.bind(this, cellInformation)).length === 0;
  }
};

var cellsAreEqual = function(cellInformation1, cellInformation2) {
  return (cellInformation1.row === cellInformation2.row &&
          cellInformation1.column === cellInformation2.column);
};

exports.AllCellsTracker = AllCellsTracker;
