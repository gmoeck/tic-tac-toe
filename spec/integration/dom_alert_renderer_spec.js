var DOMAlertRenderer = require('ui/dom_alert_renderer').DOMAlertRenderer;

describe('DOMAlertRenderer', function() {
  it('renders an alert when a player wins the game', function() {
    var renderer = new DOMAlertRenderer();
    renderer.playerWonGame({player: 'X'});

    expect(document.body.querySelector('.alert').innerText).toEqual("'X' Wins");
  });
});
