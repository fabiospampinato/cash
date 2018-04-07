
// @require collection/each.js

fn.trigger = function ( eventName, data ) {

  let evt = eventName;

  if ( isString ( eventName ) ) {

    evt = doc.createEvent ( 'HTMLEvents' );
    evt.initEvent ( eventName, true, false );

  }

  evt.data = data;

  return this.each ( ele => { ele.dispatchEvent ( evt ) } ); //FIXME: Maybe the return value of `dispatchEvent` is actually useful here?

};
