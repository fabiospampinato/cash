
/* FIXTURES */

function getFixtureInit ( fixture ) {
  return function init () {
    document.getElementById ( 'qunit-fixture' ).innerHTML = fixture;
  };
}

/* SUPPORTS */

var Supports = {
  CSSvariables: window.CSS && window.CSS.supports && window.CSS.supports ( '--f:0' ),
  template: !!$('<template>')[0].content
};
