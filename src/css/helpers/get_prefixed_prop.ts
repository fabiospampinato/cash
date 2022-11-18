
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts

const prefixedProps: { [prop: string]: string } = {};
const {style} = div;
const vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp ( prop: string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  if ( isVariable ) return prop;

  if ( !prefixedProps[prop] ) {

    const propCC = camelCase ( prop );
    const propUC = `${propCC[0].toUpperCase ()}${propCC.slice ( 1 )}`;
    const props = ( `${propCC} ${vendorsPrefixes.join ( `${propUC} ` )}${propUC}` ).split ( ' ' );

    each ( props, ( i, p ) => {

      if ( p in style ) {

        prefixedProps[prop] = p;

        return false;

      }

    });

  }

  return prefixedProps[prop];

}
