
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts

interface CashStatic {
  prefixedProp ( prop: string, isVariable?: boolean ): string;
}

const prefixedProps: { [prop: string]: string } = {},
      {style} = div,
      vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp ( prop: string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  if ( isVariable ) return prop;

  if ( !prefixedProps[prop] ) {

    const propCC = camelCase ( prop ),
          propUC = `${propCC[0].toUpperCase ()}${propCC.slice ( 1 )}`,
          props = ( `${propCC} ${vendorsPrefixes.join ( `${propUC} ` )}${propUC}` ).split ( ' ' );

    each ( props, ( i, p ) => {

      if ( p in style ) {

        prefixedProps[prop] = p;

        return false;

      }

    });

  }

  return prefixedProps[prop];

};

cash.prefixedProp = getPrefixedProp;
