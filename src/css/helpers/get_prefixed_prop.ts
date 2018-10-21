
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts

const prefixedProps: plainObject = {},
      {style} = doc.createElement ( 'div' ),
      vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp ( prop: string, isVariable: boolean = isCSSVariable ( prop ) ): string {

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

interface CashStatic {
  prefixedProp ( prop: string, isVariable?: boolean ): string;
}

cash.prefixedProp = getPrefixedProp;
