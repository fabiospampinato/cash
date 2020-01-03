
function getDocumentDimension ( doc: Document, dimension: 'Width' | 'Height' ): number {

  const docEle = doc.documentElement;

  return Math.max (
    doc.body[`scroll${dimension}`],
    docEle[`scroll${dimension}`],
    doc.body[`offset${dimension}`],
    docEle[`offset${dimension}`],
    docEle[`client${dimension}`]
  );

}
