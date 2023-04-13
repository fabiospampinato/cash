### [v8.1.5](https://github.com/fabiospampinato/cash/releases/tag/8.1.5) (2023-04-13)

- Fixed support for using a selector as context
- $.hide: ensuring calling it multiple times sequentially works too

### [v8.1.4](https://github.com/fabiospampinato/cash/releases/tag/8.1.4) (2023-03-08)

- Updatd contribution guide
- Replaced Karma with Playwright, removing most dev dependencies, removing coverage reports, and adding support for Safari
- Updated dependencies
- Lowercased readme file
- Lowercased changelog file
- $.serialize: avoiding encoding "%20" as "+", for better alignment with jQuery

### [v8.1.3](https://github.com/fabiospampinato/cash/releases/tag/8.1.3) (2023-01-31)

- $.fn.text: ensuring it reads text from every node in the collection, not just the first one, for better alignment with jQuery

### [v8.1.2](https://github.com/fabiospampinato/cash/releases/tag/8.1.2) (2022-11-18)

- Migration guide: mentioning $.fn.css as a potential workaround for ignoring the effects of CSS transforms
- $.fn.html: ensuring script elements are executed, to better align with jQuery
- Switched to a new bundler, minipacco
- Deleted most development dependencies
- Simplified significantly partial compilation
- Ensuring selectors contains escaped dots are handled correctly

### [v8.1.1](https://github.com/fabiospampinato/cash/releases/tag/8.1.1) (2022-02-16)

- Ensuring the proper types for iteration are provided
- Ensuring $.fn.find works with document fragments too
- Ensuring the "delegateProperty" is attached to events
- More reliably using "getElementById", only if the context node actually supports it
- Ensuring that before inserting a node before/after the html node the html node is removed from the DOM

### [v8.1.0](https://github.com/fabiospampinato/cash/releases/tag/8.1.0) (2020-09-12)

- Added `$.isPlainObject`
- $.each: added support for iterating over objects
- $.extend: added support for extending deeply
- Readme: updated dimensions
- Updated changelog template

### [v8.0.0](https://github.com/fabiospampinato/cash/releases/tag/8.0.0) (2020-06-20)

- Improved alignment with jQuery regarding handling of non-bubbling events significantly

### [v7.0.4](https://github.com/fabiospampinato/cash/releases/tag/7.0.4) (2020-06-19)

- Ensuring unusual but valid simple selectors are handled properly

### [v7.0.3](https://github.com/fabiospampinato/cash/releases/tag/7.0.3) (2020-05-31)

- Updated "EleLoose" type

### v7.0.2 (2020-05-30)

- Readme: updated npm installation command
- Updated the "EleLoose" TypeScript type ensuring it isn't evaluated as "never"

### [v7.0.1](https://github.com/fabiospampinato/cash/releases/tag/7.0.1) (2020-04-15)

- $.fn.css: added support for retrieving properties of disconnected nodes

### [v7.0.0](https://github.com/fabiospampinato/cash/releases/tag/7.0.0) (2020-03-31)

- focus|blur|mouseenter|mouseleave: ensuring namespaces are handled properly
- focus|blur|mouseenter|mouseleave: aligned behavior more with jQuery
- focus|blur|mouseenter|mouseleave: ensuring natively triggered events are handled properly
- Migration guide: mentioning native non-bubbling events

### [v6.0.2](https://github.com/fabiospampinato/cash/releases/tag/6.0.2) (2020-02-15)

- Readme: improved comparison with jQuery, fixing some wrong/unfair comparisons/statements
- Migration guide: mentioning sort order
- $.fn.ready: ensuring the callback is called asynchronously and errors are not silenced

### [v6.0.1](https://github.com/fabiospampinato/cash/releases/tag/6.0.1) (2020-01-05)

- Ensuring events work with Document and Window objects
- Ensuring "event.data" is setted reliably

### [v6.0.0](https://github.com/fabiospampinato/cash/releases/tag/6.0.0) (2020-01-05)

##### Removed Features

- $.camelCase|matches|isString|prefixedProp: no longer exposing these methods, aligning with jQuery

##### New Features

- $.fn.nextUntil|prevUntil|parentsUntil: implemented these methods
- $.fn.detach|remove: added support for an optional "selector" argument
- $.fn.on|one: added support for an optional "data" argument
- Set-up test coverage (currently at ~99%) reporting to coveralls.io
- Migration guide: major update

##### Bug Fixes

- $.extend: aligned more with jQuery when called with zero or one argument
- $.fn.before|after|append|prepend|insertBefore|insertAfter|appendTo|prependTo: ensuring cloned scripts don't get executed
- $.fn.contents: ensuring template elements are supported
- $.fn.css: ensuring "grid-*" properties don't get the "px" suffix appended to their values when they are not supposed to
- $.fn.data: doing nothing when trying to set values to undefined
- $.fn.data: ensuring strings containing leading/trailing whitespace aren't parsed as JSON
- $.fn.get|eq: ensuring string indexes are supported
- $.fn.map: ensuring callbacks that return an array of elements are supported too
- $.fn.offset|offsetParent|position: rewritten to much more closely match jQuery's implementation
- $.fn.on|one|off: ensuring namespaces-only events are ignored
- $.fn.on|one|off: ensuring they don't throw when receiving a falsy callback
- $.fn.on|one: ensuring these methods are chainable even when receiving falsy callbacks
- $.fn.prop|removeProp: mapping special HTML attributes into their equivalent DOM properties (e.g. "for" -> "htmlFor")
- $.fn.ready: ensuring exceptions are always caught, so they can't crash the app
- $.fn.serialize: normalizing newlines
- $.fn.trigger: testing that non-nil falsy values are passed correctly
- $.fn.unwrap: ensuring immediate children of the body don't get unwrapped
- $.fn.val: ensuring checkboxes and radios can be set properly
- $.fn.val: ensuring non-string values are supported
- $.fn.val|html: more reliably detecting when being called with no arguments
- $.fn.width|height|innerWidth|innerHeight|outerWidth|outerHeight: ensuring document objects are supported too
- $.fn.width|height|innerWidth|innerHeight|outerWidth|outerHeight: ensuring they return the right value for the Window object
- $.fn.wrapAll: ensuring elements aren't cloned unnecessarely
- $.parseHTML: ensuring whitespace around a single HTML tag is preserved
- Ensuring empty selectors don't throw an error
- Collections containing non-element objects:
  - $.fn.addClass|removeClass|toggleClass: ensuring it doesn't throw with collections containing non-elements
  - $.fn.attr: ensuring a collection containing non-element objects doesn't cause an error to be thrown
  - $.fn.before|after|append|prepend|insertBefore|insertAfter|appendTo|prependTo: ensuring non-element nodes are accounted for properly
  - $.fn.hasClass: ensuring a collection containing non-element objects doesn't cause an error to be thrown
  - $.fn.hide|show|toggle: ensuring a collection containing non-element objects doesn't cause an error to be thrown
  - $.fn.html: ensuring collections containing non-element objects are supported
  - $.fn.not: ensuring non-element nodes are excluded
  - $.fn.on|off: ensuring non-element objects in the collection are ignored
  - $.fn.removeAttr: ensuring a collection containing non-element objects doesn't cause an error to be thrown
  - $.fn.text: improved support of collections containing non-elements objects

### [v5.0.0](https://github.com/fabiospampinato/cash/releases/tag/5.0.0) (2019-12-17)

- Dropped support for IE10
- $.fn.hasClass: ensuring it always returns a boolean
- $.fn.off: accepting also an events map as its only argument
- $.fn.show|toggle: restoring custom display values
- $.fn.before|after|append|prepend|insertBefore|insertAfter|appendTo|prependTo: ensuring multiple nodes are inserted in the correct order
- Ensuring attached events never get forgotten
- Ensuring script tags are executed even if they have a "src" attribute, and without using `eval`
- Ensuring the order of event namespaces doesn't matter
- Squeezed some more bytes out of the bundle (~4%) and improved code style consistency
- Squeezed some more bytes out of the bundle (~1.5%), bringing back the minified and gzipped size below 5kb

### [v4.1.5](https://github.com/fabiospampinato/cash/releases/tag/4.1.5) (2019-09-06)

- $.fn.val: ensuring it works with "input[type=file][multiple]" elements
- Migration guide: mentioning how $.fn.data stores values

### [v4.1.4](https://github.com/fabiospampinato/cash/releases/tag/4.1.4) (2019-08-05)

- $.fn.get: improved types
- TypeScript: made types a little more forgiving
- TypeScript: improved collections index signature
- TypeScript: improved support for props/methods available only in specific HTML nodes
- Added a guide for extending Cash

### [v4.1.3](https://github.com/fabiospampinato/cash/releases/tag/4.1.3) (2019-07-13)

- Ensuring Cash can be bundled correctly via webpack
- $.fn.toggle: ensuring each element is toggled independently
- TypeScript: ensuring some useful internal types are exported
- TypeScript: made types a little more forgiving

### [v4.1.2](https://github.com/fabiospampinato/cash/releases/tag/4.1.2) (2019-05-16)

- Avoiding publishing unnecessary files to NPM

### [v4.1.1](https://github.com/fabiospampinato/cash/releases/tag/4.1.1) (2019-05-13)

- Raising bundle size limit to 5.5kB
- Test: replaced iOS 9.3 with iOS 11.0
- Test: using setAttribute instead of the dataset API
- Migration guide: mentioning the `:scope` CSS pseudo-class
- Migration guide: mentioning inserting plain text
- TypeScript: typing events more loosely
- TypeScript: typing collection elements more loosely

### [v4.1.0](https://github.com/fabiospampinato/cash/releases/tag/4.1.0) (2019-05-12)

- Added $.isWindow
- Made the TypeScript type system stricter
- $.guid: ensuring it's properly exported
- $.fn.siblings: ensuring it supports multi-element collections
- $.fn.empty: ensuring it supports multi-element collections
- $.fn.attr: doing nothing when the value equals undefined

### [v4.0.0](https://github.com/fabiospampinato/cash/releases/tag/4.0.0) (2019-05-08)

- Removed `$.fn.removeData`
- Removed `$.hasData`
- `$.fn.data`: removed caching mechanism
- `$.fn.data`: added a missing TypeScript method overload

### [v3.2.0](https://github.com/fabiospampinato/cash/releases/tag/3.2.0) (2019-04-30)

- Readme: updated sizes
- $.fn.off: added support for removing delegated handlers

### [v3.1.0](https://github.com/fabiospampinato/cash/releases/tag/3.1.0) (2019-03-22)

- Improved support for running selectors inside documents
- Ensuring Cash collections are iterable
- Added an extra reference implementation for shorthand event methods
- Added an extra reference implementation for `$.getScript`
- Readme: mentioning the extra methods

### [v3.0.0](https://github.com/fabiospampinato/cash/releases/tag/3.0.0) (2019-03-17)

- Library rewritten in TypeScript
- Bundle TypeScript typings (no need for @types/cash, which is now obsolete)
- Added a changelog
- Migration guide: mention the `zoom` property
- Readme: improved description of the optional context argument
- Ensure valid TypeScript types are generated
- Ensure build files are updated when bumping the version

### v3.0.0-beta.3 (2018-12-06)

- Fixed export on the ESM build

### v3.0.0-beta.2 (2018-11-21)

- Renamed some "private" variables
- Travis: avoiding caching `node_modules`
- Test: improved tests regarding event delegating
- Migration guide: added a section about events
- Moved "@types/*" to "dependencies"
- Replaced tabs with spaces
- $.fn.trigger: triggering focus/blur natively
- Event delegation: ensuring events that do not bubble (focus/blur/mouseenter/mouseleave) are still usable
- Test: renamed some tests
- Event delegation: ensuring `event.currentTarget` points to the right element
- Migration guide: added a section about computing the dimensions of hidden elements
- Fixed support for `event.currentTarget`
- Migration guide: added a section about parsing script tags
- Generalized `insertElement` to support a custom prepend target
- Evaluating the content of `script` tags when attaching them to the DOM
- Migration guide: added a `loadScript` function
- find: improved resilience against text/comment/etc. nodes
- $.fn.trigger: using `MouseEvents` when appropriate
- evalScripts: improved browsers support
- Improved support for `event.currentTarget`

### v3.0.0-beta.1 (2018-10-27)

- Merge branch 'master' of github.com:kenwheeler/cash
- Updated Karma configuration
- $.fn.hasClass: ensuring it supports falsy values
- $.matches: added back support for vendor-prefixed methods
- Updated test suite
- $.fn.val: improved support for old-ish browsers
- Karma: picking versions relative to `latest`, when possible
- Readme: ensuring `Cash` is always title-cased
- Added a `filtered` utility
- $.fn.children: cleaner implementation
- $.fn.closest: faster implementation
- $.fn.next|parent|prev|siblings: added support for an optional selector
- pluck: added an optional `deep` parameter
- $.fn.parents: much cleaner implementation
- Added `$.fn.prevAll`
- Added `$.fn.nextAll`
- Updated readme
- Added a "Migration Guide"
- Added `$.fn.hide|show|toggle`
- Added `$.fn.unwrap|wrap|wrapAll|wrapInner`

### v3.0.0-beta.0 (2018-10-26)

- Test: added Firefox to Karma
- Rewritten test suite
- TypeScript: updated compiler options
- $.fn.hasClass: aligned more with jQuery
- $.camelCase: aligned more with jQuery
- $.fn.extend: fixed support for defining plugins with it
- computeStyle: check if a property is actually passed
- computeStyle: returning `undefined` for unset CSS variables
- Added `@types/node` as a dev dependency
- camelCase: removed description
- $.fn.each: improved performance
- $.matches: removed support for older browsers
- Travis: addded bundlesize
- $.fn.prev|next: retrieving all previous/next elements
- Test: ensuring `$.fn.replaceWith` and `$.fn.replaceAll` support multiple elements
- Test: ensuring that `$.fn.data` supports more data types
- $.fn.replaceWith: much cleaner implementation
- $.fn.hasClass: much cleaner implementation
- Added a `pluck` utility
- $.fn.prev|next|parent: much cleaner implementation
- $.fn.val: cleaner implementation
- Simplified some events-related helpers
- Creating one fewer div element
- unique: improved performance
- Updated logo
- Readme: updated comparison tables
- Added configuration for `bump`

### [v2.3.9](https://github.com/fabiospampinato/cash/releases/tag/2.3.9) (2018-10-21)

- Changed files extensions to `ts`
- $.parseHTML: fixed a regression regarding non-browser environments

### [v2.3.8](https://github.com/fabiospampinato/cash/releases/tag/2.3.8) (2018-10-20)

- Updated some dependencies
- Test: added `travis_retry` to tests with SauceLabs
- Ignored package-lock.json
- $.fn.val: ensuring when `null` is passed the value is cleared
- Test: updated Travis CI configuration
- Updated some dependencies
- Test: updated `height` test to better support browsers returning floating values
- Test: updated Karma configuration
- $.fn.val: properly handling `null`
- $.fn.append|prepend: ensuring it doesn't throw when passed `undefined`
- $.parseHTML: added support for malformed single-tags
- $.parseHTML: added support for parsing thead/tbody/tfoot/tr/td/th elements
- Test: removed the " Passed!" suffix from messages
- Test: fixed some malformed HTML

### [v2.3.7](https://github.com/fabiospampinato/cash/releases/tag/2.3.7) (2018-10-14)

- Added cross-platform tests with SauceLabs
- Test only against node LTS
- Test: use IE11 on Windows 8.1
- Added a `test:karma:sauce` script
- Added a `prepublish` script
- Added some issue templates
- Readme: added a "Contributing" section
- Renamed `prepublish` script to `prepublishOnly`
- Ensuring `$.parseHTML` always preserves the content of nodes

### [v2.3.6](https://github.com/fabiospampinato/cash/releases/tag/2.3.6) (2018-10-03)

- Merge pull request #201 from limonte/patch-1
- chore(tests): bump qunit to latest
- Merge pull request #202 from limonte/upgrade-qunit
- CI: set up Karma test runner + Travis
- Readme: removed travis-ci badge
- Coding-style normalization
- Added a `test:karma` script
- Test: avoiding passing malformed html to `$.parseHTML`
- Test: ensuring there are no syntax errors on IE11
- Readme: added a "License" section
- Readme: added a "Thanks" section
- Optimize .empty(), use removeChild() instead of .innerHTML = ''
- `$.fn.empty`: updated code style

### [v2.3.5](https://github.com/fabiospampinato/cash/releases/tag/2.3.5) (2018-09-08)

- Improved support for Node.js

### v2.3.4 (2018-09-07)

- Moved `pacco` to `devDependencies`

### [v2.3.3](https://github.com/fabiospampinato/cash/releases/tag/2.3.3) (2018-07-09)

- using the provided context when selecting by id
- added support for using a cash object as the context
- Improved readme

### [v2.3.2](https://github.com/fabiospampinato/cash/releases/tag/2.3.2) (2018-07-09)

- Added a logo
- Ensuring `$.fn.replaceWith` and `$.fn.replaceAll` work with multiple targets
- $.fn.val: ensuring setting multiple values on a `select[multiple]` works
- Added some tests

### [v2.3.1](https://github.com/fabiospampinato/cash/releases/tag/2.3.1) (2018-07-05)

- Added support for `window` to dimensions-related methods

### [v2.3.0](https://github.com/fabiospampinato/cash/releases/tag/2.3.0) (2018-07-05)

- Added a `$.fn.contents` method

### [v2.2.1](https://github.com/fabiospampinato/cash/releases/tag/2.2.1) (2018-06-16)

- Ensuring a cash collection gets printed as array-like in Chrome

### [v2.2.0](https://github.com/fabiospampinato/cash/releases/tag/2.2.0) (2018-06-10)

- Improved `test:jquery` script
- Added `$.hasData`
- $.fn.serialize: ensuring elements have a name
- $.fn.serialize: ensuring empty string values are included
- getValueSelectMultiple: checking for disabled options and disabled parent optgroups
- $.fn.width|height: ensuring only element nodes are considered
- computeStyle: ensuring only element nodes are considered
- $.fn.css: skipping setting unsupported properties
- $.fn.css: ensuring only element nodes are considered
- $.parseHTML: ensuring it doesn't throw when non-string values are passed to it
- $.parseHTML: returning an array instead of a `NodeList`
- $.fn.attr: returning `undefined` instead of `null` for missing attributes
- $.fn.attr: removing the attribute when setting a value of `null`
- $.fn.removeAttr: added support for passing a space-separated string of attributes
- $.fn.css: added support for CSS variables
- $.fn.detach: avoding throwing an error when the parent node is missing
- getData: some minor changes
- $.fn.data: added support for getting the entire data object
- Test: added some tests for `$.fn.before` and `$.fn.after`
- $.fn.before|prepend|append|after: added support for inserting multiple contents
- $.fn.after|prependTo: fixed ordering
- $.fn.serialize: skipping inputs of type `image`
- $.fn.serialize: ensuring multiple forms can be serialized at once
- $.fn.ready: passing `cash` as the first argument to the callback
- getSuffixedValue: added back support for `animationIterationCount`
- $.fn.after|prependTo: avoiding mutating passed objects

### [v2.1.8](https://github.com/fabiospampinato/cash/releases/tag/2.1.8) (2018-06-10)

- Updated some dependencies
- $.fn.on: calling `preventDefault` and `stopPropagation` on the event if the handler returns `false`
- Added a `test:jquery` script for running the jQuery test suite with cash

### [v2.1.7](https://github.com/fabiospampinato/cash/releases/tag/2.1.7) (2018-05-28)

- Added some more explicit `@require` statements
- Added a script for rendering the dependencies graph
- Added an ESM build

### [v2.1.6](https://github.com/fabiospampinato/cash/releases/tag/2.1.6) (2018-05-19)

- Events: passing the actual target element as `this` for delegated events

### [v2.1.5](https://github.com/fabiospampinato/cash/releases/tag/2.1.5) (2018-05-16)

- $.fn.removeClass: fixed attribute resetting

### v2.1.4 (2018-05-14)

- Updated jsDelivr URL
- $.fn.trigger: events are now cancelable

### [v2.1.3](https://github.com/fabiospampinato/cash/releases/tag/2.1.3) (2018-05-12)

- Merge pull request #184 from fabiospampinato/master
- $.fn.width|height: fixed a bug with Firefox
- Dropped IE9 support
- Assuming getAttribute/setAttribute/remoteAttribute APIs are available
- Added a `test:watch` script
- Explicitly compile for IE10+
- Switching from UglifyJS to Google Closure Compiler
- Events: removed jQuery-like methods: isDefaultPrevented/isPropagationStopped/isImmediatePropagationStopped
- Events: avoiding using `get_data` for the cache
- $.fn.filter: without a selector returns an empty collection
- $.fn.index: optimized
- getPrefixedProp: fixed caching logic
- Major cleanup and bytes squeezing
- Readme: updated `fn.has` documentation
- Readme: fixed a typo
- Readme: improved wording
- Updated cash sizes
- Updated partial builds

### v2.1.2 (2018-05-11)

- Added some alternative configurations for pacco
- Aligned `$.fn.prop` with jQuery's
- Aligned `$.fn.removeClass` with jQuery's
- Event delegation: handling the removal of the target from the DOM

### v2.1.1 (2018-05-03)

- $.parseHTML: added a todo
- $.fn.filter: optimized
- $.fn.map: optimized
- $.fn.find: optimized
- Minor style changes
- Aligned `$.fn.removeData` with jQuery's

### v2.1.0 (2018-04-12)

- Aligned `$.fn.each` with jQuery's
- Aligned `$.fn.map` with jQuery's
- Aligned `$.fn.filter` with jQuery's
- $.fn.height|width: setting to each element in the collection
- $.fn.on: renamed `delegate` to `selector`
- Aligned `$.val` with jQuery's
- Aligned `$.fn.data` with jQuery's
- $.fn.css: automatically adding the `px` suffix when necessary
- Readme: updated minified + gzip size
- $.fn.height: fixed
- Aligned `$.fn.width|height` with jQuery's
- Added support for namespaced events
- $.fn.trigger: ensuring all namespaces match
- Adding some methods to events: isDefaultPrevented, isPropagationStopped, isImmediatePropagationStopped

### v2.0.0 (2018-04-08)

- Added a `guid`
- $.fn.trigger: added support for triggering already-made events
- $.fn.on|one|off: added support for multiple events
- Readme: documented `$.guid`
- Readme: updated `$.fn.trigger` documentation
- Readme: updated `$.fn.on|one|off` documentation
- Events: removing jQuery-like namespaces automatically
- Added a `$.fn.slice` method
- $.fn.height|width: added support for setting
- Renamed `Init` to `Cash`
- Readme: updated `$.fn.addClass|removeClass`
- Readme: updated `$.fn.filter`
- Readme: updated `$.fn.not`
- Improved support for empty objects, without throwing errors
- Ensuring eventCache is properly cleared
- $.fn.off: added support for removing all handlers
- $.fn.remove: removing also all events
- Added a `$.fn.detach` method
- Added a `$.contains` utility
- Added a `$.fn.replaceWith` method
- Added a `$.fn.replaceAll` method
- Removed event un-namespacing
- Added support for removing wrapped event handlers
- Added support for removing handlers attached with `.one`
- $.fn.one: ensuring `callback.guid` is set
- Passing data as an argument
- Readme: updated links
- Renamed `Global Methods` to `Cash Methods`
- hasClass: properly escaping regex special characters
- $.fn.offsetParent: ensuring it doesn't throw with an empty collection
- $.fn.removeData: fixed
- removeData: fixed a variable name
- initFragment: passing a string to `doc.implementation.createHTMLDocument`, as per spec
- Added some tests
- Requiring pacco@^1.1.0
- Explicitly compiling for IE >= 9
- Updated a todo

### [v1.3.7](https://github.com/fabiospampinato/cash/releases/tag/1.3.7) (2018-01-17)

### [v1.3.6](https://github.com/fabiospampinato/cash/releases/tag/1.3.6) (2018-01-11)

- Test fixes
- Argument required for `createHTMLDocument`
- fix: attributes/addClass, the wrong checking on class-name inclusion
- fix: remove `spacedName` from `addClass` interface
- Added Travis CI support for modern node versions
- Merge pull request #160 from amilajack/patch-1
- Update jsDelivr links
- Merge pull request #168 from LukasDrgon/patch-1
- Merge pull request #173 from DanielRuf/patch-travis
- Merge pull request #171 from DanielRuf/patch-readme
- Merge pull request #157 from AugustMiller/am-createdocument-argument
- Merge branch 'pr/153' (Async DOM Ready)
- Merge branch 'pr/158'
- Compiled className fix
- Merge pull request #141 from vivekimsit/add-gitattribute

### [v1.3.5](https://github.com/fabiospampinato/cash/releases/tag/1.3.5) (2016-10-12)

- Normalize all text files in the repo
- Serialize elements outside form as well
- Fix for #143
- fn in should always be called asynchronously
- Merge PR #105 'parseHTML-fix' of https://github.com/softwarespot/cash into 1.3.5
- Merge PR #116 "Form Cleanup"
- Merge PR #140 "Form Cleanup"
- Merge PR #123 "Filter Fix"
- Merge PR #124 `isFunction` fix
- Merge PR #133 "Traversal Fixes"
- Merge PR #136 'semicolon-iife' of https://github.com/vivekimsit/cash into 1.3.5
- Merge PR #138 'constructor-fix' into 1.3.5
- Merge PR #145 "event-off-fix"

### [v1.3.4](https://github.com/fabiospampinato/cash/releases/tag/1.3.4) (2016-06-28)

### [v1.3.3](https://github.com/fabiospampinato/cash/releases/tag/1.3.3) (2016-05-20)

- Filter fix

### [v1.3.2](https://github.com/fabiospampinato/cash/releases/tag/1.3.2) (2016-05-18)

### [v1.3.1](https://github.com/fabiospampinato/cash/releases/tag/1.3.1) (2016-05-16)

- CDN version links

### [v1.3.0](https://github.com/fabiospampinato/cash/releases/tag/1.3.0) (2016-05-04)

- jQuery 3 comparison
- Unified compare function for `$.fn.is` and `$.fn.not` to support looking for elements
- Fixed `$.fn.siblings` to return a Collection instead of Array.
- Fix for `$.fn.has` to return collection instead of Array and support for checking for an element instead of a string selector.
- Use `$.fn.find` with an element instead of selector.
- Merge branch 'master' of https://github.com/kenwheeler/cash
- Fix for `$.fn.closest` to return correct results, `$.fn.filter` can now filter by Elements
- Fix for #135: `$.fn.closest()` callstack exceeded
- Use `Object.defineProperty` to attach the `constructor` property to the `cash.fn` prototype. #134
- merge PR #110
- merge PR #111

### v1.2.3 (2016-??-??)

- Saving bytes
- [ remove class ] - add test for removing all classes
- [ remove all classes ] - add an option for removing all classes - supply no arguments to .removeClass() - update readme

### v1.2.2 (2016-??-??)

- `$.fn.filter` fix
- merge PR #96
- [ add / remove / toggle / has class ] - add checks for integers and falsey values - closer to jQuery - was having script-killing errors when `.addClass("")`

### [v1.2.1](https://github.com/fabiospampinato/cash/releases/tag/1.2.1) (2016-04-25)

- [ attr() ] - fix to return collection for multi-add
- [ update ] - improve based on @shshaw comment https://github.com/kenwheeler/cash/pull/111#issuecomment-216283171
- Cleanup and @rwwagner90 fix
- CloudFlare CDN
- Clarified intro paragraph
- Updated parseHTML which fixes the base URL issue
- Fix conflict
- Merge branch 'kenwheeler-master'
- Added NPM reference
- Bower.json fix
- Usage updates
- Merge pull request #102 from kenwheeler/npm-bower-fixes
- Update README.md
- Fix example for $.isArray
- Merge pull request #81 from shvelo/patch-1
- Add data to trigger event
- Increment test values
- Update README to state approximate size
- Merge pull request #84 from joezimjs/master
- Browser Support Clarification
- Size comparison
- Latest CDN version
- Heading comment
- Set multiple attributes &amp; properties
- Merge pull request #87 from kenwheeler/attr-obj
- added index to docs
- updated utilities &amp; type checking links
- Merge pull request #89 from devinargenta/docs/index-added
- Size alignment
- Documentation for `$.fn.offet`, `$.fn.offetParent` and `$.fn.position`
- Documentation for `$.fn.removeProp`
- Documentation for setting properties
- Utility alphabetical order
- Clarifying $.fn prototype
- Method index tables ( #88 )

### [v1.2.0](https://github.com/fabiospampinato/cash/releases/tag/1.2.0) (2016-04-01)

- Merge pull request #1 from shshaw/selector
- Merge pull request #70 from shshaw/master
- Size updates
- Keep CDN files at last version until the CDNs have had a chance to update.
- Simplified `on`
- Updated README
- Merge pull request #115 from kenwheeler/1.3.0

### [v1.1.0](https://github.com/fabiospampinato/cash/releases/tag/1.1.0) (2016-04-12)

- Fixed css() return value for object type input
- Merge pull request #58 from kornalius/master
- Update README.md
- Fixing length to 0 when element doesn't exist
- Merge pull request #64 from defrag/fix/empty-item-length
- Merge pull request #65 from defrag/fix/suite-fix
- Improve `fn.find`
- `return false` breaks `.each`
- `fn.children` and `fn.is` improvements
- Smaller file size &amp; consistency
- Improve `append`, `prepend`
- Clone entire collections
- Added `.map`
- README fixes
- Simplification of manipulations
- Fixed chainability of `remove`
- Traversal cleanup
- Unified collection functions
- Simplified class manipulation
- Form fixes
- Tiny utils added to `cash`
- Trim down by using local `each`
- `add`, `push` and `splice`
- `toggleClass`
- Trimming
- Multi-parameter extend
- Merge pull request #66 from shshaw/master
- Merge remote-tracking branch 'kenwheeler/master'
- Trimmed `index`
- Direct `map`
- Trimmed `outerWidth` &amp; `outerHeight`
- Cleaned up events
- Form serialize fix
- Merge pull request #67 from shshaw/master
- Merge remote-tracking branch 'kenwheeler/master'
- `after`, `before` &amp; `insert...`
- Updated hints
- Simplified `outerWidth` &amp; `outerHeight`
- Prefixed CSS Properties
- Selector performance
- Form test update
- Merge pull request #69 from shshaw/better-selector
- Merge remote-tracking branch 'kenwheeler/master' into selector
- Even smaller `dimensions`
- `event` fixes
- `window` fixes
- Clear `_eventCache` when all removed
- Private `data` store
- Replace `_eventCache`
- `.one` support
- `offset`

### [v1.0.0](https://github.com/fabiospampinato/cash/releases/tag/1.0.0) (2015-02-06)

- Available in npm as cash-dom now
- Adding `is` documentation
- Add UMD wrapper
- Store references for better minifying
- Fill out package.json
- Clean up README
- Merge pull request #40 from hackbone/umd
- Conform to Airbnb JavaScript style guide
- Arbitrary stylistic changes for readability
- Minify dimensions better
- Minify events better and cleanup
- Alias slice and filter for minifying
- fn reference for minifying
- Clean up gulpfile and remove beautify
- Build lib
- Stop using arguments object when unnecessary for better minifying
- Switch to ES6 with 6to5 and update linting
- Return target in extend, improve minifying
- Build lib
- Remove "use strict" due to Safari HTMLCollection bug
- Merge branch 'master' of https://github.com/thejameskyle/cash into thejameskyle-master
- Removing strict from list
- Merge branch 'thejameskyle-master'

### [v0.0.3](https://github.com/fabiospampinato/cash/releases/tag/0.0.3) (2014-11-09)

- Update README.md
- Merge pull request #9 from richguan/patch-1
- Merge pull request #7 from Fender123/master
- Committing the `add` feature in response to #16
- create tests for .add
- allowing selector string input
- fixing tests for selector string
- Refactoring the $.fn.add method based on Ken's feedback, also update documentation and tests
- Merge pull request #20 from simeydotme/master
- add tests for parents, closest
- updating documentation for closest and parents
- change parents to closest and create new parents
- Merge branch 'master' of https://github.com/simeydotme/cash
- improve performance
- test that HTML is last item in collection
- Merge pull request #23 from simeydotme/master
- Merge pull request #22 from vivekimsit/feature-closest-method
- Remove deprecated JSHint options
- `package.json` will always be 2 spaces
- Merge pull request #26 from arthurvr/patch-2
- Merge pull request #25 from arthurvr/patch-1
- matches was throwing errors in IE9
- fix up closest tests, and make the removeClass test more robust
- fix merge error with .closest()
- make .removeClass() more robust for IE9
- dist files committed
- improve the removeClass() function and performance slightly for IE9. removeClass will now accept space delimited class names for removal
- Merge pull request #29 from simeydotme/fix-closest-and-removeclass
- Making .each more performant via length caching. Fixing html() numeric input
- Update README.md
- Merge pull request #31 from simeydotme/patch-1
- Fixing #32
- Adds cash object support.
- updating addClass function to allow multiple classes and to prevent duplicates in IE9
- update tests for multiple classes and to detect duplicates
- update dist files
- Merge pull request #38 from simeydotme/patch-addclass-2
- create a utility method to return a unique collection
- update .parent(), .parents() and .add() to use $.unique()
- update dist files and test cases
- Merge pull request #37 from simeydotme/patch-parents-with-unique
- Merge pull request #34 from vivekimsit/feature-add-is-support

### [v0.0.2](https://github.com/fabiospampinato/cash/releases/tag/0.0.2) (2014-09-27)

- Performance
- Fixing readme
- Fixing siblings, making qSA return array
- Fixing `_` leak
- Add bower.json
- Merge pull request #3 from digitaljhelms/bower-json
- First round of unit tests + bug fixes
- Fixing README typo &amp; adding License
- Fixes
- Adding "auto-off" event registration and indexing
- Bug Fixes
- Updating delegate test and JSHint compat
- delegate accuracy
- updated outerWidth and innerWidth doc
- Perf updates
- Added a period(.) to the descriptions in README
- Fixes #6 - Append and AppendTo can't chain
- Merge pull request #10 from mienaikoe/master
- Fixing html() &amp; append returns
- Merge branch 'master' of https://github.com/kenwheeler/cash

### [v0.0.1](https://github.com/fabiospampinato/cash/releases/tag/0.0.1) (2014-09-19)

- Initial commit
- README &amp; Homepage
- Update README.md
