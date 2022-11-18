
// @require ./insert_element.ts

function insertSelectors<T extends ArrayLike<EleLoose> = ArrayLike<EleLoose>> ( selectors: ArrayLike<Selector>, anchors: T, inverse?: boolean, left?: boolean, inside?: boolean, reverseLoop1?: boolean, reverseLoop2?: boolean, reverseLoop3?: boolean ): T {

  each ( selectors, ( si, selector: Selector ) => {

    each ( cash ( selector ), ( ti, target ) => {

      each ( cash ( anchors ), ( ai, anchor ) => {

        const anchorFinal = inverse ? target : anchor;
        const targetFinal = inverse ? anchor : target;
        const indexFinal = inverse ? ti : ai;

        insertElement ( anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode ( true ), left, inside, !indexFinal );

      }, reverseLoop3 );

    }, reverseLoop2 );

  }, reverseLoop1 );

  return anchors;

}
