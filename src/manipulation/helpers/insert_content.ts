
// @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts

function insertContent ( parent: Cash, child: Cash, prepend?: boolean ): void {

  each ( parent, ( index: number, parentEle: Ele ) => {
    each ( child, ( i, childEle: Ele ) => {
      insertElement ( parentEle, !index ? childEle : childEle.cloneNode ( true ), prepend, prepend && parentEle.firstChild );
    });
  });

}
