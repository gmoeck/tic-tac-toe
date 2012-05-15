var AllCellsTracker = require('../../src/all_cells_tracker').AllCellsTracker;
var PlayerRole = require('./roles/player').PlayerRole;

describe('AllCellsTracker', function() {
  var tracker, player;
  beforeEach(function() {
    tracker = new AllCellsTracker();
    player = new PlayerRole();
  });

  it('tells the current player to receive a cell when that cell has not been selected before', function() {
    tracker.newPlayersTurn(player);
    tracker.cellSelected({row: 1, column: 1});

    expect(player.receiveCell).toHaveBeenCalledWith({row: 1, column: 1});
  });

  it('does nothing when the selected cell has been selected already', function() {
    tracker.newPlayersTurn(player);
    tracker.cellSelected({row: 1, column: 1});
    player.receiveCell.reset();

    tracker.cellSelected({row: 1, column: 1});

    expect(player.receiveCell).not.toHaveBeenCalled();
  });
});
