
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
  <div class="dotsgrandparent">\
    <div class="dotsparent">\
      <div class="dots.first"></div>\
      <div id="id.with.dots" class="class.with.dots"></div>\
    </div>\
  </div>\
  <iframe src="about:blank"></iframe>\
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

    it ( 'supports filtering by a class with dots', function ( t ) {

      var children = $('.dotsparent').children ( '.class\\.with\\.dots' );

      t.is ( children.length, 1 );

    });

    it ( 'supports filtering by a id with dots', function ( t ) {

      var children = $('.dotsparent').children ( '#id\\.with\\.dots' );

      t.is ( children.length, 1 );

    });

  });

  describe ( '$.fn.closest', function ( it ) {

    it ( 'finds the first matching element in the collection', function ( t ) {

      var child = $('.child');
      var closest = child.closest ( '*' );

      t.deepEqual ( closest.get (), child.get () );

    });

    it ( 'find the first matching element walking the tree upwards', function ( t ) {

      var parent = $('.parent');
      var closest = $('.child').closest ( '.parent' );

      t.deepEqual ( closest.get (), parent.get () );

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

    it ( 'supports iframes', function ( t ) {

      var iframe = $('iframe');
      var contents = iframe.contents ();

      t.deepEqual ( contents.get (), [iframe[0].contentDocument] );

    });

    if ( Supports.template ) {

      it ( 'supports templates', function ( t ) {

        var template = $('<template id="template">    <div id="template-div0">        <span>Hello, Web Component!</span>    </div>    <div id="template-div1"></div>    <div id="template-div2"></div></template>');
        var contents = template.contents ();

        t.is ( contents.length, 6 );

      });

    }

  });

  describe ( '$.fn.find', function ( it ) {

    it ( 'gets elements in subtree', function ( t ) {

      var grandparent = $('.grandparent');
      var all = grandparent.find ( '*' );
      var siblings = grandparent.find ( '.sibling' );
      var dots = $('.dotsparent').find ( '.class\\.with\\.dots' );

      t.is ( all.length, 8 );
      t.is ( siblings.length, 5 );
      t.is ( dots.length, 1 );

    });

    it ( 'words with document fragments', function ( t ) {

      var fragment = new DocumentFragment ();
      var div = document.createElement ( 'div' );

      fragment.appendChild ( div );

      var found = $(fragment).find ( 'div' );

      t.is ( found.length, 1 );
      t.is ( found[0], div );

    });

    it ( 'doesn\'t throw with an empty selector', function ( t ) {

      $('*').find ( '' );
      t.pass ();

    });


  });

  describe ( '$.fn.has', function ( it ) {

    it ( 'filter out elements not containing the selector', function ( t ) {

      var eles = $('.grandparent').children ();

      t.is ( eles.has ( '.sibling' ).length, 1 );
      t.is ( eles.has ( 'div' ).length, 1 );
      t.is ( eles.has ( '.foo' ).length, 0 );

    });

    it ( 'supports dots in selectors', function ( t ) {

      var eles = $('.dotsgrandparent').children ();

      t.is ( eles.has ( '.class\\.with\\.dots' ).length, 1 );
      t.is ( eles.has ( '#id\\.with\\.dots' ).length, 1 );

    });

    it ( 'supports nodes', function ( t ) {

      var eles = $('.grandparent').children ();

      t.is ( eles.has ( eles.find ( '.sibling' ).first ()[0] ).length, 1 );
      t.is ( eles.has ( eles.find ( 'div' ).first ()[0] ).length, 1 );
      t.is ( eles.has ( eles.find ( '.foo' ).first ()[0] ).length, 0 );

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

    it ( 'check if the collection matches a selector with dots', function ( t ) {

      var child = $('.class\\.with\\.dots');

      t.true ( child.is ( '.class\\.with\\.dots' ) );
      t.true ( child.is ( '#id\\.with\\.dots' ) );

    });

  });

  describe ( '$.fn.next', function ( it ) {

    it ( 'gets the next sibling', function ( t ) {

      var child = $('.child');
      var next = $('.next');

      t.deepEqual ( child.next ().get (), next.get () );

    });

    it ( 'supports multiple elements', function ( t ) {

      var anchors = $('.child, .prevprev');
      var next = $('.prev, .next');

      t.deepEqual ( anchors.next ().get (), next.get () );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var next = $('.next');

      t.deepEqual ( child.next ( '.next' ).get (), next.get () );
      t.is ( child.next ( 'foo' ).length, 0 );

    });

    it ( 'supports selector with dots', function ( t ) {

      var child = $('.dots\\.first');
      var next = $('.class\\.with\\.dots');

      t.deepEqual ( child.next ( '.class\\.with\\.dots' ).get (), next.get () );

    });

  });

  describe ( '$.fn.nextAll', function ( it ) {

    it ( 'gets all the next siblings', function ( t ) {

      var anchor = $('.child');
      var next = $('.next');
      var nextnext = $('.nextnext');
      var nexts = anchor.nextAll ();

      t.is ( nexts.length, 2 );
      t.is ( nexts[0], next[0] );
      t.is ( nexts[1], nextnext[0] );

    });

  });

  describe ( '$.fn.nextAll', function ( it ) {

    it ( 'gets all the next siblings, until a selector matches', function ( t ) {

      var anchor = $('.child');
      var next = $('.next');
      var nexts = anchor.nextUntil ( '.nextnext' );

      t.is ( nexts.length, 1 );
      t.is ( nexts[0], next[0] );

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

    it ( 'works with non-element nodes', function ( t ) {

      var eles = $('<span id="nonnodesElement">hi</span> there <!-- mon ami -->');

      t.is ( eles.not ( eles ).length, 0 );
      t.is ( eles.not ( '*' ).length, 0 );
      t.is ( eles.not ( eles.first () ).length, eles.length - 1 );
      t.is ( eles.not ( eles.get ( 0 ) ).length, eles.length - 1 );
      t.is ( eles.not ( eles.get ( 1 ) ).length, eles.length - 1 );
      t.is ( eles.not ( eles.get ( 2 ) ).length, eles.length - 1 );
      t.deepEqual ( eles.not ( document.body ).get (), eles.get () );

    });

  });

  describe ( '$.fn.parent', function ( it ) {

    it ( 'gets the parent', function ( t ) {

      var child = $('.child');
      var parent = $('.parent');

      t.deepEqual ( child.parent ().get (), parent.get () );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var parent = $('.parent');

      t.deepEqual ( child.parent ( '.parent' ).get (), parent.get () );
      t.is ( child.parent ( 'foo' ).length, 0 );

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

    });

    it ( 'stops at <html>', function ( t ) {

      var child = $('.child');
      var parents = child.parents ();

      t.is ( parents.last ()[0], document.documentElement );

    });

    it ( 'supports filtering by a selector', function ( t ) {

      var child = $('.child');
      var parents = child.parents ( '.grandparent, body');

      t.is ( parents.length, 2 );

    });

  });

  describe ( '$.fn.parentsUntil', function ( it ) {

    it ( 'gets all parents, until a selector matches', function ( t ) {

      var child = $('.child');
      var parent = $('.parent');
      var parents = child.parentsUntil ( '.grandparent' );

      t.is ( parents.length, 1 );
      t.is ( parents[0], parent[0] );

    });

  });

  describe ( '$.fn.prev', function ( it ) {

    it ( 'gets the previous sibling', function ( t ) {

      var child = $('.child');
      var prev = $('.prev');

      t.deepEqual ( child.prev ().get (), prev.get () );

    });

    it ( 'supports multiple elements', function ( t ) {

      var anchors = $('.child, .nextnext');
      var prev = $('.prev, .next');

      t.deepEqual ( anchors.prev ().get (), prev.get () );

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var prev = $('.prev');

      t.deepEqual ( child.prev ( '.prev' ).get (), prev.get () );
      t.is ( child.prev ( 'foo' ).length, 0 );

    });


  });

  describe ( '$.fn.prevAll', function ( it ) {

    it ( 'gets all the previous siblings', function ( t ) {

      var anchor = $('.child');
      var prev = $('.prev');
      var prevprev = $('.prevprev');
      var prevs = anchor.prevAll ();

      t.is ( prevs.length, 2 );
      t.is ( prevs[0], prev[0] );
      t.is ( prevs[1], prevprev[0] );

    });

  });

  describe ( '$.fn.prevUntil', function ( it ) {

    it ( 'gets all the previous siblings, until a selector matches', function ( t ) {

      var anchor = $('.child');
      var prev = $('.prev');
      var prevs = anchor.prevUntil ( '.prevprev' );

      t.is ( prevs.length, 1 );
      t.is ( prevs[0], prev[0] );

    });

  });

  describe ( '$.fn.siblings', function ( it ) {

    it ( 'gets the siblings', function ( t ) {

      var child = $('.child');
      var siblings = $('.sibling').not ( child );

      t.deepEqual ( child.siblings ().get (), siblings.get () );

    });

    it ( 'supports multiple elements in the collection', function ( t ) {

      var eles = $('.child, .next');
      var siblings = $('.parent').children ();

      t.is ( eles.siblings ().length, siblings.length );
      t.is ( eles.siblings ().not ( siblings ).length, 0 ); // The returned nodes aren't ordered

    });

    it ( 'supports selector', function ( t ) {

      var child = $('.child');
      var surrounding = $('.prev, .next');

      t.deepEqual ( child.siblings ( '.prev, .next' ).get (), surrounding.get () );
      t.deepEqual ( child.siblings ( '*' ).get (), child.siblings ().get () );
      t.is ( child.siblings ( 'foo' ).length, 0 );

    });

  });

});
