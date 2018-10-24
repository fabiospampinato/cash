
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

      t.is ( val, window.outerHeight );

    });

    it ( 'sets the height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      ele.height ( '200px' );

      t.is ( Math.round ( ele.height () ), 200 ); // Rounding to work around browsers returning floats

    });

    it ( 'supports unitless numebrs', function ( t ) {

      var ele = $('.rectangle');

      ele.height ( 200 );

      t.is ( Math.round ( ele.height () ), 200 ); // Rounding to work around browsers returning floats

    });

  });

  describe ( '$.fn.innerHeight', function ( it ) {

    it ( 'gets the inner height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.innerHeight (), 60 );

    });

    it ( 'gets the inner height of the window', function ( t ) {

      var val = $(window).innerHeight ();

      t.is ( val, window.innerHeight );

    });

  });

  describe ( '$.fn.outerHeight', function ( it ) {

    it ( 'gets the outer height of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerHeight (), 62 );

    });

    it ( 'gets the outer height of the window', function ( t ) {

      var val = $(window).outerHeight ();

      t.is ( val, window.outerHeight );

    });

    it ( 'can include margins', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerHeight ( true ), 82 );

    });

  });

  describe ( '$.fn.width', function ( it ) {

    it ( 'gets the width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.width (), 100 );

    });

    it ( 'gets the width of the window', function ( t ) {

      var val = $(window).width ();

      t.is ( val, window.outerWidth );

    });

    it ( 'sets the width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      ele.width ( '200px' );

      t.is ( Math.round ( ele.width () ), 200 ); // Rounding to work around browsers returning floats

    });

    it ( 'supports unitless numebrs', function ( t ) {

      var ele = $('.rectangle');

      ele.width ( 200 );

      t.is ( Math.round ( ele.width () ), 200 ); // Rounding to work around browsers returning floats

    });

  });

  describe ( '$.fn.innerWidth', function ( it ) {

    it ( 'gets the inner width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.innerWidth (), 110 );

    });

    it ( 'gets the inner width of the window', function ( t ) {

      var val = $(window).innerWidth ();

      t.is ( val, window.innerWidth );

    });

  });

  describe ( '$.fn.outerWidth', function ( it ) {

    it ( 'gets the outer width of a DOM element', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerWidth (), 112 );

    });

    it ( 'gets the outer width of the window', function ( t ) {

      var val = $(window).outerWidth ();

      t.is ( val, window.outerWidth );

    });

    it ( 'can include margins', function ( t ) {

      var ele = $('.rectangle');

      t.is ( ele.outerWidth ( true ), 132 );

    });

  });

});
