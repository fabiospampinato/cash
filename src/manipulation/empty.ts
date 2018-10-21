
// @require core/cash.ts

fn.empty = function () {

  const ele = this[0];

  if ( ele ) {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  }

  return this;

};
