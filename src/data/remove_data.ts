
// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/remove_data.ts

interface Cash {
  removeData ( key: string ): this;
}

Cash.prototype.removeData = function ( this: Cash, key: string ) {
  return this.each ( ( i, ele ) => removeData ( ele, key ) );
};
