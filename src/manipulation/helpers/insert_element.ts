
function insertElement ( ele: Node, child: Node, prepend?: boolean ): void {

  if ( prepend ) {

    ele.insertBefore ( child, ele.childNodes[0] );

  } else {

    ele.appendChild ( child );

  }

}
