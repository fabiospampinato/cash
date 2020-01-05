
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_value.ts

interface Cash {
  val (): string | string[];
  val ( value: string | string[] ): this;
}

function val ( this: Cash ): string | string[];
function val ( this: Cash, value: string | string[] ): Cash;
function val ( this: Cash, value?: string | string[] ) {

  if ( !arguments.length ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => {

    const isSelect = ele.multiple && ele.options;

    if ( isSelect || checkableRe.test ( ele.type ) ) {

      const eleValue = isArray ( value ) ? map.call ( value, String ) : ( isNull ( value ) ? [] : [String ( value )] );

      if ( isSelect ) {

        each ( ele.options, ( i, option ) => {

          option.selected = eleValue.indexOf ( option.value ) >= 0;

        }, true );

      } else {

        ele.checked = eleValue.indexOf ( ele.value ) >= 0;

      }

    } else {

      ele.value = isUndefined ( value ) || isNull ( value ) ? '' : value;

    }

  });

}

fn.val = val;
