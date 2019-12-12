
// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  unique<T> ( arr: ArrayLike<T> ): ArrayLike<T>;
}

function unique<T> ( arr: ArrayLike<T> ): ArrayLike<T> {

  return arr.length > 1 ? filter.call ( arr, ( item: T, index: number, self: ArrayLike<T> ) => indexOf.call ( self, item ) === index ) : arr;

}

cash.unique = unique;
