
// @require collection/each.js
// @require ./helpers/camel_case.js
// @require ./helpers/get_prefixed_prop.js

fn.css = function ( prop, value ) {

  if ( isString ( prop ) ) {

    prop = prefixedProp ( prop );

    return arguments.length > 1
             ? this.each ( ele => { ele.style[prop] = value } )
             : this[0] ? win.getComputedStyle ( this[0] )[prop] : undefined;

  }

  for ( let key in prop ) {
    this.css ( key, prop[key] );
  }

  return this;

};