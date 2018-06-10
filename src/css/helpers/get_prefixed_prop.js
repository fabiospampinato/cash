
// @require core/camel_case.js
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require ./is_css_variable.js

const prefixedProps = {},
      {style} = doc.createElement ( 'div' ),
      vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp ( prop, isVariable = isCSSVariable ( prop ) ) {

  if ( isVariable ) return prop;

  if ( !prefixedProps[prop] ) {

    const propCC = camelCase ( prop ),
          propUC = `${propCC.charAt ( 0 ).toUpperCase ()}${propCC.slice ( 1 )}`,
          props = ( `${propCC} ${vendorsPrefixes.join ( `${propUC} ` )}${propUC}` ).split ( ' ' );

    each ( props, p => {
      if ( p in style ) {
        prefixedProps[prop] = p;
        return false;
      }
    });

  }

  return prefixedProps[prop];

};

cash.prefixedProp = getPrefixedProp;
