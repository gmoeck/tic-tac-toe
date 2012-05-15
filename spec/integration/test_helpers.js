exports.fireEvent = function(element, eventType) {
  if (element.fireEvent) {
    (element.fireEvent('on' + eventType));
  } else {
    var eventObject = document.createEvent('Events');
    eventObject.initEvent(eventType, true, false);
    element.dispatchEvent(eventObject);
  }
};
