
const eventsNamespace = '___ce',
      eventsNamespacesSeparator = '.',
      eventsFocus: { [event: string]: string | undefined } = { focus: 'focusin', blur: 'focusout' },
      eventsHover: { [event: string]: string | undefined } = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
      eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
