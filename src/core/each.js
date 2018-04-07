
// @require ./cash.js

function each ( arr, callback ) {
  for ( let i = 0, l = arr.length; i < l; i++ ) {
    if ( callback.call ( arr[i], arr[i], i, arr ) === false ) break;
  }
}

cash.each = each;
