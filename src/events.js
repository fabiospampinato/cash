var eventsSeparatorMatch = /[,\s]+/g;

function registerEvent(node, eventName, callback) {
  callback.guid = ( callback.guid || guid++ );
  var eventCache = getData(node,'_cashEvents') || setData(node, '_cashEvents', {});
  eventCache[eventName] = eventCache[eventName] || [];
  eventCache[eventName].push(callback);
  node.addEventListener(eventName, callback);
}

function removeEventListeners(events, node, eventName) {
  each(events[eventName], callback => { node.removeEventListener(eventName, callback); });
  delete events[eventName];
}

function removeEvent(node, eventName, callback){
  var events = getData(node,'_cashEvents');
  if ( !events ) { return; }
  if ( eventName === undefined ) {
    for ( eventName in events ) {
      if ( !events.hasOwnProperty(eventName) ) { continue; }
      removeEventListeners(events,node,eventName);
    }
  } else {
    var eventCache = events[eventName];
    if ( !eventCache ) { return; }

    if (callback) {
      callback.guid = ( callback.guid || guid++ );
      events[eventName] = eventCache.filter ( cb => {
        if ( cb.guid !== callback.guid ) { return true; }
        node.removeEventListener(eventName, cb);
      });
    } else {
      removeEventListeners(events,node,eventName);
    }
  }
}

fn.extend({

  off(eventName, callback) {
    if ( eventName === undefined ) {
      this.each(v => removeEvent (v));
    } else {
      each( eventName.split(eventsSeparatorMatch), eventName => {
        this.each(v => removeEvent(v, eventName, callback) );
      });
    }
    return this;
  },

  on(eventName, delegate, callback, runOnce) { // jshint ignore:line

    if ( !isString(eventName) ) {
      for (var key in eventName) {
        this.on(key,delegate,eventName[key]);
      }
      return this;
    }

    if ( isFunction(delegate) ) {
      callback = delegate;
      delegate = null;
    }

    if ( eventName === 'ready' ) {
      onReady(callback);
      return this;
    }

    if ( delegate ) {
      var originalCallback = callback;
      callback = function(e) {
        var t = e.target;

        while (!matches(t, delegate)) {
          if (t === this) {
            return (t = false);
          }
          t = t.parentNode;
        }

        if (t) {
          originalCallback.call(t, e);
        }
      };
      callback.guid = originalCallback.guid = ( originalCallback.guid || guid++ );
    }

    each( eventName.split(eventsSeparatorMatch), eventName => {
      this.each(v => {
        function dataCallback(event) {
          callback.call ( this, event, event.data );
        }
        dataCallback.guid = callback.guid = ( callback.guid || guid++ );
        var finalCallback = dataCallback;
        if ( runOnce ) {
          finalCallback = function(event){
            dataCallback.call(this,event);
            removeEvent(v, eventName, finalCallback);
          };
          finalCallback.guid = dataCallback.guid = ( dataCallback.guid || guid++ );
        }
        registerEvent(v, eventName, finalCallback);
      });
    });
    return this;
  },

  one(eventName, delegate, callback) {
    return this.on(eventName, delegate, callback, true);
  },

  ready: onReady,

  trigger(eventName, data) {
    var evt = eventName;
    if (isString(eventName)) {
      evt = doc.createEvent('HTMLEvents');
      evt.initEvent(eventName, true, false);
    }
    evt.data = data;
    return this.each(v => v.dispatchEvent(evt));
  }

});
