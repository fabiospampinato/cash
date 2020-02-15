
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  ready ( callback: Function ): this;
}

fn.ready = function ( this: Cash, callback: ( $: typeof cash ) => any ) {

  const cb = () => setTimeout ( callback, 0, cash );

  if ( doc.readyState !== 'loading' ) {

    cb ();

  } else {

    doc.addEventListener ( 'DOMContentLoaded', cb );

  }

  return this;

};
