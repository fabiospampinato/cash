
var fixture = '\
  <div class="rectangle" style="width: 100px; height: 50px; padding: 5px; margin: 10px; border: 1px solid red;"></div>\
';

describe ( 'Dimensions', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.height', function ( it ) {

    it ( 'gets the height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.height (), 50 );

    });

    it ( 'gets the height of the window', function ( t ) {

      var val = $(window).height ();

      t.is ( val, document.documentElement.clientHeight );

    });

    it ( 'sets the height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      ele.height ( '200px' );

      t.is ( Math.round ( ele.height () ), 200 ); // Rounding to work around browsers returning floats

    });

    it ( 'supports unitless numbers', function ( t ) {

      var ele = $('.rectangle');

      ele.height ( 200 );

      t.is ( Math.round ( ele.height () ), 200 ); // Rounding to work around browsers returning floats

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(window);

      ele.height ( 10 );

      t.pass ();

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.height (), undefined );
      t.is ( ele.height ( 100 ), ele );

    });

  });

  describe ( '$.fn.innerHeight', function ( it ) {

    it ( 'gets the inner height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.innerHeight (), 60 );

    });

    it ( 'gets the inner height of the window', function ( t ) {

      var val = $(window).innerHeight ();

      t.is ( val, document.documentElement.clientHeight );

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.innerHeight (), undefined );

    });

  });

  describe ( '$.fn.outerHeight', function ( it ) {

    it ( 'gets the outer height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerHeight (), 62 );

    });

    it ( 'gets the outer height of the window', function ( t ) {

      var val = $(window).outerHeight ();

      t.is ( val, window.innerHeight );

    });

    it ( 'can include margins', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerHeight ( true ), 82 );

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.outerHeight (), undefined );

    });

  });

  describe ( '$.fn.width', function ( it ) {

    it ( 'gets the width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.width (), 100 );

    });

    it ( 'gets the width of the window', function ( t ) {

      var val = $(window).width ();

      t.is ( val, document.documentElement.clientWidth );

    });

    it ( 'sets the width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      ele.width ( '200px' );

      t.is ( Math.round ( ele.width () ), 200 ); // Rounding to work around browsers returning floats

    });

    it ( 'supports unitless numbers', function ( t ) {

      var ele = $('.rectangle');

      ele.width ( 200 );

      t.is ( Math.round ( ele.width () ), 200 ); // Rounding to work around browsers returning floats

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var ele = $(window);

      ele.width ( 10 );

      t.pass ();

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.width (), undefined );
      t.is ( ele.width ( 100 ), ele );

    });

  });

  describe ( '$.fn.innerWidth', function ( it ) {

    it ( 'gets the inner width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.innerWidth (), 110 );

    });

    it ( 'gets the inner width of the window', function ( t ) {

      var val = $(window).innerWidth ();

      t.is ( val, document.documentElement.clientWidth );

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.innerWidth (), undefined );

    });

  });

  describe ( '$.fn.outerWidth', function ( it ) {

    it ( 'gets the outer width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerWidth (), 112 );

    });

    it ( 'gets the outer width of the window', function ( t ) {

      var val = $(window).outerWidth ();

      t.is ( val, window.innerWidth );

    });

    it ( 'can include margins', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerWidth ( true ), 132 );

    });

    it ( 'supports empty collections', function ( t ) {

      var ele = $();

      t.is ( ele.outerWidth (), undefined );

    });

  });

});
