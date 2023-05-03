
// @require ./variables.ts

function getEventsCache ( ele: EleLoose ): { [event: string]: [string[], string, EventCallback][] } {
  let cache = eventsWeakMapCache.get( ele );
  if ( !cache ) eventsWeakMapCache.set( ele, cache = {} );
  return cache;
}
