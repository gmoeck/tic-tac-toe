var Player = require('../../src/player').Player;

var BoardRole = require('./roles/board').BoardRole;
var PlayerListenerRole = function() {
  this.playerOwnsNewCell = jasmine.createSpy('playerListenerRole#playerOwnsNewCell');
  this.playerWonGame = jasmine.createSpy('playerListenerRole#playerWonGame');
};

describe('Player', function() {
  var player, board, listener;
  beforeEach(function() {
    board = new BoardRole();
    player = new Player('X', board);
    listener = new PlayerListenerRole();
    player.addListener('playerOwnsNewCell', listener);
    player.addListener('playerWonGame', listener);
  });

  describe('when it is told that to receive a cell', function() {
    beforeEach(function() {
      player.receiveCell({row: 2, column: 2});
    });

    it('tells its board to mark that square with its marker', function() {
      expect(board.markCell).toHaveBeenCalledWith(2,2,'X');
    });

    it('notifies its listeners that it owns the cell that was selected', function() {
      expect(listener.playerOwnsNewCell).toHaveBeenCalledWith({row: 2, column: 2});
    });
  });

  it('notifies its listeners that it has won the game when it is receives all the ' +
     'cells in a row', function() {
    player.receiveCell({row: 0, column: 0});
    player.receiveCell({row: 0, column: 1});
    player.receiveCell({row: 0, column: 2});
    expect(listener.playerWonGame).toHaveBeenCalledWith({player: 'X'});
  });

  it('has not won until it has all the cells in a row', function() {
    player.receiveCell({row: 0, column: 0});
    player.receiveCell({row: 0, column: 1});
    player.receiveCell({row: 1, column: 2});

    expect(listener.playerWonGame).not.toHaveBeenCalled();
  });

  it('notifies its listeners that it has won the game when it receives all the ' +
     'cells in a column', function() {
    player.receiveCell({row: 0, column: 0});
    player.receiveCell({row: 1, column: 0});
    player.receiveCell({row: 2, column: 0});
    expect(listener.playerWonGame).toHaveBeenCalledWith({player: 'X'});
  });

  it('notifies its listeners that it has won the game when it receives all the ' +
     'cells in the top diagonal', function() {
    player.receiveCell({row: 0, column: 0});
    player.receiveCell({row: 1, column: 1});
    player.receiveCell({row: 2, column: 2});
    expect(listener.playerWonGame).toHaveBeenCalledWith({player: 'X'});
  });

  it('notifies its listeners that it has won the game when it receives all the ' +
     'cells in the bottom diagonal', function() {
    player.receiveCell({row: 2, column: 0});
    player.receiveCell({row: 1, column: 1});
    player.receiveCell({row: 0, column: 2});
    expect(listener.playerWonGame).toHaveBeenCalledWith({player: 'X'});
  });
});
