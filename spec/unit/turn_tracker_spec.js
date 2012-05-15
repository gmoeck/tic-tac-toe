var TurnTracker = require('../../src/turn_tracker').TurnTracker;

var TurnTrackerListenerRole = function() {
  this.newPlayersTurn = jasmine.createSpy('turnTrackerListenerRole#newPlayersTurn');
};

var PlayerRole = require('./roles/player').PlayerRole;

describe('TurnTracker', function() {
  var turnTracker, listener, player1, player2;
  beforeEach(function() {
    player1 = new PlayerRole(1);
    player2 = new PlayerRole(2);

    turnTracker = new TurnTracker(player1, player2);
    listener = new TurnTrackerListenerRole();
    turnTracker.addListener('newPlayersTurn', listener);
  });

  it('notifies its listeners that it is the first players turn when told to start ' +
     'a new game', function() {
    turnTracker.startNewGame();

    expect(listener.newPlayersTurn).toHaveBeenCalledWith(player1);
  });

  it('notifies its listeners that it is the next players turn when told to that a ' +
     'player now owns a new cell', function() {
    turnTracker.startNewGame();
    listener.newPlayersTurn.reset();

    turnTracker.playerOwnsNewCell({player: 1, row: 1, column: 1});

    expect(listener.newPlayersTurn).toHaveBeenCalledWith(player2);
  });

  it('notifies its listeners that it is the first players turn again when told that ' +
     'the last player now owns a cell', function() {
    turnTracker.startNewGame();
    listener.newPlayersTurn.reset();

    turnTracker.playerOwnsNewCell({player: 1, row: 1, column: 1});
    listener.newPlayersTurn.reset();
    turnTracker.playerOwnsNewCell({player: 2, row: 0, column: 0});

    expect(listener.newPlayersTurn).toHaveBeenCalledWith(player1);
  });
});
