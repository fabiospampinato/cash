function compute(el, prop) {
  return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
}

each(['Width','Height'],v => {

  var lower = v.toLowerCase();

  fn[lower] = function(){ return this[0].getBoundingClientRect()[lower]; };

  fn['inner'+v] = function(){ return this[0]['client'+v]; };

  fn['outer'+v] = function(margins) {
    return this[0]['offset'+v] + ( margins ?
        compute(this, 'margin'+( v === 'Width' ? 'Left' : 'Top' )) +
        compute(this, 'margin'+( v === 'Width' ? 'Right' : 'Bottom' )) :
        0 );
  };

});
