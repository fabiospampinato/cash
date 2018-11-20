
// @require ./eval_scripts.ts

function insertElement ( anchor: Node, child: Node, prepend?: boolean, prependTarget?: Node ): void {

  if ( prepend ) {

    anchor.insertBefore ( child, prependTarget );

  } else {

    anchor.appendChild ( child );

  }

  evalScripts ( child );

}
