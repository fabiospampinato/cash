
// @require ./eval_scripts.ts

function insertElement ( anchor: Ele, child: Ele, prepend?: boolean, prependTarget?: Element ): void {

  if ( prepend ) {

    anchor.insertBefore ( child, prependTarget );

  } else {

    anchor.appendChild ( child );

  }

  evalScripts ( child, anchor.ownerDocument );

}
