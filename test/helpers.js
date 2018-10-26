
/* AVA-ISH */

// Helpers functions modeled after `ava` and `ava-spec`

/* DESCRIBE */

function describe ( name, hooks, tests ) {

  if ( typeof hooks === 'function' ) {

    tests = hooks;
    hooks = {};

  } else if ( !tests ) {

    tests = function () {};

  }

  QUnit.module ( name, hooks, function () {

    tests ( it );

  });

}

/* IT */

function it ( name, callback, _method ) {

  var method = _method || 'test';

  QUnit[method]( name, function () {

    callback ( test );

  });

}

it.only = function ( name, callback ) {

  it ( name, callback, 'only' );

};

it.skip = function ( name, callback ) {

  it ( name, callback, 'skip' );

};

it.todo = function ( name, callback ) {

  it ( name, callback, 'todo' );

};

/* TEST */

var test = QUnit.assert;
test.is = test.strictEqual;
test.not = test.notStrictEqual;
test.true = function ( val ) {
  test.is ( val, true );
};
test.false = function ( val ) {
  test.is ( val, false );
};
test.truthy = function ( val ) {
  test.true ( !!val );
};
test.falsy = function ( val ) {
  test.false ( !!val );
};
test.pass = function () {
  test.true ( true );
};

/* FIXTURES */

function getFixtureInit ( fixture ) {
  return function init () {
    document.getElementById ( 'qunit-fixture' ).innerHTML = fixture;
  };
}

/* SUPPORTS */

var Supports = {
  CSSvariables: window.CSS && window.CSS.supports && window.CSS.supports ( '--f:0' )
};
