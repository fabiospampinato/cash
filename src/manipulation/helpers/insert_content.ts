
// @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts

function insertContent ( parent: Cash, child: Cash, prepend?: boolean ): void {

  each ( parent, ( parentEle: HTMLElement, index: number ) => {
    each ( child, ( childEle: HTMLElement ) => {
      insertElement ( parentEle, !index ? childEle : childEle.cloneNode ( true ), prepend );
    });
  });

}
