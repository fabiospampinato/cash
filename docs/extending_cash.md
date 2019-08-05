
# Extending Cash

Cash can be extended, adding custom methods to Cash collections or custom static methods to the Cash object.

If you're writing JavaScript the way to do it is exactly the same as what you'd do for extending jQuery, but if you're writing TypeScript you'll want to take advantage of the type system, so in order to extend Cash you'll have to do a bit of [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

## Collection Method

This is how you can add an hypothetical `foo` method to Cash collections:

```ts
/* IMPORTING */

import $ from 'cash-dom';
import {Cash} from 'cash-dom';

/* DECLARATION MERGING */

declare module 'cash-dom' {
  interface Cash {
    foo (): Cash
  }
}

/* FOO DEFINITION */

$.fn.foo = function ( this: Cash ): Cash {
  // Do something here...
  return this;
}

/* FOO USAGE */

$('*').foo ();
```

## Static Method

This is how you can add an hypothetical `foo` static method to the Cash object:

```ts
/* IMPORTING */

import $ from 'cash-dom';
import {CashStatic} from 'cash-dom';

/* DECLARATION MERGING */

declare module 'cash-dom' {
  interface CashStatic {
    foo (): number
  }
}

/* FOO DEFINITION */

$.foo = function (): number {
  // Do something here...
  return 123;
}

/* FOO USAGE */

$.foo ();
```
