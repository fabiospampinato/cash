
# CLEANUP
rm -rf dist
mkdir dist

# ESM
npx minipacco bundle src/export_esm.ts > dist/cash.esm.ts
npx tsc --target es2016 --skipLibCheck --declaration dist/cash.esm.ts
mv dist/cash.esm.ts dist/cash.ts
mv dist/cash.esm.d.ts dist/cash.d.ts
mv dist/cash.esm.js dist/cash.esm.js

# CJS
npx minipacco bundle src/export_cjs.ts > dist/cash.cjs.ts
npx tsc --target es5 --skipLibCheck dist/cash.cjs.ts
node -e 'fs.writeFileSync("dist/cash.cjs.js",`(function(){\n"use strict";\n${fs.readFileSync("dist/cash.cjs.js","utf8")}})();`);'
npx esbuild --minify dist/cash.cjs.js > dist/cash.cjs.min.js
mv dist/cash.cjs.js dist/cash.js
mv dist/cash.cjs.min.js dist/cash.min.js
rm dist/cash.cjs.ts
