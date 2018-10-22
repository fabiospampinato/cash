
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  ready ( callback: Function ): this;
}

Cash.prototype.ready = function ( this: Cash, callback: Function ) {

  const finalCallback = () => callback ( cash );

  if ( doc.readyState !== 'loading' ) {

    setTimeout ( finalCallback );

  } else {

    doc.addEventListener ( 'DOMContentLoaded', finalCallback );

  }

  return this;

};
