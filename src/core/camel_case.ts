
// @require ./cash.ts

var dashAlphaRe = /-([a-z])/g;

function camelCaseReplace ( all, letter ) {
	return letter.toUpperCase ();
}

function camelCase ( str: string ) {
	return str.replace ( dashAlphaRe, camelCaseReplace );
}

interface CashStatic {
  camelCase ( str: string ): string;
}

cash.camelCase = camelCase;
