
// @require collection/each.js

fn.insertAfter = function ( content ) {

  cash ( content ).each ( ( ele, index ) => {

    const parent = ele.parentNode,
          sibling = ele.nextSibling;

    this.each ( v => {
      parent.insertBefore ( !index ? v : v.cloneNode ( true ), sibling );
    });

  });

  return this;

};
