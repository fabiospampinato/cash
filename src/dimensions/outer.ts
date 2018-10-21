
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require css/helpers/compute_style_int.ts

each ( ['Width', 'Height'], ( prop, index ) => {

  fn[`outer${prop}`] = function ( includeMargins ) {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`outer${prop}`];

    return this[0][`offset${prop}`] + ( includeMargins ? computeStyleInt ( this[0], `margin${ !index ? 'Left' : 'Top' }` ) + computeStyleInt ( this[0], `margin${ !index ? 'Right' : 'Bottom' }` ) : 0 );

  };

});
