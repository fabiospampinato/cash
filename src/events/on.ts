
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
  on ( events: plainObject ): this;
  on ( events: string, callback: Function, _one?: boolean ): this;
  on ( events: string, selector: string | Function, callback: Function, _one?: boolean ): this;
}

function on ( this: Cash, eventFullName: plainObject ): Cash;
function on ( this: Cash, eventFullName: string, callback: Function, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: string, selector: string | Function, callback: Function, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: string | plainObject, selector?: string | Function, callback?: boolean | Function, _one?: boolean ) {

  if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.on ( key, selector, eventFullName[key] );

    }

    return this;

  }

  if ( isFunction ( selector ) ) {

    callback = selector;
    selector = '';

  }

  each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

    const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

    this.each ( ( i, ele ) => {

      const finalCallback = function ( event ) {

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        let thisArg = ele;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector as string ) ) { //TSC
            if ( target === ele ) return;
            target = target.parentNode;
            if ( !target ) return;
          }

          thisArg = target;

          event.__delegate = true;

        }

        if ( event.__delegate ) {

          Object.defineProperty ( event, 'currentTarget', {
            configurable: true,
            get () { // We need to set a getter for IE10 to work
              return thisArg;
            }
          });

        }

        const returnValue = ( callback as Function ).call ( thisArg, event, event.data ); //TSC

        if ( _one ) {

          removeEvent ( ele, name, namespaces, selector as string, finalCallback ); //TSC

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback['guid'] = callback['guid'] = ( callback['guid'] || guid++ );

      addEvent ( ele, name, namespaces, selector as string, finalCallback ); //TSC

    });

  });

  return this;

}

Cash.prototype.on = on;
