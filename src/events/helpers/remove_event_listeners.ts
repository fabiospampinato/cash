
// @require core/each.ts

function removeEventListeners ( cache: plainObject, ele: Ele, name: string ): void {

  each ( cache[name], ( i, [namespaces, callback] ) => {
    ele.removeEventListener ( name, callback )
  });

  delete cache[name];

}
