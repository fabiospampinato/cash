
// @require collection/each.js
// @require ./helpers/add_event.js
// @require ./helpers/remove_event.js

fn.on = function ( eventName, delegate, callback, runOnce ) {

  if ( !isString ( eventName ) ) {

    for ( let key in eventName ) {
      this.on ( key, delegate, eventName[key] );
    }

    return this;

  }

  if ( isFunction ( delegate ) ) {

    callback = delegate;
    delegate = null;

  }

  if ( eventName === 'ready' ) {

    return this.ready ( callback );

  }

  if ( delegate ) {

    const originalCallback = callback;

    callback = function ( event ) {

      let target = event.target;

      while ( !matches ( target, delegate ) ) {
        if ( target === this ) {
          return target = false;
        }
        target = target.parentNode;
      }

      if ( target ) {
        originalCallback.call ( target, event );
      }

    };

    callback.guid = originalCallback.guid = ( originalCallback.guid || guid++ );

  }

  function dataCallback ( event ) {
    callback.call ( this, event, event.data );
  }

  dataCallback.guid = callback.guid = ( callback.guid || guid++ );

  each ( eventName.split ( eventsSeparatorRe ), eventName => {

    this.each ( ele => {

      let finalCallback = dataCallback;

      if ( runOnce ) {

        finalCallback = function finalCallback ( event ) {
          dataCallback.call ( this, event );
          removeEvent ( ele, eventName, finalCallback );
        };

        finalCallback.guid = dataCallback.guid = ( dataCallback.guid || guid++ );

      }

      addEvent ( ele, eventName, finalCallback );

    });

  });

  return this;

};
