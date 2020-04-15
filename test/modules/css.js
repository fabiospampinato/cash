
var fixture = '\
  <div class="css" style="height: 50px; position: static;"></div>\
';

describe ( 'CSS', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.css', function ( it ) {

    it ( 'gets the value of a property', function ( t ) {

      var ele = $('.css');

      t.is ( ele.css ( 'height' ), '50px' );
      t.is ( ele.css ( 'position' ), 'static' );

    });

    it ( 'gets the value of a property (disconnected node)', function ( t ) {

      var ele = $('<div></div>');

      ele.css ({ top: 10 });

      t.is ( ele.css ( 'top' ), '10px' );

    });

    it ( 'sets the value of a property', function ( t ) {

      var ele = $('.css');

      ele.css ( 'height', '100px' );

      t.is ( ele.css ( 'height' ), '100px' );

    });

    it ( 'supports setting an object of properties', function ( t ) {

      var ele = $('.css');
      var props = { height: '100px', width: '100px' };

      ele.css ( props );

      t.is ( ele.css ( 'width' ), '100px' );
      t.is ( ele.css ( 'height' ), '100px' );

    });

    if ( Supports.CSSvariables ) {

      it ( 'supports custom variables', function ( t ) {

        var ele = $('.css');

        t.is ( ele.css ( '--foo' ), undefined );
        t.is ( ele.css ( '--bar' ), undefined );

        ele.css ( '--foo', 0 );
        ele.css ( '--bar', 'content' );

        t.is ( ele.css ( '--foo' ), '0' );
        t.is ( ele.css ( '--bar' ), 'content' );

      });

    }

    it ( 'supports invalid properties', function ( t ) {

      var ele = $('.css');

      t.is ( ele.css ( 'foo' ), undefined );

      ele.css ( 'foo', 123 );

      t.is ( ele.css ( 'foo' ), undefined );

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(document.createTextNode ( '.css' ));

      t.is ( ele.css ( 'width' ), undefined );

      ele.css ( 'width', 10 );

      t.pass ();

    });

    it.skip ( 'doesn\'t have prototype inheritance issues', function ( t ) {

      var ele = $('.css');

      ele.css ( 'constructor', '3px' );

      t.is ( ele.css ( 'constructor' ), '3px' );

    });

  });

});
