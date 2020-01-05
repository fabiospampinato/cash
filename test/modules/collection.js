
var fixture = '\
  <div class="prevprev sibling"></div>\
  <div class="prev sibling"></div>\
  <div class="anchor sibling"></div>\
  <div class="next sibling"></div>\
  <div class="nextnext sibling"></div>\
';

describe ( 'Collection', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.add', function ( it ) {

    it ( 'supports selector', function ( t ) {

      var ele = $('.anchor');
      var added = ele.add ( '.prev, .next' );

      t.is ( added.length, 3 );

    });

    it ( 'supports DOM node', function ( t ) {

      var ele = $('.anchor');
      var added = ele.add ( document.body );

      t.is ( added.length, 2 );
      t.true ( added.get ().indexOf ( ele[0] ) >= 0 );
      t.true ( added.get ().indexOf ( document.body ) >= 0 );

    });

    it ( 'supports Cash instances', function ( t ) {

      var ele = $('.anchor');
      var next = $('.next');
      var added = ele.add ( next ).add ( $() );

      t.is ( added.length, 2 );

    });

    it ( 'doesn\'t add duplicates', function ( t ) {

      var ele = $('.anchor');
      var added = ele.add ( '.sibling' );

      t.is ( added.length, 5 );

    });

  });

  describe ( '$.fn.each', function ( it ) {

    it ( 'iterates over elements', function ( t ) {

      var siblings = $('.sibling');
      var indexes = [];
      var eles = [];
      var thats = [];

      siblings.each ( function ( index, ele ) {
        indexes.push ( index );
        eles.push ( ele );
        thats.push ( this );
      });

      t.deepEqual ( indexes, [0, 1, 2, 3, 4] );
      t.deepEqual ( eles, siblings.get () );
      t.deepEqual ( thats, siblings.get () );

    });

  });

  describe ( '$.fn.eq', function ( it ) {

    it ( 'gets the element at index', function ( t ) {

      var siblings = $('.sibling');

      siblings.each ( function ( index ) {
        t.is ( siblings.eq ( index )[0], siblings[index] );
      });

    });

    it ( 'supports string indexes', function ( t ) {

      var siblings = $('.sibling');

      siblings.each ( function ( index ) {
        t.is ( siblings.eq ( String ( index ) )[0], siblings[index] );
      });

    });

  });

  describe ( '$.fn.filter', function ( it ) {

    it ( 'supports selector', function ( t ) {

      var siblings = $('.sibling');
      var filtered = siblings.filter ( '.prev, .next' );

      t.is ( filtered.length, 2 );

    });

    it ( 'supports DOM node', function ( t ) {

      var anchor = $('.anchor');
      var siblings = $('.sibling');
      var filtered = siblings.filter ( anchor[0] );

      t.is ( filtered.length, 1 );
      t.is ( filtered[0], anchor[0] );

    });

    it ( 'supports function', function ( t ) {

      var siblings = $('.sibling');
      var indexes = [];
      var eles = [];
      var thats = [];

      var filtered = siblings.filter ( function ( index, ele ) {
        indexes.push ( index );
        eles.push ( ele );
        thats.push ( this );
        return !!index;
      });

      t.deepEqual ( indexes, [0, 1, 2, 3, 4] );
      t.deepEqual ( eles, siblings.get () );
      t.deepEqual ( thats, siblings.get () );
      t.deepEqual ( filtered.get (), siblings.slice ( 1 ).get () );

    });

    it ( 'doesn\'t throw with an empty selector', function ( t ) {

      $('*').filter ( '' );
      t.pass ();

    });

  });

  describe ( '$.fn.first', function ( it ) {

    it ( 'gets a collection containing the first element', function ( t ) {

      var siblings = $('.sibling');
      var first = siblings.first ();

      t.true ( first.hasClass ( 'prevprev' ) );

    });

  });

  describe ( '$.fn.get', function ( it ) {

    it ( 'gets a single element', function ( t ) {

      var siblings = $('.sibling');

      siblings.each ( function ( index ) {
        t.is ( siblings.get ( index ), siblings[index] );
      });

    });

    it ( 'gets all elements', function ( t ) {

      var siblings = $('.sibling');
      var arr = siblings.get ();

      t.true ( $.isArray ( arr ) );
      t.is ( arr.length, 5 );
      t.deepEqual ( arr, [siblings[0], siblings[1], siblings[2], siblings[3], siblings[4]] );

    });

    it ( 'supports string indexes', function ( t ) {

      var siblings = $('.sibling');

      siblings.each ( function ( index ) {
        t.is ( siblings.get ( String ( index ) ), siblings[index] );
      });

    });

  });

  describe ( '$.fn.index', function ( it ) {

    it ( 'gets index of collection element', function ( t ) {

      var anchor = $('.anchor');

      t.is ( anchor.index (), 2 );

    });

    it ( 'gets index of selector', function ( t ) {

      var siblings = $('.sibling');

      t.is ( siblings.index ( '.anchor' ), 2 );

    });

  });

  describe ( '$.fn.last', function ( it ) {

    it ( 'gets a collection containing the last element', function ( t ) {

      var siblings = $('.sibling');
      var last = siblings.last ();

      t.true ( last.hasClass ( 'nextnext' ) );

    });

  });

  describe ( '$.fn.map', function ( it ) {

    it ( 'maps over elements', function ( t ) {

      var siblings = $('.sibling');
      var body = document.body;
      var indexes = [];
      var eles = [];
      var thats = [];

      var mapped = siblings.map ( function ( index, ele ) {
        indexes.push ( index );
        eles.push ( ele );
        thats.push ( this );
        return body;
      });

      t.deepEqual ( indexes, [0, 1, 2, 3, 4] );
      t.deepEqual ( eles, siblings.get () );
      t.deepEqual ( thats, siblings.get () );
      t.deepEqual ( mapped.get (), [body, body, body, body, body] );

    });

    it ( 'supports callbacks that returns multiple elements', function ( t ) {

      var mapped = $('<div>').map ( function () {

        return [document.head, document.body];

      });

      t.is ( mapped.length, 2 );
      t.true ( mapped.get ().indexOf ( document.head ) >= 0 );
      t.true ( mapped.get ().indexOf ( document.body ) >= 0 );

    });

  });

  describe ( '$.fn.slice', function ( it ) {

    it ( 'gets a slice', function ( t ) {

      var siblings = $('.sibling');

      t.is ( siblings.slice ( 2 ).length, 3 );
      t.is ( siblings.slice ( 2, 3 ).length, 1 );
      t.deepEqual ( siblings.slice ( 2, 3 ).get (), siblings.eq ( 2 ).get () );
      t.deepEqual ( siblings.slice ( -1 ).get (), siblings.eq ( 4 ).get () );

    });

  });

});
