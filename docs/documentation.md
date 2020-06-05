# Introduction
Cash gives you a query selector, [collection methods](#collection-methods) and some [library methods](#cash-methods). If you need more details about our API just check out [jQuery's](http://api.jquery.com), while we don't implement everything that jQuery provides, everything what we do implement should be compatible with jQuery. Cash can be extended with custom methods, read how [here](https://github.com/fabiospampinato/cash/blob/master/docs/extending_cash.md).

## Main Selector `$()`

This is the main selector method for Cash. It returns an actionable collection of nodes.

If a function is provided, the function will be run once the DOM is ready.

```js
$( selector [, element] ) // => collection, using `element` as the context
$( selector [, collection] ) // => collection, using `collection` as the context
$(node) // => collection
$(nodeList) // => collection
$(htmlString) // => collection
$(collection) // => self
$(function () {}) // => document ready callback
```


