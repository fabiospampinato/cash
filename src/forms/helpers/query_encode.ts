
const queryEncodeCRLFRe = /\r?\n/g;

function queryEncode ( prop: string, value: string ): string {

  return `&${encodeURIComponent ( prop )}=${encodeURIComponent ( value.replace ( queryEncodeCRLFRe, '\r\n' ) )}`;

}
