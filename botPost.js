var http = require('http');

var options = {
    host: 'api.groupme.com',
    path: '/v3/bots/post',
    port: '80',
    //This is the only line that is new. `headers` is an object with the headers to request
    headers: {'custom': 'Custom Header Demo works'}
    method: 'POST'
};

/*
callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
                str += chunk;
                });
    
    response.on('end', function () {
                console.log(str);
                });
}
 */

var req = http.request(options); //, callback);
req.write(
req.end();
