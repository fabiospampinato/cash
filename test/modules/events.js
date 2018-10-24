
var fixture = '\
  <div class="event"></div>\
';

describe ( 'Events', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.on', function ( it ) {

    it ( 'attaches to single event', function ( t ) {

      var ele = $('.event');
      var count = 0;
      var that;

      function handler () {
        count++;
        that = this;
      }

      ele.on ( 'click', handler );
      ele.trigger ( 'click' ).trigger ( 'click' );

      t.is ( count, 2 );
      t.is ( that, ele[0] );

    });

    it ( 'attaches to multiple events', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'foo bar', handler );
      ele.trigger ( 'foo' ).trigger ( 'bar' );

      t.is ( count, 2 );

    });

    it ( 'stops propagation if false is returned', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
        return false;
      }

      $('html').on ( 'foo', handler );
      ele.on ( 'foo', handler );
      ele.trigger ( 'foo' );

      t.is ( count, 1 );

    });

    it ( 'supports namespaces', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'foo bar.ns1', handler );
      ele.on ( 'foo.ns1.ns2', handler );
      ele.trigger ( 'foo.ns1.ns2' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' );

      t.is ( count, 3 );

    });

    it ( 'supports event delegation', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      };

      $('html').on ( 'click', '.event', handler );
      $('body').trigger ( 'click' );
      ele.trigger ( 'click' );

      t.is ( count, 1 );

      $('html').off ( 'click', handler );
      ele.trigger ( 'click' );

      t.is ( count, 1 );

    });

  });

  describe ( 'one', function ( it ) {

    it ( 'removes the handler after the first call', function ( t ) {

      var ele = $('.event');
      var count = 0;

      var handler = function () {
        count++;
      };

      ele.one ( 'click', handler );
      ele.trigger ( 'click' ).trigger ( 'click' );

      t.is ( count, 1 );

      ele.one ( 'click', handler ).off ( 'click', handler ).trigger ( 'click' );

      t.is ( count, 1 );

    });

  });

  describe ( 'off', function ( it ) {

    it ( 'removes single event', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'click', handler );
      ele.trigger ( 'click' );
      ele.off ( 'click' );
      ele.trigger ( 'click' );

      t.is ( count, 1 );

    });

    it ( 'removes multiple events', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'foo bar baz', handler );
      ele.off ( 'foo bar', handler );
      ele.trigger ( 'foo' ).trigger ( 'bar' ).trigger ( 'baz' );

      t.is ( count, 1 );

    });

    it ( 'removes all events', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'foo bar', handler );
      ele.off ();
      ele.trigger ( 'foo' ).trigger ( 'bar' );

      t.is ( count, 0 );

    });

    it ( 'supports namespaces', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );

      t.is ( count, 0 );

      ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns1' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );

      t.is ( count, 0 );

      ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns2' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );

      t.is ( count, 0 );

      ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns1.ns2' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );

      t.is ( count, 0 );

      ele.on ( 'foo.ns1.ns2 bar.ns1.ns2 baz.ns1.ns2', handler ).off ( '.ns1' ).trigger ( 'foo' ).trigger ( 'bar' ).trigger ( 'baz' );

      t.is ( count, 0 );

      ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns3' ).trigger ( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );

      t.is ( count, 3 );

    });

  });

  describe ( '$.fn.trigger', function ( it ) {

    it ( 'triggers single event', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'click', handler );
      ele.trigger ( 'click' );

      t.is ( count, 1 );

    });

    it ( 'can pass data to the handler', function ( t ) {

      var ele = $('.event');
      var count;
      var eventData;
      var data;

      function handler ( event, d ) {
        count ++;
        eventData = event.data;
        data = d;
      }

      var values = [123, 'string', { obj: true }];

      values.forEach ( function ( value ) {

        count = 0;

        ele.on ( 'custom', handler );
        ele.trigger ( 'custom', value );
        ele.off ( 'custom', handler );

        t.is ( count, 1 );
        t.is ( eventData, value );
        t.is ( data, value );

      });

    });

    it ( 'can pass namespaces to the handler', function ( t ) {

      var ele = $('.event');
      var namespaces = [];

      function handler ( event ) {
        namespaces.push ( event.namespace );
      }

      ele.on ( 'foo.ns1.ns2', handler );
      ele.trigger ( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns1.ns2' );

      t.deepEqual ( namespaces ['', 'ns1', 'ns2', 'ns1.ns2'] );

    });

    it ( 'supports namespaces', function ( t ) {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'foo.ns1.ns2', handler ).trigger ( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' ).trigger ( 'foo.ns1.ns3' );

      t.is ( count, 3 );

    });

  });

});
