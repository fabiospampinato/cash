
// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/matches.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts
// @require ./helpers/add_event.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/has_namespaces.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  on ( events: Record<string, EventCallback> ): this;
  on ( events: Record<string, EventCallback>, selector: string ): this;
  on ( events: Record<string, EventCallback>, data: any ): this;
  on ( events: Record<string, EventCallback>, selector: string | null | undefined, data: any ): this;
  on ( events: string, callback: EventCallback ): this;
  on ( events: string, selector: string, callback: EventCallback ): this;
  on ( events: string, data: any, callback: EventCallback ): this;
  on ( events: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean ): this;
}

function on ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback>, data: any ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string | null | undefined, data: any ): Cash;
function on ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function on ( this: Cash, eventFullName: string, selector: string, callback: EventCallback ): Cash;
function on ( this: Cash, eventFullName: string, data: any, callback: EventCallback ): Cash;
function on ( this: Cash, eventFullName: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback> | string, selector?: any, data?: any, callback?: EventCallback, _one?: boolean ) {

  if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.on ( key, selector, data, eventFullName[key], _one );

    }

    return this;

  }

  if ( !isString ( selector ) ) {

    if ( isUndefined ( selector ) || isNull ( selector ) ) {

      selector = '';

    } else if ( isUndefined ( data ) ) {

      data = selector;
      selector = '';

    } else {

      callback = data;
      data = selector;
      selector = '';

    }

  }

  if ( !isFunction ( callback ) ) {

    callback = data;
    data = undefined;

  }

  if ( !callback ) return this;

  each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

    const [nameOriginal, namespaces] = parseEventName ( eventFullName );
    const name = getEventNameBubbling ( nameOriginal );
    const isEventHover = ( nameOriginal in eventsHover );
    const isEventFocus = ( nameOriginal in eventsFocus );

    if ( !name ) return;

    this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) && !isDocument ( ele ) && !isWindow ( ele ) ) return;

      const finalCallback = function ( event: Event ) {

        if ( event.target[`___i${event.type}`] ) return event.stopImmediatePropagation (); // Ignoring native event in favor of the upcoming custom one

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        if ( !selector && ( ( isEventFocus && ( event.target !== ele || event.___ot === name ) ) || ( isEventHover && event.relatedTarget && ele.contains ( event.relatedTarget ) ) ) ) return;

        let thisArg: EventTarget = ele;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector ) ) {

            if ( target === ele ) return;

            target = target.parentNode;

            if ( !target ) return;

          }

          thisArg = target;

        }

        Object.defineProperty ( event, 'currentTarget', {
          configurable: true,
          get () { // We need to define a getter for this to work everywhere
            return thisArg;
          }
        });

        Object.defineProperty ( event, 'delegateTarget', {
          configurable: true,
          get () { // We need to define a getter for this to work everywhere
            return ele;
          }
        });

        Object.defineProperty ( event, 'data', {
          configurable: true,
          get () {
            return data;
          }
        });

        const returnValue = callback.call ( thisArg, event, event.___td );

        if ( _one ) {

          removeEvent ( ele, name, namespaces, selector, finalCallback );

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback.guid = callback.guid = ( callback.guid || cash.guid++ );

      addEvent ( ele, name, namespaces, selector, finalCallback );

    });

  });

  return this;

}

fn.on = on;
