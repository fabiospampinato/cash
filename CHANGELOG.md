### Version 4.1.5
- $.fn.val: ensuring it works with “input[type=file][multiple]” elements
- Migration guide: mentioning how $.fn.data stores values

### Version 4.1.4
- $.fn.get: improved types
- TypeScript: made types a little more forgiving
- TypeScript: improved collections index signature
- TypeScript: improved support for props/methods available only in specific HTML nodes
- Added a guide for extending Cash

### Version 4.1.3
- Ensuring Cash can be bundled correctly via WebPack
- $.fn.toggle: ensuring each element is toggled independently
- TypeScript: ensuring some useful internal types are exported
- TypeScript: made types a little more forgiving

### Version 4.1.2
- Avoiding publishing unnecessary files to NPM

### Version 4.1.1
- Raising bundle size limit to 5.5kB
- Test: replaced iOS 9.3 with iOS 11.0
- Test: using setAttribute instead of the dataset API
- Migration guide: mentioning the `:scope` CSS pseudo-class
- Migration guide: mentioning inserting plain text
- TypeScript: typing events more loosely
- TypeScript: typing collection elements more loosely

### Version 4.1.0
- Added $.isWindow
- Made the TypeScript type system stricter
- $.guid: ensuring it’s properly exported
- $.fn.siblings: ensuring it supports multi-element collections
- $.fn.empty: ensuring it supports multi-element collections
- $.fn.attr: doing nothing when the value equals undefined

### Version 4.0.0
- Removed `$.fn.removeData`
- Removed `$.hasData`
- `$.fn.data`: removed caching mechanism
- `$.fn.data`: added a missing TypeScript method overload

### Version 3.2.0
- Readme: updated sizes
- $.fn.off: added support for removing delegated handlers

### Version 3.1.0
- Improved support for running selectors inside documents
- Ensuring Cash collections are iterable
- Added an extra reference implementation for shorthand event methods
- Added an extra reference implementation for `$.getScript`
- Readme: mentioning the extra methods

### Version 3.0.0
- Added a changelog
- Migration guide: mentioning the `zoom` property
- Readme: improved description of the optional context argument (origin/master, origin/HEAD)
- Ensuring valid typescript types are generated
- Ensuring build files are updated when bumping the version

### Version 3.0.0-beta.3
- Fixed export on the ESM build

### Version 3.0.0-beta.2
- Renamed some “private” variables
- Readme: minor changes
- Travis: avoiding caching `node_modules`
- Test: improved tests regarding event delegatino
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
- Evaluating the contnet of `script` tags when attaching them to the DOM
- Migration guide: added a `loadScript` function
- find: improved resilience against text/comment/etc. nodes
- $.fn.trigger: using `MouseEvents` when appropriate
- evalScripts: improved browsers support
- Improved support for `event.currentTarget`

### Version 3.0.0-beta.1
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
- Added a “Migration Guide”
- Added `$.fn.hide|show|toggle`
- Added `$.fn.unwrap|wrap|wrapAll|wrapInner`

### Version 3.0.0-beta.0
- Test: added Firefox to Karma
- Rewritten test suite
- TypeScript: updated compiler options
- $.fn.hasClass: aligned more with jQuery
- $.camelCase: aligned more with jQuery
- $.fn.extend: fixed support for defining plugins with it
- computeStyle: check if a property is actually passed
- computeStyle: returning `undefined` for unset css variables
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
- Minor changes
- unique: improved performance
- Updated logo
- Readme: updated comparison tables
- Added configuration for `bump`

### Version 2.3.9

### Version 2.3.8

### Version 2.3.9
- Changed files extensions to `ts`
- $.parseHTML: fixed a regression regarding non-browser environments

### Version 2.3.8
- Updated some dependencies
- Test: added `travis_retry` to tests with SauceLabs
- Ignored package-lock.json
- $.fn.val: ensuring when `null` is passed the value is cleared
- Test: updated Travis CI configuration
- Updated some dependencies
- Test: updated `height` test to better support browsers returning floating values
- Test: updated Karma configuration
- $.fn.val: properly handling `null`
- $.fn.append|prepend: ensuring it doesn’t throw when passed `undefined`
- $.parseHTML: added support for malformed single-tags
- $.parseHTML: added support for parsing thead/tbody/tfoot/tr/td/th elements
- Test: removed the “ Passed!” suffix from messages
- Test: fixed some malformed HTML

### Version 2.3.7
- Added cross-platform tests with SauceLabs
- Test only against node LTS
- Test: use IE11 on Windows 8.1
- Added a `test:karma:sauce` script
- Added a `prepublish` script
- Added some issue templates
- Readme: added a “Contributing” section
- Renamed `prepublish` script to `prepublishOnly`
- Ensuring `$.parseHTML` always preserves the content of nodes

### Version 2.3.6
- chore(README): npm always lowercase
- Merge pull request #201 from limonte/patch-1
- chore(tests): bump qunit to latest
- Merge pull request #202 from limonte/upgrade-qunit
- ci: setup karma test runner + travis
- Readme: removed travis-ci badge
- Coding-style normalization
- Added a `test:karma` script
- Test: avoiding passing malformed html to `$.parseHTML`
- Test: ensuring there are no syntax errors on IE11
- tests: use npm ci
- chore: use Node.js 10
- Readme: added a “License” section
- Readme: added a “Thanks” section
- Optimize .empty(), use removeChild() instead of .innerHTML = ''
- `$.fn.empty`: updated code style

### Version 2.3.5
- Improved support for Node.js

### Version 2.3.4
- Moved `pacco` to `devDependencies`

### Version 2.3.3
- cash: using the provided context when selecting by id
- cash: added support for using a cash object as the context
- Improved readme

### Version 2.3.2
- Added a logo
- Ensuring `$.fn.replaceWith` and `$.fn.replaceAll` work with multiple targets
- $.fn.val: ensuring setting multiple values on a `select[multiple]` works
- Added some tests

### Version 2.3.1
- Added support for `window` to dimensions-related methods

### Version 2.3.0
- Added a `$.fn.contents` method

### Version 2.2.1
- Ensuring a cash collection gets printed as array-like in Chrome

### Version 2.2.0
- Improved `test:jquery` script
- Added `$.hasData`
- $.fn.serialize: ensuring elements have a name
- $.fn.serialize: ensuring empty string values are included
- getValueSelectMultiple: checking for disabled options and disabled parent optgroups
- $.fn.width|height: ensuring only element nodes are considered
- computeStyle: ensuring only element nodes are considered
- $.fn.css: skipping setting unsupported properties
- $.fn.css: ensuring only element nodes are considered
- $.parseHTML: ensuring it doesn’t throw when non-string values are passed to it
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

### Version 2.1.8
- Updated some dependencies
- $.fn.on: calling `preventDefault` and `stopPropagation` on the event if the handler returns `false`
- Added a `test:jquery` script for running the jQuery test suite with cash

### Version 2.1.7
- Added some more explicit `@require` statements
- Added a script for rendering the dependencies graph
- Added an ESM build

### Version 2.1.6
- Events: passing the actual target element as `this` for delegated events

### Version 2.1.5
- $.fn.removeClass: fixed attribute resetting

### Version 2.1.4
- Updated jsDelivr url
- $.fn.trigger: events are now cancelable

### Version 2.1.3
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
- test:watch: watching only the unminified bundle
- Properly wrapping the bundle
- getPrefixedProp: fixed caching logic
- Major cleanup and bytes squeezing
- Readme: updated `fn.has` documentation
- Readme: fixed a typo
- Readme: improved wording
- Updated cash sizes
- Updated partial builds

### Version 2.1.2
- Added some alternative configurations for pacco
- Aligned `$.fn.prop` with jQuery’s
- Aligned `$.fn.removeClass` with jQuery’s
- Event delegation: handling the removal of the target from the DOM
- Pre-merge cleanup/update

### Version 2.1.1
- $.parseHTML: added a todo
- $.fn.filter: optimized
- $.fn.map: optimized
- $.fn.find: optimized
- Minor style changes
- Aligned `$.fn.removeData` with jQuery’s

### Version 2.1.0
- Aligned `$.fn.each` with jQuery’s
- Aligned `$.fn.map` with jQuery’s
- Aligned `$.fn.filter` with jQuery’s
- $.fn.height|width: setting to each element in the collection
- $.fn.on: renamed `delegate` to `selector`
- Aligned `$.val` with jQuery’s
- Aligned `$.fn.data` with jQuery’s
- $.fn.css: automatically adding the `px` suffix when necessary
- Readme: updated minified + gzip size
- $.fn.height: fixed
- Aligned `$.fn.width|height` with jQuery’s
- Added support for namespaced events
- $.fn.trigger: ensuring all namespaces match
- Adding some methods to events: isDefaultPrevented, isPropagationStopped, isImmediatePropagationStopped

### Version 2.0.0
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
- $.fn.off: added support for remiving all handlers
- $.fn.remove: removing also all events
- Added a `$.fn.detach` method
- Added a `$.contains` utility
- Added a `$.fn.replaceWith` method
- Added a `$.fn.replaceAll` method
- Removed event un-namespacing
- Simplified wrapper
- Added support for removing wrapped event handlers
- Added support for removing handlers attached with `.one`
- $.fn.one: ensuring `callback.guid` is set
- Passing data as an argument
- Major refactoring
- Readme: updated links
- Renamed `Global Methods` to `Cash Methods`
- hasClass: properly escaping regex special characters
- $.fn.offsetParent: ensuring it doesn’t throw with an empty collection
- $.fn.removeData: fixed
- removeData: fixed a variable name
- initFragment: passing a string to `doc.implementation.createHTMLDocument`, as per spec
- Added some tests
- Requiring pacco@^1.1.0
- Explicitly compiling for ie >= 9
- Updated a todo

### Version 1.3.7

### Version 1.3.6
- Test fixes
- 1.3.5
- Argument required for `createHTMLDocument`
- Run build tasks
- fix: attributes/addClass, the wrong checking on class-name inclusion
- fix: remove `spacedName` from `addClass` interface
- Added travis ci support for modern node versions
- Merge pull request #160 from amilajack/patch-1
- Update jsDelivr links
- Merge pull request #168 from LukasDrgon/patch-1
- fix title
- fix travis setup
- Merge pull request #173 from DanielRuf/patch-travis
- Merge pull request #171 from DanielRuf/patch-readme
- Merge pull request #157 from AugustMiller/am-createdocument-argument
- Merge branch 'pr/153' (Async DOM Ready)
- Merge branch 'pr/158'
- Compiled className fix
- Merge pull request #141 from vivekimsit/add-gitattribute

### Version 1.3.5
- Add test case.
- Normalize all text file in the repo.
- Serialize elemnts outside form as well.
- Fix for #143
- fn in  should always be called asynchronously
- Merge PR #105 'parseHTML-fix' of https://github.com/softwarespot/cash into 1.3.5
- Merge PR #116 "Form Cleanup"
- Merge PR #140 "Form Cleanup"
- Merge PR #123 "Filter Fix"
- Merge PR #124 `isFunction` fix
- Merge PR #133 "Traversal Fixes"
- Merge PR #136 'semicolon-iife' of https://github.com/vivekimsit/cash into 1.3.5
- Merge PR #138 'constructor-fix' into 1.3.5
- Merge PR #145 "event-off-fix"

### Version 1.3.4

### Version 1.3.0
- jQuery 3 comparison
- Unified compare function for `$.fn.is` and `$.fn.not` to support looking for elements
- Fixed `$.fn.siblings` to return a Collection instead of Array.
- Fix for `$.fn.has` to return collection instead of Array and support for checking for an element instead of a string selector.
- Use `$.fn.find` with an element instead of selector.
- Minor cleanup
- Merge branch 'master' of https://github.com/kenwheeler/cash
- Fix for `$.fn.closest` to return correct results, `$.fn.filter` can now filter by Elements
- Cleanup & build
- Fix for #135: `$.fn.closest()` callstack exceeded
- Add semicolon.
- Use `Object.defineProperty` to attach the `constructor` property to the `cash.fn` prototype. #134

### Version 1.3.4

### Version 1.3.4-rc1

### Version 1.3.3
- Merge branch 'master' into filter-fix
- Filter fix

### Version 1.3.2

### Version 1.3.1
- CDN Version Links

### Version 1.3.0

### Version 1.2.0
- Size updates
- Keep CDN files at last version until the CDNs have had a chance to update.
- Simplified `on`
- Updated README
- Merge pull request #115 from kenwheeler/1.3.0

### Version 1.3.0
- merge PR 110
- merge PR 111

### Version 1.2.2
- merge PR 96

### Version 1.2.1
- [ attr() ] - fix to return collection for multi-add
- [ update ] - improve based on @shshaw comment   https://github.com/kenwheeler/cash/pull/111#issuecomment-216283171
- Cleanup and @rwwagner90 fix

### Version 1.2.3
- Saving bytes
- [ remove class ] - add test for removing all classes
- [ remove all classes ] - add an option for removing all classes - supply no arguments to .removeClass() - update readme

### Version 1.2.2

### Version 1.2.1

### Version 1.2.2
- [ add / remove / toggle / has class ] - add hecks for integers and falsey values - closer to jQuery - was having script-killing errors when `.addClass("")

### Version 1.2.1

### Version 1.2.2
- Version bump
- `$.fn.filter` fix

### Version 1.2.1
- CloudFlare CDN
- Clarified intro paragraph
- Updated parseHTML which fixes the base url issue

### Version 1.2.0

### Version 1.2.1
- Fix conflict
- Merge branch 'kenwheeler-master'
- Added NPM reference
- Bower.json fix
- Usage updates
- Merge pull request #102 from kenwheeler/npm-bower-fixes

### Version 1.2.0

### Version 1.2.1
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
- Set multiple attributes & properties
- Merge pull request #87 from kenwheeler/attr-obj
- added index to docs
- updated utilities & type checking links
- Merge pull request #89 from devinargenta/docs/index-added
- Size alignment
- Documentation for `$.fn.offet`, `$.fn.offetParent` and `$.fn.position`
- Documentation for `$.fn.removeProp`
- Documentation for setting properties
- Utility alphabetical order
- Clarifying $.fn prototype
- Method index tables ( #88 )

### Version 1.2.0
- Merge pull request #1 from shshaw/selector
- Merge pull request #70 from shshaw/master

### Version 1.1.0
- Fixed css() return value for object type input
- Merge pull request #58 from kornalius/master
- Update README.md
- Fixing length to 0 when element doesnt exist
- Merge pull request #64 from defrag/fix/empty-item-length
- Fixing suite
- Merge pull request #65 from defrag/fix/suite-fix
- This is embarassing
- Better init
- Better `fn.find`
- `return false` break `.each`
- `fn.children` and `fn.is` improvements
- Minor fixes
- Smaller file size & Consistency
- Better `append`, `prepend`
- Clone entire collections
- Cleanup
- Added `.map`
- README fixes
- Simplification of manipulations
- Fixed chain ability on `remove`
- Traversal cleanup
- Unified collection functions
- Simplified class manipulation
- Cleanup & simplification
- Form fixes
- Tiny utils added to `cash`
- Trim down by using local `each`
- `add`, `push` and `splice`
- `toggleClass`
- Trimming
- Multi-parameter extend
- Merge pull request #66 from shshaw/master
- Merge remote-tracking branch 'kenwheeler/master'
- Tabs to Spaces
- Trimmed `index`
- Direct `map`
- Trimmed `outerWidth` & `outerHeight`
- Cleaned up events
- spaces instead of tabs
- Minor cleanup
- Form serialize fix
- Merge pull request #67 from shshaw/master
- Merge remote-tracking branch 'kenwheeler/master'
- `after`, `before` & `insert...`
- README cleanup
- Trimming
- README fix
- Updated hints
- Simplified `outerWidth` & `outerHeight`
- Prefixed CSS Properties
- Selector performance
- Form test update
- Merge pull request #69 from shshaw/better-selector
- Merge remote-tracking branch 'kenwheeler/master' into selector
- Even smaller `dimensions`
- `event` fixes
- `window` fixes
- Clear _eventCache when all removed
- No need for this check
- No need for `i`
- Private `data` store
- Replace `_eventCache`
- `.one` support
- Move `data` up
- `offset`
- README updates

### Version 1.0.0
- Available in npm as cash-dom now
- Adding is documentation
- Add UMD wrapper
- Store references for better minifying
- Fill out package.json
- Cleanup README
- Merge pull request #40 from hackbone/umd
- Conform to Airbnb javascript style guide
- Arbitrary stylistic changes for readability
- Minify dimensions better
- Minify events better and cleanup
- Alias slice and filter for minifying
- fn reference for minifying
- Cleanup gulpfile and remove beautify
- Build lib
- Stop using arguments object when unnecessary for better minifying
- Switch to es6 with 6to5 and update linting
- Return target in extend, improve minifying
- Build lib
- Remove "use strict" due to Safari HTMLCollection bug
- Merge branch 'master' of https://github.com/thejameskyle/cash into thejameskyle-master
- Removing strict from list
- Merge branch 'thejameskyle-master'

### Version 0.0.3
- Trailing comma
- Closure compiler did me dirty
- README update
- One mo gain
- Update README.md
- Merge pull request #9 from richguan/patch-1
- Merge pull request #7 from Fender123/master
- Committing the dd feature in response to #16
- create tests for .add
- gulped out the dist files
- adding a few more testaroonies
- adding some more testaroonies
- allowing selector string input
- fixing tests for selector string
-  - cash creeped back to $ when trying something, fixed.
- Refactoring the $.fn.add method based on Ken's feedback, also update documentation and tests
- Merge pull request #20 from simeydotme/master
- change parents to closest and create new parents
- add tests for parents, closest
- updating documentation for closest and parents
- committing gulped files
- change parents to closest and create new parents
- Merge branch 'master' of https://github.com/simeydotme/cash
- improve performance
- test that HTML is last item in collection
- tidy up to match original format
- First commit.
- Merge pull request #23 from simeydotme/master
- Merge pull request #22 from vivekimsit/feature-closest-method
- Remove deprecated JSHint options
- `package.json` will always be 2 spaces
- Merge pull request #26 from arthurvr/patch-2
- Merge pull request #25 from arthurvr/patch-1
- matches was throwing errors in IE9
- fix up closest tests, and make the removeclass test more robust
- fix merge error with .closest()
- make .removeClass() more robust for IE9
- dist files committed
- improve the removeClass() function and performance slightly for IE9. removeClass will now accept space delimited class names for removal
- Merge pull request #29 from simeydotme/fix-closest-and-removeclass
- Making .each more performant via length caching. Fixing html() numeric input
- Update README.md
- Merge pull request #31 from simeydotme/patch-1
- Fixing #32
- First commit.
- Adds cash object support.
- updating addClass function to allow multiple classes and to prevent duplicates in IE9
- update tests for multiple classes and to detect duplicates
- update dist files
- Merge pull request #38 from simeydotme/patch-addclass-2
- create a utility method to return a unique collection
- update .parent(), .parents() and .add() to use $.unique()
- update dist files and test cases
- oopsy, meant to be parentElement
- no need for that variable declaration
- gulp back some refreshing minification
- Merge pull request #37 from simeydotme/patch-parents-with-unique
- Merge pull request #34 from vivekimsit/feature-add-is-support

### Version 0.0.2
- Performance
- Big update
- Fixing readme
- Fixing siblings, making QSA return array
- So dumb
- Fixing _ leak
- Add bower.json
- Merge pull request #3 from digitaljhelms/bower-json
- First round of unit tests + bug fixes
- Fixing README typo & adding License
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
- Fixing html() & append returns
- Merge branch 'master' of https://github.com/kenwheeler/cash

### Version 0.0.1
- Initial commit
- Initial commit
- README & Homepage
- Update README.md
