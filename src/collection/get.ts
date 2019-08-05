
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  get (): Ele[];
  get ( index: number ): Ele | undefined;
}

Cash.prototype.get = function ( this: Cash, index?: number ) {

  if ( index === undefined ) return slice.call ( this );

  return this[index < 0 ? index + this.length : index];

};
