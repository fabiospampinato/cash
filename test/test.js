// Core

QUnit.test( "className Query", function( assert ) {
  assert.equal($('.class-fixture').length, 1, "className Passed!" );
});

QUnit.test( "id Query", function( assert ) {
  assert.equal($('#id-fixture').length, 1, "id Passed!" );
});

QUnit.test( "qSA Query", function( assert ) {
  assert.equal($('.qsa-fixture').length, 2, "qSA Passed!" );
});

QUnit.test( "domNode Query", function( assert ) {
  assert.equal($($('.qsa-fixture')[0]).length, 1, " domNode Passed!" );
});

QUnit.test( "HTML Query/Init", function( assert ) {
  assert.equal($('<div class="html-fixture">').length, 1, "HTML Passed!" );
});

// AJAX

QUnit.test( "Ajax", function( assert ) {

  QUnit.stop();

  $.ajax({
    type: 'GET',
    url: 'ajax-fixture.html',
    success: function(data) {
      QUnit.ok(true, "Ajax Success Passed");
      QUnit.start();
    }
  });

  QUnit.stop();

  $.ajax({
    type: 'GET',
    url: 'missing-fixture.html',
    error: function(error) {
      QUnit.ok(true, "Ajax Error Passed = " + error);
      QUnit.start();
    }
  });

});

//Attributes

QUnit.test( "addClass", function( assert ) {
  $('.class-fixture').addClass('add-class');
  assert.equal($('.add-class').length, 1, "addClass Passed!" );
  $('.qsa-fixture').addClass('add-class-multiple');
  assert.equal($('.add-class-multiple').length, 2, "addClass multiple Passed!" );
});

QUnit.test( "attr", function( assert ) {
  var testAttr = $('.attr-fixture').attr('success');
  assert.equal(testAttr, 'get', "attr get Passed!" );
  $('.attr-fixture').attr('success','set');
  testAttr = $('.attr-fixture').attr('success');
  assert.equal(testAttr, 'set', "attr set Passed!" );
});

QUnit.test( "hasClass", function( assert ) {
  var hasClass = $('.attr-fixture').hasClass('has-class');
  assert.equal(hasClass, true, "hasClass Passed!" );
});

QUnit.test( "prop", function( assert ) {
  assert.equal($('.prop-fixture').prop('checked'), true, "prop Passed!" );
});

QUnit.test( "removeAttr", function( assert ) {
  $('.attr-fixture').removeAttr('success');
  assert.equal($('.attr-fixture').attr('success'), undefined, "removeAttr Passed!" );
});

QUnit.test( "removeClass", function( assert ) {
  $('.attr-fixture').removeClass('has-class');
  assert.equal($('.attr-fixture').hasClass('has-class'), false, "removeClass Passed!" );
});

//Collection

QUnit.test( "each", function( assert ) {
  var arrayFixture = [];
  $('.qsa-fixture').each(function(v,i,a){
    arrayFixture.push(i);
  });
  assert.equal(arrayFixture.length, 2, "each Passed!" );
});

