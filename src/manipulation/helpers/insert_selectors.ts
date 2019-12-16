
// @require ./insert_element.ts

function insertSelectors ( selectors: Selector[], anchors: Ele[], inverse?: boolean, left?: boolean, inside?: boolean, reverseLoop1?: boolean, reverseLoop2?: boolean, reverseLoop3?: boolean ): Ele[] {

  each ( selectors, ( si, selector: Selector ) => {

    each ( cash ( selector ), ( ti, target ) => {

      each ( cash ( anchors ), ( ai, anchor ) => {

        const anchorFinal = inverse ? target : anchor,
              targetFinal = inverse ? anchor : target;

        insertElement ( anchorFinal, !ai ? targetFinal : targetFinal.cloneNode ( true ), left, inside );

      }, reverseLoop3 );

    }, reverseLoop2 );

  }, reverseLoop1 );

  return anchors;

}
