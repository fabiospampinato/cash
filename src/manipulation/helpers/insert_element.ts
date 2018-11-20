
function insertElement ( anchor: Node, child: Node, prepend?: boolean, prependTarget?: Node ): void {

  if ( prepend ) {

    anchor.insertBefore ( child, prependTarget );

  } else {

    anchor.appendChild ( child );

  }

}
