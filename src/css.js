// similar to how jquery tracks display values, 
// but short-circuit the private data abstraction
var displayTrackerProp = '__cash_track_display';
function getElemDisplay(elem){
  return elem[displayTrackerProp] ? elem[displayTrackerProp] : '';
}

function trackElemDisplay(elem){
  if (elem.style.display !== 'none' && !elem[displayTrackerProp]){
    elem[displayTrackerProp] = elem.style.display;
  }
}

function showHide(els, hide) {
  if (!els || els.length < 1) { return; }
  var updates = [];
  // get new display values first for elements that need an update
  els.each(function(el) {
    if (hide && el.style.display !== 'none') {
      trackElemDisplay(el);
      updates.push({el: el, display: 'none'});
    } else if (!hide && el.style.display === 'none') {
      updates.push({el: el, display: getElemDisplay(el)});
    }
  });
  if (updates.length < 1) { return; } 
  // now update the elements
  updates.forEach(function(item){
    item.el.style.display = item.display;
  });
}

var camelCase = (function(){
  var camelRegex = /(?:^\w|[A-Z]|\b\w)/g,
      whiteSpace = /[\s-_]+/g;
  return function(str) {
    return str.replace(camelRegex, function(letter, index) {
      return letter[ index === 0 ? 'toLowerCase' : 'toUpperCase' ]();
    }).replace(whiteSpace, '');
  };
}());

var getPrefixedProp = (function() {
  var cache = {},
      doc = document,
      div = doc.createElement('div'),
      style = div.style;

  return function(prop) {
    prop = camelCase(prop);
    if ( cache[prop] ) { return cache[prop]; }

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        prefixes = ['webkit', 'moz', 'ms', 'o'],
        props = (prop + ' ' + (prefixes).join(ucProp + ' ') + ucProp).split(' ');

    each(props, p => {
      if ( p in style ) {
        cache[p] = prop = cache[prop] = p;
        return false;
      }
    });

    return cache[prop];
  };
}());

cash.prefixedProp = getPrefixedProp;
cash.camelCase = camelCase;

fn.extend({

  css(prop,value){
    if ( isString(prop) ) {
      prop = getPrefixedProp(prop);
      return ( arguments.length > 1 ?
        this.each(v => v.style[prop] = value ) :
        win.getComputedStyle(this[0])[prop]
      );
    }

    for (var key in prop) {
      this.css(key,prop[key]);
    }
    
    return this;
  },
  
  show(){
    showHide(this, false);
  },

  hide(){
    showHide(this, true);
  }

});
