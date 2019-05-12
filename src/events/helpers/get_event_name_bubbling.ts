
// @require ./variables.ts

function getEventNameBubbling ( name: string ): string {

  return eventsHover[name] || eventsFocus[name] || name;

}
