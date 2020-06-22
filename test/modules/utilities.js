
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

    it ( 'iterates over an object', function ( t ) {

      var count = 0;
      var result = {};

      function handler (name, value) {
        count++;
        result[name] = value;
      }

      $.each ( { foo: 1, bar: 2 }, handler );
      t.deepEqual ( result, { foo: 1, bar: 2 } );
      t.is ( count, 2 );

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

    it ( 'works also with either zero or one object(s)', function ( t ) {

      t.deepEqual ( $.extend (), {} );
      t.deepEqual ( $.extend ( { foo: 1 } ), $ );
      t.is ( $.foo, 1 );

      delete $.foo;

    });

    it ( 'can deep extend', function ( t ) {
      let deep1 = $.extend ( true, { foo: 1 }, { bar: { inner: 2 } } );
      t.deepEqual ( deep1, { foo: 1, bar: { inner: 2 } } );

      let deep2 = $.extend ( true, { foo: 1 }, { bar: [ 1, 2 ] } );
      t.deepEqual ( deep2, { foo: 1, bar: [ 1, 2 ] } );

      let deep3 = $.extend ( true, {}, { foo: 1 }, { bar: { inner: 2, baz: { inner2: 3 } } } );
      t.deepEqual ( deep3, { foo: 1, bar: { inner: 2, baz: { inner2: 3 } } } );

      let deep4 = $.extend ( true, {}, { foo: 1, bar: { baz: 3 } }, { bar: { baz: 4 } } );
      t.deepEqual ( deep4, { foo: 1, bar: { baz: 4 } } );
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

  describe ( '$.isWindow', function ( it ) {

    it ( 'checks if the passed variable is a window', function ( t ) {

      t.true ( $.isWindow ( window ) );
      t.false ( $.isWindow ( document ) );
      t.false ( $.isWindow ( 'foo' ) );
      t.false ( $.isWindow ( true ) );
      t.false ( $.isWindow ( 123 ) );
      t.false ( $.isWindow ([ 1, 2, 3 ]) );
      t.false ( $.isWindow ( function () {} ) );

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

    it ( 'supports missing or falsy arguments', function ( t ) {

      t.is ( $.parseHTML ( 0 ).length, 0 );
      t.is ( $.parseHTML ( '' ).length, 0 );
      t.is ( $.parseHTML ( undefined ).length, 0 );
      t.is ( $.parseHTML ( null ).length, 0 );

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

    it ( 'preserves leading/trailing whitespace', function ( t ) {

      var htmls = [
        '  <b>foo</b>',
        '<b>foo</b>  ',
        '  <b>foo</b>  ',
        '  <div></div>',
        '<div></div>   ',
        '  <div></div>   '
      ];

      htmls.forEach ( function ( html ) {
        t.is ( $('<div>').append ( $.parseHTML ( html ) ).html (), html );
      });

    });

    it ( 'doesn\'t overwrite previous DOM nodes', function ( t ) {

      var span = $('<span>CONTENT</span>');

      $('<div></div>');

      t.is ( span.html (), 'CONTENT' );

    });

    it.skip ( 'doesn\'t have prototype inheritance issues', function ( t ) {

      var constructor = $('<constructor>CONTENT</constructor>');

      t.is ( constructor.html (), 'CONTENT' );

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

  describe ( '$.isPlainObject', function ( it ) {

    it ( 'detects a plain object', function ( t ) {

      t.is ( $.isPlainObject({}), true );

    });

    it ( 'detects other types as not a plain object', function ( t ) {

      t.is ( $.isPlainObject(function () {}), false );
      t.is ( $.isPlainObject(window), false );
      t.is ( $.isPlainObject($), false );
      t.is ( $.isPlainObject($('body')), false );
      t.is ( $.isPlainObject(true), false );
      t.is ( $.isPlainObject(undefined), false );
      t.is ( $.isPlainObject(null), false );
      t.is ( $.isPlainObject(Date), false );

    });

  });

});
