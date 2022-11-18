
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/variables.ts

interface Cash {
  trigger ( event: Event | string, data?: any ): this;
}

fn.trigger = function ( this: Cash, event: Event | string, data?: any ) {

  if ( isString ( event ) ) {

    const [nameOriginal, namespaces] = parseEventName ( event );
    const name = getEventNameBubbling ( nameOriginal );

    if ( !name ) return this;

    const type = eventsMouseRe.test ( name ) ? 'MouseEvents' : 'HTMLEvents';

    event = doc.createEvent ( type );
    event.initEvent ( name, true, true );
    event.namespace = namespaces.join ( eventsNamespacesSeparator );
    event.___ot = nameOriginal;

  }

  event.___td = data;

  const isEventFocus = ( event.___ot in eventsFocus );

  return this.each ( ( i, ele ) => {

    if ( isEventFocus && isFunction ( ele[event.___ot] ) ) {

      ele[`___i${event.type}`] = true; // Ensuring the native event is ignored

      ele[event.___ot]();

      ele[`___i${event.type}`] = false; // Ensuring the custom event is not ignored

    }

    ele.dispatchEvent ( event );

  });

};
