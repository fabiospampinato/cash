
function insertElement ( ele, child, prepend ) {
  if ( prepend ) {
    ele.insertBefore ( child, ele.childNodes[0] );
  } else {
    ele.appendChild ( child );
  }
}
