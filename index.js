/* HTTP-post input handling from answer 2 at 
 http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
 */
var qs = require('querystring');
var http = require('http');

var server = http.createServer(function (request, response) {
    console.log("Request method is: " + request.method);
    var body;
                               
    if (request.method == 'POST') {
        request.on('data', function (data) {
                   body = JSON.parse(data);
                   }
                   );
        request.on('end', function () {
                   console.log(body.text.toLocaleLowerCase());
                   }
                   );
    }
    response.statusCode = 400;
    response.end();
}).listen(process.env.PORT || 5000);

console.log("Hello World");
