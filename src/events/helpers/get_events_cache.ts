
// @require ./variables.ts

function getEventsCache ( ele: Ele ): { [event: string]: [string[], string, EventCallback][] } {

  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );

}
