
// @require collection/filter.ts
// @require collection/filter.ts
// @require traversal/find.ts

const scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
      HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function evalScripts ( node: Node ) {

  const collection = cash ( node );

  collection.filter ( 'script' ).add ( collection.find ( 'script' ) ).each ( ( i, ele ) => {
    if ( !ele.src && scriptTypeRe.test ( ele.type ) ) { // The script type is supported
      if ( ele.ownerDocument.documentElement.contains ( ele ) ) { // The element is attached to the DOM // Using `documentElement` for broader browser support
        eval ( ele.textContent.replace ( HTMLCDATARe, '' ) );
      }
    }
  });

}
