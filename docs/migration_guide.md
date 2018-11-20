
# Migration Guide

While we don't implement everything that jQuery provides, everything what we do implement should be compatible with jQuery.

However there are some minor differences that you should be aware about when migrating to Cash.

## Differences

### Binary CSS operators

Some CSS operators are binary, they operate on something before and after them: `>`, `~`, `+`. jQuery allows you to use them at the beginning of your selectors inside `$.fn.find`.

Cash only supports selectors the browser recognizes as valid, so you can't use `> .bar` like you sometimes can with jQuery.

```javascript
// jQuery
$('#foo').find ( '> .bar' );
$('#foo').find ( '~ .bar' );
$('#foo').find ( '+ .bar' );
// Cash
$('#foo').children ( '.bar' );
$('#foo').nextAll ( '.bar' );
$('#foo').next ( '.bar' );
```

### Events

Cash's event system relies heavily on the browser's underlying event system so there are some differences when comparing it with jQuery's.

Custom jQuery-provided methods are not available.

```javascript
// jQuery
event.isDefaultPrevented ();
event.isPropagationStopped ();
event.isImmediatePropagationStopped ();
event.originalEvent;
// Cash
event.defaultPrevented;
event.cancelBubble;
// No way of knowing if `stopImmediatePropagation` was called
event;
```

When using event delegation calling `event.stopPropagation` or returning `false` stops the propagation from the target element, not the delegate element.

There's no perfect workaround for this unfortunately, but in most practical cases you could call `event.stopImmediatePropagation` instead.

```javascript
// jQuery
$('#foo').on ( 'click', '.bar', event => false ); // First function called
$('#foo').on ( 'click', '.bar', event => {} ); // Second function called
$('#foo').on ( 'click', event => {} ); // Function never called
$('.bar').trigger ( 'click' );
// Cash
$('#foo').on ( 'click', '.bar', event => false ); // First function called
$('#foo').on ( 'click', '.bar', event => {} ); // Second function called
$('#foo').on ( 'click', event => {} ); // Third function called
$('.bar').trigger ( 'click' );
// Cash with `stopImmediatePropagation`
$('#foo').on ( 'click', '.bar', event => { // First function called
  event.stopImmediatePropagation ();
});
$('#foo').on ( 'click', '.bar', event => {} ); // Function never called
$('#foo').on ( 'click', event => {} ); // Function never called
$('.bar').trigger ( 'click' );
```

### Width/height of hidden element

If you're trying to retrieve the width/height of an hidden element jQuery will briefly try to render it in order to compute it's dimension, this is unreliable and should be avoided, Cash doesn't implement such functionality.

If you need this anyway you'll have to show/hide the element on your own.

```javascript
// jQuery
$('#foo').width ();
// Cash
$('#foo').show ();
$('#foo').width ();
$('#foo').hide ();
```

### Negative width/height

Negative width/height get automatically converted to `0` by jQuery, both when setting them via `$.fn.width|height` and `$.fn.css`.

We discourage you from setting a negative width/height, if you want this to work like jQuery you'll have to convert negative values to `0` on your own.

```javascript
// jQuery
$('#foo').width ( myWidth );
$('#foo').css ( width, myWidth );
$('#foo').css ({ width: myWidth });
// Cash
myWidth = Math.max ( 0, parseFloat ( myWidth ) );
$('#foo').width ( myWidth );
$('#foo').css ( width, myWidth );
$('#foo').css ({ width: myWidth });
```

### Parsing `<script>` tags

Cash can parse `<script>` tags, but when you attach them to the DOM their code don't get executed.

This is a tricky thing to do as you may also attach tags like: `<script src="/foo.js" >` which require the actual code to be fetched.

If you need basic support (no support for iframes, files to fetch etc.) for this you could use the following `eval` plugin:

```javascript
$.fn.eval = function () {
  const selector = 'script:not([type]), script[type$="ecmascript"], script[type$="javascript"]';
  const nodes = this.filter ( selector ).add ( this.find ( selector ) );
  nodes.map ( function () {
    const script = this.textContent.replace ( /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, '' );
    if ( script ) eval ( script );
  });
  return this;
};

$(document).append ( myHTML ).eval ();
```

### Relative CSS values

jQuery supports relative CSS values.

```javascript
$('#foo').css ( 'padding-left', '+=10' );
```

This is not supported in Cash.

### Function that returns a value

In many places jQuery can accept a `function` instead of the actual value.

```javascript
$('#foo').attr ( 'bar', () => Math.random () );
```

This is not supported in Cash.

## Contributing

Did you find another difference between jQuery and Cash during your migration? Please add that to this page so that future migrations will be smoother for others.
