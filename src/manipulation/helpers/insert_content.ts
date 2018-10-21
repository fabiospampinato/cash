
// @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts

function insertContent ( parent, child, prepend ) {

  if ( child === undefined ) return;

  const isStr = isString ( child );

  if ( !isStr && child.length ) {

    each ( child, ele => insertContent ( parent, ele, prepend ) );

  } else {

    each ( parent,
      isStr
        ? ele => { ele.insertAdjacentHTML ( prepend ? 'afterbegin' : 'beforeend', child ) }
        : ( ele, index ) => insertElement ( ele, !index ? child : child.cloneNode ( true ), prepend )
    );

  }

}
