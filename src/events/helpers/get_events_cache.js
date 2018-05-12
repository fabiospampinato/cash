
function getEventsCache ( ele ) {
  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );
}
