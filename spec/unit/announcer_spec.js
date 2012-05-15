var Announcer = require('../../src/util/announcer').Announcer;

describe('Announcer', function() {
  var announcer, listener;
  beforeEach(function() {
    announcer = new Announcer();
    listener = {
      someEvent: jasmine.createSpy('listener#someEvent')
    };
  });

  it('notifies its listeners when an event they are registered for happens', function() {
    announcer.addListener('someEvent', listener);

    announcer.announce('someEvent', 'abc');

    expect(listener.someEvent).toHaveBeenCalledWith('abc');
  });

  it('does not notify its listeners when an event they are not registered for happens', function() {
    announcer.addListener('anotherEvent', listener);

    announcer.announce('someEvent', 'abc');

    expect(listener.someEvent).not.toHaveBeenCalled();
  });

  it('notifes multiple listeners when an event they are registered for happens', function() {
    var listener2 = {
      someEvent: jasmine.createSpy('listener2#someEvent')
    };

    announcer.addListener('someEvent', listener);
    announcer.addListener('someEvent', listener2);
    announcer.announce('someEvent', 'abc');

    expect(listener.someEvent).toHaveBeenCalledWith('abc');
    expect(listener2.someEvent).toHaveBeenCalledWith('abc');
  });
});
