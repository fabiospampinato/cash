
// @require ./cash.ts
// @require ./variables.ts

if ( typeof exports !== 'undefined' ) { // Node.ts

  module.exports = cash;

} else { // Browser

  win.cash = win.$ = cash;

}
