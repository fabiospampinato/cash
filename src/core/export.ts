
// @priority -100
// @require ./cash.ts
// @require ./variables.ts

if ( typeof exports !== 'undefined' ) { // Node.js

  module.exports = cash;

} else { // Browser

  win['cash'] = win['$'] = cash;

}
