
// @require core/cash.js
// @require core/get_split_values.js
// @require core/guid.js
// @require core/matches.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/variables.js
// @require ./helpers/add_event.js
// @require ./helpers/has_namespaces.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/remove_event.js

fn.on = function ( eventFullName, selector, callback, _one ) {

  if ( !isString ( eventFullName ) ) {

    for ( let key in eventFullName ) {

      this.on ( key, selector, eventFullName[key] );

    }

    return this;

  }

  if ( isFunction ( selector ) ) {

    callback = selector;
    selector = false;

  }

  each ( getSplitValues ( eventFullName ), eventFullName => {

    const [name, namespaces] = parseEventName ( eventFullName );

    this.each ( ( i, ele ) => {

      const finalCallback = function ( event ) {

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        let thisArg = ele;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector ) ) {
            if ( target === ele ) return;
            target = target.parentNode;
            if ( !target ) return;
          }

          thisArg = target;

        }

        event.namespace = ( event.namespace || '' );

        const returnValue = callback.call ( thisArg, event, event.data );

        if ( _one ) {

          removeEvent ( ele, name, namespaces, finalCallback );

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback.guid = callback.guid = ( callback.guid || guid++ );

      addEvent ( ele, name, namespaces, finalCallback );

    });

  });

  return this;

};
