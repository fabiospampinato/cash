
// @require ./variables.ts

function getEventsCache ( ele: EleLoose ): { [event: string]: [string[], string, EventCallback][] } {

  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );

}
