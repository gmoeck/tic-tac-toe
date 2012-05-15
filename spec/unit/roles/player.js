var PlayerRole = function(number) {
  this.receiveCell = jasmine.createSpy('playerRole' + number + '#receiveCell');
};

exports.PlayerRole = PlayerRole;
