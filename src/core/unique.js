
// @require ./cash.js

function unique ( arr ) {
  return arr.filter ( ( item, index, self ) => self.indexOf ( item ) === index );
}

cash.unique = unique;
