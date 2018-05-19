
// @require core/cash.js
// @require collection/each.js

fn.insertBefore = function ( selector ) {

  cash ( selector ).each ( ( index, ele ) => {

    const parent = ele.parentNode;

    this.each ( ( i, e ) => {
      parent.insertBefore ( !index ? e : e.cloneNode ( true ), ele );
    });

  });

  return this;

};
