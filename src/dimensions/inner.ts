
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts

interface Cash {
  innerWidth (): number | undefined;
  innerHeight (): number | undefined;
}

each ( ['Width', 'Height'], ( i, prop: 'Width' | 'Height' ) => {

  Cash.prototype[`inner${prop}`] = function ( this: Cash ) {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`inner${prop}`];

    return this[0][`client${prop}`];

  };

});
