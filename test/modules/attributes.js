
var fixture = '\
  <div class="attr" one="one"></div>\
  <div class="class"></div>\
  <input class="prop" type="checkbox" checked>\
';

describe ( 'Attributes', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.addClass', function ( it ) {

    it ( 'supports single class', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'foo' );

      t.true ( ele.hasClass ( 'foo' ) );

    });

    it ( 'supports multiple classes', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'foo bar' );

      t.true ( ele.hasClass ( 'foo' ) );
      t.true ( ele.hasClass ( 'bar' ) );

    });

    it ( 'doesn\'t add duplicates', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'class-one class-one class-two class-one' );
      ele.addClass ( 'class-two class-one class-one class-one' );

      var matches = ele[0].className.match ( /class-one/g );

      t.is ( matches.length, 1 );

    });

    it ( 'doesn\'t throw on falsy values', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 0 );
      ele.addClass ( '' );
      ele.addClass ( ' ' ); // Empty spaces will be removed
      ele.addClass ( undefined );
      ele.addClass ( null );

      t.pass ();

    });

    it ( 'doesn\'t throw on number values', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 3.14 );
      ele.addClass ( 4 );
      ele.addClass ( Infinity );
      ele.addClass ( NaN );

      t.pass ();

    });

  });

  describe ( '$.fn.attr', function ( it ) {

    it ( 'gets attribute', function ( t ) {

      var ele = $('.attr');

      t.is ( ele.attr ( 'one' ), 'one' );

    });

    it ( 'sets attribute', function ( t ) {

      var ele = $('.attr');

      ele.attr ( 'one', 'uno' );

      t.is ( ele.attr ( 'one' ), 'uno' );

    });

    it ( 'explicitly undefined values are ignored', function ( t ) {

      var ele = $('.attr');

      ele.attr ( 'one', undefined );

      t.is ( ele.attr ( 'one' ), 'one' );

    });

    it ( 'supports setting an object of attributes', function ( t ) {

      var ele = $('.attr');
      var attrs = { one: 'uno', two: 'due' };

      ele.attr ( attrs );

      t.is ( ele.attr ( 'one' ), 'uno' );
      t.is ( ele.attr ( 'two' ), 'due' );

    });

    it ( 'supports removing an attribute', function ( t ) {

      var ele = $('.attr');

      ele.attr ( 'one', null );

      t.is ( ele.attr ( 'one' ), undefined );

    });

    it ( 'supports non-existent attribute', function ( t ) {

      var ele = $('.attr');

      t.is ( ele.attr ( 'foo' ), undefined );

    });

    it ( 'supports no arguments', function ( t ) {

      var ele = $('.attr');

      t.is ( ele.attr (), undefined );

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.attr ( 'foo' ), undefined );

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(document.createTextNode ( '.css' ));

      ele.attr ( 'foo', 'asd' ).attr ( 'foo' );

      t.pass ();

    });

  });

  describe ( '$.fn.hasClass', function ( it ) {

    it ( 'supports single class', function ( t ) {

      var ele = $('.class');

      t.true ( ele.hasClass ( 'class' ) );
      t.false ( ele.hasClass ( 'foo' ) );

    });

    it ( 'supports special characters', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'foo$bar' );

      t.true ( ele.hasClass ( 'foo$bar' ) );

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(document.createTextNode ( '.css' ));

      t.is ( ele.hasClass ( 'foo' ), false );

    });

    it ( 'doesn\'t throw on falsy values', function ( t ) {

      var ele = $('.class');

      ele.hasClass ( 0 );
      ele.hasClass ( '' );
      ele.hasClass ( undefined );
      ele.hasClass ( null );

      t.pass ();

    });

    it ( 'doesn\'t throw on number values', function ( t ) {

      var ele = $('.class');

      ele.hasClass ( 3.14 );
      ele.hasClass ( 4 );
      ele.hasClass ( Infinity );
      ele.hasClass ( NaN );

      t.pass ();

    });

  });

  describe ( '$.fn.prop', function ( it ) {

    it ( 'gets property', function ( t ) {

      var ele = $('.prop');

      t.true ( ele.prop ( 'checked' ) );
      t.false ( ele.prop ( 'disabled' ) );

    });

    it ( 'sets property', function ( t ) {

      var ele = $('.prop');

      ele.prop ( 'checked', false );
      ele.prop ( 'disabled', true );

      t.true ( ele.prop ( 'disabled' ) );
      t.false ( ele.prop ( 'checked' ) );

    });

    it ( 'supports setting an object of properties', function ( t ) {

      var ele = $('.prop');
      var props = { checked: false, disabled: true };

      ele.prop ( props );

      t.true ( ele.prop ( 'disabled' ) );
      t.false ( ele.prop ( 'checked' ) );

    });

    it ( 'supports custom property', function ( t ) {

      var ele = $('.prop');

      t.is ( ele.prop ( 'foo' ), undefined );

      ele.prop ( 'foo', 123 );

      t.is ( ele.prop ( 'foo' ), 123 );

    });

    it ( 'supports no arguments', function ( t ) {

      var ele = $('.prop');

      t.is ( ele.prop (), undefined );

    });

    it ( 'maps special HTML attributes into the equivalent DOM properties', function ( t ) {

      // For some reason calling `removeProp` with most of these properties doesn't work

      var label = $('<label class="foo" contenteditable="true" for="input"></label>');

      t.is ( label.prop ( 'class' ), 'foo' );
      label.prop ( 'class', 'bar' );
      t.is ( label.prop ( 'class' ), 'bar' );
      // label.removeProp ( 'class' );
      // t.is ( label.prop ( 'class' ), undefined );

      t.is ( label.prop ( 'contenteditable' ), 'true' );
      label.prop ( 'contenteditable', 'false' );
      t.is ( label.prop ( 'contenteditable' ), 'false' );
      // label.removeProp ( 'contenteditable' );
      // t.is ( label.prop ( 'contenteditable' ), undefined );

      t.is ( label.prop ( 'for' ), 'input' );
      label.prop ( 'for', 'textarea' );
      t.is ( label.prop ( 'for' ), 'textarea' );
      // label.removeProp ( 'for' );
      // t.is ( label.prop ( 'for' ), undefined );

      var input = $('<input type="text" readonly="true" maxlength="1" tabindex="1"></input>');

      t.is ( input.prop ( 'readonly' ), true );
      input.prop ( 'readonly', false );
      t.is ( input.prop ( 'readonly' ), false );
      // input.removeProp ( 'readonly' );
      // t.is ( input.prop ( 'readonly' ), undefined );

      t.is ( input.prop ( 'maxlength' ), 1 );
      input.prop ( 'maxlength', 2 );
      t.is ( input.prop ( 'maxlength' ), 2 );
      // input.removeProp ( 'maxlength' );
      // t.is ( input.prop ( 'maxlength' ), undefined );

      t.is ( input.prop ( 'tabindex' ), 1 );
      input.prop ( 'tabindex', 2 );
      t.is ( input.prop ( 'tabindex' ), 2 );
      // input.removeProp ( 'tabindex' );
      // t.is ( input.prop ( 'tabindex' ), undefined );

      var td = $('<td colspan="1" rowspan="1"></td>');

      t.is ( td.prop ( 'colspan' ), 1 );
      td.prop ( 'colspan', 2 );
      t.is ( td.prop ( 'colspan' ), 2 );
      // td.removeProp ( 'colspan' );
      // t.is ( td.prop ( 'colspan' ), undefined );

      t.is ( td.prop ( 'rowspan' ), 1 );
      td.prop ( 'rowspan', 2 );
      t.is ( td.prop ( 'rowspan' ), 2 );
      // td.removeProp ( 'rowspan' );
      // t.is ( td.prop ( 'rowspan' ), undefined );

      var img = $('<img usemap="#1" />');

      t.is ( img.prop ( 'usemap' ), '#1' );
      img.prop ( 'usemap', '#2' );
      t.is ( img.prop ( 'usemap' ), '#2' );
      // img.removeProp ( 'usemap' );
      // t.is ( img.prop ( 'usemap' ), undefined );

    });

    it.skip ( 'doesn\'t have prototype inheritance issues', function ( t ) {

      var ele = $('.event');

      t.is ( ele.prop ( 'constructor' ), ele[0].constructor );

    });

  });

  describe ( '$.fn.removeAttr', function ( it ) {

    it ( 'removes attribute', function ( t ) {

      var ele = $('.attr');

      ele.removeAttr ( 'one' );

      t.is ( ele.attr ( 'one' ), undefined );

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(document.createTextNode ( '.css' ));

      ele.removeAttr ( 'foo' );

      t.pass ();

    });

  });

  describe ( '$.fn.removeClass', function ( it ) {

    it ( 'supports single class', function ( t ) {

      var ele = $('.class');

      ele.removeClass ( 'class' );

      t.false ( ele.hasClass ( 'class' ) );

    });

    it ( 'supports multiple classes', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'foo' );
      ele.removeClass ( 'class foo' );

      t.false ( ele.hasClass ( 'class' ) );
      t.false ( ele.hasClass ( 'foo' ) );

    });

    it ( 'supports removing all classes', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'foo bar' );
      ele.removeClass ();

      t.false ( ele.hasClass ( 'class' ) );
      t.false ( ele.hasClass ( 'foo' ) );
      t.false ( ele.hasClass ( 'bar' ) );

    });

    it ( 'supports special characters', function ( t ) {

      var ele = $('.class');

      ele.addClass ( 'foo$bar' ).removeClass ( 'foo$bar' );

      t.false ( ele.hasClass ( 'foo$bar' ) );

    });

    it ( 'doesn\'t throw on falsy values', function ( t ) {

      var ele = $('.class');

      ele.removeClass ( 0 );
      ele.removeClass ( '' );
      ele.removeClass ( ' ' ); // Empty spaces will be removed
      ele.removeClass ( undefined );
      ele.removeClass ( null );

      t.pass ();

    });

    it ( 'doesn\'t throw on number values', function ( t ) {

      var ele = $('.class');

      ele.removeClass ( 3.14 );
      ele.removeClass ( 4 );
      ele.removeClass ( Infinity );
      ele.removeClass ( NaN );

      t.pass ();

    });

  });

  describe ( '$.fn.removeProp', function ( it ) {

    it ( 'removes property', function ( t ) {

      var ele = $('.prop');

      ele.prop ( 'foo', 123 );

      t.is ( ele.prop ( 'foo' ), 123 );

      ele.removeProp ( 'foo' );

      t.is ( ele.prop ( 'foo' ), undefined );

    });

  });

  describe ( '$.fn.toggleClass', function ( it ) {

    it ( 'supports adding', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 'foo' );

      t.true ( ele.hasClass ( 'foo' ) );

    });

    it ( 'supports force adding', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 'class', true );

      t.true ( ele.hasClass ( 'class' ) );

    });

    it ( 'supports removing', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 'class' );

      t.false ( ele.hasClass ( 'class' ) );

    });

    it ( 'supports force removing', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 'foo', false );

      t.false ( ele.hasClass ( 'foo' ) );

    });

    it ( 'supports multiple classes', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 'foo bar' );

      t.true ( ele.hasClass ( 'foo' ) );
      t.true ( ele.hasClass ( 'bar' ) );

      ele.toggleClass ( 'foo bar' );

      t.false ( ele.hasClass ( 'foo' ) );
      t.false ( ele.hasClass ( 'bar' ) );

    });

    it ( 'supports special characters', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 'foo$bar' );

      t.true ( ele.hasClass ( 'foo$bar' ) );

      ele.toggleClass ( 'foo$bar' );

      t.false ( ele.hasClass ( 'foo$bar' ) );

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(document.createTextNode ( '.css' ));

      ele.toggleClass ( 'foo' ).toggleClass ( 'foo' ).toggleClass ( 'foo' );

      t.pass ();

    });

    it ( 'doesn\'t throw on falsy values', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 0 );
      ele.toggleClass ( '' );
      ele.toggleClass ( ' ' ); // Empty spaces will be removed
      ele.toggleClass ( undefined );
      ele.toggleClass ( null );

      t.pass ();

    });

    it ( 'doesn\'t throw on number values', function ( t ) {

      var ele = $('.class');

      ele.toggleClass ( 3.14 );
      ele.toggleClass ( 4 );
      ele.toggleClass ( Infinity );
      ele.toggleClass ( NaN );

      t.pass ();

    });

  });

});
