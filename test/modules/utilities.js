
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
      var handled = {};
      var target = { foo: 1, bar: 2 };

      function handler ( key, value ) {
        count++;
        handled[key] = value;
      }

      $.each ( target, handler );

      t.is ( count, 2 );
      t.deepEqual ( handled, target );

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

    it ( 'can extend deeply', function ( t ) {

      var result1 = $.extend ( true, { foo: 1 }, { bar: { inner: 2 } } );
      t.deepEqual ( result1, { foo: 1, bar: { inner: 2 } } );

      var result2 = $.extend ( true, { foo: 1 }, { bar: [1, 2] } );
      t.deepEqual ( result2, { foo: 1, bar: [1, 2] } );

      var result3 = $.extend ( true, {}, { foo: 1 }, { bar: { inner: 2, baz: { inner2: 3 } } } );
      t.deepEqual ( result3, { foo: 1, bar: { inner: 2, baz: { inner2: 3 } } } );

      var result4 = $.extend ( true, {}, { foo: 1, bar: { baz: 3 } }, { bar: { baz: 4 } } );
      t.deepEqual ( result4, { foo: 1, bar: { baz: 4 } } );

      var result5 = $.extend ( true, {}, { foo: 1, bar: { baz: 3 } }, { bar: { baz: 4 } }, { bar: { qux: 5 }} );
      t.deepEqual ( result5, { foo: 1, bar: { baz: 4, qux: 5 } } );

    });

    it ( 'works also with either zero or one object(s)', function ( t ) {

      t.deepEqual ( $.extend (), {} );
      t.deepEqual ( $.extend ( { foo: 1 } ), $ );
      t.is ( $.foo, 1 );

      delete $.foo;

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

  describe ( '$.isPlainObject', function ( it ) {

    it ( 'checks if the passed variable is a plain object', function ( t ) {

      t.true ( $.isPlainObject ( {} ) );
      t.true ( $.isPlainObject ( Object.create ( null ) ) );
      t.false ( $.isPlainObject ( [] ) );
      t.false ( $.isPlainObject ( function () {} ) );
      t.false ( $.isPlainObject ( window ) );
      t.false ( $.isPlainObject ( $ ) );
      t.false ( $.isPlainObject ( $('body') ) );
      t.false ( $.isPlainObject ( 'foo' ) );
      t.false ( $.isPlainObject ( true ) );
      t.false ( $.isPlainObject ( undefined ) );
      t.false ( $.isPlainObject ( null ) );
      t.false ( $.isPlainObject ( 0 ) );
      t.false ( $.isPlainObject ( Date ) );
      t.false ( $.isPlainObject ( new Date () ) );

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

});
