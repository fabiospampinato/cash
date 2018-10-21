
// @require core/cash.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  contents (): Cash;
}

Cash.prototype.contents = function ( this: Cash ) {

  let result: Ele[] = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes );

  });

  return cash ( result.length && unique ( result ) );

};
