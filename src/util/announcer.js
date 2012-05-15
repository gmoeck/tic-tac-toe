var Announcer = function() {
  this._events = {};
};

Announcer.prototype = {
  addListener: function(event, listener) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(listener);
  },

  announce: function(event, data) {
    var registeredListeners = this._events[event] || [];
    registeredListeners.forEach(function(listener) {
      listener[event](data);
    });
  }
};

exports.Announcer = Announcer;
