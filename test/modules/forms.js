
var fixture = '\
  <form class="form">\
    <input type="hidden" value="5" name="hidden"/>\
    <input type="text" value="text with spaces" name="text"/>\
    <input type="text" value="disabled" name="disabled-check" disabled />\
    <input type="checkbox" value="yes" checked="checked" name="checkbox-yes" />\
    <input type="checkbox" value="no" name="checkbox-no" />\
    <input type="checkbox" value="1" name="checkbox-multi" />\
    <input type="checkbox" value="2" name="checkbox-multi" />\
    <input type="radio" value="yes" checked="checked" name="radio" />\
    <input type="radio" value="no" name="radio" />\
    <select name="select">\
      <option value="not-selected">Not Selected</option>\
      <option value="selected" selected>Selected</option>\
    </select>\
    <select name="select-multiple" multiple>\
      <option value="option-1" selected>Selected</option>\
      <option value="option-2" selected>Selected</option>\
    </select>\
    <input type="file" name="file" />\
    <input type="file" name="file-multiple" multiple />\
    <input type="submit" value="submit" name="submit" />\
  </form>\
';

describe ( 'Forms', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.serialize', function ( it ) {

    it ( 'serializes a form', function ( t ) {

      var val = $('.form').serialize ();

      t.is ( val, 'hidden=5&text=text%20with%20spaces&checkbox-yes=yes&radio=yes&select=selected&select-multiple=option-1&select-multiple=option-2' );

    });

    it ( 'serializes an element', function ( t ) {

      var val = $('.form input[type=text]').serialize ();

      t.is ( val, 'text=text%20with%20spaces' );

    });

    it ( 'serializes multiple form elements', function ( t ) {

      var val = $('.form input, .form textarea, .form select').serialize ();

      t.is ( val, 'hidden=5&text=text%20with%20spaces&checkbox-yes=yes&radio=yes&select=selected&select-multiple=option-1&select-multiple=option-2' );

    });

    it ( 'normalizes newlines', function ( t ) {

      const ele = $('<textarea name="T3" rows="2" cols="15">?\nZ</textarea>');

      t.is ( ele.serialize (), 'T3=%3F%0D%0AZ' );

    });

  });

  describe ( '$.fn.val', function ( it ) {

    it ( 'gets the value of input', function ( t ) {

      var val = $('.form input[type=text]').val ();

      t.is ( val, 'text with spaces' );

    });

    it ( 'gets the value of input file multiple', function ( t ) {

      var val = $('.form input[type=file][multiple]').val ();

      t.is ( val, '' );

    });

    it ( 'gets the value of select', function ( t ) {

      var val = $('select[name=select]').val ();

      t.is ( val, 'selected' );

    });

    it ( 'gets the value of select multiple', function ( t ) {

      var val = $('select[name=select-multiple]').val ();

      t.deepEqual ( val, ['option-1', 'option-2'] );

    });

    it ( 'sets the value of input', function ( t ) {

      $('.form input[type=text]').val ( 0 );

      var val = $('.form input[type=text]').val ();

      t.is ( val, '0' );

    });

    it ( 'sets the value of select', function ( t ) {

      $('select[name=select]').val ( 'not-selected' );

      var val = $('select[name=select]').val ();

      t.is ( val, 'not-selected' );

    });

    it ( 'sets the value of select multiple', function ( t ) {

      $('select[name=select-multiple]').val ([ 'option-1' ]);

      var val = $('select[name=select-multiple]').val ();

      t.deepEqual ( val, ['option-1'] );

      $('select[name=select-multiple]').val ([ 'option-1', 'option-2' ]);

      var val = $('select[name=select-multiple]').val ();

      t.deepEqual ( val, ['option-1', 'option-2'] );

    });

    it ( 'sets the value of checkboxes', function ( t ) {

      var eles = $('input[name="checkbox-multi"]');

      eles.val ( 2 );

      t.is ( eles.serialize (), 'checkbox-multi=2' );

      eles.val ([ 1, '2' ]);

      t.is ( eles.serialize (), 'checkbox-multi=1&checkbox-multi=2' );

    });

    it ( 'sets the value of radios', function ( t ) {

      var eles = $('input[name="radio"]');

      eles.val ( 'yes' );

      t.is ( eles.serialize (), 'radio=yes' );

      eles.val ([ 'yes', 'no' ]);

      t.is ( eles.serialize (), 'radio=no' );

    });

    it ( 'supports setting the value of input to null', function ( t ) {

      $('.form input[type=text]').val ( null );

      var val = $('.form input[type=text]').val ();

      t.is ( val, '' );

    });

    it ( 'supports setting the value of select to null', function ( t ) {

      $('select[name=select]').val ( null );

      var val = $('select[name=select]').val ();

      t.true ( val === '' || val === 'selected' ); // This seems a bit browser-dependant, some set it to '', some auto-select the latest selected option instead

    });

    it ( 'supports setting the value of select multiple to null', function ( t ) {

      $('select[name=select-multiple]').val ( null );

      var val = $('select[name=select-multiple]').val ();

      t.deepEqual ( val, [] );

    });

  });

});
