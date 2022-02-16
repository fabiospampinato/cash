
// @require ./eval_scripts.ts

function insertElement ( anchor: EleLoose, target: EleLoose, left?: boolean, inside?: boolean, evaluate?: boolean ): void {

  if ( inside ) { // prepend/append

    anchor.insertBefore ( target, left ? anchor.firstChild : null );

  } else { // before/after

    if ( anchor.nodeName === 'HTML' ) {

      anchor.parentNode.replaceChild ( target, anchor );

    } else {

      anchor.parentNode.insertBefore ( target, left ? anchor : anchor.nextSibling );

    }

  }

  if ( evaluate ) {

    evalScripts ( target, anchor.ownerDocument );

  }

}
