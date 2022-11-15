
# Migration Guide

While Cash doesn't implement every feature that jQuery provides, everything that it implements should be compatible with jQuery, but there are some minor differences to be aware of and they are listed in this document.

## Attributes

### Booleans

Boolean attributes are: `checked`, `selected`, `async`, `autofocus`, `autoplay`, `controls`, `defer`, `disabled`, `hidden`, `ismap`, `loop`, `multiple`, `open`, `readonly`, `required`, `scoped`.

jQuery handles boolean attributes specially, potentially setting a different value than the one you passed it and updating the corresponding properties as well.

Cash just handles them like any other attribute instead.

## CSS

### Relative values

jQuery supports relative CSS values.

```javascript
$('#foo').css ( 'padding-left', '+=10' );
```

Cash doesn't support this.

## Data

### Caching

jQuery's `$.fn.data` function caches retrieved values, and doesn't refresh them when they are updated outside of jQuery (e.g. via the `dataset` API), this makes jQuery's `$.fn.data` function unusable with libraries like React.

Cash doesn't implement such caching functionality and doesn't have this problem, the retrieved values are always fresh.

Also values set via Cash's `$.fn.data` function are stored as JSON values in `data-*` attributes set on the DOM nodes, so for instance calling `$('#foo').data ( 'test', 123 )` will add the `data-test="123"` attribute to the `#foo` node, as a concequence of this values that are not JSON-serializable are not supported.

### Plain objects

jQuery supports handling data on plain objects.

```javascript
$({}).data ( 'foo', 123 );
```

Cash doesn't support this.

## Dimensions

### Hidden elements

If you're trying to retrieve the width/height of an hidden element jQuery will briefly try to render it in order to compute it's dimension, this is unreliable and should be avoided.

Cash doesn't implement such functionality.

If you need this anyway you'll have to show/hide the element on your own:

```javascript
// jQuery
$('#foo').width ();
// Cash
$('#foo').show ();
$('#foo').width ();
$('#foo').hide ();
```

### Negative dimension

A negative width/height gets automatically converted to `0` by jQuery, both when setting it via `$.fn.width|height` or `$.fn.css`.

Cash discourages you from setting a negative width/height, if you want this to work like jQuery you'll have to convert negative values to `0` on your own:

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

### Transformed element

jQuery ignores any `transform` applied to the element when computing its dimensions.

Cash doesn't.

You may try reading untransformed dimensions with the `$.fn.css` method instead.

## Events

Cash's event system relies heavily on the browser's underlying event system so there are some differences when comparing it with jQuery's.

### Custom methods

jQuery provides some custom event methods.

```javascript
event.isDefaultPrevented ();
event.isPropagationStopped ();
event.isImmediatePropagationStopped ();
event.originalEvent;
```

Cash doesn't provide them, as it simply passes along the raw event object instead.

```javascript
event.defaultPrevented;
event.cancelBubble;
// No way of knowing if `stopImmediatePropagation` was called
event;
```

### Stopping propagation from a delegated event handler

In Cash when using event delegation calling `event.stopPropagation` or returning `false` stops the propagation from the target element, not the delegate element.

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
// Cash + "stopImmediatePropagation"
$('#foo').on ( 'click', '.bar', event => { // First function called
  event.stopImmediatePropagation ();
});
$('#foo').on ( 'click', '.bar', event => {} ); // Function never called
$('#foo').on ( 'click', event => {} ); // Function never called
$('.bar').trigger ( 'click' );
```

### Trigger data

jQuery supports passing multiple data arguments to your event handlers by providing an array of data arguments to `$.fn.trigger`.

Cash doesn't support this, whatever you provide as a data argument will be passed through as is, even if it's an array.

### Plain objects

jQuery supports handling events on plain objects.

```javascript
$({}).on ( 'foo', () => {} );
```

Cash doesn't support this.

## Manipulation

### Inserting plain text

jQuery supports inserting plain text using different methods (`$.fn.after`, `$.fn.append` etc.).

```javascript
$('.foo').append ( 'something' );
```

Cash doesn't support that because it instead supports receiving a selector as an argument, and that can be ambigous when also supporting plain text.

```javascript
$('.foo').append ( '.foo' ); // Is that a target or do we actually wanto to append ".foo"?
```

In Cash you should generally wrap your plain texts in a `<span>` element, or create a `textNode` node manually.

```javascript
$('.foo').append ( '<span>something</span>' );
$('.foo').append ( document.createTextNode ( 'something' ) );
```

## Parsing

### Malformed HTML

jQuery smooths over many details and attempts to correctly parse malformed HTML.

```javascript
$('<div/><hr/><code/><b/>').length // => 4
```

Cash on the other hand for the most part just lets the browser handle your HTML directly, so it behaves more strictly and you should be more careful about the HTML strings you're passing to it.

```javascript
$('<div/><hr/><code/><b/>').length // => 1
```

## Selectors

### Custom selectors

jQuery implements many custom selectors, like `:hidden`.

Cash only supports selectors the browser recognizes as valid, everything else will throw an error.

### Binary operators

Some CSS operators are binary, they operate on something before and after them: `>`, `~`, `+`.

jQuery allows you to use them at the beginning of your selectors inside `$.fn.find`, in a unary fashion.

Cash only supports selectors the browser recognizes as valid, so you can't just use `> .bar` like you sometimes can with jQuery.

If you only target modern browsers you could use the [`:scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) CSS pseudo-class.

```javascript
// jQuery
$('#foo').find ( '> .bar' );
$('#foo').find ( '~ .bar' );
$('#foo').find ( '+ .bar' );
// Cash
$('#foo').children ( '.bar' );
$('#foo').nextAll ( '.bar' );
$('#foo').next ( '.bar' );
// Cash + ":scope"
$('#foo').find ( ':scope > .bar' );
$('#foo').find ( ':scope ~ .bar' );
$('#foo').find ( ':scope + .bar' );
```

## Utilities

### Unique

jQuery's `$.unique` function only works with DOM nodes.

Cash's `$.unique` function works with any kind of value.

## Others

Other general differences to be aware of.

### Disconnected nodes, iframes and SVGs

jQuery handles specially disconnected nodes, iframes and SVGs, smoothing over many rough corners and just making their APIs "work".

Cash doesn't smooth over as many rough corners (yet?), so you should test more carefully the portions of your code that deal with those kind of objects.

### Function that returns a value

jQuery accepts in many methods a function that returns a value, other than just the value itself.

```javascript
$('#foo').attr ( 'bar', () => Math.random () );
```

Cash doesn't support this.

### Sort order

Elements inside Cash and jQuery collections may be sorted differently.

## Contributing

Did you find another difference between jQuery and Cash during your migration? Please add that to this page so that future migrations will be smoother for others.
