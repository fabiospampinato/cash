
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/variables.ts

interface Cash {
  trigger ( event: Event | string, data?: any ): this;
}

fn.trigger = function ( this: Cash, event: Event | string, data?: any ) {

  if ( isString ( event ) ) {

    const [name, namespaces] = parseEventName ( event ),
          type = eventsMouseRe.test ( name ) ? 'MouseEvents' : 'HTMLEvents';

    event = doc.createEvent ( type );
    event.initEvent ( name, true, true );
    event.namespace = namespaces.join ( eventsNamespacesSeparator );

  }

  event.___td = data;

  const isEventFocus = ( event.type in eventsFocus );

  return this.each ( ( i, ele ) => {

    if ( isEventFocus && isFunction ( ele[event.type] ) ) {

      ele[event.type]();

    } else {

      ele.dispatchEvent ( event );

    }

  });

};
