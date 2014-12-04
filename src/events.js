var _eventCache = {};

cash.fn.extend({

  off: function() {
    var eventName = arguments[0],
        callback = arguments[1];
    this.each(function(v) {
      if (callback) {
        v.removeEventListener(eventName, callback);
      } else {
        for (var i in _eventCache[cash(v).data('cshid')][eventName]) {
          v.removeEventListener(eventName, _eventCache[cash(v).data('cshid')][eventName][i]);
        }
      }
    });
    return this;
  },

  on: function() {
    var eventName, delegate, callback;

    if (typeof arguments[1] === 'function') {
      eventName = arguments[0];
      callback = arguments[1];
      this.each(function(v) {
        registerEvent(cash(v), eventName, callback);
        v.addEventListener(eventName, callback);
      });
      return this;
    } else {
      eventName = arguments[0];
      delegate = arguments[1];
      callback = arguments[2];
      this.each(function(v) {
        var handler = function(e) {
          var t = e.target;
          if (cash.matches(t, delegate)) {
            callback.call(t);
          } else {
            while (!cash.matches(t, delegate)) {
              if (t === v) {
                return t = false;
              }
              t = t.parentNode;
            }
            if (t) { callback.call(t); }
          }
        };
        registerEvent(cash(v), eventName, handler);
        v.addEventListener(eventName, handler);
      });
      return this;
    }
  },

  ready: function(callback) {
    this[0].addEventListener('DOMContentLoaded', callback);
  },

  trigger: function(eventName) {
    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent(eventName, true, false);
    this.each(function(v) {
      v.dispatchEvent(evt);
    });
    return this;
  }

});

function registerEvent(node, eventName, callback) {
  var nid = cash(node).data('cshid') || guid();
  cash(node).data('cshid', nid);
  if (!(nid in _eventCache)) {
    _eventCache[nid] = {};
  }
  if (!(eventName in _eventCache[nid])) {
    _eventCache[nid][eventName] = [];
  }
  _eventCache[nid][eventName].push(callback);
}

function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}
