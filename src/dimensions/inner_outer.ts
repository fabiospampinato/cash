
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require ./helpers/get_document_dimension.ts

interface Cash {
  innerWidth (): number | undefined;
  innerHeight (): number | undefined;
  outerWidth ( includeMargins?: boolean ): number;
  outerHeight ( includeMargins?: boolean ): number;
}

each ( [true, false], ( i, outer?: boolean ) => {

  each ( ['Width', 'Height'], ( i, prop: 'Width' | 'Height' ) => {

    const name: 'outerWidth' | 'innerHeight' = `${outer ? 'outer' : 'inner'}${prop}`;

    fn[name] = function ( this: Cash, includeMargins?: boolean ) {

      if ( !this[0] ) return;

      if ( isWindow ( this[0] ) ) return outer ? this[0][`inner${prop}`] : this[0].document.documentElement[`client${prop}`];

      if ( isDocument ( this[0] ) ) return getDocumentDimension ( this[0], prop );

      return this[0][`${outer ? 'offset' : 'client'}${prop}`] + ( includeMargins && outer ? computeStyleInt ( this[0], `margin${ i ? 'Top' : 'Left' }` ) + computeStyleInt ( this[0], `margin${ i ? 'Bottom' : 'Right' }` ) : 0 );

    };

  });

});
