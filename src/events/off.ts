
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  off (): this;
  off ( events: string ): this;
  off ( events: Record<string, EventCallback> ): this;
  off ( events: string, callback: EventCallback ): this;
  off ( events: string, selector: string, callback: EventCallback ): this;
}

fn.off = function ( this: Cash, eventFullName?: string | Record<string, EventCallback>, selector?: string | EventCallback, callback?: EventCallback ) {

  if ( isUndefined ( eventFullName ) ) {

    this.each ( ( i, ele ) => { removeEvent ( ele ) } );

  } else if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.off ( key, eventFullName[key] );

    }

  } else {

    if ( isFunction ( selector ) ) {

      callback = selector;
      selector = '';

    }

    each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

      const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

      this.each ( ( i, ele ) => { removeEvent ( ele, name, namespaces, selector, callback ) } );

    });

  }

  return this;

};
