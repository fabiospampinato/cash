
// @require core/each.js
// @require ./camel_case.js

const prefixedProps = {},
      div = doc.createElement ( 'div' ),
      style = div.style,
      stylePrefixes = ['webkit', 'moz', 'ms', 'o'];

function prefixedProp ( prop ) {

  prop = camelCase ( prop );

  if ( prefixedProps[prop] ) return prefixedProps[prop];

  const ucProp = prop.charAt ( 0 ).toUpperCase () + prop.slice ( 1 ),
        props = ( `${prop} ${stylePrefixes.join ( `${ucProp} ` )}${ucProp}` ).split ( ' ' );

  each ( props, prop => {
    if ( prop in style ) {
      prefixedProps[prop] = prop = prefixedProps[prop] = prop;
      return false;
    }
  });

  return prefixedProps[prop];

};

cash.prefixedProp = prefixedProp;
