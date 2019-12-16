
var fixture = '\
  <div class="parent">\
    <div class="anchor">content</div>\
  </div>\
  <div class="uncle"></div>\
  <div class="aunt">\
    <div class="cousin">content</div>\
  </div>\
';

var ele2tagname = function ( ele ) { return ele.tagName; };

describe ( 'Manipulation', { beforeEach: getFixtureInit ( fixture ) }, function ( it ) {

  QUnit.test ( 'inserted script tags get executed', function ( assert ) { // For some reason we can't use our nice helpers for async assertions :(

    var sync = [
      ['<script>if ( window.__script_test__ === 1 ) throw new Error (); window.__script_test__ = 1</script>', '__script_test__', 1],
      ['<script type="">if ( window.__script_test__ === 2 ) throw new Error (); window.__script_test__ = 2</script>', '__script_test__', 2],
      ['<script type="text/javascript">if ( window.__script_test__ === 3 ) throw new Error (); window.__script_test__ = 3</script>', '__script_test__', 3],
      ['<script type="text/ecmascript">if ( window.__script_test__ === 4 ) throw new Error (); window.__script_test__ = 4</script>', '__script_test__', 4],
      ['<div class="nested"><script>if ( window.__script_test__ === 5 ) throw new Error (); window.__script_test__ = 5</script></div>', '__script_test__', 5],
      ['<script><![CDATA[if ( window.__script_test__ === 6 ) throw new Error (); window.__script_test__ = 6</script>', '__script_test__', 6]
    ];

    sync.forEach ( function ( test ) {

      $(test[0]).appendTo ( '.anchor' );

      assert.is ( window[test[1]], test[2] );

    });

    var async = [
      ['<script type="text/javascript" src="data:text/javascript,if ( window.__script_test_async2__ === 2 ) throw new Error (); window.__script_test_async2__ = 2"></script>', '__script_test_async2__', 2],
      ['<script type="module">if ( window.__script_test_async1__ === 1 ) throw new Error (); window.__script_test_async1__ = 1</script>', '__script_test_async1__', 1]
    ];

    if ( !/(mac\sos\sx)\s?([\w\s\.]*)/i.test ( navigator.userAgent ) && !/(macintosh|mac(?=_powerpc)\s)/i.test ( navigator.userAgent ) ) return; //FIXME: For some reason some browsers don't support some of these, and I don't think its our fault

    async.forEach ( function ( test ) {

      var done = assert.async ();

      $(test[0]).appendTo ( '.anchor' );

      setTimeout ( function () {
        assert.is ( window[test[1]], test[2] );
        done ();
      }, 100 );

    });

  });

  describe ( '$.fn.after', function ( it ) {

    it ( 'inserts a selector after', function ( t ) {

      $('.anchor').after ( '<a></a><b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 3 );
      t.deepEqual ( $('.parent').children ().slice ( 1 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

    it ( 'inserts multiple selectors after', function ( t ) {

      $('.anchor').after ( '<a></a>', '<b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 3 );
      t.deepEqual ( $('.parent').children ().slice ( 1 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

  });

  describe ( '$.fn.append', function ( it ) {

    it ( 'appends a selector', function ( t ) {

      $('.parent').append ( '<a></a><b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 3 );
      t.deepEqual ( $('.parent').children ().slice ( 1 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

    it ( 'appends multiple selectors', function ( t ) {

      $('.parent').append ( '<a></a>', '<b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 3 );
      t.deepEqual ( $('.parent').children ().slice ( 1 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

    it ( 'doesn\'t throw with undefined', function ( t ) {

      $('.anchor').append ( undefined );

      t.pass ();

    });

  });

  describe ( '$.fn.appendTo', function ( it ) {

    it ( 'appends this to a selector', function ( t ) {

      $( '<a></a><b></b><c></c>' ).appendTo ( '.parent' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 3 );
      t.deepEqual ( $('.parent').children ().slice ( 1 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

  });

  describe ( '$.fn.before', function ( it ) {

    it ( 'inserts a selector before', function ( t ) {

      $('.anchor').before ( '<a></a><b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 3 );
      t.is ( next.length, 0 );
      t.deepEqual ( $('.parent').children ().slice ( 0, 3 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

    it ( 'inserts multiple selectors after', function ( t ) {

      $('.anchor').before ( '<a></a>', '<b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 3 );
      t.is ( next.length, 0 );
      t.deepEqual ( $('.parent').children ().slice ( 0, 3 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

  });

  describe ( '$.fn.clone', function ( it ) {

    it ( 'clones all elements', function ( t ) {

      var original = $('#qunit-fixture *');
      var cloned = original.clone ();

      t.is ( original.length, cloned.length );
      t.not ( original[0], cloned[0] );
      t.is ( original[0].className, cloned[0].className );

    });

  });

  describe ( '$.fn.detach', function ( it ) {

    it ( 'detaches all elements and preserves their event handlers', function ( t ) {

      var count = 0;
      var anchor = $('.anchor');

      function handler () {
        count++;
      }

      anchor.on ( 'foo', handler );
      anchor.detach ();
      anchor.appendTo ( '.parent' );
      anchor.trigger ( 'foo' );
      anchor.detach ();
      anchor.trigger ( 'foo' );

      t.is ( $('.anchor').length, 0 );
      t.is ( count, 2 );

    });

  });

  describe ( '$.fn.empty', function ( it ) {

    it ( 'empties all elements', function ( t ) {

      var parent = $('.parent');

      parent.empty ();

      t.is ( parent.contents ().length, 0 );

    });

    it ( 'supports multiple elements in the collection', function ( t ) {

      var parent = $('.parent');
      var aunt = $('.aunt');
      var parents = parent.add ( aunt );

      parents.empty ();

      t.is ( parent.contents ().length, 0 );
      t.is ( aunt.contents ().length, 0 );

    });

  });

  describe ( '$.fn.html', function ( it ) {

    it ( 'gets the html', function ( t ) {

      var parent = $('.parent');

      t.is ( parent.html ().trim (), '<div class="anchor">content</div>' );

    });

    it ( 'sets html strings', function ( t ) {

      var anchor = $('.anchor');
      var html = '<div class="foo"></div>';

      anchor.html ( html );

      t.is ( anchor.html (), html );
      t.is ( $('.foo').length, 1 );

    });

    it ( 'sets plain string', function ( t ) {

      var anchor = $('.anchor');
      var html = 'foo';

      anchor.html ( html );

      t.is ( anchor.html (), html );

    });

    it ( 'sets numbers', function ( t ) {

      var anchor = $('.anchor');

      anchor.html ( 0 );

      t.is ( anchor.html (), '0' );

    });

  });

  describe ( '$.fn.insertAfter', function ( it ) {

    it ( 'inserts this after a selector', function ( t ) {

      $('<a></a><b></b><c></c>').insertAfter ( '.anchor' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 3 );
      t.deepEqual ( $('.parent').children ().slice ( 1 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

  });

  describe ( '$.fn.insertBefore', function ( it ) {

    it ( 'inserts this before a selector', function ( t ) {

      $('<a></a><b></b><c></c>').insertBefore ( '.anchor' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 3 );
      t.is ( next.length, 0 );
      t.deepEqual ( $('.parent').children ().slice ( 0, 3 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

  });

  describe ( '$.fn.prepend', function ( it ) {

    it ( 'prepends a selector', function ( t ) {

      $('.parent').prepend ( '<a></a><b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 3 );
      t.is ( next.length, 0 );
      t.deepEqual ( $('.parent').children ().slice ( 0, 3 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

    it ( 'prepends multiple selectors', function ( t ) {

      $('.parent').prepend ( '<a></a>', '<b></b><c></c>' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 3 );
      t.is ( next.length, 0 );
      t.deepEqual ( $('.parent').children ().slice ( 0, 3 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

    it ( 'doesn\'t throw with undefined', function ( t ) {

      $('.anchor').prepend ( undefined );

      t.pass ();

    });

  });

  describe ( '$.fn.prependTo', function ( it ) {

    it ( 'prepends this to a selector', function ( t ) {

      $('<a></a><b></b><c></c>').prependTo ( '.parent' );

      var prev = $('.anchor').prevAll ();
      var next = $('.anchor').nextAll ();

      t.is ( prev.length, 3 );
      t.is ( next.length, 0 );
      t.deepEqual ( $('.parent').children ().slice ( 0, 3 ).get ().map ( ele2tagname ), ['A', 'B', 'C'] );

    });

  });

  describe ( '$.fn.remove', function ( it ) {

    it ( 'detaches all elements and removes their event handlers', function ( t ) {

      var count = 0;
      var anchor = $('.anchor');

      function handler () {
        count++;
      }

      anchor.on ( 'foo', handler );
      anchor.remove ();
      anchor.prependTo ( '.form-fixture' );
      anchor.trigger ( 'foo' );
      anchor.remove ();
      anchor.trigger ( 'foo' );

      t.is ( $('.anchor').length, 0 );
      t.is ( count, 0 );

    });

  });

  describe ( '$.fn.replaceAll', function ( it ) {

    it ( 'replaces a selector with this', function ( t ) {

      var parent = $('.parent');
      var html = '<p></p>';

      $('<p>').replaceAll ( '.anchor' );

      t.is ( parent.html ().trim (), html );
      t.is ( $('.anchor').length, 0 );
      t.is ( $('.parent p').length, 1 );

    });

    it ( 'supports multiple elements', function ( t ) {

      var toReplace = $('.parent, .uncle, .aunt');
      var html = '<p></p>';

      $(html).replaceAll ( toReplace );

      t.is ( $('#qunit-fixture p').length, 3 );

    });

  });

  describe ( '$.fn.replaceWith', function ( it ) {

    it ( 'replaces this with a selector', function ( t ) {

      var parent = $('.parent');
      var anchor = $('.anchor');
      var html = '<p></p>';

      anchor.replaceWith ( html );

      t.is ( parent.html ().trim (), html );
      t.is ( $('.anchor').length, 0 );
      t.is ( $('.parent p').length, 1 );

    });

    it ( 'supports multiple elements', function ( t ) {

      var toReplace = $('.parent, .uncle, .aunt');
      var html = '<p></p>';

      toReplace.replaceWith ( html );

      t.is ( $('#qunit-fixture p').length, 3 );

    });

  });

  describe ( '$.fn.text', function ( it ) {

    it ( 'gets the text', function ( t ) {

      var anchor = $('.anchor');

      t.is ( anchor.text (), 'content' );

    });

    it ( 'sets html strings', function ( t ) {

      var anchor = $('.anchor');
      var text = '<div>foo</div>';

      anchor.text ( text );

      t.is ( anchor.text (), text );

    });

    it ( 'sets plain strings', function ( t ) {

      var anchor = $('.anchor');
      var text = 'foo';

      anchor.text ( text );

      t.is ( anchor.text (), text );

    });

    it ( 'sets numbers', function ( t ) {

      var anchor = $('.anchor');

      anchor.text ( 0 );

      t.is ( anchor.text (), '0' );

    });

  });

  describe ( '$.fn.unwrap', function ( it ) {

    it ( 'unwraps each element', function ( t ) {

      var anchor = $('.anchor');

      anchor.unwrap ();

      t.is ( $('.parent').length, 0 );
      t.deepEqual ( anchor.parent (), $('#qunit-fixture') );

    });

  });

  describe ( '$.fn.wrap', function ( it ) {

    it ( 'wraps a structure around each element', function ( t ) {

      var eles = $('.uncle, .aunt');
      var wrapper = '<div class="wrapper"></div>';

      eles.wrap ( wrapper );

      t.is ( eles.parent ().filter ( '.wrapper' ).length, 2 );

    });

    it ( 'supports nested structures', function ( t ) {

      var eles = $('.uncle, .aunt');
      var wrapper = '<div class="wrapper"><div class="nested"></div></div>';

      eles.wrap ( wrapper );

      t.is ( eles.parent ().filter ( '.nested' ).length, 2 );
      t.is ( eles.parent ().parent ().filter ( '.wrapper' ).length, 2 );

    });

  });

  describe ( '$.fn.wrapAll', function ( it ) {

    it ( 'wraps a structure around all elements', function ( t ) {

      var eles = $('.uncle, .aunt');
      var wrapper = '<div class="wrapper"></div>';

      eles.wrapAll ( wrapper );

      t.is ( eles.parent ().filter ( '.wrapper' ).length, 1 );

    });

    it ( 'supports nested structures', function ( t ) {

      var eles = $('.uncle, .aunt');
      var wrapper = '<div class="wrapper"><div class="nested"></div></div>';

      eles.wrapAll ( wrapper );

      t.is ( eles.parent ().filter ( '.nested' ).length, 1 );
      t.is ( eles.parent ().parent ().filter ( '.wrapper' ).length, 1 );

    });

  });

  describe ( '$.fn.wrapInner', function ( it ) {

    it ( 'wraps a struncture around all contents', function ( t ) {

      var eles = $('.anchor, .uncle');
      var wrapper = '<div class="wrapper"></div>';

      eles.wrapInner ( wrapper );

      t.is ( $( eles[0] ).html ().trim (), '<div class="wrapper">content</div>' );
      t.is ( $( eles[1] ).html (), '<div class="wrapper"></div>' );

    });

    it ( 'supports nested structures', function ( t ) {

      var eles = $('.anchor, .uncle');
      var wrapper = '<div class="wrapper"><div class="nested"></div></div>';

      eles.wrapInner ( wrapper );

      t.is ( $( eles[0] ).html ().trim (), '<div class="wrapper"><div class="nested">content</div></div>' );
      t.is ( $( eles[1] ).html (), '<div class="wrapper"><div class="nested"></div></div>' );

    });

  });

});
