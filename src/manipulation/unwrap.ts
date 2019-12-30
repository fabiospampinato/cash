
// @require core/cash.ts

interface Cash {
  unwrap (): this;
}

fn.unwrap = function ( this: Cash ) {

  this.parent ().each ( ( i, ele ) => {

    if ( ele.tagName === 'BODY' ) return;

    const $ele = cash ( ele );

    $ele.replaceWith ( $ele.children () );

  });

  return this;

};
