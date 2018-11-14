
// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/matches.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts
// @require ./helpers/add_event.ts
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

    for ( let key in eventFullName ) {

      this.on ( key, selector, eventFullName[key] );

    }

    return this;

  }

  if ( isFunction ( selector ) ) {

    callback = selector;
    selector = '';

  }

  each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

    const [name, namespaces] = parseEventName ( eventFullName );

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

        }

        event.namespace = ( event.namespace || '' );
        // event.currentTarget = thisArg; //FIXME: We can't overwrite `event.currentTarget`

        const returnValue = ( callback as Function ).call ( thisArg, event, event.data ); //TSC

        if ( _one ) {

          removeEvent ( ele, name, namespaces, finalCallback );

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback['guid'] = callback['guid'] = ( callback['guid'] || guid++ );

      addEvent ( ele, name, namespaces, finalCallback );

    });

  });

  return this;

}

Cash.prototype.on = on;
