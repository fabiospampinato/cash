
// @require core/cash.ts

interface Cash {
  offsetParent (): Cash;
}

fn.offsetParent = function ( this: Cash ) {

  return cash ( this[0] && this[0].offsetParent );

};
