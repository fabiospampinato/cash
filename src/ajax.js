
$.ajax = function(options){
  var request = new XMLHttpRequest();
  request.open(options.type, options.url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      if(options.success){
        options.success.call(request.responseText);
      }
    } else {
      if(options.error) {
        options.error.call();
      }
    }
  };
  request.onerror = function() {
    if(options.error) {
      options.error.call();
    }
  };
  if(options.type === "POST"){
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.send(options.data || "");
  } else {
    request.send();
  }
};