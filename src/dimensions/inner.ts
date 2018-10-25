
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts

interface Cash {
  innerWidth (): number;
  innerHeight (): number;
}

each ( ['Width', 'Height'], ( i, prop: string ) => {

  Cash.prototype[`inner${prop}`] = function () {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`inner${prop}`];

    return this[0][`client${prop}`];

  };

});
