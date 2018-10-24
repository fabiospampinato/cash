
describe ( 'Utilities', function () {

  describe ( '$.guid', function ( it ) {

    it ( 'is a number', function ( t ) {

      t.true ( typeof $.guid === 'number' );

    });

    it ( 'is incrementable', function ( t ) {

      var val = $.guid;

      $.guid++;

      t.is ( $.guid, val + 1 );

    });

  });

  describe ( '$.camelCase', function ( it ) {

    it ( 'converts a string to camelCase', function ( t ) {

      t.is ( $.camelCase ( 'width' ), 'width' );
      t.is ( $.camelCase ( 'border-width' ), 'borderWidth' );
      t.is ( $.camelCase ( 'border_width' ), 'border_width' );
      t.is ( $.camelCase ( '--foo-bar' ), '-FooBar' );

    });

  });

  describe ( '$.each', function ( it ) {

    it ( 'iterates over an array-like object', function ( t ) {

      var count = 0;

      function handler () {
        count++;
      }

      $.each ( [0, 1, 2], handler );
      $.each ( new Array ( 3 ), handler );
      $.each ( $([0, 1, 2]), handler );

      t.is ( count, 9 );

    });

  });

  describe ( '$.extend', function ( it ) {

    it ( 'extends a target object', function ( t ) {

      var target = {};
      var obj1 = { foo: 3 };
      var obj2 = { bar: { baz: true } };

      $.extend ( target, obj1, obj2 );

      t.deepEqual ( target, { foo: 3, bar: { baz: true } });

    });

  });

  describe ( '$.hasData', function ( it ) {

    it ( 'determines whether an element has any cash data associated with it', function ( t ) {

      var ele = $('<div data-foo="content">');

      t.false ( $.hasData ( ele[0] ) );

      t.is ( ele.data ( 'foo' ), 'content' );

      t.true ( $.hasData ( ele[0] ) );

    });

  });

  describe ( '$.isArray', function ( it ) {

    it ( 'checks if the passed variable is an array', function ( t ) {

      t.true ( $.isArray ( new Array () ) );
      t.true ( $.isArray ([ 1, 2, 3 ]) );
      t.false ( $.isArray ( true ) );
      t.false ( $.isArray ( 123 ) );
      t.false ( $.isArray ( 'foo' ) );
      t.false ( $.isArray ( function () {} ) );

    });

  });

  describe ( '$.isFunction', function ( it ) {

    it ( 'checks if the passed variable is a function', function ( t ) {

      t.true ( $.isFunction ( function () {} ) );
      t.false ( $.isFunction ( true ) );
      t.false ( $.isFunction ( 123 ) );
      t.false ( $.isFunction ( 'foo' ) );
      t.false ( $.isFunction ([ 1, 2, 3 ]) );

    });

  });

  describe ( '$.isNumeric', function ( it ) {

    it ( 'checks if the passed variable represents a number', function ( t ) {

      t.true ( $.isNumeric ( 123 ) );
      t.true ( $.isNumeric ( '123' ) );
      t.true ( $.isNumeric ( 3.14 ) );
      t.true ( $.isNumeric ( '3.14' ) );
      t.false ( $.isNumeric ( true ) );
      t.false ( $.isNumeric ( 'foo' ) );
      t.false ( $.isNumeric ( 'foo2' ) );
      t.false ( $.isNumeric ( '2foo' ) );
      t.false ( $.isNumeric ([ 1, 2, 3 ]) );
      t.false ( $.isNumeric ( function () {} ) );

    });

  });

  describe ( '$.isString', function ( it ) {

    it ( 'checks if the passed variable is a string', function ( t ) {

      t.true ( $.isString ( 'foo' ) );
      t.false ( $.isString ( true ) );
      t.false ( $.isString ( 123 ) );
      t.false ( $.isString ([ 1, 2, 3 ]) );
      t.false ( $.isString ( function () {} ) );

    });

  });

  describe ( '$.matches', function ( it ) {

    it ( 'checks if the passed element matches the passed selector', function ( t ) {

      var ele = $('<div class="test">')[0];

      t.true ( $.matches ( ele, '.test' ) );
      t.true ( $.matches ( ele, 'div' ) );
      t.false ( $.matches ( ele, '#foo' ) );

    });

    it ( 'supports falsy elements', function ( t ) {

      t.false ( $.matches ( 0, '*' ) );
      t.false ( $.matches ( '', '*' ) );
      t.false ( $.matches ( undefined, '*' ) );
      t.false ( $.matches ( null, '*' ) );

    });

  });

  describe ( '$.parseHTML', function ( it ) {

    it ( 'parses an html string', function ( t ) {

      var htmls = [ // to parse => expected
        ['<a></a>', '<a></a>'],
        ['<img>', '<img>'],
        ['<input>', '<input>']
      ];

      htmls.forEach ( function ( htmls ) {
        t.is ( $.parseHTML ( htmls[0] )[0].outerHTML, htmls[1] );
      })

    });

    it ( 'supports malformed unclosed tags', function ( t ) {

      var htmls = [ // to parse => expected
        ['<a>', '<a></a>'],
        ['<div>', '<div></div>']
      ];

      htmls.forEach ( function ( htmls ) {
        t.is ( $.parseHTML ( htmls[0] )[0].outerHTML, htmls[1] );
      })

    });

    it ( 'supports malformed closed tags', function ( t ) {

      var htmls = [ // to parse => expected
        ['<img />', '<img>'],
        ['<input />', '<input>']
      ];

      htmls.forEach ( function ( htmls ) {
        t.is ( $.parseHTML ( htmls[0] )[0].outerHTML, htmls[1] );
      })

    });

    it ( 'supports simple table elements', function ( t ) {

      var htmls = [ // to parse => expected
        ['<tbody>', '<tbody></tbody>'],
        ['<thead>', '<thead></thead>'],
        ['<tfoot>', '<tfoot></tfoot>'],
        ['<tr>', '<tr></tr>'],
        ['<td>', '<td></td>'],
        ['<th>', '<th></th>']
      ];

      htmls.forEach ( function ( htmls ) {
        t.is ( $.parseHTML ( htmls[0] )[0].outerHTML, htmls[1] );
      })

    });

    it ( 'supports advanced table elements', function ( t ) {

      var htmls = [ // to parse => expected
        ['<tbody><tr></tr></tbody>', '<tbody><tr></tr></tbody>'],
        ['<thead><tr></tr></thead>', '<thead><tr></tr></thead>'],
        ['<tfoot><tr></tr></tfoot>', '<tfoot><tr></tr></tfoot>'],
        ['<tr><td></td></tr>', '<tr><td></td></tr>'],
        ['<td><p></p></td>', '<td><p></p></td>'],
        ['<th><p></p></th>', '<th><p></p></th>']
      ];

      htmls.forEach ( function ( htmls ) {
        t.is ( $.parseHTML ( htmls[0] )[0].outerHTML, htmls[1] );
      })

    });

    it ( 'doesn\'t overwrite previous DOM nodes', function ( t ) {

      var span = $('<span>CONTENT</span>');

      $('<div></div>');

      t.is ( span.html (), 'CONTENT' );

    });

  });

  describe ( '$.prefixedProp', function ( it ) {

    it ( 'prefixes a css property', function ( t ) { // This test depends on the browser it's being run in

      t.is ( $.prefixedProp ( 'width' ), 'width' );
      t.is ( $.prefixedProp ( 'height' ), 'height' );

    });

    it ( 'supports css variables', function ( t ) {

      t.is ( $.prefixedProp ( '--foo' ), '--foo' );
      t.is ( $.prefixedProp ( '--foo-bar' ), '--foo-bar' );

    });

    it ( 'doesn\'t throw on invalid properties', function ( t ) {

      t.is ( $.prefixedProp ( 'foo-bar' ), undefined );

    });

  });

  describe ( '$.unique', function ( it ) {

    it ( 'filters duplicates out of arrays', function ( t ) {

      var numbers = [1, 1, 2, 6, 2];

      t.deepEqual ( $.unique ( numbers ), [1, 2, 6] );

      var eles = [document.body, document.body];

      t.deepEqual ( $.unique ( eles ), [document.body] );

    });

  });

});
