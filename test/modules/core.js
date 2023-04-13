
var fixture = '\
  <div id="123-ção" class="123-ção"></div>\
  <div id="id.with.dots" class="class.with.dots"></div>\
  <div id="id" class="class"></div>\
  <div id="id"></div>\
  <div id="id"></div>\
  <div class="single"></div>\
  <div class="multiple"><div class="child"></div></div>\
  <div class="multiple"><div class="child"></div></div>\
  <main></main>\
  <main></main>\
';

describe ( 'Core', { beforeEach: getFixtureInit ( fixture ) }, function ( it ) {

  it ( '$() instanceof $', function ( t ) {

    t.true ( $() instanceof $ );

  });

  describe ( 'Collections', function ( it ) {

    ( typeof Symbol === 'function' ? it : it.skip )( 'are iterable', function ( t ) { // It only works on browsers with support for Symbol

      var $eles = $('.multiple');

      t.true ( $eles[Symbol.iterator] === Array.prototype[Symbol.iterator] );

    });

  });

  describe ( 'Plugins', function ( it ) {

    it ( '$.fn is prototype', function ( t ) {

      var plugin = function () {};

      $.fn.plugin = plugin;

      t.is ( $().plugin, plugin );

    });

    it ( '$.fn.extend adds plugins', function ( t ) {

      var foo = function () {};
      var bar = function () {};

      $.fn.extend ({ foo: foo, bar: bar });

      t.is ( $().foo, foo );
      t.is ( $().bar, bar );

    });

  });

  describe ( 'Selector', function ( it ) {

    it ( 'supports falsy values', function ( t ) {

      t.is ( $().length, 0 );
      t.is ( $(0).length, 0 );
      t.is ( $('').length, 0 );
      t.is ( $(undefined).length, 0 );
      t.is ( $(null).length, 0 );

    });

    it ( 'supports ID', function ( t ) {

      t.is ( $('#id').length, 1 );

    });

    it ( 'supports unusual IDs', function ( t ) {

      t.is ( $('#123-ção').length, 1 );

    });

    it ( 'supports IDs with dots', function ( t ) {

      t.is ( $('#id\\.with\\.dots').length, 1 );

    });

    it ( 'supports ID with class', function ( t ) {

      t.is ( $('#id.class').length, 1 );

    });

    it ( 'supports non-existent ID', function ( t ) {

      t.is ( $('#foo').length, 0 );

    });

    it ( 'supports class', function ( t ) {

      t.is ( $('.single').length, 1 );
      t.is ( $('.multiple').length, 2 );

    });

    it ( 'supports unusual class', function ( t ) {

      t.is ( $('.123-ção').length, 1 );

    });

    it ( 'supports class with dots', function ( t ) {

      t.is ( $('.class\\.with\\.dots').length, 1 );

    });

    it ( 'supports non-existent class', function ( t ) {

      t.is ( $('.foo').length, 0 );

    });

    it ( 'supports tag', function ( t ) {

      t.is ( $('html').length, 1 );
      t.is ( $('main').length, 2 );

    });

    it ( 'supports non-existent tag', function ( t ) {

      t.is ( $('foo').length, 0 );

    });

    it ( 'supports DOM node', function ( t ) {

      var body = $(document.body);

      t.is ( body.length, 1 );
      t.is ( body[0], document.body );

    });

    it ( 'supports array of DOM nodes', function ( t ) {

      var eles = $([document.documentElement, document.body]);

      t.is ( eles.length, 2 );
      t.is ( eles[0], document.documentElement );
      t.is ( eles[1], document.body );

    });

    it ( 'supports HTML string', function ( t ) {

      t.is ( $('<div class="html"><p>paragraph</p></div>').length, 1 );

    });

    QUnit.test ( 'supports function', function ( assert ) { // For some reason we can't use our nice helpers for async assertions :(

      var done = assert.async ();
      var count = 0;
      var handler = function () {
        count++;
      };

      t.is ( count, 0 );

      $(handler);

      setTimeout ( function () {
        t.is ( count, 1 );
        done ();
      }, 100 );

    });

    it ( 'supports Cash instances', function ( t ) {

      var ele = $($(document.body));

      t.is ( ele.length, 1 );
      t.is ( ele[0], document.body );

    });

  });

  describe ( 'Context', function ( it ) {

    it ( 'supports a DOM node', function ( t ) {

      var context = $('<div><div class="subcontext"></div></div>');

      t.is ( $('.subcontext').length, 0 );
      t.is ( $( '.subcontext', context[0] ).length, 1 );

    });

    it ( 'supports a Cash instance', function ( t ) {

      var context = $('<div><div class="subcontext"></div></div>');

      t.is ( $('.subcontext').length, 0 );
      t.is ( $( '.subcontext', context ).length, 1 );
      t.is ( $( '.child', $('.multiple') ).length, 2 );

    });

    it ( 'supports selector', function ( t ) {

      t.is ( $( '.child', '.multiple' ).length, 2 );

    });

    it ( 'supports a document', function ( t ) {

      var doc = document.implementation.createDocument ( 'http://www.w3.org/1999/xhtml', 'html', null );
      var ele = $('<p id="foo">')[0];

      $(doc.documentElement).append ( ele );

      t.is ( $('#foo', doc)[0], ele );

    });

    it ( 'supports searching by id in a disconnected DOM node', function ( t ) {

      var div = document.createElement ( 'div' );
      var span = document.createElement ( 'span' );

      div.appendChild ( span );

      $(span).attr ( 'id', 'foo' );

      var found = $('#foo', div);

      t.is ( found.length, 1 );
      t.is ( found[0], span );

    });

  });

});
