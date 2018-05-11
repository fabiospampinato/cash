
const specialRegExpCharactersRe = /[-[\]{}()*+?.,\\^$|#\s]/g;

function escapeRegExp ( str ) {
  return str.replace ( specialRegExpCharactersRe, '\\$&' );
}
