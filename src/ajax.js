var defaultOptions = {
  // HTTP method
  method: "GET"
  // What is expected as a response
  responseType: "",
  // Extra event listeners for the request, e.g {onReadyStateChange: function() {
  //   console.log("Ready state changed");
  // }}
  listeners: {},
  // The event that calls the callback
  callbackEvent: "load",
  // Username and password for HTTP auth (null means no auth)
  user: null,
  password: null,
  // Extra headers, e.g {"X-MY-HEADER", "Hey"}
  headers: {},
  // Parameters for the POST request (this is only necessary for post requests)
  postParams: {}
}

function ajax(url, options, callback) {
  for(var option in defaultOptions) {
    if(options[option] === undefined) {
      options[option] = defaultOptions[option];
    }
  }
  if(options.method === "GET") {
    var request = new XMLHttpRequest();
    if((options.username === undefined) || (options.password === undefined)) {
      request.open("GET", url);
    } else {
      request.open("GET", url, true, options.username, options.password);
    }
    request.responseType = options.responseType;
    request.addEventListener(options.callbackEvent, callback);
    for(var name in options.listeners) {
      request.addEventListener(name, options[name]);
    }
    for(var header in options.headers) {
      request.setRequestHeader(header, options.headers[header]);
    }
    request.send();
  } else if(options.method === "POST") {
    var request = new XMLHttpRequest();
    if((options.username === undefined) || (options.password === undefined)) {
      request.open("POST", url);
    } else {
      request.open("POST", url, true, options.username, options.password);
    }
    request.responseType = options.responseType;
    request.addEventListener(options.callbackEvent, callback);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    for(var name in options.listeners) {
      request.addEventListener(name, options[name]);
    }
    for(var header in options.headers) {
      request.setRequestHeader(header, options.headers[header]);
    }
    var paramString = "";
    for(var thing in options.postParams) {
      paramString += thing + options.postParams[thing].toString();
    }
    request.send(paramString)
  } else {
    throw "Unknown HTTP method! Only GET and POST are supported.";
  }
}

cash.ajax = ajax;