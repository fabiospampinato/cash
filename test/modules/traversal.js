
var fixture = '\
  <div class="grandparent">\
    <div class="parent">\
      string\
      <!-- COMMENT -->\
      <div class="prevprev sibling"></div>\
      <div class="prev sibling"></div>\
      <div class="child sibling"></div>\
      <div class="next sibling"></div>\
      <div class="nextnext sibling"></div>\
    </div>\
    <div class="uncle"></div>\
    <div class="aunt"></div>\
  </div>\
';

describe ( 'Traversal', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.children', function ( it ) {

    it ( 'gets the children', function ( t ) {

      var children = $('.parent').children ();

      t.is ( children.length, 5 );

    });

    it ( 'supports filtering by a selector', function ( t ) {

      var children = $('.parent').children ( '.prev, .next' );

      t.is ( children.length, 2 );

    });

  });

  describe ( '$.fn.closest', function ( it ) {

    it ( 'finds the first matching element in the collection', function ( t ) {

      var child = $('.child');
      var closest = child.closest ( '*' );

      t.deepEqual ( closest, child );

    });

    it ( 'find the first matching element walking the tree upwards', function ( t ) {

      var parent = $('.parent');
      var closest = $('.child').closest ( '.parent' );

      t.deepEqual ( closest, parent );

    });

    it ( 'doesn\'t throw if no element is found', function ( t ) {

      var empty1 = $('.child').closest (),
          empty2 = $('.child').closest ( 'foo' );

      t.is ( empty1.length, 0 );
      t.is ( empty2.length, 0 );

    });

  });

  describe ( '$.fn.contents', function ( it ) {

    it ( 'gets the children, including text and comments', function ( t ) {

      var parent = $('.parent');
      var contents = parent.contents ();

      t.is ( contents.length, 13 );

    });

  });

  describe ( '$.fn.find', function ( it ) {

    it ( 'gets elements in subtree', function ( t ) {

      var grandparent = $('.grandparent');
      var all = grandparent.find ( '*' );
      var siblings = grandparent.find ( '.sibling' );

      t.is ( all.length, 8 );
      t.is ( siblings.length, 5 );

    });

  });

  describe ( '$.fn.has', function ( it ) {

    it ( 'filter out elements not containing the selector', function ( t ) {

      var eles = $('.grandparent').children ();

      t.is ( eles.has ( '.sibling' ).length, 1 );
      t.is ( eles.has ( 'div' ).length, 1 );
      t.is ( eles.has ( '.foo' ).length, 0 );

    });

  });

  describe ( '$.fn.is', function ( it ) {

    it ( 'check if the collection matches a selector', function ( t ) {

      var child = $('.child');

      t.true ( child.is ( 'div' ) );
      t.true ( child.is ( 'foo, div' ) );
      t.true ( child.is ( '.child' ) );
      t.true ( child.is ( child ) );
      t.true ( child.is ( $('div') ) );
      t.false ( child.is () );
      t.false ( child.is ( $('#foo') ) );

    });

  });

  describe ( '$.fn.next', function ( it ) {

    it ( 'gets the next sibling', function ( t ) {

      var child = $('.child');
      var next = $('.next');

      t.deepEqual ( child.next (), next );

    });

    it ( 'supports multiple elements', function ( t ) {

      var anchors = $('.child, .prevprev');
      var next = $('.prev, .next');

      t.deepEqual ( anchors.next (), next );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var next = $('.next');

      t.deepEqual ( child.next ( '.next' ), next );
      t.is ( child.next ( 'foo' ).length, 0 );

    });

  });

  describe ( '$.fn.not', function ( it ) {

    it ( 'filter by negating a comparator', function ( t ) {

      var siblings = $('.sibling');

      t.is ( siblings.not ().length, 5 );
      t.is ( siblings.not ( 'div' ).length, 0 );
      t.is ( siblings.not ( '.child' ).length, 4 );
      t.is ( siblings.not ( '.prev, .next' ).length, 3 );
      t.is ( siblings.not ( siblings[0] ).length, 4 );

    });

  });

  describe ( '$.fn.parent', function ( it ) {

    it ( 'gets the parent', function ( t ) {

      var child = $('.child');
      var parent = $('.parent');

      t.deepEqual ( child.parent (), parent );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var parent = $('.parent');

      t.deepEqual ( child.parent ( '.parent' ), parent );
      t.deepEqual ( child.parent ( 'foo' ).length, 0 );

    });

    it ( 'doesn\'t throw if there\'s no parent', function ( t ) {

      t.is ( $().parent ().length, 0 );
      t.is ( $('<div>').parent ().length, 0 );

    });

  });

  describe ( '$.fn.parents', function ( it ) {

    it ( 'gets all parents', function ( t ) {

      var child = $('.child');
      var parents = child.parents ();

      t.is ( parents.length, 5 );
      t.is ( parents.last ()[0], document.documentElement );

    });

    it ( 'supports filtering by a selector', function ( t ) {

      var child = $('.child');
      var parents = child.parents ( '.grandparent, body');

      t.is ( parents.length, 2 );

    });

  });

  describe ( '$.fn.prev', function ( it ) {

    it ( 'gets the previous sibling', function ( t ) {

      var child = $('.child');
      var prev = $('.prev');

      t.deepEqual ( child.prev (), prev );

    });

    it ( 'supports multiple elements', function ( t ) {

      var anchors = $('.child, .nextnext');
      var prev = $('.prev, .next');

      t.deepEqual ( anchors.prev (), prev );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var prev = $('.prev');

      t.deepEqual ( child.prev ( '.prev' ), prev );
      t.is ( child.prev ( 'foo' ).length, 0 );

    });


  });

  describe ( '$.fn.siblings', function ( it ) {

    it ( 'gets the siblings', function ( t ) {

      var child = $('.child');
      var siblings = $('.sibling').not ( child );

      t.deepEqual ( child.siblings (), siblings );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var siblings = $('.sibling').not ( child );
      var surrounding = $('.prev, .next');

      t.deepEqual ( child.siblings ( '.prev, .next' ), surrounding );
      t.deepEqual ( child.siblings ( '*' ), child.siblings () );
      t.deepEqual ( child.siblings ( 'foo' ).length, 0 );

    });

  });

});
