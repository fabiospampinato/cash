
// @require ./cash.js

function matches ( ele, selector ) {
  const matches = ele && ( ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector || ele.oMatchesSelector );
  return !!matches && matches.call ( ele, selector );
}

cash.matches = matches;
