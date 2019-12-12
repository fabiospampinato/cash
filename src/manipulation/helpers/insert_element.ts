
// @require ./eval_scripts.ts

function insertElement ( anchor: Ele, target: Ele, left?: boolean, inside?: boolean ): void {

  if ( inside ) { // prepend/append

    anchor.insertBefore ( target, left ? anchor.firstElementChild : null );

  } else { // before/after

    anchor.parentNode.insertBefore ( target, left ? anchor : anchor.nextElementSibling );

  }

  evalScripts ( target, anchor.ownerDocument );

}
