var DOMBoardView = require('./ui/dom_board_view').DOMBoardView;
var DOMAlertRenderer = require('./ui/dom_alert_renderer').DOMAlertRenderer;
var TurnTracker = require('./turn_tracker').TurnTracker;
var Player = require('./player').Player;
var AllCellsTracker = require('./all_cells_tracker').AllCellsTracker;

var NUM_ROWS = 3;
var NUM_COLUMNS = 3;

document.addEventListener("DOMContentLoaded", function() {
  var boardView = new DOMBoardView();
  var player1 = new Player('X', boardView);
  var player2 = new Player('O', boardView);
  var turnTracker = new TurnTracker(player1, player2);
  var allCellsTracker = new AllCellsTracker();
  var alertRenderer = new DOMAlertRenderer();

  turnTracker.addListener('newPlayersTurn', allCellsTracker);
  boardView.addListener('cellSelected', allCellsTracker);
  player1.addListener('playerOwnsNewCell', turnTracker);
  player2.addListener('playerOwnsNewCell', turnTracker);
  player1.addListener('playerWonGame', alertRenderer);
  player2.addListener('playerWonGame', alertRenderer);

  turnTracker.startNewGame();
  boardView.renderBoard(NUM_ROWS, NUM_COLUMNS);
});
