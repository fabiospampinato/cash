
// @require collection/each.js
// @require ./helpers/add_event.js
// @require ./helpers/add_event_methods.js
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
    selector = null;

  }

  if ( eventFullName === 'ready' ) {

    return this.ready ( callback );

  }

  each ( eventFullName.split ( eventsSeparatorRe ), eventFullName => {

    const [name, namespaces] = parseEventName ( eventFullName );

    this.each ( ( i, ele ) => {

      const finalCallback = function ( event ) {

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector ) ) {
            if ( target === ele ) return;
            target = target.parentNode;
          }

        }

        event.namespace = ( event.namespace || '' );

        addEventMethods ( event );

        callback.call ( ele, event, event.data );

        if ( _one ) {

          removeEvent ( ele, name, namespaces, finalCallback );

        }

      };

      finalCallback.guid = callback.guid = ( callback.guid || guid++ );

      addEvent ( ele, name, namespaces, finalCallback );

    });

  });

  return this;

};
