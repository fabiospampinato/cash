
// @require collection/filter.ts
// @require traversal/find.ts

const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
      scriptAttributes = ['type', 'src', 'nonce', 'noModule'];

function evalScripts ( node: Node, doc: Document ): void {

  const collection = cash ( node );

  collection.filter ( 'script' ).add ( collection.find ( 'script' ) ).each ( ( i, ele: HTMLScriptElement ) => {
    if ( scriptTypeRe.test ( ele.type ) ) { // The script type is supported
      if ( doc.documentElement.contains ( ele ) ) { // The element is attached to the DOM // Using `documentElement` for broader browser support
        const script = doc.createElement ( 'script' );
        script.text = ele.textContent.replace ( HTMLCDATARe, '' );
        each ( scriptAttributes, ( i, attr ) => {
          if ( ele[attr] ) script[attr] = ele[attr];
        });
        doc.head.appendChild ( script ).parentNode.removeChild ( script );
      }
    }
  });

}
