
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_value.ts

interface Cash {
  val (): string | string[];
  val ( value ): this;
}

function val ( this: Cash ): string | string[];
function val ( this: Cash, value: string | string[] ): Cash;
function val ( this: Cash, value?: string | string[] ): string | string[] | Cash {

  if ( value === undefined ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => {

    if ( ele.tagName === 'SELECT' ) {

      const eleValue = isArray ( value ) ? value : ( value === null ? [] : [value] );

      each ( ele.options, ( i, option ) => {

        option.selected = eleValue.indexOf ( option.value ) >= 0;

      });

    } else {

      ele.value = value === null ? '' : value;

    }

  });

}

Cash.prototype.val = val;
