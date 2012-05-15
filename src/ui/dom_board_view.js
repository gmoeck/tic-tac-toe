var Announcer = require('../util/announcer').Announcer;

var DOMBoardView = function(rows, columns) {
  this._annoucer = new Announcer();
};

DOMBoardView.prototype = {
  addListener: function(event, listener) {
    this._annoucer.addListener(event, listener);
  },

  markCell: function(row, column, marker) {
    var cell = document.querySelector('[data-board-x="' + column + '"]' +
                                      '[data-board-y="' + row + '"]');
    cell.innerText = marker;
  },

  remove: function() {
    document.body.removeChild(this._board);
  },

  renderBoard: function(rows, columns) {
    this._numRows = rows;
    this._numColumns = columns;
    this._board = this._createBoard();
    document.body.appendChild(this._board);
  },

  _createBoard: function() {
    var board = document.createElement('div');
    board.id = 'board';
    this._createRows().forEach(function(row) {
      board.appendChild(row);
    });
    return board;
  },

  _createRows: function() {
    var rows = [];
    for (var i = 0; i < this._numRows; i++) {
      rows.push(this._createRow(i));
    }
    return rows;
  },

  _createRow: function(rowNumber) {
    var row = document.createElement('div');
    row.className = 'row';
    if (rowNumber === (this._numRows - 1)) {
      row.className += ' last';
    }
    this._createCellsForRow(rowNumber).forEach(function(cell) {
      row.appendChild(cell);
    });
    return row;
  },

  _createCellsForRow: function(rowNumber) {
    var cells = [];
    for (var i = 0; i < this._numColumns; i++) {
      cells.push(this._cellFor(rowNumber, i));
    }
    return cells;
  },

  _cellFor: function(row, column) {
    var cell = document.createElement('div');
    cell.className = 'cell';
    if( column === (this._numColumns - 1)) {
      cell.className += ' last';
    }
    cell.setAttribute('data-board-y', row);
    cell.setAttribute('data-board-x', column);
    cell.addEventListener('click', this._cellClicked.bind(this, row, column));
    return cell;
  },

  _cellClicked: function(row, column) {
    this._annoucer.announce('cellSelected', {row: row, column: column});
  }
};

exports.DOMBoardView = DOMBoardView;
