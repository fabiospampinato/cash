Cash
====

An absurdly small jQuery alternative for modern browsers

## Usage

Add cash to your project via the jsDelivr CDN:

```html
<script type="text/javascript" src="//cdn.jsdelivr.net/cash/0.0.3/cash.min.js"></script>
```

### What is Cash?

Cash is a small library for modern browsers that provides jQuery style syntax
to wrap modern Vanilla JS features. It allows developers to use the jQuery
syntax they already know, and utilizes modern browser features to minimize the
codebase. 100% feature parity with jQuery isn't a goal, but cash comes helpfully
close, covering most day to day use cases.

## Documentation

### $()

This is the main selector method for cash. It returns an actionable collection
of nodes.

```js
$(selector,[context]) // => collection
$(collection) // => self
$(DOM elements) // => collection
$(HTML) // => collection
```

### $.each

Iterates through a collection and calls the callback method on each.

```js
$.each(collection, callback) // => collection
```

### $.extend

Extends target object with properties from the source object.

```js
$.extend(target,source) // => object
```

### $.matches

Checks a selector against an element, returning a boolean value for match.

```js
$.matches(element, selector) // => boolean
```

### $.parseHTML

Returns a collection from an HTML string.

```js
$.parseHTML(htmlString) // => Collection
```

### $.fn

The main prototype. Adding properties and methods will add it to all collections

```js
$.fn // => cash.prototype
```

### $.fn.add

Returns a new collection with the element added to the end, will accept any
amount of arguments and add them all in sequence.

```js
$(element).add(element) // => collection
$(element).add(selector) // => collection
```

### $.fn.addClass

Adds the className argument to collection elements.

```js
$(element).addClass(className) // => collection
```

### $.fn.append

Appends the target element to the first element in the collection.

```js
$(element).append(element) // => collection
```

### $.fn.appendTo

Adds the first element in a collection to the target element.

```js
$(element).appendTo(element) // => collection
```

### $.fn.attr

Without attrValue, returns the attribute value of the first element in the
collection. With attrValue, sets the attribute value of each element of the
collection.

```js
$(element).attr(attrName) // => AttributeValue
$(element).attr(attrName, attrValue) // => collection
```

### $.fn.children

Without a selector specified, returns a collection of child elements. With a
selector, returns child elements that match the selector.

```js
$(element).children() // => collection
$(element).children(selector) // => collection
```

### $.fn.closest

Returns the closest matching selector up the DOM tree.

```js
$(element).closest() // => collection
$(element).closest(selector) // => collection
```

### $.fn.clone

Returns a clone of the collection.

```js
$(element).clone() // => collection
```

### $.fn.css

Returns a CSS property value when just property is supplied. Sets a CSS property
when property and value are supplied, and set multiple properties when an object
is supplied.

```js
$(element).css(property) // => value
$(element).css(property, value) // => collection
$(element).css(object) // => collection
```

### $.fn.data

Returns data attribute value when key is supplied. Sets data attribute value
when both key and value are supplied.

```js
$(element).data(key) // => value
$(element).data(key, value) // => collection
```

### $.fn.each

Iterates over a collection with callback(value, index, array).

```js
$(element).each(callback) // => collection
```

### $.fn.empty

Empties an elements interior markup.

```js
$(element).empty() // => collection
```

### $.fn.eq

Returns a collection with the element at index.

```js
$(element).eq(index) // => collection
```

### $.fn.filter

Returns the collection that results from applying the filter method.

```js
$(element).filter(function) // => collection
```

### $.fn.find

Returns selector match descendants from the first element in the collection.

```js
$(element).find(selector) // => collection
```

### $.fn.first

Returns the first element in the collection.

```js
$(element).first() // => collection
```

### $.fn.get

Returns the element at the index.

```js
$(element).get(index) // => domNode
```

### $.fn.has

Returns boolean result of the selector argument against the collection.

```js
$(element).has(selector) // => boolean
```

### $.fn.hasClass

Returns the boolean result of checking if the first element in the collection
has the className attribute.

```js
$(element).hasClass(className) // => boolean
```

### $.fn.height

Returns the height of the element.

```js
$(element).height() // => Integer
```

### $.fn.html

Returns the HTML text of the first element in the collection, sets the HTML if
provided.

```js
$(element).html() // => HTML Text
$(element).html(HTML) // => HTML Text
```

### $.fn.index

Returns the index of the element in its parent if an element or selector isn't
provided. Returns index within element or selector if it is.

```js
$(element).index() // => Integer
$(element).index(element) // => Integer
```

### $.fn.innerHeight

Returns the height of the element + padding.

```js
$(element).innerHeight() // => Integer
```

### $.fn.innerWidth

Returns the width of the element + padding.

```js
$(element).innerWidth() // => Integer
```

### $.fn.insertAfter

Inserts collection after specified element.

```js
$(element).insertAfter(element) // => collection
```

### $.fn.insertBefore

Inserts collection before specified element.

```js
$(element).insertBefore(element) // => collection
```

### $.fn.is

Returns whether the provided selector matches the first element in the collection.

```js
$(element).is(selector) // => boolean
```

### $.fn.last

Returns last element in the collection.

```js
$(element).last() // => collection
```

### $.fn.next

Returns next sibling.

```js
$(element).next() // => collection
```

### $.fn.not

Filters collection by false match on selector.

```js
$(element).not(selector) // => collection
```

### $.fn.off

Removes event listener from collection elments.

```js
$(element).off(eventName,eventHandler) // => collection
```

### $.fn.on

Adds event listener to collection elments. Event is delegated if delegate is
supplied.

```js
$(element).on(eventName, eventHandler) // => collection
$(element).on(eventName, delegate, eventHandler) // => collection
```

### $.fn.outerHeight

Returns the outer height of the element. Includes margins if margin is set to true.

```js
$(element).outerHeight() // => Integer
$(element).outerHeight(includeMargin) // => Integer
```

### $.fn.outerWidth

Returns the outer width of the element. Includes margins if margin is set to true.

```js
$(element).outerWidth() // => Integer
$(element).outerWidth(includeMargin) // => Integer
```

### $.fn.parent

Returns parent element.

```js
$(element).parent() // => collection
```

### $.fn.parents

Returns collection of elements who are parents of element. Optionally filtering by selector.

```js
$(element).parents() // => collection
$(element).parents(selector) // => collection
```

### $.fn.prepend

Prepends element to the first element in collection.

```js
$(element).prepend(element) // => collection
```

### $.fn.prependTo

Prepends first element in collection to the element.

```js
$(element).prependTo(element) // => collection
```

### $.fn.prev

Returns the previous adjacent element.

```js
$(element).prev() // => collection
```

### $.fn.prepend

Prepends element to the first element in collection.

```js
$(element).prepend(element) // => collection
```

### $.fn.prop

Returns property value.

```js
$(element).prop(property) // => Property value
```

### $.fn.ready

Calls callback method on DOMContentLoaded.

```js
$(document).ready(callback) // => collection/span
```

### $.fn.remove

Removes collection elements from the DOM.

```js
$(element).remove() // => collection
```

### $.fn.removeAttr

Removes attribute from collection elements.

```js
$(element).removeAttr(attrName) // => collection
```

### $.fn.removeClass

Removes className from collection elements. Accepts space-separated classNames for removing multiple classes.

```js
$(element).removeClass(className) // => collection
```

### $.fn.removeData

Removes data attribute from collection elements.

```js
$(element).removeData(name) // => collection
```

### $.fn.serialize

When called on a form, serializes and returns form data.

```js
$(form).serialize() // => String
```

### $.fn.siblings

Returns a collection of sibling elements.

```js
$(element).siblings() // => collection
```

### $.fn.text

Returns the inner text of the first element in the collection, sets the text if
textContent is provided.

```js
$(element).text() // => text
$(element).text(textContent) // => collection
```

### $.fn.trigger

Triggers supplied event on elements in collection.

```js
$(element).trigger(eventName) // => collection
```

### $.fn.val

Returns an inputs value. If value is supplied, sets all inputs in collection's
value to the value argument.

```js
$(input).val() // => value
$(input).val(value) // => collection
```

### $.fn.width

Returns the width of the element.

```js
$(element).width() // => number
```
