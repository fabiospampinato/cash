
// @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts

function insertContent ( parent: Cash, child: Cash, prepend?: boolean ): void {

  each ( parent, ( index: number, parentEle: HTMLElement ) => {
    each ( child, ( i, childEle: HTMLElement ) => {
      insertElement ( parentEle, !index ? childEle : childEle.cloneNode ( true ), prepend, prepend && parentEle.firstChild );
    });
  });

}
