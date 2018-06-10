
// @require core/cash.js
// @require core/variables.js

fn.ready = function ( callback ) {

  const finalCallback = () => callback ( cash );

  if ( doc.readyState !== 'loading' ) {

    setTimeout ( finalCallback );

  } else {

    doc.addEventListener ( 'DOMContentLoaded', finalCallback );

  }

  return this;

};
