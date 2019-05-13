
var fixture = '\
  <div class="data" data-one="one" data-two="two"></div>\
';

describe ( 'Data', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.data', function ( it ) {

    it ( 'gets data', function ( t ) {

      var ele = $('.data');

      t.is ( ele.data ( 'one' ), 'one' );
      t.is ( ele.data ( 'two' ), 'two' );

    });

    it ( 'supports various data types', function ( t ) {

      var ele = $('.data');

      ele.data ( 'true', true );
      ele.data ( 'false', false );
      ele.data ( 'null', null );
      ele.data ( 'int', 3 );
      ele.data ( 'float', 3.14 );
      ele.data ( 'string', 'foo' );
      ele.data ( 'object', { json: true } );
      ele.data ( 'array', [1, 2, 3] );

      t.is ( ele.data ( 'true' ), true );
      t.is ( ele.data ( 'false' ), false );
      t.is ( ele.data ( 'null' ), null );
      t.is ( ele.data ( 'int' ), 3 );
      t.is ( ele.data ( 'float' ), 3.14 );
      t.is ( ele.data ( 'string' ), 'foo' );
      t.deepEqual ( ele.data ( 'object' ), { json: true } );
      t.deepEqual ( ele.data ( 'array' ), [1, 2, 3] );

    });

    it ( 'doesn\'t cache the values', function ( t ) {

      var ele = $('.data');

      t.is ( ele.data ( 'one' ), 'one' );
      ele[0].setAttribute( 'data-one', 'uno' );
      t.is ( ele.data ( 'one' ), 'uno' );

    });

    it ( 'gets all data', function ( t ) {

      var ele = $('.data');
      var data = ele.data ();

      t.deepEqual ( data, { one: 'one', two: 'two' } );

    });

    it ( 'sets data', function ( t ) {

      var ele = $('.data');

      ele.data ( 'one', 'uno' )
      ele.data ( 'three', 3 );

      t.is ( ele.data ( 'one' ), 'uno' );
      t.is ( ele.data ( 'three' ), 3 );

    });

    it ( 'supports setting an object of data', function ( t ) {

      var ele = $('.data');
      var data = { one: 'uno', two: 'due' };

      ele.data ( data );

      t.is ( ele.data ( 'one' ), 'uno' );
      t.is ( ele.data ( 'two' ), 'due' );

    });

  });

});
