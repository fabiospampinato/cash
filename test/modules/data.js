
var fixture = '\
  <div class="data" data-one="one" data-two="two"></div>\
  <div class="types" data-true="true" data-false="false" data-null="null" data-int="3" data-float="3.14" data-string="foo" data-object=\'{"json": true}\' data-array="[1,2,3]"></div>\
';

describe ( 'Data', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.data', function ( it ) {

    it ( 'gets data', function ( t ) {

      var ele = $('.data');

      t.is ( ele.data ( 'one' ), 'one' );
      t.is ( ele.data ( 'two' ), 'two' );

    });

    it ( 'supports various data types', function ( t ) {

      var ele = $('.types');

      t.is ( ele.data ( 'true' ), true );
      t.is ( ele.data ( 'false' ), false );
      t.is ( ele.data ( 'null' ), null );
      t.is ( ele.data ( 'int' ), 3 );
      t.is ( ele.data ( 'float' ), 3.14 );
      t.is ( ele.data ( 'string' ), 'foo' );
      t.deepEqual ( ele.data ( 'object' ), { json: true } );
      t.deepEqual ( ele.data ( 'array' ), [1, 2, 3] );

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
