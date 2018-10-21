
// @require core/cash.ts
// @require core/unique.ts
// @require collection/each.ts

fn.contents = function () {

  let result = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes );

  });

  return cash ( result.length && unique ( result ) );

};
