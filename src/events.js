function registerEvent(node, events, callback) {
  var eventCache = getData(node,'_cashEvents') || setData(node, '_cashEvents', {});
  events.split(/[,\s]+/g).forEach(function(eventName) {
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  });
}

function removeEvent(node, events, callback){
  var eventCache = getData(node,'_cashEvents');
  events.split(/[,\s]+/g).forEach(function(eventName) {
    if (callback) {
      node.removeEventListener(eventName, callback);
    } else {
      each(eventCache[eventName], event => { node.removeEventListener(eventName, event); });
      eventCache[eventName] = [];
    }
  });
}

fn.extend({

  off(eventName, callback) {
    return this.each(v => removeEvent(v, eventName, callback) );
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

    return this.each(v => {
      var finalCallback = callback;
      if ( runOnce ) {
        finalCallback = function(){
          callback.apply(this,arguments);
          removeEvent(v, eventName, finalCallback);
        };
      }
      registerEvent(v, eventName, finalCallback);
    });
  },

  one(events, delegate, callback) {
    return this.on(events, delegate, callback, true);
  },

  ready: onReady,

  trigger(events, data) {
    var collection = this;
    return events.split(/[,\s]+/g).forEach(function(eventName) {
      var evt = doc.createEvent('HTMLEvents');
      evt.data = data;
      evt.initEvent(eventName, true, false);
      return collection.each(v => v.dispatchEvent(evt));
    });
  }

});
