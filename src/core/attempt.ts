
function attempt<T, U> ( fn: (( arg?: U ) => T), arg?: U ): T | U {

  try {

    return fn ( arg );

  } catch {

    return arg;

  }

}
