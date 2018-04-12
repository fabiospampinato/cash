
const returnFalse = () => false,
      returnTrue = () => true;

function addEventMethods ( event ) {

  if ( event.isDefaultPrevented ) return;

  event.isDefaultPrevented = function () {
    return this.defaultPrevented;
  };

  event.isPropagationStopped = returnFalse;
  const stopPropagation = event.stopPropagation;
  event.stopPropagation = function () {
    event.isPropagationStopped = returnTrue;
    return stopPropagation.call ( this );
  };

  event.isImmediatePropagationStopped = returnFalse;
  const stopImmediatePropagation = event.stopImmediatePropagation;
  event.stopImmediatePropagation = function () {
    event.isPropagationStopped = returnTrue;
    event.isImmediatePropagationStopped = returnTrue;
    return stopImmediatePropagation.call ( this );
  };

}
