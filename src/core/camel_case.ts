
// @require ./cash.ts

var dashAlphaRe = /-([a-z])/g;

function camelCaseReplace ( all, letter ) {
	return letter.toUpperCase ();
}

/** This is a description of the foo function. */
function camelCase ( str: string ) {
	return str.replace ( dashAlphaRe, camelCaseReplace );
}

interface CashStatic {
  camelCase ( str: string ): string;
}

cash.camelCase = camelCase;
