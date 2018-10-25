
// @require ./cash.ts
// @require ./variables

function unique ( arr: ArrayLike<any> ): ArrayLike<any> {
  return arr.length > 1 ? filter.call ( arr, ( item, index, self ) => indexOf.call ( self, item ) === index ) : arr;
}

interface CashStatic {
  unique ( arr: ArrayLike<any> ): ArrayLike<any>;
}

cash.unique = unique;
