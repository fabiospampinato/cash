
// @require core/cash.js
// @require core/unique.js
// @require collection/each.js

fn.contents = function () {

  let result = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes );

  });

  return cash ( result.length && unique ( result ) );

};
