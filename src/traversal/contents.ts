
// @require core/cash.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  contents (): Cash;
}

Cash.prototype.contents = function ( this: Cash ) {

  const result: Ele[] = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes );

  });

  return cash ( unique ( result ) );

};
