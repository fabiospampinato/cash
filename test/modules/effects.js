
var fixture = '\
  <style>.show-custom { display: inline-block }</style>\
  <style>.show-custom-style { display: flex }</style>\
  <style>.show-cls { display: block }</style>\
  <style>.hide-cls { display: none }</style>\
  <div class="toggleable shown"></div>\
  <div class="toggleable shown show-cls"></div>\
  <div class="toggleable shown" style="display: block"></div>\
  <div class="toggleable hidden hide-cls"></div>\
  <div class="toggleable hidden" style="display: none"></div>\
  <span class="toggleable hide-cls"></span>\
  <span class="show-custom"></span>\
  <span class="show-custom-style"></span>\
';

function isDisplay ( collection, display ) {
  return [].every.call ( collection, function ( ele ) {
    return $(ele).css ( 'display' ) === display;
  });
}

function isShown ( collection ) {
  return [].every.call ( collection, function ( ele ) {
    return $(ele).css ( 'display' ) !== 'none';
  });
}

function isHidden ( collection ) {
  return [].every.call ( collection, function ( ele ) {
    return $(ele).css ( 'display' ) === 'none';
  });
}

describe ( 'Effects', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.hide', function ( it ) {

    it ( 'hides elements', function ( t ) {

      var eles = $('.toggleable');

      eles.hide ();

      t.true ( isHidden ( eles ) );

    });

  });

  describe ( '$.fn.show', function ( it ) {

    it ( 'shows elements', function ( t ) {

      var eles = $('.toggleable');

      eles.show ();

      t.true ( isShown ( eles ) );

    });

    it ( 'uses the previous display value', function ( t ) {

      var ele = $('.show-custom');

      ele.hide ().show ();

      t.is ( ele[0].style.display, 'inline-block' );

    });

    it ( 'uses the default display value', function ( t ) {

      var span = $('#qunit-fixture span');

      span.show ();

      t.is ( span.css ( 'display' ), 'inline' );

    });

    it ( 'shows even hidden-by-default elements', function ( t ) {

      var title = $('<title>Title<title>');

      title.appendTo ( document.body );

      t.is ( title.css ( 'display' ), 'none' );

      title.show ();

      t.is ( title.css ( 'display' ), 'block' );

      title.detach ();

    });

  });

  describe ( '$.fn.toggle', function ( it ) {

    it ( 'supports showing', function ( t ) {

      var eles = $('.hidden');

      eles.toggle ();

      t.true ( isShown ( eles ) );

    });

    it ( 'supports force showing', function ( t ) {

      var eles = $('.hidden');

      eles.toggle ( true );
      eles.toggle ( true );

      t.true ( isShown ( eles ) );

    });

    it ( 'supports hiding', function ( t ) {

      var eles = $('.shown');

      eles.toggle ();

      t.true ( isHidden ( eles ) );

    });

    it ( 'supports force hiding', function ( t ) {

      var eles = $('.shown');

      eles.toggle ( false );
      eles.toggle ( false );

      t.true ( isHidden ( eles ) );

    });

    it ( 'supports collections containing non-elements objects', function ( t ) {

      var eles = $('.shown');

      eles.toggle ().toggle ().toggle ().toggle ();

      t.pass ();

    });

    it ( 'supports showing after hiding multiple times', function ( t ) {

      var eles = $('.show-custom-style');

      eles.toggle ( false );
      eles.toggle ( false );
      eles.toggle ( true );

      t.true ( isDisplay ( eles, 'flex' ) );

    });

  });

});
