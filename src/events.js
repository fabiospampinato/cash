var eventsSeparatorMatch = /[,\s]+/g;

function unnamespaceEvent(eventName){
  return eventName.split('.')[0];
}

function registerEvent(node, eventName, callback) {
  var eventCache = getData(node,'_cashEvents') || setData(node, '_cashEvents', {});
  eventCache[eventName] = eventCache[eventName] || [];
  eventCache[eventName].push(callback);
  node.addEventListener(eventName, callback);
}

function removeEvent(node, eventName, callback){
  var events = getData(node,'_cashEvents'),
      eventCache = (events && events[eventName]),
      index;

  if ( !eventCache ) { return; }

  if (callback) {
    node.removeEventListener(eventName, callback);
    index = eventCache.indexOf(callback);
    if ( index >= 0 ) { eventCache.splice( index, 1); }
  } else {
    each(eventCache, event => { node.removeEventListener(eventName, event); });
    eventCache = [];
  }
}

fn.extend({

  off(eventName, callback) {
    each( eventName.split(eventsSeparatorMatch), eventName => {
      this.each(v => removeEvent(v, unnamespaceEvent(eventName), callback) );
    });
    return this;
  },

  on(eventName, delegate, callback, runOnce) { // jshint ignore:line

    var originalCallback;

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
      originalCallback = callback;
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
    }

    each( eventName.split(eventsSeparatorMatch), eventName => {
      eventName = unnamespaceEvent(eventName);
      this.each(v => {
        var finalCallback = callback;
        if ( runOnce ) {
          finalCallback = function(){
            callback.apply(this,arguments);
            removeEvent(v, eventName, finalCallback);
          };
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
      evt.initEvent(unnamespaceEvent(eventName), true, false);
    }
    evt.data = data;
    return this.each(v => v.dispatchEvent(evt));
  }

});
