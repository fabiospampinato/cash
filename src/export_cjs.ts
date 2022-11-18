
// @require methods.ts

if ( typeof exports !== 'undefined' ) { // Node.js

  module.exports = cash;

} else { // Browser

  win['cash'] = win['$'] = cash;

}
