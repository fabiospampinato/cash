
var fixture = '\
  <div id="id"></div>\
  <div id="id"></div>\
  <div class="single"></div>\
  <div class="multiple"></div>\
  <div class="multiple"></div>\
  <main></main>\
  <main></main>\
';

describe ( 'Core', { beforeEach: getFixtureInit ( fixture ) }, function ( it ) {

  it ( '$() instanceof $', function ( t ) {

    t.true ( $() instanceof $ );

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

    it ( 'supports non-existent ID', function ( t ) {

      t.is ( $('#foo').length, 0 );

    });

    it ( 'supports class', function ( t ) {

      t.is ( $('.single').length, 1 );
      t.is ( $('.multiple').length, 2 );

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

      $(handler);

      assert.equal ( count, 0 );

      setTimeout ( function () {
        assert.equal ( count, 1 );
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

    });

    it ( 'supports a document', function ( t ) {

      var doc = document.implementation.createDocument ( 'http://www.w3.org/1999/xhtml', 'html', null ),
          ele = $('<p id="foo">')[0];

      $(doc.documentElement).append ( ele );

      t.is ( $('#foo', doc)[0], ele );

    });

    it ( 'supports a document fragment', function ( t ) {

      var doc = document.createDocumentFragment (),
          ele = $('<p id="foo">')[0];

      $(doc).append ( ele );

      t.is ( $('#foo', doc)[0], ele );

    });

  });

});
