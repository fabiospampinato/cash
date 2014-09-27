
cash.ajax = function(options){
  var request = new XMLHttpRequest();
  request.open(options.type, options.url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      if(options.success){
        options.success.call(this, request.responseText);
      }
    } else {
      if(options.error) {
        options.error.call(this, request.statusText);
      }
    }
  };
  request.onerror = function() {
    if(options.error) {
      options.error.call(this, request.statusText);
    }
  };
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  request.send(options.data || "");
};