
// @require core/cash.js
// @require collection/each.js

fn.insertAfter = function ( content ) {

  cash ( content ).each ( ( index, ele ) => {

    const parent = ele.parentNode;

    this.each ( ( i, e ) => {
      parent.insertBefore ( !index ? e : e.cloneNode ( true ), ele.nextSibling );
    });

  });

  return this;

};
