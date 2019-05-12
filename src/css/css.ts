
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/compute_style.ts
// @require ./helpers/get_prefixed_prop.ts
// @require ./helpers/get_suffixed_value.ts
// @require ./helpers/is_css_variable.ts

interface Cash {
  css ( prop: string ): string | undefined;
  css ( prop: string, value: string ): this;
  css ( props: plainObject ): this;
}

function css ( this: Cash, prop: string ): string | undefined;
function css ( this: Cash, prop: string, value: string ): Cash;
function css ( this: Cash, prop: plainObject ): Cash;
function css ( this: Cash, prop: string | plainObject, value?: string ) {

  if ( isString ( prop ) ) {

    const isVariable = isCSSVariable ( prop );

    prop = getPrefixedProp ( prop, isVariable );

    if ( arguments.length < 2 ) return this[0] && computeStyle ( this[0], prop, isVariable );

    if ( !prop ) return this;

    value = getSuffixedValue ( prop, value, isVariable );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      if ( isVariable ) {

        ele.style.setProperty ( prop as string, value ); //TSC

      } else {

        ele.style[prop as string] = value; //TSC

      }

    });

  }

  for ( const key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};

Cash.prototype.css = css;
