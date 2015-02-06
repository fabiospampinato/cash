// Core

QUnit.test( "className Query", function( assert ) {
  assert.equal($('.class-fixture').length, 1, "className Passed!" );
});

QUnit.test( "tagName Query", function( assert ) {
  assert.equal($('fieldset').length, 1, "tagName Passed!" );
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

//Attributes

QUnit.test( "addClass", function( assert ) {
  $('.class-fixture').addClass('add-class');
  assert.equal($('.add-class').length, 1, "addClass Passed!" );
  $('.class-fixture').addClass('add-class class-two');
  assert.equal($('.add-class.class-two').length, 1, "addClass multiple classes Passed!" );
  $('.class-fixture').addClass('add-class add-class class-two add-class');
  $('.class-fixture').addClass('class-two add-class add-class add-class');
  var dupes = $('.class-fixture')[0].className.match(/add-class/g);
  assert.equal(dupes.length, 1, "addClass no duplicates Passed!" );
  $('.qsa-fixture').addClass('add-class-multiple');
  assert.equal($('.add-class-multiple').length, 2, "addClass multiple elements Passed!" );
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
  assert.equal( $('.attr-fixture')[0].className, "attr-fixture has-class-two has-class-three", "removeClass Passed!" );
  $('.attr-fixture, .attr-fixture2').removeClass('has-class-three has-class-two');
  assert.equal( $('.attr-fixture')[0].className, "attr-fixture", "removeClass Multiple Passed!" );
  assert.equal( $('.attr-fixture2')[0].className, "attr-fixture2", "removeClass Multiple Passed!" );
});

//Collection

QUnit.test( "add", function( assert ) {
  var addFixture = $('#id-fixture').add( $('.class-fixture') );
  assert.equal(addFixture.cash, true, "add Passed!" );
  assert.equal(addFixture.length, 2, "add(one) Passed!" );
  addFixture = $('#id-fixture').add( $('a').eq(0) , $('a').eq(1) );
  assert.equal(addFixture.length, 3, "add(two) Passed!" );
  addFixture = $('#id-fixture').add( $('#qunit-fixture a') , $('#qunit-fixture input') );
  assert.equal(addFixture.length, 9, "add(collections) Passed!" );
  addFixture = $('#qunit-fixture a').first().add( $('#qunit-fixture a') );
  assert.equal(addFixture.length, 4, "add(no duplicates) Passed!" );
  addFixture = $('#id-fixture').add( "#qunit-fixture a" );
  assert.equal(addFixture.length, 5, "add(allow selector string) Passed!" );
});

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
  assert.equal(indexFixture, 3, "index Passed!" );
});

QUnit.test( "last", function( assert ) {
  var lastFixture = $('#qunit-fixture div').last();
  assert.equal($(lastFixture).hasClass('attr-fixture2'), true, "last Passed!" );
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
  assert.notEqual($('.attr-fixture').data('index'), 10, "data remove Passed!" );
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
  $('#qunit-fixture').on('click','.delegate-fixture', function(){
    i++;
    this.textContent = i;
  });
  $('.delegate-trigger').trigger('click');
  assert.equal($('.delegate-fixture')[0].textContent, 2, "on(delegate) Passed!" );
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

//Traversal

QUnit.test( "children", function( assert ) {
  assert.equal($('#qunit-fixture').children().length, 14, "children Passed!" );
  assert.equal($('#qunit-fixture').children('div').length, 6, "children(selector) Passed!" );
});

QUnit.test( "closest", function( assert ) {
  assert.equal($('input.prop-fixture').closest()[0].className, "prop-fixture", "closest Passed!" );
  assert.equal($('input.prop-fixture').closest('div')[0].id, "qunit-fixture", "closest Passed!" );
});

QUnit.test( "find", function( assert ) {
  assert.equal($('.form-fixture').find('input[type=hidden]').length, 1, "find Passed!" );
});

QUnit.test( "has", function( assert ) {
  assert.equal($('.form-fixture').has('input').length, true, "has Passed!" );
});

QUnit.test( "next", function( assert ) {
  assert.equal($('.form-fixture input').next().val(), 'text', "next Passed!" );
});

QUnit.test( "not", function( assert ) {
  assert.equal($('#qunit-fixture div').not('.qsa-fixture').length, 4, "not Passed!" );
});

QUnit.test( "parent", function( assert ) {
  assert.equal($('.qsa-fixture').parent()[0].id, 'qunit-fixture', "parent Passed!" );
  assert.equal($('.qsa-fixture').parent().length, 1, "parent Passed!" );
});

QUnit.test( "parents", function( assert ) {
  assert.equal($('.form-fixture input').parents().length, 4, "parents Passed!" );
  assert.equal($('.form-fixture input').parents('div, form').length, 2, "parents(selector) Passed!" );
  assert.equal($('.form-fixture input').parents()[ $('.form-fixture input').parents().length-1 ], document.body.parentNode, "last element in collection is <html>" );
});

QUnit.test( "prev", function( assert ) {
  assert.equal($('.form-fixture input[type=text]').prev().val(), 5, "prev Passed!" );
});

QUnit.test( "siblings", function( assert ) {
  assert.equal($('#id-fixture').siblings().length, 13, "siblings Passed!" );
});

QUnit.test( "is", function( assert ) {
  assert.equal($('#id-fixture').is(), false, "is Passed!" );
  assert.equal($('#id-fixture').is('div'), true, "is Passed!" );
  assert.equal($('#id-fixture').is('#id-fixture'), true, "is Passed!" );
  assert.equal($('#id-fixture').is($('#id-fixture')), true, "is Passed!" );
  assert.equal($('#id-fixture').is($('#class-fixture')), false, "is Passed!" );
});

//Manipulation

QUnit.test( "append", function( assert ) {
  $('#qunit-fixture').append('<div class="test">');
  assert.equal($('.test').length, 1, "append Passed!" );
});

QUnit.test( "appendTo", function( assert ) {
  $('<div class="test">').appendTo('#qunit-fixture');
  assert.equal($('.test').length, 1, "appendTo Passed!" );
});

QUnit.test( "clone", function( assert ) {
  assert.equal($('.class-fixture').clone()[0].className, 'class-fixture', "clone Passed!" );
});

QUnit.test( "empty", function( assert ) {
  assert.equal($('.form-fixture').empty().children().length, 0, "empty Passed!" );
});

QUnit.test( "html", function( assert ) {
  $('.class-fixture').html('<div class="html-test">');
  assert.equal($('.html-test').length, 1, "html Passed!" );
});

QUnit.test( "html string", function( assert ) {
  $('.class-fixture').html('test');
  assert.equal($('.class-fixture')[0].innerHTML, 'test', "html string Passed!" );
});

QUnit.test( "html numeric", function( assert ) {
  $('.class-fixture').html(0);
  assert.equal($('.class-fixture')[0].innerHTML, '0', "html numeric Passed!" );
});

QUnit.test( "insertAfter", function( assert ) {
  $('<div class="test"></div>').insertAfter('input[type=hidden]');
  assert.equal($('.test').index(), 1, "insertAfter Passed!" );
});

QUnit.test( "insertBefore", function( assert ) {
  $('<div class="test"></div>').insertBefore('input[type=submit]');
  assert.equal($('.test').index(), 2, "insertBefore Passed!" );
});

QUnit.test( "prepend", function( assert ) {
  $('.form-fixture').prepend('<div class="test"></div>');
  assert.equal($('.test').index(), 0, "prepend Passed!" );
});

QUnit.test( "prependTo", function( assert ) {
  $('<div class="test"></div>').prependTo('.form-fixture');
  assert.equal($('.test').index(), 0, "prependTo Passed!" );
});

QUnit.test( "remove", function( assert ) {
  $('.class-fixture').remove();
  assert.equal($('.class-fixture').length, 0, "remove Passed!" );
});

QUnit.test( "text", function( assert ) {
  $('.class-fixture').text('Text Content');
  assert.equal($('.class-fixture')[0].textContent, "Text Content", "text Passed!" );
});

//Utils

QUnit.test( "$.each", function( assert ) {
  var test = 0;
  $.each(new Array(3), function(){
    test++;
  });
  assert.equal(test, 3, "$.each Passed!" );
});

QUnit.test( "$.extend", function( assert ) {
  var orig = {}, test = {count: 3};
  $.extend(orig,test);
  assert.equal(orig.count, 3, "$.extend Passed!" );
});

QUnit.test( "$.matches", function( assert ) {
  var test = $('<div class="test">')[0], selector = ".test";
  assert.equal($.matches(test,selector), true, "$.matches Passed!" );
});

QUnit.test( "$.parseHTML", function( assert ) {
  assert.equal($.parseHTML('<a>')[0].outerHTML, '<a></a>' , "$.parseHTML Passed!" );
});

QUnit.test( "$.unique", function( assert ) {
  var test = $.merge( $("#id-fixture"),  $("#id-fixture") );
  assert.equal($.unique( test ).length, 1, "$.unique Passed!" );
});
