
// @require ./variables.ts

function getEventsCache ( ele: Ele ): plainObject {

  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );

}
