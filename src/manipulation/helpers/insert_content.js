
// @require core/each.js
// @require core/type_checking.js
// @require ./insert_element.js

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
