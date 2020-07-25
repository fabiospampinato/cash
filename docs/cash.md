# Cash Methods
These methods are exported from the global `$` object, and are called like so:

```js
$.isArray ( arr ) // => boolean
```

Some [extra methods](https://github.com/fabiospampinato/cash/tree/master/src/extra) are available but [disabled](https://github.com/fabiospampinato/cash/blob/master/pacco.json#L3) by default.

| Type Checking                   | Utilities                     |
| ------------------------------- | ----------------------------- |
| [$.isArray ()](#isarray-)       | [$.guid](#guid)               |
| [$.isFunction ()](#isfunction-) | [$.each ()](#each-)           |
| [$.isNumeric ()](#isnumeric-)   | [$.extend ()](#extend-)       |
| [$.isWindow ()](#iswindow-)     | [$.parseHTML ()](#parsehtml-) |
|                                 | [$.unique ()](#unique-)       |

### $.guid

A unique number.

```js
$.guid++ // => number
```

### $.each ()

Iterates through an array and calls the `callback ( index, element )` method on each element. The callback function may exit iteration early by returning `false`.

```js
$.each ( array, callback ) // => array
```

### $.extend ()

Extends target object with properties from the source object.

```js
$.extend ( target, source ) // => object
```

### $.isArray ()

Check if the argument is an array.

```js
$.isArray ([ 1, 2, 3 ]) // => true
```

### $.isFunction ()

Check if the argument is a function.

```js
function fn () {};
$.isFunction ( fn ) // => true
```

### $.isNumeric ()

Check if the argument is numeric.

```js
$.isNumeric ( 57 ) // => true
```

### $.isWindow ()

Check if the argument is a Window object.

```js
$.isWindow ( window ) // => true
```

### $.parseHTML ()

Returns a collection from an HTML string.

```js
$.parseHTML ( htmlString ) // => collection
```

### $.unique ()

Returns a new array with duplicates removed.

```js
$.unique ( array ) // => array
```
