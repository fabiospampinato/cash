
# Partial Builds

Cash is bundled using [minipacco](https://github.com/fabiospampinato/minipacco), therefore it supports partial builds out of the box.

## Guide

Replace the content of [`src/methods.ts`](https://github.com/fabiospampinato/cash/tree/master/src/methods.ts) with your custom configuration, basically deleting imports for methods that you don't want, then you can simply rebuild the library with:

```sh
npm install
npm run build
```
