
/* IMPORT */

import path from 'node:path';
import process from 'node:process';
import {setTimeout as delay} from 'node:timers/promises';
import {pathToFileURL} from 'node:url';
import {chromium, firefox, webkit} from 'playwright';
import color from 'tiny-colors';

/* MAIN */

const testBrowser = async ( engine, name ) => {

  const testPath = path.join ( process.cwd (), 'test', 'index.html' );
  const testUrl = pathToFileURL ( testPath ).toString ();

  const browser = await engine.launch ();
  const context = await browser.newContext ();
  const page = await context.newPage ();

  await page.goto ( testUrl );
  await delay ( 3000 );

  const result = await page.innerHTML ( '#qunit-testresult-display' );
  const isPass = result.includes ( 'with 0 failed' );

  console.log ( `${name}: ${isPass ? color.green ( 'PASS' ) : color.red ( 'FAIL' )}` );

  return isPass;

};

const testBrowsers = async () => {

  const names = ['Chromium', 'Firefox', 'Webkit'];
  const engines = [chromium, firefox, webkit];
  const results = await Promise.all ( engines.map ( ( engine, index ) => testBrowser ( engine, names[index] ) ) );
  const isPass = results.every ( Boolean );

  process.exit ( isPass ? 0 : 1 );

};

/* RUNNING */

await testBrowsers ();
