
// @require core/cash.js
// @require ./helpers/variables.js

cash.hasData = function ( ele ) {
  return dataNamespace in ele;
};
