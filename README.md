# cash

http://kenwheeler.github.io/cash

## An absurdly small jQuery alternative for modern browsers

Add cash to your project via the jsDelivr CDN:

    <script type="text/javascript" src="//cdn.jsdelivr.net/cash/0.0.2/cash.min.js"></script>

### what is cash?

cash is a small library for modern browsers that provides jQuery style syntax to wrap modern Vanilla JS features.

It allows developers to use the jQuery syntax they already know, and utilizes modern browser features to minimize the codebase.

100% feature parity with jQuery isn't a goal, but cash comes helpfully close, covering most day to day use cases.

## documentation
### $()


    $(selector,[context])  => collection
    $(collection)  => self
    $(DOM elements)  => collection
    $(HTML)  => collection

This is the main selector method for cash. It returns an actionable collection of nodes.

### $.ajax


    $.ajax(options)
    

Initiates an AJAX request with the given options and triggers the appropriate callback.

#####Options

* type : String- ie: 'POST', 'GET'
* url : String- The target url
* data - Serialized data or object
* success(response) : Function- Success callback
* error : Function Error callback

### $.each
            

    $.each(collection, callback)  => collection
        

Iterates through a collection and calls the callback method on each.

### $.extend

    $.extend(target,source)  => object

Extends target object with properties from the source object.

### $.matches

    $.matches(element, selector)  => boolean

Checks a selector against an element, returning a boolean value for match.

### $.parseHTML

    $.parseHTML(htmlString)  => collection

Returns a collection from an HTML string.

### $.fn

    $.fn  => cash.prototype

The main prototype. Adding properties and methods will add it to all collections


### add



    add(element)  => collection
    add(selector)  => collection


Returns a new collection with the element added to the end, will accept any amount of arguments and add them all in sequence.


### addClass

            
          
    addClass(className)  => collection
        

Adds the className argument to collection elements.

### append

    append(element)  => collection

Appends the target element to the first element in the collection.

### appendTo

    appendTo(element)  => collection
        

Adds the first element in a collection to the target element.

### attr

            
          
    attr(attrName)  => AttributeValue
    attr(attrName, attrValue)  => collection
        

Without attrValue, returns the attribute value of the first              element in the collection. With attrValue, sets the attribute              value of each element of the collection.

### children

            
          
    children()  => collection
    children(selector)  => collection
        

Without a selector specified, returns a collection of child elements
          . With a selector, returns child elements that match the selector.


### closest

            
          
    closest()  => collection
    closest(selector)  => collection
        

Returns the closest matching selector up the DOM tree.

### clone

            
          
    clone()  => collection
        

Returns a clone of the collection.

### css

            
          
    css(property)  => value
    css(property,value)  => collection
    css(object)  => collection
        

Returns a CSS property value when just property is supplied.
          Sets a CSS property when property and value are supplied, and              set multiple properties when an object is supplied.

### data

            
          
    data(key)  => value
    data(key,value)  => collection
        

Returns data attribute value when key is supplied. Sets data attribute
          value when both key and value are supplied.

### each

            
          
    each(callback)  => collection
        

Iterates over a collection with callback(value, index, array).

### empty

            
          
    empty()  => collection
        

Empties an elements interior markup.

### eq

            
          
    eq(index)  => collection
        

Returns a collection with the element at index.

### filter

            
          
    filter(function)  => collection
        

Returns the collection that results from applying the filter method.

### find

            
          
    find(selector)  => collection
        

Returns selector match descendants from the first element in the collection.

### first

            
          
    first()  => collection
        

Returns the first element in the collection.

### get

            
          
    get(index)  => domNode
        

Returns the element at the index.

### has

            
          
    has(selector)  => boolean
        

Returns boolean result of the selector argument against the collection.

### hasClass

            
          
    hasClass(className)  => boolean
        

Returns the boolean result of checking if the first element in
          the collection has the className attribute.

### height



    height()  => Integer


Returns the height of the element.

### html

            
          
    html()  => HTML Text
    html(HTML)  => HTML Text
        

Returns the HTML text of the first element in the collection,
          sets the HTML if provided.

### index

            
          
    index()  => Integer
    index(element)  => Integer
        

Returns the index of the element in its parent if an element or              selector isn't provided. Returns index within element or selector              if it is.

### innerHeight



    innerHeight()  => Integer


Returns the height of the element + padding.

### innerWidth



    innerWidth()  => Integer


Returns the width of the element + padding.

### insertAfter

            
          
    insertAfter(element)  => collection
        

Inserts collection after specified element.

### insertBefore

            
          
    insertBefore(element)  => collection
        

Inserts collection before specified element.

### last

            
          
    last()  => collection
        

Returns last element in the collection.

### next

            
          
    next()  => collection
        

Returns next sibling.

### not

            
          
    not(selector)  => collection
        

Filters collection by false match on selector.

### off

            
          
    off(eventName,eventHandler)  => collection
        

Removes event listener from collection elments.

### on

            
          
    on(eventName,eventHandler)  => collection
    on(eventName, delegate, eventHandler)  => collection
        

Adds event listener to collection elments. Event is delegated if
          delegate is supplied.

### outerHeight


    outerHeight()  => Integer
    outerHeight(includeMargin)  => Integer


Returns the outer height of the element. Includes margins if margin is set to true.

### outerWidth


    outerWidth()  => Integer
    outerWidth(includeMargin)  => Integer


Returns the outer width of the element. Includes margins if margin is set to true.

### parent

            
          
    parent()  => collection
        

Returns parent element.

### parents

            
          
    parents()  => collection
    parents(selector)  => collection
        

Returns collection of elements who are parents of element. Optionally filtering by selector.

### prepend

            
          
    prepend(element)  => collection
        

Prepends element to the first element in collection.

### prependTo

            
          
    prependTo(element)  => collection
        

Prepends first element in collection to the element.

### prev

            
          
    prev()  => collection
        

Returns the previous adjacent element.

### prepend

            
          
    prepend(element)  => collection
        

Prepends element to the first element in collection.

### prop

            
          
    prop(property)  => Property value
        

Returns property value.

### ready

            
          
    ready(callback)  => collection/span>
        

Calls callback method on DOMContentLoaded.

### remove

            
          
    remove()  => collection
        

Removes collection elements from the DOM.

### removeAttr

            
          
    removeAttr(attrName)  => collection
        

Removes attribute from collection elements.

### removeClass

            
          
    removeClass(className)  => collection
        

Removes className from collection elements. Accepts space-separated classNames for removing multiple classes.

### removeData

            
          
    removeData(name)  => collection
        

Removes data attribute from collection elements.

### serialize

    serialize()  => String
        

When called on a form, serializes and returns form data.

### siblings

            
          
    siblings()  => collection
        

Returns a collection of sibling elements.

### text

            
              
    text()  => text
    text(textContent)  => collection
        

Returns the inner text of the first element in the collection,
          sets the text if textContent is provided.

### trigger



    trigger(eventName)  => collection

Triggers supplied event on elements in collection.

### val

            
          
    val()  => value
    val(value)  => collection
        

Returns an inputs value. If value is supplied, sets all inputs
          in collection's value to the value argument.

### width


    width()  => Integer


Returns the width of the element.
