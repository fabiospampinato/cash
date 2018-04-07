
// @require ./matches.js
// @require ./type_checking.js

function getCompareFunction ( selector ) {

  return isString ( selector )
           ? matches
           : selector.cash
             ? ele => selector.is ( ele )
             : ( ele, selector ) => ele === selector;

}
