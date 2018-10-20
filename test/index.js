
/* INIT */

QUnit.module( 'Cash Test Suite', {
  beforeEach: function () {
    document.getElementById ( 'qunit-fixture' ).innerHTML = ' \
      <div class="class-fixture"></div> \
      <fieldset class="tagname-fixture"></fieldset> \
      <div id="id-fixture"></div> \
      <div class="qsa-fixture"></div> \
      <div class="qsa-fixture"></div> \
      <div class="attr-fixture has-class-two has-class has-class-three" data-index="5" data-index-other="100" success="get"></div> \
      <div class="attr-fixture2 has-class-two has-class-three" data-index="6" success="get"></div> \
      <span class="css-fixture" style="display: block; height: 50px; width: 50px; padding: 20px; margin: 20px; border: 5px solid black;"></span> \
      <input type="checkbox" class="prop-fixture" checked/> \
      <a class="event-fixture">Click Me</a> \
      <a class="trigger-fixture">Click Me</a> \
      <a class="trigger-data-fixture">Click Me</a> \
      <a class="delegate-fixture"><span class="delegate-trigger">Click Me</span></a> \
      <a class="off-fixture">Click Me</a> \
      <form class="form-fixture" name="form-fixture"> \
        <input type="hidden" value="5" name="hidden"/> \
        <input type="text" value="text" name="text"/> \
        <input type="text" value="I\'m disabled" name="disabled-check" disabled /> \
        <input type="checkbox" value="yes" checked="checked" name="checkbox-yes" /> \
        <input type="checkbox" value="no" name="checkbox-no" /> \
        <input type="radio" value="yes" checked="checked" name="radio" /> \
        <input type="radio" value="no" name="radio" /> \
        <select name="select"> \
          <option value="not-selected">Not Selected</option> \
          <option value="selected" selected>Selected</option> \
        </select> \
        <select name="select-multiple" multiple> \
          <option value="option-1" selected>Selected</option> \
          <option value="option-2" selected>Selected</option> \
        </select> \
        <input type="file" name="file" /> \
        <input type="submit" value="submit" name="submit" /> \
      </form> \
    ';
  }
});

/* CORE */

QUnit.test( "className Query", function( assert ) {
  assert.equal($('.class-fixture').length, 1, "className" );
});

QUnit.test( "tagName Query", function( assert ) {
  assert.equal($('fieldset').length, 1, "tagName" );
});

QUnit.test( "id Query", function( assert ) {
  assert.equal($('#id-fixture').length, 1, "id" );
});

QUnit.test( "qSA Query", function( assert ) {
  assert.equal($('.qsa-fixture').length, 2, "qSA" );
});

QUnit.test( "domNode Query", function( assert ) {
  assert.equal($($('.qsa-fixture')[0]).length, 1, " domNode" );
});

QUnit.test( "HTML Query/Init", function( assert ) {
  assert.equal($('<div class="html-fixture">').length, 1, "HTML" );
});

QUnit.test( "tagName which doesnt exist Query", function( assert ) {
  assert.equal($('foo').length, 0, "tagName which doenst exist" );
});

QUnit.test( "id Query for non-existing element", function( assert ) {
  assert.equal($('#i-dont-exist').length, 0, "id for non-existing element" );
});

QUnit.test( "className Query for non-existing element", function( assert ) {
  assert.equal($('.i-dont-exist').length, 0, "className for non-existing element" );
});

QUnit.test( "$(fn)", function( assert ) {
  var done = assert.async();
  var called = false;
  var readyFn = function() { called = true; }

  $(readyFn);
  assert.equal(called, false);

  setTimeout(function() {
    assert.equal(called, true);
    done();
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
  assert.equal($('.add-class').length, 1, "addClass" );
  $('.class-fixture').addClass('add-class class-two');
  assert.equal($('.add-class.class-two').length, 1, "addClass multiple classes" );
  $('.class-fixture').addClass('add-class add-class class-two add-class');
  $('.class-fixture').addClass('class-two add-class add-class add-class');
  var dupes = $('.class-fixture')[0].className.match(/add-class/g);
  assert.equal(dupes.length, 1, "addClass no duplicates" );
  $('.qsa-fixture').addClass('add-class-multiple');
  assert.equal($('.add-class-multiple').length, 2, "addClass multiple elements" );
});

QUnit.test( "attr", function( assert ) {
  var testAttr = $('.attr-fixture').attr('success');
  assert.equal(testAttr, 'get', "attr get" );

  $('.attr-fixture').attr('success','set');
  testAttr = $('.attr-fixture').attr('success');
  assert.equal(testAttr, 'set', "attr set" );

  var testReturn = $('.attr-fixture').attr({ 'success': 'set', 'multi-success': 'set' });
  testAttr = [$('.attr-fixture').attr('success'),$('.attr-fixture').attr('multi-success')].join(' ');
  assert.equal(testReturn instanceof cash, true, "attr set returns collection!" );
  assert.equal(testAttr, 'set set', "attr set multiple" );

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
  assert.equal(hasClass, true, "hasClass (true)" );

  hasClass = $('.attr-fixture').hasClass('not-a-real-class');
  assert.equal(hasClass, false, "hasClass (false)" );

  hasClass = $('.attr-fixture').addClass('foo$bar').hasClass('foo$bar');
  assert.equal(hasClass, true, "hasClass works with classes containing special characters" );
});

QUnit.test( "prop", function( assert ) {
  assert.equal($('.prop-fixture').prop('checked'), true, "prop get" );

  $('.prop-fixture').prop('checked',false);
  assert.equal($('.prop-fixture').prop('checked'), false, "prop set" );

  $('.prop-fixture').prop({
    'checked': true,
    'disabled': true
  });
  var testProps = [$('.prop-fixture').prop('checked'),$('.prop-fixture').prop('disabled')].join(' ');
  assert.equal(testProps, 'true true', "prop set multiple" );
});

QUnit.test( "removeAttr", function( assert ) {
  $('.attr-fixture').removeAttr('success');
  assert.equal($('.attr-fixture').attr('success'), undefined, "removeAttr" );
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
  assert.equal( $('.attr-fixture')[0].className, "attr-fixture has-class-two has-class-three", "removeClass" );
  $('.attr-fixture, .attr-fixture2').removeClass('has-class-three has-class-two');
  assert.equal( $('.attr-fixture')[0].className, "attr-fixture", "removeClass Multiple" );
  assert.equal( $('.attr-fixture2')[0].className, "attr-fixture2", "removeClass Multiple" );

  $cf.removeClass();
  assert.equal( $cf[0].className, '', 'removing all classes' );
  $cf.addClass('class-fixture');

  var hasClass = $('.attr-fixture').addClass('foo$bar').removeClass('foo$bar').hasClass('foo$bar');
  assert.equal(hasClass, false, "removeClass works with classes containing special characters" );
});

QUnit.test( "removeProp", function( assert ) {
  $('.prop-fixture').prop('foo',123).removeProp('foo');
  assert.equal($('.prop-fixture').prop('foo'), undefined, "removeProp" );
});

QUnit.test( "toggleClass", function( assert ) {

  $('.class-fixture').toggleClass( '' );
  $('.class-fixture').toggleClass( ' ' );
  $('.class-fixture').toggleClass( undefined );
  $('.class-fixture').toggleClass( null );
  assert.equal( true, true, 'toggleClass doesn\'t die on falsey' );
  $('.class-fixture').toggleClass( 4 );
  assert.equal( true, true, 'toggleClass doesn\'t die on integer' );

  var hasClass = $('.attr-fixture').toggleClass('toggle-class-force',true).hasClass('toggle-class-force');
  assert.equal(hasClass, true, "toggleClass (force add)" );
  hasClass = $('.attr-fixture').toggleClass('toggle-class-force',false).hasClass('toggle-class-force');
  assert.equal(hasClass, false, "toggleClass (force remove)" );
  var hasClass = $('.attr-fixture').toggleClass('toggle-class').hasClass('toggle-class');
  assert.equal(hasClass, true, "toggleClass (add)" );
  var hasClass = $('.attr-fixture').toggleClass('toggle-class').hasClass('toggle-class');
  assert.equal(hasClass, false, "toggleClass (remove)" );
  var hasClass = $('.attr-fixture').toggleClass('foo$bar', true).toggleClass('foo$bar').hasClass('foo$bar');
  assert.equal(hasClass, false, "toggleClass works with classes containing special characters" );
});

/* COLLECTION */

QUnit.test( "add", function( assert ) {
  var addFixture = $('#id-fixture').add( $('.class-fixture') );
  assert.equal(addFixture.__cash, true, "add" );
  assert.equal(addFixture.length, 2, "add(one)" );

  addFixture = $('#id-fixture').add( $('a').eq(0) ).add( $('a').eq(1) );
  assert.equal(addFixture.length, 3, "add(two)" );

  addFixture = $('#id-fixture').add( $('#qunit-fixture a') ).add( $('#qunit-fixture input') );
  assert.equal(addFixture.length, 16, "add(collections)" );

  addFixture = $('#qunit-fixture a').first().add( $('#qunit-fixture a') );
  assert.equal(addFixture.length, 5, "add(no duplicates)" );

  addFixture = $('#id-fixture').add( "#qunit-fixture a" );
  assert.equal(addFixture.length, 6, "add(allow selector string)" );
});

QUnit.test( "each", function( assert ) {
  var arrayFixture = [];
  $('.qsa-fixture').each(function(i,v){
    arrayFixture.push(i);
  });
  assert.equal(arrayFixture.length, 2, "each" );
});

QUnit.test( "eq", function( assert ) {
  assert.equal($('#qunit-fixture div').eq(1)[0], $('#id-fixture')[0], "eq" );
});

QUnit.test( "filter", function( assert ) {
  var arrayFixture = $('#qunit-fixture div').filter('.has-class');
  assert.equal(arrayFixture.length, 1, "filter(selector)" );
  arrayFixture = $('#qunit-fixture div').filter(function(i,e){
    return $(e).hasClass('qsa-fixture');
  });
  assert.equal(arrayFixture.length, 2, "filter(fn)" );

  arrayFixture = $('#qunit-fixture div').filter($('#qunit-fixture div').get(0));
  assert.equal(arrayFixture.length, 1, "filter(element)" );
});

QUnit.test( "first", function( assert ) {
  var firstFixture = $('#qunit-fixture div').first();
  assert.equal(firstFixture.hasClass('class-fixture'), true, "first" );
});

QUnit.test( "get", function( assert ) {
  var getFixture = $('#qunit-fixture div').get(1);
  assert.equal($(getFixture).attr('id'), 'id-fixture', "get" );

  var qsa = $('.qsa-fixture');
  assert.equal($.isArray ( qsa.get () ) && qsa.get ().length === 2, true, "can return everything" );
});

QUnit.test( "index", function( assert ) {
  var indexFixture = $('.qsa-fixture').index();
  assert.equal(indexFixture, 3, "index" );
  var indexFixture = $('#qunit-fixture').children().index('.qsa-fixture');
  assert.equal(indexFixture, 3, "index" );
});

QUnit.test( "last", function( assert ) {
  var lastFixture = $('#qunit-fixture div').last();
  assert.equal($(lastFixture).hasClass('attr-fixture2'), true, "last" );
});

QUnit.test( "map", function( assert ) {
  var result = $('#id-fixture').map(function(i,e){ return document; });
  assert.deepEqual(result[0], document, "map" );
});

QUnit.test( "slice", function( assert ) {
  var qsa = $('.qsa-fixture');
  var slice = qsa.slice(1);
  assert.deepEqual(slice.length, 1, "slice length" );
  assert.deepEqual(slice[0], qsa[1], "slice element" );
});

/* CSS */

QUnit.test( "css", function( assert ) {
  assert.equal($('.css-fixture').css('height'), '50px', "css read" );
  $('.css-fixture').css('height','100px');
  assert.equal($('.css-fixture').css('height'), '100px', "css write" );
  $('.css-fixture').css({height: '50px', width: '100px'});
  assert.equal($('.css-fixture').css('width'), '100px', "css write many" );
});

/* DATA */

QUnit.test( "data", function( assert ) {
  assert.deepEqual($('.attr-fixture').data(), {index: 5, 'index-other': 100}, "data read all" );
  assert.equal($('.attr-fixture').data('index'), 5, "data read" );
  assert.equal($('.attr-fixture').data('index-other'), 100, "data read" );
  $('.attr-fixture').data('index',10);
  $('.attr-fixture').data('index-other',10);
  assert.equal($('.attr-fixture').data('index'), 10, "data set" );
  assert.equal($('.attr-fixture').data('index-other'), 10, "data set" );
  $('.attr-fixture').removeData('index');
  assert.equal($('.attr-fixture').data('index'), 5, "data remove" );
  assert.equal($('.attr-fixture').data('index-other'), 10, "data remove" );
  $('.attr-fixture').data('index',10);
  $('.attr-fixture').removeData();
  assert.equal($('.attr-fixture').data('index'), 5, "data remove all" );
  assert.equal($('.attr-fixture').data('index-other'), 100, "data remove all" );
});

/* DIMENSIONS */

QUnit.test( "height", function( assert ) {
  assert.equal($('.css-fixture').height(), 50, "height get" );
  assert.equal($(window).height(), window.outerHeight, "(window) height get" );
  $('.css-fixture').height(200);
  assert.equal(Math.round($('.css-fixture').height()), 200, "height set" );
});

QUnit.test( "innerHeight", function( assert ) {
  assert.equal($('.css-fixture').innerHeight(), 90, "innerHeight" );
  assert.equal($(window).innerHeight(), window.innerHeight, "(window) innerHeight" );
});

QUnit.test( "outerHeight", function( assert ) {
  assert.equal($('.css-fixture').outerHeight(), 100, "outerHeight" );
  assert.equal($(window).outerHeight(), window.outerHeight, "(window) outerHeight" );
  assert.equal($('.css-fixture').outerHeight(true), 140, "outerHeight(margins)" );
});

QUnit.test( "width", function( assert ) {
  assert.equal($('.css-fixture').width(), 50, "width get" );
  assert.equal($(window).width(), window.outerWidth, "(window) width get" );
  $('.css-fixture').width(200);
  assert.equal($('.css-fixture').width(), 200, "width set" );
});

QUnit.test( "innerWidth", function( assert ) {
  assert.equal($('.css-fixture').innerWidth(), 90, "innerWidth" );
  assert.equal($(window).innerWidth(), window.innerWidth, "(window) innerWidth" );
});

QUnit.test( "outerWidth", function( assert ) {
  assert.equal($('.css-fixture').outerWidth(), 100, "outerWidth" );
  assert.equal($(window).outerWidth(), window.outerWidth, "(window) outerWidth" );
  assert.equal($('.css-fixture').outerWidth(true), 140, "outerWidth(margins)" );
});

/* EVENTS */

QUnit.test( "on", function( assert ) {
  var i = 1;
  $('.event-fixture').on('click', function(){
    i++;
    this.textContent = i;
  });
  $('.event-fixture').trigger('click');
  assert.equal($('.event-fixture')[0].textContent, 2, "on" );

  var j = 1;
  $('.event-fixture').on('foo bar', function(){
    j++;
  });
  $('.event-fixture').trigger('foo').trigger('bar');
  assert.equal(j, 3, "on multiple" );
});

QUnit.test( "on(delegate)", function( assert ) {
  var i = 1;
  function delegateHandler (){
    i++;
  };
  $('#qunit-fixture').on('click','.delegate-fixture', delegateHandler);
  $('.delegate-trigger').trigger('click');
  assert.equal(i, 2, "on(delegate)" );

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
  assert.equal(i, 4, "on(namespaces)" );
});

QUnit.test( "on(return false)", function( assert ) {
  var i = 1;
  function handler (){
    i++;
    return false;
  }
  $('html').on('foo', handler);
  $('.event-fixture').on('foo', handler).trigger('foo');
  assert.equal(i, 2, "on(return false)" );
});

QUnit.test( "one", function( assert ) {
  var i = 1;
  var handler = function(){
    i++;
  };
  $('.event-fixture').one('click', handler);
  $('.event-fixture').trigger('click').trigger('click');
  assert.equal(i, 2, "one" );

  i = 1;
  $('.event-fixture').one('click', handler).off('click', handler).trigger('click');
  assert.equal(i, 1, "one removal" );
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
  assert.equal($('.off-fixture')[0].textContent, 2, "off" );

  $('.off-fixture').on('foo bar', handler);
  $('.off-fixture').off('foo bar', handler);
  $('.off-fixture').trigger('foo').trigger('bar');
  assert.equal($('.off-fixture')[0].textContent, 2, "off multiple" );

  $('.off-fixture').on('foo bar', handler);
  $('.off-fixture').off();
  $('.off-fixture').trigger('foo').trigger('bar');
  assert.equal($('.off-fixture')[0].textContent, 2, "off all" );
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
  assert.equal(i, 4, "off(namespaces)" );
});

QUnit.test( "trigger", function( assert ) {
  var i = 1;
  $('.trigger-fixture').on('click', function(){
    i++;
    this.textContent = i;
  });
  $('.trigger-fixture').trigger('click');
  assert.equal($('.trigger-fixture')[0].textContent, 2, "trigger" );
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
  assert.equal($('.trigger-data-fixture')[0].textContent, 2, "trigger(data)" );

  $('.trigger-data-fixture').trigger('custom',123);
  assert.equal(data, 123, "trigger(data) argument" );
});

QUnit.test( "trigger(event.namespace)", function( assert ) {
  var namespaces = [];
  function handler (event){
    namespaces.push ( event.namespace );
  }
  $('.event-fixture').on('foo.ns1.ns2', handler);
  $('.event-fixture').trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns1.ns2');
  assert.equal(namespaces[0] === '' && namespaces[1] === 'ns1' && namespaces[2] === 'ns2' && namespaces[3] === 'ns1.ns2', true, "off(namespaces)" );
});

QUnit.test( "trigger(namespaces)", function( assert ) {
  var i = 1;
  function handler (){
    i++;
  }
  $('.event-fixture').on('foo.ns1.ns2', handler).trigger('foo').trigger('foo.ns1').trigger('foo.ns2').trigger('foo.ns3').trigger('foo.ns1.ns3');
  assert.equal(i, 4, "off(namespaces)" );
});

/* FORMS */

QUnit.test( "serialize", function( assert ) {
  var data = $('.form-fixture').serialize();
  assert.equal(data, "hidden=5&text=text&checkbox-yes=yes&radio=yes&select=selected&select-multiple=option-1&select-multiple=option-2", "serialize" );

  data = $( ".form-fixture input, .form-fixture textarea, .form-fixture select" ).serialize();
  assert.equal(data, "hidden=5&text=text&checkbox-yes=yes&radio=yes&select=selected&select-multiple=option-1&select-multiple=option-2", "serialize" );
});

QUnit.test( "serialize control elements", function( assert ) {
  var data = $('#qunit-fixture input[type=text]').serialize();
  assert.equal(data, "text=text", "serialize elemnts" );
});

QUnit.test( "val", function( assert ) {
  assert.equal($('#qunit-fixture input[type=text]').val(), "text", "val get" );
  $('#qunit-fixture input[type=text]').val(0);
  assert.equal($('#qunit-fixture input[type=text]').val(), 0, "val set" );
  assert.equal($('select[name=select]').val(), "selected", "val get select" );
  $('select[name=select]').val('not-selected');
  assert.equal($('select[name=select]').val(), "not-selected", "val set select" );
  assert.deepEqual($('select[name=select-multiple]').val(), ['option-1', 'option-2'], "val get select multiple" );
  $('#qunit-fixture input[type=text]').val(null);
  $('select[name=select-multiple]').val(null);
  assert.deepEqual($('#qunit-fixture input[type=text]').val(), '', "val set to null" );
  assert.deepEqual($('select[name=select-multiple]').val(), [], "val set to null" );
  $('select[name=select-multiple]').val(['option-1']);
  assert.deepEqual($('select[name=select-multiple]').val(), ['option-1'], "val set 1 option in select multiple" );
  $('select[name=select-multiple]').val(['option-1', 'option-2']);
  assert.deepEqual($('select[name=select-multiple]').val(), ['option-1', 'option-2'], "val set 2 options in select multiple" );
});

/* MANIPULATION */

QUnit.test( "after", function( assert ) {
  $('.class-fixture').append('<div class="anchor">');
  $('.anchor').after('<div class="test">');
  assert.equal($('.anchor').prev ().length, 0, "after" );
  assert.equal($('.anchor').siblings ().length, 1, "after" );
});

QUnit.test( "after(multi)", function( assert ) {
  $('.class-fixture').append('<div class="anchor">');
  $('.anchor').after('<div class="test">', '<div class="test">', '<div class="test">');
  assert.equal($('.anchor').prev ().length, 0, "after(multi)" );
  assert.equal($('.anchor').siblings ().length, 3, "after(multi)" );
});

QUnit.test( "append", function( assert ) {
  $('#qunit-fixture').append('<div class="test">');
  $('#qunit-fixture').append(undefined); // It shouldn't throw
  assert.equal($('.test').length, 1, "append" );
});

QUnit.test( "append(multi)", function( assert ) {
  $('#qunit-fixture').append('<div class="test">', '<div class="test">', '<div class="test">');
  assert.equal($('.test').length, 3, "append(multi)" );
});

QUnit.test( "appendTo", function( assert ) {
  $('<div class="test">').appendTo('#qunit-fixture');
  assert.equal($('.test').length, 1, "appendTo" );
});

QUnit.test( "before", function( assert ) {
  $('.class-fixture').append('<div class="anchor">');
  $('.anchor').before('<div class="test">');
  assert.equal($('.anchor').next ().length, 0, "before" );
  assert.equal($('.anchor').siblings ().length, 1, "before" );
});

QUnit.test( "before(multi)", function( assert ) {
  $('.class-fixture').append('<div class="anchor">');
  $('.anchor').before('<div class="test">', '<div class="test">', '<div class="test">');
  assert.equal($('.anchor').next ().length, 0, "before(multi)" );
  assert.equal($('.anchor').siblings ().length, 3, "before(multi)" );
});

QUnit.test( "clone", function( assert ) {
  assert.equal($('.class-fixture').clone()[0].className, 'class-fixture', "clone" );
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
  assert.equal($('.class-fixture').length, 0, "detach" );
  assert.equal(i, 2, "detach events" );
});

QUnit.test( "empty", function( assert ) {
  assert.equal($('.form-fixture').empty().children().length, 0, "empty" );
});

QUnit.test( "html", function( assert ) {
  $('.class-fixture').html('<div class="html-test">');
  assert.equal($('.html-test').length, 1, "html" );
});

QUnit.test( "html string", function( assert ) {
  $('.class-fixture').html('test');
  assert.equal($('.class-fixture')[0].innerHTML, 'test', "html string" );
});

QUnit.test( "html numeric", function( assert ) {
  $('.class-fixture').html(0);
  assert.equal($('.class-fixture')[0].innerHTML, '0', "html numeric" );
});

QUnit.test( "insertAfter", function( assert ) {
  $('<div class="test"></div>').insertAfter('input[type=hidden]');
  assert.equal($('.test').index(), 1, "insertAfter" );
});

QUnit.test( "insertBefore", function( assert ) {
  $('<div class="test"></div>').insertBefore('input[type=hidden]');
  assert.equal($('.test').index(), 0, "insertBefore" );
});

QUnit.test( "prepend", function( assert ) {
  $('.form-fixture').prepend('<div class="test"></div>');
  $('.form-fixture').prepend(undefined); // It shouldn't throw
  assert.equal($('.test').index(), 0, "prepend" );
});

QUnit.test( "prepend(multi)", function( assert ) {
  $('.form-fixture').prepend('<div class="test"></div>', '<div class="test"></div>', '<div class="test"></div>');
  assert.equal($('.test').length, 3, "prepend" );
});

QUnit.test( "prependTo", function( assert ) {
  $('<div class="test"></div>').prependTo('.form-fixture');
  assert.equal($('.test').index(), 0, "prependTo" );
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
  assert.equal($('.class-fixture').length, 0, "remove" );
  assert.equal(i, 1, "remove events" );
});

QUnit.test( "replaceAll", function( assert ) {
  var html = '<div class="qsa-fixture" data-foo="123"><p>Paragraph</p></div>';
  $(html).replaceAll('.qsa-fixture');
  $('.qsa-fixture').get ().forEach ( function ( ele ) {
    assert.equal($(ele)[0].outerHTML, html, "replaceAll" );
  });
});

QUnit.test( "replaceWith", function( assert ) {
  var html = '<div class="class-fixture" data-foo="123"><p>Paragraph</p></div>';
  $('.class-fixture').replaceWith(html);
  assert.equal($('.class-fixture')[0].outerHTML, html, "replaceWith" );
});

QUnit.test( "text", function( assert ) {
  $('.class-fixture').text('Text Content');
  assert.equal($('.class-fixture')[0].textContent, "Text Content", "text" );
  $('.class-fixture').text(0);
  assert.equal($('.class-fixture')[0].textContent, 0, "text" );
});

/* OFFSET */

QUnit.test( "offsetParent", function( assert ) {
  $('#qunit-fixture').css('position', 'relative'); // An element is said to be positioned if it has a CSS position attribute of relative, absolute, or fixed
  assert.equal($('.class-fixture').offsetParent ()[0], $('#qunit-fixture')[0], "offsetParent" );
});

QUnit.test( "offset", function( assert ) {
  var html = '<div class="offset-fixture" style="position: fixed; top: 200px; left: 100px;"></div>';
  $('.class-fixture').html(html);
  assert.deepEqual($('.offset-fixture').offset (), {top:200,left:100}, "offset" );
});

QUnit.test( "position", function( assert ) {
  var html = '<div class="offset-fixture" style="position: fixed; top: 200px; left: 100px;"><div class="position-fixture" style="position: absolute; top: 20px; left: 10px;"></div></div>';
  $('.class-fixture').html(html);
  assert.deepEqual($('.position-fixture').position (), {top:20,left:10}, "position" );
});

/* TRAVERSAL */

QUnit.test( "children", function( assert ) {
  assert.equal($('#qunit-fixture').children().length, 15, "children" );
  assert.equal($('#qunit-fixture').children('div').length, 6, "children(selector)" );
});

QUnit.test( "closest", function( assert ) {
  assert.equal($('input.prop-fixture').closest().length, 0, "closest" );
  assert.equal($('input.prop-fixture').closest('div')[0].id, "qunit-fixture", "closest" );
});

QUnit.test( "find", function( assert ) {
  assert.equal($('.form-fixture').find('input[type=hidden]').length, 1, "find" );
});

QUnit.test( "has", function( assert ) {
  assert.equal($('.form-fixture').has('input').length, true, "has" );
});

QUnit.test( "is", function( assert ) {
  assert.equal($('#id-fixture').is(), false, "is" );
  assert.equal($('#id-fixture').is('div'), true, "is" );
  assert.equal($('#id-fixture').is('#id-fixture'), true, "is" );
  assert.equal($('#id-fixture').is($('#id-fixture')), true, "is" );
  assert.equal($('#id-fixture').is($('div')), true, "is" );
  assert.equal($('#id-fixture').is($('#class-fixture')), false, "is" );
});

QUnit.test( "next", function( assert ) {
  assert.equal($('.form-fixture input').next().val(), 'text', "next" );
});

QUnit.test( "not", function( assert ) {
  assert.equal($('#qunit-fixture div').not('.qsa-fixture').length, 4, "not" );
});

QUnit.test( "parent", function( assert ) {
  assert.equal($('.qsa-fixture').parent()[0].id, 'qunit-fixture', "parent" );
  assert.equal($('.qsa-fixture').parent().length, 1, "parent" );
});

QUnit.test( "parents", function( assert ) {
  assert.equal($('.form-fixture input').parents().length, 4, "parents" );
  assert.equal($('.form-fixture input').parents('div, form').length, 2, "parents(selector)" );
  assert.equal($('.form-fixture input').parents()[ $('.form-fixture input').parents().length-1 ], document.body.parentNode, "last element in collection is <html>" );
});

QUnit.test( "prev", function( assert ) {
  assert.equal($('.form-fixture input[type=text]').prev().val(), 5, "prev" );
});

QUnit.test( "siblings", function( assert ) {
  assert.equal($('#id-fixture').siblings().length, 14, "siblings" );
});

/* UTILS */

QUnit.test( "$.camelCase", function( assert ) {
  assert.equal($.camelCase('border-width'), 'borderWidth', "$.camelCase" );
});

QUnit.test( "$.each", function( assert ) {
  var test = 0;
  $.each(new Array(3), function(){
    test++;
  });
  assert.equal(test, 3, "$.each" );
});

QUnit.test( "$.extend", function( assert ) {
  var orig = {}, test = {count: 3};
  $.extend(orig,test);
  assert.equal(orig.count, 3, "$.extend" );
});

QUnit.test( "$.isArray", function( assert ) {
  assert.equal($.isArray(true), false, "$.isArray boolean" );
  assert.equal($.isArray(123), false, "$.isArray number" );
  assert.equal($.isArray('foo'), false, "$.isArray string" );
  assert.equal($.isArray([1,2,3]), true, "$.isArray array" );
  assert.equal($.isArray(function(){}), false, "$.isArray function" );
});

QUnit.test( "$.isFunction", function( assert ) {
  assert.equal($.isFunction(true), false, "$.isFunction boolean" );
  assert.equal($.isFunction(123), false, "$.isFunction number" );
  assert.equal($.isFunction('foo'), false, "$.isFunction string" );
  assert.equal($.isFunction([1,2,3]), false, "$.isFunction array" );
  assert.equal($.isFunction(function(){}), true, "$.isFunction function" );
});

QUnit.test( "$.isNumeric", function( assert ) {
  assert.equal($.isNumeric(true), false, "$.isNumeric boolean" );
  assert.equal($.isNumeric(123), true, "$.isNumeric number" );
  assert.equal($.isNumeric('foo'), false, "$.isNumeric string" );
  assert.equal($.isNumeric([1,2,3]), false, "$.isNumeric array" );
  assert.equal($.isNumeric(function(){}), false, "$.isNumeric function" );
});

QUnit.test( "$.isString", function( assert ) {
  assert.equal($.isString(true), false, "$.isString boolean" );
  assert.equal($.isString(123), false, "$.isString number" );
  assert.equal($.isString('foo'), true, "$.isString string" );
  assert.equal($.isString([1,2,3]), false, "$.isString array" );
  assert.equal($.isString(function(){}), false, "$.isString function" );
});

QUnit.test( "$.matches", function( assert ) {
  var test = $('<div class="test">')[0], selector = ".test";
  assert.equal($.matches(test,selector), true, "$.matches" );
});

QUnit.test( "$.parseHTML", function( assert ) {
  assert.equal($.parseHTML('<a></a>')[0].outerHTML, '<a></a>' , "$.parseHTML" );
  assert.equal($.parseHTML('<a>')[0].outerHTML,'<a></a>', '$.parseHTML supports malformed single tags');

  assert.equal($.parseHTML('<tbody>')[0].outerHTML,'<tbody></tbody>', '$.parseHTML supports simple <tbody>');
  assert.equal($.parseHTML('<thead>')[0].outerHTML,'<thead></thead>', '$.parseHTML supports simple <thead>');
  assert.equal($.parseHTML('<tfoot>')[0].outerHTML,'<tfoot></tfoot>', '$.parseHTML supports simple <tfoot>');
  assert.equal($.parseHTML('<tr>')[0].outerHTML,'<tr></tr>', '$.parseHTML supports simple <tr>');
  assert.equal($.parseHTML('<td>')[0].outerHTML,'<td></td>', '$.parseHTML supports simple <td>');
  assert.equal($.parseHTML('<th>')[0].outerHTML,'<th></th>', '$.parseHTML supports simple <th>');

  assert.equal($.parseHTML('<tbody><tr></tr></tbody>')[0].outerHTML,'<tbody><tr></tr></tbody>', '$.parseHTML supports advanced <tbody>');
  assert.equal($.parseHTML('<thead><tr></tr></thead>')[0].outerHTML,'<thead><tr></tr></thead>', '$.parseHTML supports advanced <thead>');
  assert.equal($.parseHTML('<tfoot><tr></tr></tfoot>')[0].outerHTML,'<tfoot><tr></tr></tfoot>', '$.parseHTML supports advanced <tfoot>');
  assert.equal($.parseHTML('<tr><td></td></tr>')[0].outerHTML,'<tr><td></td></tr>', '$.parseHTML supports advanced <tr>');
  assert.equal($.parseHTML('<td><p></p></td>')[0].outerHTML,'<td><p></p></td>', '$.parseHTML supports advanced <td>');
  assert.equal($.parseHTML('<th><p></p></th>')[0].outerHTML,'<th><p></p></th>', '$.parseHTML supports advanced <th>');

  var span = $('<span>CONTENT</span>');
  $('<div></div>');
  assert.equal(span.html(),'CONTENT', '$.parseHTML doesn\'t overwrite the content');
});

QUnit.test( "$.prefixedProp", function( assert ) {
  assert.equal($.prefixedProp( 'foo-bar' ), undefined, "$.prefixedProp returns undefined" );
  assert.equal($.prefixedProp( '--foo-bar' ), '--foo-bar', "$.prefixedProp works with css variables" );
  assert.equal($.prefixedProp( 'width' ), 'width', "$.prefixedProp works with basic css properties" );
});

QUnit.test( "$.unique", function( assert ) {
  var test = [ $("#id-fixture")[0],  $("#id-fixture")[0] ];
  assert.equal($.unique( test ).length, 1, "$.unique" );
});
