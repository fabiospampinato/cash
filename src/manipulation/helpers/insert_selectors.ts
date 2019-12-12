
// @require ./insert_element.ts

function insertSelectors ( selectors: Selector[], anchors: Ele[], inverse?: boolean, left?: boolean, inside?: boolean ): Ele[] {

  each ( selectors, ( si, selector: Selector ) => {

    each ( cash ( selector ), ( ti, target ) => {

      each ( anchors, ( ai, anchor ) => {

        if ( inverse ) { // Swapping anchor and target

          var temp = anchor;
          anchor = target;
          target = temp;

        }

        insertElement ( anchor, !ai ? target : target.cloneNode ( true ), left, inside );

      });

    });

  });

  return anchors;

}
