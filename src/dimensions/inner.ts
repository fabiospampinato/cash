
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts

interface Cash {
  innerWidth (): number | undefined;
  innerHeight (): number | undefined;
}

each ( ['Width', 'Height'], ( i, prop: 'Width' | 'Height' ) => {

  Cash.prototype[`inner${prop}`] = function ( this: Cash ) {

    if ( !this[0] ) return;

    if ( isWindow ( this[0] ) ) return win[`inner${prop}`];

    return this[0][`client${prop}`];

  };

});
