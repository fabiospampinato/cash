
// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  contents (): Cash;
}

fn.contents = function ( this: Cash ) {

  return cash ( unique ( pluck ( this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );

};
