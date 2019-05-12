
const eventsNamespace = '__cashEvents',
      eventsNamespacesSeparator = '.',
      eventsFocus: { [event: string]: string | undefined } = { focus: 'focusin', blur: 'focusout' },
      eventsHover: { [event: string]: string | undefined } = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
      eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
