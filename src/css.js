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
  }

});
