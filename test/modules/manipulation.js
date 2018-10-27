
var fixture = '\
  <div class="parent">\
    <div class="anchor">content</div>\
  </div>\
  <div class="uncle"></div>\
  <div class="aunt"></div>\
';

describe ( 'Manipulation', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.after', function ( it ) {

    it ( 'inserts a selector after', function ( t ) {

      $('.anchor').after ( '<div>' );

      var prev = $('.anchor').prev ();
      var next = $('.anchor').next ();

      t.is ( prev.length, 0 );
      t.is ( next.length, 1 );

    });

    it ( 'inserts multiple selectors after', function ( t ) {

      $('.anchor').after ( '<div>', '<div>', '<div>' );

      var prev = $('.anchor').prev ();
      var siblings = $('.anchor').siblings ();

      t.is ( prev.length, 0 );
      t.is ( siblings.length, 3 );

    });

  });

  describe ( '$.fn.append', function ( it ) {

    it ( 'appends a selector', function ( t ) {

      $('.parent').append ( '<div>' );

      var next = $('.anchor').next ();

      t.is ( next.length, 1 );

    });

    it ( 'appends multiple selectors', function ( t ) {

      $('.parent').append ( '<div>', '<div>', '<div>' );

      var siblings = $('.anchor').siblings ();

      t.is ( siblings.length, 3 );

    });

    it ( 'doesn\'t throw with undefined', function ( t ) {

      $('.anchor').append ( undefined );

      t.pass ();

    });

  });

  describe ( '$.fn.appendTo', function ( it ) {

    it ( 'appends this to a selector', function ( t ) {

      $('<div>').appendTo ( '.parent' );

      var next = $('.anchor').next ();

      t.is ( next.length, 1 );

    });

  });

  describe ( '$.fn.before', function ( it ) {

    it ( 'inserts a selector before', function ( t ) {

      $('.anchor').before ( '<div>' );

      var prev = $('.anchor').prev ();
      var next = $('.anchor').next ();

      t.is ( prev.length, 1 );
      t.is ( next.length, 0 );

    });

    it ( 'inserts multiple selectors after', function ( t ) {

      $('.anchor').before ( '<div>', '<div>', '<div>' );

      var next = $('.anchor').next ();
      var siblings = $('.anchor').siblings ();

      t.is ( next.length, 0 );
      t.is ( siblings.length, 3 );

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

      t.is ( parent.contents ().length,  0 );

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

      $('<div>').insertAfter ( '.anchor' );

      var anchor = $('.anchor');
      var next = anchor.next ();

      t.is ( next.length, 1 );

    });

  });

  describe ( '$.fn.insertBefore', function ( it ) {

    it ( 'inserts this before a selector', function ( t ) {

      $('<div>').insertBefore ( '.anchor' );

      var anchor = $('.anchor');
      var prev = anchor.prev ();

      t.is ( prev.length, 1 );

    });

  });

  describe ( '$.fn.prepend', function ( it ) {

    it ( 'prepends a selector', function ( t ) {

      $('.parent').prepend ( '<div>' );

      var prev = $('.anchor').prev ();

      t.is ( prev.length, 1 );

    });

    it ( 'prepends multiple selectors', function ( t ) {

      $('.parent').prepend ( '<div>', '<div>', '<div>' );

      var siblings = $('.anchor').siblings ();

      t.is ( siblings.length, 3 );

    });

    it ( 'doesn\'t throw with undefined', function ( t ) {

      $('.anchor').prepend ( undefined );

      t.pass ();

    });

  });

  describe ( '$.fn.prependTo', function ( it ) {

    it ( 'prepends this to a selector', function ( t ) {

      $('<div>').prependTo ( '.parent' );

      var prev = $('.anchor').prev ();

      t.is ( prev.length, 1 );

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
