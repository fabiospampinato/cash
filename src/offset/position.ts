
// @require core/cash.ts
// @require core/type_checking.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/compute_style_int.ts
// @require ./offset.ts

interface Cash {
  position (): undefined | {
    top: number,
    left: number
  };
}

fn.position = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  const isFixed = ( computeStyle ( ele, 'position' ) === 'fixed' );
  const offset = isFixed ? ele.getBoundingClientRect () : this.offset ();

  if ( !isFixed ) {

    const doc = ele.ownerDocument;

    let offsetParent = ele.offsetParent || doc.documentElement;

    while ( ( offsetParent === doc.body || offsetParent === doc.documentElement ) && computeStyle ( offsetParent, 'position' ) === 'static' ) {

      offsetParent = offsetParent.parentNode;

    }

    if ( offsetParent !== ele && isElement ( offsetParent ) ) {

      const parentOffset = cash ( offsetParent ).offset ();

      offset.top -= parentOffset.top + computeStyleInt ( offsetParent, 'borderTopWidth' );
      offset.left -= parentOffset.left + computeStyleInt ( offsetParent, 'borderLeftWidth' );

    }

  }

  return {
    top: offset.top - computeStyleInt ( ele, 'marginTop' ),
    left: offset.left - computeStyleInt ( ele, 'marginLeft' )
  };

};
