
// @require core/cash.ts
// @require ./helpers/variables.ts

cash.hasData = function ( ele ) {
  return dataNamespace in ele;
};
