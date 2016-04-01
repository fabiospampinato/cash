#Cash
*An absurdly small jQuery alternative for modern browsers*

Cash is a small library for modern browsers that provides jQuery style syntax
to wrap modern Vanilla JS features. It allows developers to use the jQuery
syntax they already know, and utilizes modern browser features to minimize the
codebase. 100% feature parity with jQuery isn't a goal, but cash comes helpfully
close, covering most day to day use cases.

---

## Usage

Add cash to your project via the jsDelivr CDN, and use cash to manipulate the DOM!

```html
<script src="https://cdn.jsdelivr.net/cash/1.0.0/cash.min.js"></script>
<script>
$(function(){

  $('html').addClass('dom-loaded');

  $('<footer>Appended with cash</footer>').appendTo(document.body);

});
</script>
```

---

## Documentation

#### $()

This is the main selector method for cash. It returns an actionable collection
of nodes. If a function is provided, the function will be run once the DOM is ready.

```js
$(selector,[context]) // => collection
$(node) // => collection
$(nodeList) // => collection
$(htmlString) // => collection
$(collection) // => self
$(function) // => document ready callback
```

----

## Collection Methods

#### $.fn

The main prototype. Adding properties and methods will add it to all collections.

```js
$.fn // => cash.prototype
```

#### $.fn.add()

Returns a new collection with the element(s) added to the end.

```js
$(element).add(element) // => collection
$(element).add(selector) // => collection
$(element).add(collection) // => collection
```

#### $.fn.addClass()

Adds the className argument to collection elements.

```js
$(element).addClass(className) // => collection
```

#### $.fn.after()

Inserts content or elements after the collection.

```js
$(element).after(element) // => collection
$(element).after(htmlString) // => collection
```

#### $.fn.append()

Appends the target element to the each element in the collection.

```js
$(element).append(element) // => collection
```

#### $.fn.appendTo()

Adds the elements in a collection to the target element(s).

```js
$(element).appendTo(element) // => collection
```

#### $.fn.attr()

Without attrValue, returns the attribute value of the first element in the
collection. With attrValue, sets the attribute value of each element of the
collection.

```js
$(element).attr(attrName) // => AttributeValue
$(element).attr(attrName, attrValue) // => collection
```

#### $.fn.before()

Inserts content or elements before the collection.

```js
$(element).before(element) // => collection
$(element).before(htmlString) // => collection
```

#### $.fn.children()

Without a selector specified, returns a collection of child elements. With a
selector, returns child elements that match the selector.

```js
$(element).children() // => collection
$(element).children(selector) // => collection
```

#### $.fn.closest()

Returns the closest matching selector up the DOM tree.

```js
$(element).closest() // => collection
$(element).closest(selector) // => collection
```

#### $.fn.clone()

Returns a clone of the collection.

```js
$(element).clone() // => collection
```

#### $.fn.css()

Returns a CSS property value when just property is supplied. Sets a CSS property
when property and value are supplied, and set multiple properties when an object
is supplied. Properties will be autoprefixed if needed for the user's browser.

```js
$(element).css(property) // => value
$(element).css(property, value) // => collection
$(element).css(object) // => collection
```

#### $.fn.data()

Link some data (string, object, array, etc.) to an element when both key and value are supplied.
If only a key is supplied, returns the linked data and falls back to data attribute value if no data is already linked.

```js
$(element).data(key) // => value
$(element).data(key, value) // => collection
```

#### $.fn.each()

Iterates over a collection with callback(value, index, array).

```js
$(element).each(callback) // => collection
```

#### $.fn.empty()

Empties an elements interior markup.

```js
$(element).empty() // => collection
```

#### $.fn.eq()

Returns a collection with the element at index.

```js
$(element).eq(index) // => collection
```

#### $.fn.extend()

Adds properties to the cash collection prototype.

```js
$.fn.extend(source) // => object
```

#### $.fn.filter()

Returns the collection that results from applying the filter method.

```js
$(element).filter(function) // => collection
```

#### $.fn.find()

Returns selector match descendants from the first element in the collection.

```js
$(element).find(selector) // => collection
```

#### $.fn.first()

Returns the first element in the collection.

```js
$(element).first() // => collection
```

#### $.fn.get()

Returns the element at the index.

```js
$(element).get(index) // => domNode
```

#### $.fn.has()

Returns boolean result of the selector argument against the collection.

```js
$(element).has(selector) // => boolean
```

#### $.fn.hasClass()

Returns the boolean result of checking if the first element in the collection
has the className attribute.

```js
$(element).hasClass(className) // => boolean
```

#### $.fn.height()

Returns the height of the element.

```js
$(element).height() // => Integer
```

#### $.fn.html()

Returns the HTML text of the first element in the collection, sets the HTML if
provided.

```js
$(element).html() // => HTML Text
$(element).html(HTML) // => HTML Text
```

#### $.fn.index()

Returns the index of the element in its parent if an element or selector isn't
provided. Returns index within element or selector if it is.

```js
$(element).index() // => Integer
$(element).index(element) // => Integer
```

#### $.fn.innerHeight()

Returns the height of the element + padding.

```js
$(element).innerHeight() // => Integer
```

#### $.fn.innerWidth()

Returns the width of the element + padding.

```js
$(element).innerWidth() // => Integer
```

#### $.fn.insertAfter()

Inserts collection after specified element.


```js
$(element).insertAfter(element) // => collection
```

#### $.fn.insertBefore()

Inserts collection before specified element.

```js
$(element).insertBefore(element) // => collection
```

#### $.fn.is()

Returns whether the provided selector, element or collection matches any element in the collection.

```js
$(element).is(selector) // => boolean
```

#### $.fn.last()

Returns last element in the collection.

```js
$(element).last() // => collection
```

#### $.fn.next()

Returns next sibling.

```js
$(element).next() // => collection
```

#### $.fn.not()

Filters collection by false match on selector.

```js
$(element).not(selector) // => collection
```

#### $.fn.off()

Removes event listener from collection elements.

```js
$(element).off(eventName,eventHandler) // => collection
```

#### $.fn.on()

Adds event listener to collection elements. Event is delegated if delegate is
supplied.

```js
$(element).on(eventName, eventHandler) // => collection
$(element).on(eventName, delegate, eventHandler) // => collection
```

#### $.fn.one()

Adds event listener to collection elements that only triggers once for each element.
Event is delegated if delegate is supplied.

```js
$(element).one(eventName, eventHandler) // => collection
$(element).one(eventName, delegate, eventHandler) // => collection
```

#### $.fn.outerHeight()

Returns the outer height of the element. Includes margins if margin is set to true.

```js
$(element).outerHeight() // => Integer
$(element).outerHeight(includeMargin) // => Integer
```

#### $.fn.outerWidth()

Returns the outer width of the element. Includes margins if margin is set to true.

```js
$(element).outerWidth() // => Integer
$(element).outerWidth(includeMargin) // => Integer
```

#### $.fn.parent()

Returns parent element.

```js
$(element).parent() // => collection
```

#### $.fn.parents()

Returns collection of elements who are parents of element. Optionally filtering by selector.

```js
$(element).parents() // => collection
$(element).parents(selector) // => collection
```

#### $.fn.prepend()

Prepends element to the each element in collection.

```js
$(element).prepend(element) // => collection
```

#### $.fn.prependTo()

Prepends elements in a collection to the target element(s).

```js
$(element).prependTo(element) // => collection
```

#### $.fn.prev()

Returns the previous adjacent element.

```js
$(element).prev() // => collection
```

#### $.fn.prop()

Returns property value.

```js
$(element).prop(property) // => Property value
```

#### $.fn.ready()

Calls callback method on DOMContentLoaded.

```js
$(document).ready(callback) // => collection/span
```

#### $.fn.remove()

Removes collection elements from the DOM.

```js
$(element).remove() // => collection
```

#### $.fn.removeAttr()

Removes attribute from collection elements.

```js
$(element).removeAttr(attrName) // => collection
```

#### $.fn.removeClass()

Removes className from collection elements. Accepts space-separated classNames
for removing multiple classes.

```js
$(element).removeClass(className) // => collection
```

#### $.fn.removeData()

Removes linked data and data-attributes from collection elements.

```js
$(element).removeData(name) // => collection
```

#### $.fn.serialize

When called on a form, serializes and returns form data.

```js
$(form).serialize() // => String
```

#### $.fn.siblings

Returns a collection of sibling elements.

```js
$(element).siblings() // => collection
```

#### $.fn.text

Returns the inner text of the first element in the collection, sets the text if
textContent is provided.

```js
$(element).text() // => text
$(element).text(textContent) // => collection
```

#### $.fn.toggleClass

Adds or removes className from collection elements based on if the element already has the class.
Accepts space-separated classNames for toggling multiple classes, and an optional `force` boolean
to ensure classes are added (`true`) or removed (`false`).

```js
$(element).toggleClass(className) // => collection
$(element).toggleClass(className,force) // => collection
```

#### $.fn.trigger

Triggers supplied event on elements in collection.

```js
$(element).trigger(eventName) // => collection
```

#### $.fn.val

Returns an inputs value. If value is supplied, sets all inputs in collection's
value to the value argument.

```js
$(input).val() // => value
$(input).val(value) // => collection
```

#### $.fn.width

Returns the width of the element.

```js
$(element).width() // => number
```

---

### Utilities

#### $.each()

Iterates through a collection and calls the callback method on each.

```js
$.each(collection, callback) // => collection
```

#### $.extend()

Extends target object with properties from the source object. If no target is provided,
cash itself will be extended.

```js
$.extend(target,source) // => object
```

#### $.matches()

Checks a selector against an element, returning a boolean value for match.

```js
$.matches(element, selector) // => boolean
```

#### $.parseHTML()

Returns a collection from an HTML string.

```js
$.parseHTML(htmlString) // => Collection
```

---

### Type Checking

#### $.isFunction()

Check if the argument is a function.

```js
var func = function(){};
$.isFunction(func) // => true
```

#### $.isString()

Check if the argument is a string.

```js
$.isString('hello') // => true
```

#### $.isArray()

Check if the argument is an array.

```js
$.isArray([1,2,3]) // => true
```


#### $.isNumeric(n)

Check if the argument is numeric.

```js
$.isNumeric(57) // => true
```
