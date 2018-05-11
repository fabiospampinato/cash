
// @require collection/each.js

fn.insertAfter = function ( content ) {

  cash ( content ).each ( ( index, ele ) => {

    const parent = ele.parentNode,
          sibling = ele.nextSibling;

    this.each ( ( i, e ) => {
      parent.insertBefore ( !index ? e : e.cloneNode ( true ), sibling );
    });

  });

  return this;

};
