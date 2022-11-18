
const eventsNamespace = '___ce';
const eventsNamespacesSeparator = '.';
const eventsFocus: { [event: string]: string | undefined } = { focus: 'focusin', blur: 'focusout' };
const eventsHover: { [event: string]: string | undefined } = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
const eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
