
function parseEventName ( eventFullName ) {
  const parts = eventFullName.split ( eventsNamespacesSeparator );
  return [parts[0], parts.slice ( 1 ).sort ()]; // [name, namespaces]
}
