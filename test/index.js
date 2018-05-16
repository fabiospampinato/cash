
/* CORE */

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

QUnit.test( "tagName which doesnt exist Query", function( assert ) {
  assert.equal($('foo').length, 0, "tagName which doenst exist Passed!" );
});

QUnit.test( "id Query for non-existing element", function( assert ) {
  assert.equal($('#i-dont-exist').length, 0, "id for non-existing element Passed!" );
});

QUnit.test( "className Query for non-existing element", function( assert ) {
  assert.equal($('.i-dont-exist').length, 0, "className for non-existing element Passed!" );
});

QUnit.test( "$(fn)", function( assert ) {
  var called = false;
  var readyFn = function() { called = true; }

  $(readyFn);
  assert.equal(called, false);

  stop();

  setTimeout(function() {
    assert.equal(called, true);
    start();
  }, 10);
});

/* ATTRIBUTES */

QUnit.test( 'addClass', function( assert ) {

  $('.class-fixture').addClass( '' );
  $('.class-fixture').addClass( undefined );
  $('.class-fixture').addClass( null );
  assert.equal( true, true, 'addClass doesn\'t die on falsey' );
  $('.class-fixture').addClass( 4 );
  assert.equal( true, true, 'addClass doesn\'t die on integer' );

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

  var testReturn = $('.attr-fixture').attr({ 'success': 'set', 'multi-success': 'set' });
  testAttr = [$('.attr-fixture').attr('success'),$('.attr-fixture').attr('multi-success')].join(' ');
  assert.equal(testReturn instanceof cash, true, "attr set returns collection!" );
  assert.equal(testAttr, 'set set', "attr set multiple Passed!" );

  testAttr = $('.attr-fixture, .attr-fixture2').attr("nothing");
  assert.equal( testAttr, undefined, "non-existing attribute returns undefined");

  testAttr = $('.attr-fixture').attr();
  assert.equal( testAttr, undefined, "no argument passed returns undefined");

});

QUnit.test( "hasClass", function( assert ) {

  $('.class-fixture').hasClass( '' );
  $('.class-fixture').hasClass( ' ' );
  $('.class-fixture').hasClass( undefined );
  $('.class-fixture').hasClass( null );
  assert.equal( true, true, 'hasClass doesn\'t die on falsey' );
  $('.class-fixture').hasClass( 4 );
  assert.equal( true, true, 'hasClass doesn\'t die on integer' );

  var hasClass = $('.attr-fixture').hasClass('has-class');
  assert.equal(hasClass, true, "hasClass (true) Passed!" );

  hasClass = $('.attr-fixture').hasClass('not-a-real-class');
  assert.equal(hasClass, false, "hasClass (false) Passed!" );

  hasClass = $('.attr-fixture').addClass('foo$bar').hasClass('foo$bar');
  assert.equal(hasClass, true, "hasClass works with classes containing special characters" );
});

QUnit.test( "prop", function( assert ) {
  assert.equal($('.prop-fixture').prop('checked'), true, "prop get Passed!" );

  $('.prop-fixture').prop('checked',false);
  assert.equal($('.prop-fixture').prop('checked'), false, "prop set Passed!" );

  $('.prop-fixture').prop({
    'checked': true,
    'disabled': true
  });
  var testProps = [$('.prop-fixture').prop('checked'),$('.prop-fixture').prop('disabled')].join(' ');
  assert.equal(testProps, 'true true', "prop set multiple Passed!" );
});

QUnit.test( "removeAttr", function( assert ) {
  $('.attr-fixture').removeAttr('success');
  assert.equal($('.attr-fixture').attr('success'), undefined, "removeAttr Passed!" );
});

QUnit.test( "removeClass", function( assert ) {

  var $cf = $('.class-fixture');
  $cf.removeClass( '' );
  $cf.removeClass( ' ' );
  $cf.removeClass( undefined );
  $cf.removeClass( null );
  assert.equal( true, true, 'removeClass doesn\'t die on falsey' );
  $cf.removeClass( 4 );
  assert.equal( true, true, 'removeClass doesn\'t die on integer' );

  $('.attr-fixture').removeClass('has-class');
  assert.equal( $('.attr-fixture')[0].className, "attr-fixture has-class-two has-class-three", "removeClass Passed!" );
  $('.attr-fixture, .attr-fixture2').removeClass('has-class-three has-class-two');
  assert.equal( $('.attr-fixture')[0].className, "attr-fixture", "removeClass Multiple Passed!" );
  assert.equal( $('.attr-fixture2')[0].className, "attr-fixture2", "removeClass Multiple Passed!" );

  $cf.removeClass();
  assert.equal( $cf[0].className, '', 'removing all classes passed!' );
  $cf.addClass('class-fixture');

  var hasClass = $('.attr-fixture').addClass('foo$bar').removeClass('foo$bar').hasClass('foo$bar');
  assert.equal(hasClass, false, "removeClass works with classes containing special characters" );
});

//TODO: removeProp

QUnit.test( "toggleClass", function( assert ) {

  $('.class-fixture').toggleClass( '' );
  $('.class-fixture').toggleClass( ' ' );
  $('.class-fixture').toggleClass( undefined );
  $('.class-fixture').toggleClass( null );
  assert.equal( true, true, 'toggleClass doesn\'t die on falsey' );
  $('.class-fixture').toggleClass( 4 );
  assert.equal( true, true, 'toggleClass doesn\'t die on integer' );

  var hasClass = $('.attr-fixture').toggleClass('toggle-class-force',true).hasClass('toggle-class-force');
  assert.equal(hasClass, true, "toggleClass (force add) Passed!" );
  hasClass = $('.attr-fixture').toggleClass('toggle-class-force',false).hasClass('toggle-class-force');
  assert.equal(hasClass, false, "toggleClass (force remove) Passed!" );
  var hasClass = $('.attr-fixture').toggleClass('toggle-class').hasClass('toggle-class');
  assert.equal(hasClass, true, "toggleClass (add) Passed!" );
  var hasClass = $('.attr-fixture').toggleClass('toggle-class').hasClass('toggle-class');
  assert.equal(hasClass, false, "toggleClass (remove) Passed!" );
  var hasClass = $('.attr-fixture').toggleClass('foo$bar', true).toggleClass('foo$bar').hasClass('foo$bar');
  assert.equal(hasClass, false, "toggleClass works with classes containing special characters" );
});

/* COLLECTION */

QUnit.test( "add", function( assert ) {
  var addFixture = $('#id-fixture').add( $('.class-fixture') );
  assert.equal(addFixture.__cash, true, "add Passed!" );
  assert.equal(addFixture.length, 2, "add(one) Passed!" );

  addFixture = $('#id-fixture').add( $('a').eq(0) ).add( $('a').eq(1) );
  assert.equal(addFixture.length, 3, "add(two) Passed!" );

  addFixture = $('#id-fixture').add( $('#qunit-fixture a') ).add( $('#qunit-fixture input') );
  assert.equal(addFixture.length, 16, "add(collections) Passed!" );

  addFixture = $('#qunit-fixture a').first().add( $('#qunit-fixture a') );
  assert.equal(addFixture.length, 5, "add(no duplicates) Passed!" );

  addFixture = $('#id-fixture').add( "#qunit-fixture a" );
  assert.equal(addFixture.length, 6, "add(allow selector string) Passed!" );
});

QUnit.test( "each", function( assert ) {
  var arrayFixture = [];
  $('.qsa-fixture').each(function(i,v){
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
  arrayFixture = $('#qunit-fixture div').filter(function(i,e){
    return $(e).hasClass('qsa-fixture');
  });
  assert.equal(arrayFixture.length, 2, "filter(fn) Passed!" );

  arrayFixture = $('#qunit-fixture div').filter($('#qunit-fixture div').get(0));
  assert.equal(arrayFixture.length, 1, "filter(element) Passed!" );
});

QUnit.test( "first", function( assert ) {
  var firstFixture = $('#qunit-fixture div').first();
  assert.equal(firstFixture.hasClass('class-fixture'), true, "first Passed!" );
});

QUnit.test( "get", function( assert ) {
  var getFixture = $('#qunit-fixture div').get(1);
  assert.equal($(getFixture).attr('id'), 'id-fixture', "get Passed!" );

  var qsa = $('.qsa-fixture');
  assert.equal($.isArray ( qsa.get () ) && qsa.get ().length === 2, true, "can return everything" );
});

QUnit.test( "index", function( assert ) {
  var indexFixture = $('.qsa-fixture').index();
  assert.equal(indexFixture, 3, "index Passed!" );
  var indexFixture = $('#qunit-fixture').children().index('.qsa-fixture');
  assert.equal(indexFixture, 3, "index Passed!" );
});

QUnit.test( "last", function( assert ) {
  var lastFixture = $('#qunit-fixture div').last();
  assert.equal($(lastFixture).hasClass('attr-fixture2'), true, "last Passed!" );
});

QUnit.test( "map", function( assert ) {
  var result = $('#id-fixture').map(function(i,e){ return document; });
  assert.deepEqual(result[0], document, "map Passed!" );
});

QUnit.test( "slice", function( assert ) {
  var qsa = $('.qsa-fixture');
  var slice = qsa.slice(1);
  assert.deepEqual(slice.length, 1, "slice length Passed!" );
  assert.deepEqual(slice[0], qsa[1], "slice element Passed!" );
});

/* CSS */

QUnit.test( "css", function( assert ) {
  assert.equal($('.css-fixture').css('height'), '50px', "css read Passed!" );
  $('.css-fixture').css('height','100px');
  assert.equal($('.css-fixture').css('height'), '100px', "css write Passed!" );
  $('.css-fixture').css({height: '50px', width: '100px'});
  assert.equal($('.css-fixture').css('width'), '100px', "css write many Passed!" );
});

/* DATA */

QUnit.test( "data", function( assert ) {
  assert.equal($('.attr-fixture').data('index'), 5, "data read Passed!" );
  assert.equal($('.attr-fixture').data('index-other'), 100, "data read Passed!" );
  $('.attr-fixture').data('index',10);
  $('.attr-fixture').data('index-other',10);
  assert.equal($('.attr-fixture').data('index'), 10, "data set Passed!" );
  assert.equal($('.attr-fixture').data('index-other'), 10, "data set Passed!" );
  $('.attr-fixture').removeData('index');
  assert.equal($('.attr-fixture').data('index'), 5, "data remove Passed!" );
  assert.equal($('.attr-fixture').data('index-other'), 10, "data remove Passed!" );
  $('.attr-fixture').data('index',10);
  $('.attr-fixture').removeData();
  assert.equal($('.attr-fixture').data('index'), 5, "data remove all Passed!" );
  assert.equal($('.attr-fixture').data('index-other'), 100, "data remove all Passed!" );
});

/* DIMENSIONS */

QUnit.test( "height", function( assert ) {
  assert.equal($('.css-fixture').height(), 50, "height get Passed!" );
  $('.css-fixture').height(200);
  assert.equal($('.css-fixture').height(), 200, "height set Passed!" );
});

QUnit.test( "innerHeight", function( assert ) {
  assert.equal($('.css-fixture').innerHeight(), 90, "innerHeight Passed!" );
});

QUnit.test( "outerHeight", function( assert ) {
  assert.equal($('.css-fixture').outerHeight(), 100, "outerHeight Passed!" );
  assert.equal($('.css-fixture').outerHeight(true), 140, "outerHeight(margins) Passed!" );
});

QUnit.test( "width", function( assert ) {
  assert.equal($('.css-fixture').width(), 50, "width get Passed!" );
  $('.css-fixture').width(200);
  assert.equal($('.css-fixture').width(), 200, "width set Passed!" );
});

QUnit.test( "innerWidth", function( assert ) {
  assert.equal($('.css-fixture').innerWidth(), 90, "innerWidth Passed!" );
});

QUnit.test( "outerWidth", function( assert ) {
  assert.equal($('.css-fixture').outerWidth(), 100, "outerWidth Passed!" );
  assert.equal($('.css-fixture').outerWidth(true), 140, "outerWidth(margins) Passed!" );
});

/* EVENTS */

QUnit.test( "on", function( assert ) {
  var i = 1;
  $('.event-fixture').on('click', function(){
    i++;
    this.textContent = i;
  });
  $('.event-fixture').trigger('click');
  assert.equal($('.event-fixture')[0].textContent, 2, "on Passed!" );

  var j = 1;
  $('.event-fixture').on('foo bar', function(){
    j++;
  });
  $('.event-fixture').trigger('foo').trigger('bar');
  assert.equal(j, 3, "on multiple Passed!" );
});

QUnit.test( "on(delegate)", function( assert ) {
  var i = 1;
  function delegateHandler (){
    i++;
  };
  $('#qunit-fixture').on('click','.delegate-fixture', delegateHandler);
  $('.delegate-trigger').trigger('click');
  assert.equal(i, 2, "on(delegate) Passed!" );

  $('#qunit-fixture').off('click',delegateHandler);
  $('.delegate-trigger').trigger('click');
  assert.equal(i, 2, "on(delegate) can be removedPassed!" );
});

QUnit.test( "on(namespaces)", function( assert ) {
  var i = 1;
  function handler (){
    i++;
  }
  $('.event-fixture').on('foo bar.ns1', handler);
  $('.event-fixture').on('foo.ns1.ns2', handler);
  $('.event-fixture').trigger('foo.ns1.ns2').trigger('foo.ns1').trigger('foo.ns2');
  assert.equal(i, 4, "on(namespaces) Passed!" );
});

QUnit.test( "one", function( assert ) {
  var i = 1;
  var handler = function(){
    i++;
  };
  $('.event-fixture').one('click', handler);
  $('.event-fixture').trigger('click').trigger('click');
  assert.equal(i, 2, "one Passed!" );

  i = 1;
  $('.event-fixture').one('click', handler).off('click', handler).trigger('click');
  assert.equal(i, 1, "one removal Passed!" );
});

QUnit.test( "off", function( assert ) {
  var i = 1;
  function handler(){
    i++;
    this.textContent = i;
  }
  $('.off-fixture').on('click', handler);
  $('.off-fixture').trigger('click');
  $('.off-fixture').off('click');
  $('.off-fixture').trigger('click');
  assert.equal($('.off-fixture')[0].textContent, 2, "off Passed!" );

  $('.off-fixture').on('foo bar', handler);
  $('.off-fixture').off('foo bar', handler);
  $('.off-fixture').trigger('foo').trigger('bar');
  assert.equal($('.off-fixture')[0].textContent, 2, "off multiple Passed!" );

  $('.off-fixture').on('foo bar', handler);
  $('.off-fixture').off();
  $('.off-fixture').trigger('foo').trigger('bar');
  assert.equal($('.off-fixture')[0].textContent, 2, "off all Passed!" );
});

QUnit.test( "off(namespaces)", function( assert ) {
  var i = 1;
  function handler (){
    i++;
  }
  $('.event-fixture').on('foo.ns1.ns2', handler).off('foo').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3');
  $('.event-fixture').on('foo.ns1.ns2', handler).off('foo.ns1').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3');
  $('.event-fixture').on('foo.ns1.ns2', handler).off('foo.ns2').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3');
  $('.event-fixture').on('foo.ns1.ns2', handler).off('foo.ns1.ns2').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3');
  $('.event-fixture').on('foo.ns1.ns2 bar.ns1.ns2 baz.ns1.ns2', handler).off('.ns1').trigger('foo').trigger('bar').trigger('baz');
  $('.event-fixture').on('foo.ns1.ns2', handler).off('foo.ns3').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3');
  assert.equal(i, 4, "off(namespaces) Passed!" );
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

QUnit.test( "trigger(data)", function( assert ) {
  var i = 1;
  var data;
  $('.trigger-data-fixture').on('custom', function(e,d){
      i += e.data;
      this.textContent = i;
      data = d;
  });
  $('.trigger-data-fixture').trigger('custom', 1);
  assert.equal($('.trigger-data-fixture')[0].textContent, 2, "trigger(data) Passed!" );

  $('.trigger-data-fixture').trigger('custom',123);
  assert.equal(data, 123, "trigger(data) argument Passed!" );
});

QUnit.test( "trigger(event.namespace)", function( assert ) {
  var namespaces = [];
  function handler (event){
    namespaces.push ( event.namespace );
  }
  $('.event-fixture').on('foo.ns1.ns2', handler);
  $('.event-fixture').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns1.ns2');
  assert.equal(namespaces[0] === '' && namespaces[1] === 'ns1' && namespaces[2] === 'ns2' && namespaces[3] === 'ns1.ns2', true, "off(namespaces) Passed!" );
});

QUnit.test( "trigger(namespaces)", function( assert ) {
  var i = 1;
  function handler (){
    i++;
  }
  $('.event-fixture').on('foo.ns1.ns2', handler).trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3').trigger('foo.ns1.ns3');
  assert.equal(i, 4, "off(namespaces) Passed!" );
});

/* FORMS */

QUnit.test( "serialize", function( assert ) {
  var data = $('.form-fixture').serialize();
  assert.equal(data, "hidden=5&text=text&checkbox-yes=yes&radio=yes&select=selected&select-multiple=option-1&select-multiple=option-2", "serialize Passed!" );

  data = $( ".form-fixture input, .form-fixture textarea, .form-fixture select" ).serialize();
  assert.equal(data, "hidden=5&text=text&checkbox-yes=yes&radio=yes&select=selected&select-multiple=option-1&select-multiple=option-2", "serialize Passed!" );
});

QUnit.test( "serialize control elements", function( assert ) {
  var data = $('input[type=text]').serialize();
  assert.equal(data, "text=text", "serialize elemnts passed!" );
});

QUnit.test( "val", function( assert ) {
  assert.equal($('input[type=text]').val(), "text", "val get Passed!" );
  $('input[type=text]').val(0);
  assert.equal($('input[type=text]').val(), 0, "val set Passed!" );
  assert.equal($('select[name=select]').val(), "selected", "val get select Passed!" );
  assert.equal($('select[name=select-multiple]').val(), "option-1,option-2", "val get select multiple Passed!" );
});

/* MANIPULATION */

//TODO: after

QUnit.test( "append", function( assert ) {
  $('#qunit-fixture').append('<div class="test">');
  assert.equal($('.test').length, 1, "append Passed!" );
});

QUnit.test( "appendTo", function( assert ) {
  $('<div class="test">').appendTo('#qunit-fixture');
  assert.equal($('.test').length, 1, "appendTo Passed!" );
});

//TODO: before

QUnit.test( "clone", function( assert ) {
  assert.equal($('.class-fixture').clone()[0].className, 'class-fixture', "clone Passed!" );
});

QUnit.test( "detach", function( assert ) {
  var i = 1;
  var ele = $('.class-fixture');
  ele.on('foo',function () {
    i++
  });
  ele.detach();
  ele.prependTo('.form-fixture');
  ele.trigger('foo');
  ele.detach();
  assert.equal($('.class-fixture').length, 0, "detach Passed!" );
  assert.equal(i, 2, "detach events Passed!" );
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
  $('<div class="test"></div>').insertBefore('input[type=hidden]');
  assert.equal($('.test').index(), 0, "insertBefore Passed!" );
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
  var i = 1;
  var ele = $('.class-fixture');
  ele.on('foo',function () {
    i++
  });
  ele.remove();
  ele.prependTo('.form-fixture');
  ele.trigger('foo');
  ele.remove();
  assert.equal($('.class-fixture').length, 0, "remove Passed!" );
  assert.equal(i, 1, "remove events Passed!" );
});

//TODO: replaceAll
//TODO: replaceWith

QUnit.test( "text", function( assert ) {
  $('.class-fixture').text('Text Content');
  assert.equal($('.class-fixture')[0].textContent, "Text Content", "text Passed!" );
  $('.class-fixture').text(0);
  assert.equal($('.class-fixture')[0].textContent, 0, "text Passed!" );
});

/* OFFSET */

//TODO: offsetParent
//TODO: offset
//TODO: position

/* TRAVERSAL */

QUnit.test( "children", function( assert ) {
  assert.equal($('#qunit-fixture').children().length, 15, "children Passed!" );
  assert.equal($('#qunit-fixture').children('div').length, 6, "children(selector) Passed!" );
});

QUnit.test( "closest", function( assert ) {
  assert.equal($('input.prop-fixture').closest().length, 0, "closest Passed!" );
  assert.equal($('input.prop-fixture').closest('div')[0].id, "qunit-fixture", "closest Passed!" );
});

QUnit.test( "find", function( assert ) {
  assert.equal($('.form-fixture').find('input[type=hidden]').length, 1, "find Passed!" );
});

QUnit.test( "has", function( assert ) {
  assert.equal($('.form-fixture').has('input').length, true, "has Passed!" );
});

QUnit.test( "is", function( assert ) {
  assert.equal($('#id-fixture').is(), false, "is Passed!" );
  assert.equal($('#id-fixture').is('div'), true, "is Passed!" );
  assert.equal($('#id-fixture').is('#id-fixture'), true, "is Passed!" );
  assert.equal($('#id-fixture').is($('#id-fixture')), true, "is Passed!" );
  assert.equal($('#id-fixture').is($('div')), true, "is Passed!" );
  assert.equal($('#id-fixture').is($('#class-fixture')), false, "is Passed!" );
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
  assert.equal($('#id-fixture').siblings().length, 14, "siblings Passed!" );
});

/* UTILS */

QUnit.test( "$.camelCase", function( assert ) {
  assert.equal($.camelCase('border-width'), 'borderWidth', "$.camelCase Passed!" );
});

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

QUnit.test( "$.isArray", function( assert ) {
  assert.equal($.isArray(true), false, "$.isArray boolean Passed!" );
  assert.equal($.isArray(123), false, "$.isArray number Passed!" );
  assert.equal($.isArray('foo'), false, "$.isArray string Passed!" );
  assert.equal($.isArray([1,2,3]), true, "$.isArray array Passed!" );
  assert.equal($.isArray(function(){}), false, "$.isArray function Passed!" );
});

QUnit.test( "$.isFunction", function( assert ) {
  assert.equal($.isFunction(true), false, "$.isFunction boolean Passed!" );
  assert.equal($.isFunction(123), false, "$.isFunction number Passed!" );
  assert.equal($.isFunction('foo'), false, "$.isFunction string Passed!" );
  assert.equal($.isFunction([1,2,3]), false, "$.isFunction array Passed!" );
  assert.equal($.isFunction(function(){}), true, "$.isFunction function Passed!" );
});

QUnit.test( "$.isNumeric", function( assert ) {
  assert.equal($.isNumeric(true), false, "$.isNumeric boolean Passed!" );
  assert.equal($.isNumeric(123), true, "$.isNumeric number Passed!" );
  assert.equal($.isNumeric('foo'), false, "$.isNumeric string Passed!" );
  assert.equal($.isNumeric([1,2,3]), false, "$.isNumeric array Passed!" );
  assert.equal($.isNumeric(function(){}), false, "$.isNumeric function Passed!" );
});

QUnit.test( "$.isString", function( assert ) {
  assert.equal($.isString(true), false, "$.isString boolean Passed!" );
  assert.equal($.isString(123), false, "$.isString number Passed!" );
  assert.equal($.isString('foo'), true, "$.isString string Passed!" );
  assert.equal($.isString([1,2,3]), false, "$.isString array Passed!" );
  assert.equal($.isString(function(){}), false, "$.isString function Passed!" );
});

QUnit.test( "$.matches", function( assert ) {
  var test = $('<div class="test">')[0], selector = ".test";
  assert.equal($.matches(test,selector), true, "$.matches Passed!" );
});

QUnit.test( "$.parseHTML", function( assert ) {
  assert.equal($.parseHTML('<a>')[0].outerHTML, '<a></a>' , "$.parseHTML Passed!" );
});

//TODO: prefixedProp

QUnit.test( "$.unique", function( assert ) {
  var test = [ $("#id-fixture")[0],  $("#id-fixture")[0] ];
  assert.equal($.unique( test ).length, 1, "$.unique Passed!" );
});
