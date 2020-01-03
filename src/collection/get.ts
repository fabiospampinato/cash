
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts

interface Cash {
  get (): EleLoose[];
  get ( index: number ): EleLoose | undefined;
}

fn.get = function ( this: Cash, index?: number ) {

  if ( isUndefined ( index ) ) return slice.call ( this );

  index = Number ( index );

  return this[index < 0 ? index + this.length : index];

};
