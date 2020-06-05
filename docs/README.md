
# Cash

Cash is an absurdly small jQuery alternative for modern browsers (IE11+) that provides jQuery-style syntax for manipulating the DOM. Utilizing modern browser features to minimize the codebase, developers can use the familiar chainable methods at a fraction of the file size. 100% feature parity with jQuery isn't a goal, but Cash comes helpfully close, covering most day to day use cases.

## Comparison

| Size               | Cash        | Zepto 1.2.0 | jQuery Slim 3.4.1 |
| ------------------ | ----------- | ----------- | ----------------- |
| Unminified         | **34.9 KB** | 58.7 KB     | 227 KB            |
| Minified           | **15.3 KB** | 26 KB       | 71 KB             |
| Minified & Gzipped | **5.7 KB**  | 9.8 KB      | 24.4 KB           |

A **76.6%** gain in size reduction compared to jQuery. If you need a smaller bundle, we support [partial builds](https://github.com/fabiospampinato/cash/blob/master/docs/partial_builds.md) too.

| Features                 | Cash                               | Zepto 1.2.0                    | jQuery Slim 3.4.1              |
| ------------------------ | ---------------------------------- | ------------------------------ | ------------------------------ |
| Supports Older Browsers  | ❌                                  | ️❌                             | ✔                              |
| Supports Modern Browsers | ✔                                  | ️✔                             | ✔                              |
| Actively Maintained      | ✔                                  | ❌                              | ✔                              |
| Namespaced Events        | ✔                                  | ️❌                             | ✔                              |
| Typed Codebase           | ✔ (TypeScript)                     | ️❌                             | ❌                              |
| TypeScript Types         | ✔ (generated from code)            | ⚠️ (via DefinitelyTyped)       | ⚠️ (via DefinitelyTyped)       |
| Partial Builds           | ✔ (can exclude individual methods) | ⚠️ (can exclude whole modules) | ⚠️ (can exclude whole modules) |

If you're migrating from jQuery be sure to read our [migration guide](https://github.com/fabiospampinato/cash/blob/master/docs/migration_guide.md).

## Usage

Get Cash from [CloudFlare](https://cdnjs.cloudflare.com/ajax/libs/cash/7.0.3/cash.min.js) or [jsDelivr](https://cdn.jsdelivr.net/npm/cash-dom@7.0.3/dist/cash.min.js) and use it like this:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/cash/7.0.3/cash.min.js"></script>
<script>
  $(function () {
    $('html').addClass ( 'dom-loaded' );
    $('<footer>Appended with Cash</footer>').appendTo ( document.body );
  });
</script>
```

Cash is also available through [npm](http://npmjs.com) as the [`cash-dom`](https://www.npmjs.com/package/cash-dom) package:

```sh
npm install --save cash-dom
```

That you can then use like this:

```js
import $ from "cash-dom";

$(function () {
  $('html').addClass ( 'dom-loaded' );
  $('<footer>Appended with Cash</footer>').appendTo ( document.body );
});
```

## Contributing

If you found a problem, or have a feature request, please open an [issue](https://github.com/fabiospampinato/cash/issues) about it.

If you want to make a pull request you should:

1. Clone the repository: `git clone https://github.com/fabiospampinato/cash.git`.
2. Enter the cloned repository: `cd cash`
3. Install the dependencies: `npm install`.
4. Automatically recompile Cash whenever a change is made: `npm run dev`.
5. Automatically rerun the tests whenever a change is made: `npm run test:watch`.
6. Remember to update the readme, if necessary.

## Thanks

- **[@kenwheeler](https://github.com/kenwheeler), [@shshaw](https://github.com/shshaw), [@jamiebuilds](https://github.com/jamiebuilds), [@simeydotme](https://github.com/simeydotme)** and all the contributors who helped making Cash.
- **[@hisk](https://github.com/hisk)** - The "design focused engineer" behind our awesome logo.
- **[Sauce Labs](https://saucelabs.com)** - The cross-browser testing platform we use for testing our builds in all the supported environments.

## License

MIT © Fabio Spampinato
