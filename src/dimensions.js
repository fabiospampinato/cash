function compute(el, prop) {
  return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
}

each(['Width','Height'],v => {

  var lower = v.toLowerCase();

  fn[lower] = function( value ){
    if ( !this[0] ) {
      return value === undefined ? undefined : this;
    }
    if ( typeof value === 'number' ) {
      this[0].style[lower] = value + 'px';
    } else if ( isString(value) ) {
      this[0].style[lower] = value;
    } else {
      return this[0].getBoundingClientRect()[lower];
    }
    return this;
  };

  fn['inner'+v] = function(){ return this[0] ? this[0]['client'+v] : undefined; };

  fn['outer'+v] = function(margins) {
    return this[0] ? this[0]['offset'+v] + ( margins ?
        compute(this, 'margin'+( v === 'Width' ? 'Left' : 'Top' )) +
        compute(this, 'margin'+( v === 'Width' ? 'Right' : 'Bottom' )) :
        0 ) : undefined;
  };

});
