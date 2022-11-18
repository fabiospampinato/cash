
// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts

const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
const scriptTypeRe = /^$|^module$|\/(java|ecma)script/i;
const scriptAttributes: ('type' | 'src' | 'nonce' | 'noModule')[] = ['type', 'src', 'nonce', 'noModule'];

function evalScripts ( node: Node, doc: Document ): void {

  const collection = cash ( node );

  collection.filter ( 'script' ).add ( collection.find ( 'script' ) ).each ( ( i, ele: HTMLScriptElement ) => {

    if ( scriptTypeRe.test ( ele.type ) && docEle.contains ( ele ) ) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support

      const script = createElement ( 'script' );

      script.text = ele.textContent.replace ( HTMLCDATARe, '' );

      each ( scriptAttributes, ( i, attr ) => {

        if ( ele[attr] ) script[attr] = ele[attr];

      });

      doc.head.insertBefore ( script, null );
      doc.head.removeChild ( script );

    }

  });

}
