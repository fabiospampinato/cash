
// @require ./variables.js

function parseEventName ( eventName ) {
  const parts = eventName.split ( eventsNamespacesSeparator );
  return [parts[0], parts.slice ( 1 ).sort ()]; // [name, namespaces]
}
