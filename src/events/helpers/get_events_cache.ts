
// @require ./variables.ts

function getEventsCache ( ele ) {
  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );
}
