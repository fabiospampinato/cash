
// @require core/index.js

fn.ready = function ( callback ) {

  if ( doc.readyState !== 'loading' ) {

    setTimeout ( callback );

  } else {

    doc.addEventListener ( 'DOMContentLoaded', callback );

  }

  return this;

};
