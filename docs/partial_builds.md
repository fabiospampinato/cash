
# Partial Builds

Cash is bundled using [pacco](https://github.com/fabiospampinato/pacco), therefore it supports partial builds out of the box.

In order to make a custom build you'll have to use a custom configuration for pacco, the [default one](https://github.com/kenwheeler/cash/blob/master/pacco.json) includes everything.

Some alternative configuration files are available [here](https://github.com/kenwheeler/cash/tree/master/resources/pacco).

## Size Comparison

Let's compare the size of those partial builds (you could actually exclude individual methods and get even smaller builds):

| Enabled Modules                             | Minified | Minified & Gzipped |
| ------------------------------------------- | -------- | ------------------ |
| <abbr title="Query Selector All">QSA</abbr> | 1.1 KB   | **0.6 KB**         |
| attributes                                  | 2.8 KB   | **1.2 KB**         |
| events                                      | 3.5 KB   | **1.5 KB**         |
| collection + manipulation + traversal       | 5.3 KB   | **1.9 KB**         |

## Usage

Replace the content of `pacco.json` with your custom configuration, then run:

```sh
npm install
npm run build:deploy
```
