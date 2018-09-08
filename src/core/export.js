
// @require ./cash.js
// @require ./variables.js

if ( typeof exports !== 'undefined' ) { // Node.js

  module.exports = cash;

} else { // Browser

  win.cash = win.$ = cash;

}
