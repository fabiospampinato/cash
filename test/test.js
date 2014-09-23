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

QUnit.test( "eq", function( assert ) {
  assert.equal($('#qunit-fixture div').eq(1)[0], $('#id-fixture')[0], "eq Passed!" );
});

QUnit.test( "filter", function( assert ) {
  var arrayFixture = $('#qunit-fixture div').filter('.has-class');
  assert.equal(arrayFixture.length, 1, "filter(selector) Passed!" );
  arrayFixture = $('#qunit-fixture div').filter(function(e){
    return $(e).hasClass('qsa-fixture');
  });
  assert.equal(arrayFixture.length, 2, "filter(fn) Passed!" );
});

QUnit.test( "first", function( assert ) {
  var firstFixture = $('#qunit-fixture div').first();
  assert.equal(firstFixture.hasClass('class-fixture'), true, "first Passed!" );
});

QUnit.test( "get", function( assert ) {
  var getFixture = $('#qunit-fixture div').get(1);
  assert.equal($(getFixture).attr('id'), 'id-fixture', "get Passed!" );
});

QUnit.test( "index", function( assert ) {
  var indexFixture = $('.qsa-fixture').index();
  assert.equal(indexFixture, 2, "index Passed!" );
});

QUnit.test( "last", function( assert ) {
  var lastFixture = $('#qunit-fixture div').last();
  assert.equal($(lastFixture).hasClass('has-class'), true, "index Passed!" );
});

//CSS

QUnit.test( "css", function( assert ) {
  assert.equal($('.css-fixture').css('height'), '50px', "css read Passed!" );
  $('.css-fixture').css('height','100px');
  assert.equal($('.css-fixture').css('height'), '100px', "css write Passed!" );
  $('.css-fixture').css({height: '50px', width: '100px'});
  assert.equal($('.css-fixture').css('width'), '100px', "css write many Passed!" );
});

//Data

QUnit.test( "data", function( assert ) {
  assert.equal($('.attr-fixture').data('index'), 5, "data read Passed!" );
  $('.attr-fixture').data('index',10);
  assert.equal($('.attr-fixture').data('index'), 10, "data set Passed!" );
  $('.attr-fixture').removeData('index');
  assert.equal($('.attr-fixture').data('index'), null, "data remove Passed!" );
});

//Dimensions

QUnit.test( "height", function( assert ) {
  assert.equal($('.css-fixture').height(), 100, "height Passed!" );
});

QUnit.test( "innerHeight", function( assert ) {
  assert.equal($('.css-fixture').innerHeight(), 90, "innerHeight Passed!" );
});

QUnit.test( "outerHeight", function( assert ) {
  assert.equal($('.css-fixture').outerHeight(), 100, "outerHeight Passed!" );
  assert.equal($('.css-fixture').outerHeight(true), 140, "outerHeight(margins) Passed!" );
});

QUnit.test( "width", function( assert ) {
  assert.equal($('.css-fixture').width(), 100, "width Passed!" );
});

QUnit.test( "innerWidth", function( assert ) {
  assert.equal($('.css-fixture').innerWidth(), 90, "innerWidth Passed!" );
});

QUnit.test( "outerWidth", function( assert ) {
  assert.equal($('.css-fixture').outerWidth(), 100, "outerWidth Passed!" );
  assert.equal($('.css-fixture').outerWidth(true), 140, "outerWidth(margins) Passed!" );
});

//Events

QUnit.test( "on", function( assert ) {
  var i = 1;
  $('.event-fixture').on('click', function(){
    i++;
    this.textContent = i;
  });
  $('.event-fixture').trigger('click');
  assert.equal($('.event-fixture')[0].textContent, 2, "on Passed!" );
});

QUnit.test( "on(delegate)", function( assert ) {
  var i = 1;
  $('#qunit-fixture').on('click','.event-fixture', function(){
    i++;
    this.textContent = i;
  });
  $('.event-fixture').trigger('click');
  assert.equal($('.event-fixture')[0].textContent, 2, "on(delegate) Passed!" );
});

QUnit.test( "off", function( assert ) {
  var i = 1;
  $('.off-fixture').on('click', function(){
    i++;
    this.textContent = i;
  });
  $('.off-fixture').trigger('click');
  $('.off-fixture').off('click');
  $('.off-fixture').trigger('click');
  assert.equal($('.off-fixture')[0].textContent, 2, "on Passed!" );
});

QUnit.test( "trigger", function( assert ) {
  var i = 1;
  $('.trigger-fixture').on('click', function(){
    i++;
    this.textContent = i;
  });
  $('.trigger-fixture').trigger('click');
  assert.equal($('.trigger-fixture')[0].textContent, 2, "trigger Passed!" );
});

//Forms

QUnit.test( "serialize", function( assert ) {
  var data = $('.form-fixture').serialize();
  assert.equal(data, "text=text&hidden=5", "serialize Passed!" );
});

QUnit.test( "val", function( assert ) {
  assert.equal($('input[type=text]').val(), "text", "val get Passed!" );
  $('input[type=text]').val(0);
  assert.equal($('input[type=text]').val(), 0, "val set Passed!" );
});
