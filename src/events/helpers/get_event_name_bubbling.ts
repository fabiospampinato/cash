
// @require ./variables.ts

function getEventNameBubbling ( name: string ) {

  return eventsHover[name] || eventsFocus[name] || name;

}
