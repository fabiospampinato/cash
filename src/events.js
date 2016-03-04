var _eventCache = {},
    _eventId = 'cshid';

function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p ;
  }

  return _p8() + _p8(true) + _p8(true) + _p8();
}

function registerEvent(node, eventName, callback) {
  var cNode = cash(node),
      nid = cNode.data(_eventId);

  if ( !nid ) {
    nid = guid();
    cNode.data(_eventId, nid);
  }

  _eventCache[nid] = _eventCache[nid] || {};
  _eventCache[nid][eventName] = _eventCache[nid][eventName] || [];

  _eventCache[nid][eventName].push(callback);
}

fn.extend({

  off(eventName, callback) {
    return this.each(v => {
      if (callback) {
        v.removeEventListener(eventName, callback);
      } else {
        for (var i in _eventCache[cash(v).data(_eventId)][eventName]) {
          v.removeEventListener(eventName, _eventCache[cash(v).data(_eventId)][eventName][i]);
        }
      }
    });
  },

  on(eventName, delegate, callback) {

    var originalCallback;

    if ( !isString(eventName) ) {
      for (var key in eventName) {
        if (eventName.hasOwnProperty(key)) {
          this.on(key,delegate,eventName[key]);
        }
      }
      return this;
    }

    if ( isFunction(delegate) ) {
      callback = delegate;
      delegate = null;
    }

    if ( eventName === 'ready' ) { onReady(callback); return this; }

    if ( delegate ) {
      originalCallback = callback;

      callback = function(e) {
        var t = e.target;

        if (matches(t, delegate)) {
          originalCallback.call(t);
        } else {
          while (!matches(t, delegate)) {
            if (t === this) {
              return (t = false);
            }
            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t);
          }
        }
      }
    }

    return this.each(v => {
      registerEvent(v, eventName, callback);
      v.addEventListener(eventName, callback);
    });
  },

  ready: onReady,

  trigger(eventName) {
    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent(eventName, true, false);
    return this.each(v => v.dispatchEvent(evt));
  }

});
