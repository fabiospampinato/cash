
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  ready ( callback: Function ): this;
}

fn.ready = function ( this: Cash, callback: Function ) {

  if ( doc.readyState !== 'loading' ) {

    try {

      callback ( cash );

    } catch {}

  } else {

    doc.addEventListener ( 'DOMContentLoaded', () => { callback ( cash ) } );

  }

  return this;

};
