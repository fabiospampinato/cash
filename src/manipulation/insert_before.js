
// @require collection/each.js

fn.insertBefore = function ( selector ) {

  cash ( selector ).each ( ( ele, index ) => {

    const parent = ele.parentNode;

    this.each ( v => {
      parent.insertBefore ( !index ? v : v.cloneNode ( true ), ele );
    });

  });

  return this;

};
