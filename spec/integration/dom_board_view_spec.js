var DOMBoardView = require('ui/dom_board_view').DOMBoardView;
var fireEvent = require('./test_helpers').fireEvent;

describe('DOMBoardView', function() {
  var view;
  beforeEach(function() {
    view = new DOMBoardView();
  });

  afterEach(function() {
    view.remove();
  });

  describe('#renderBoard', function() {
    beforeEach(function() {
      view.renderBoard(3,3);
    });

    it('renders the board', function() {
      expect(document.querySelectorAll('#board').length).toBe(1);
    });

    it('renders the proper number of rows', function() {
      expect(document.querySelectorAll('.row').length).toBe(3);
    });

    it('renders the proper number of columns', function() {
      expect(document.querySelectorAll('.cell').length).toBe(9);
    });

    it('puts a last class on the last cells', function() {
      expect(document.querySelector("[data-board-x='2']").className).toContain('last');
    });

    it('puts a last on the last row', function() {
      expect(document.querySelectorAll('.row.last').length).toBe(1);
    });
  });

  describe('clicking on a cell', function() {
    beforeEach(function() {
      view.renderBoard(3,3);
    });
    it('marks the cell with "X" when clicked', function() {
      var listener = {
        cellSelected: jasmine.createSpy('listener#cellSelected')
      };
      view.addListener('cellSelected', listener);

      fireEvent(document.querySelector('[data-board-x="1"][data-board-y="1"]'), 'click');
      expect(listener.cellSelected).toHaveBeenCalledWith({row: 1, column: 1});
    });
  });
});
