var DOMAlertRenderer = function() {
};

DOMAlertRenderer.prototype = {
  playerWonGame: function(playerInformation) {
    var element = document.createElement('div');
    element.className = 'alert';
    element.innerText = "'" + playerInformation.player + "' Wins";
    document.body.appendChild(element);
  }
};

exports.DOMAlertRenderer = DOMAlertRenderer;
