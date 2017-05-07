/* HTTP-post input handling from answer 2 at 
 http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
 */
var qs = require('querystring');
var http = require('http');
//var body = '';

var server = http.createServer(function (request, response) {
    console.log(request.method);
                               
    if (request.method == 'POST') {
        var headers = request.headers;
        console.log(headers);
                               
        /*
        request.on('data', function (data) {
                   body += data;
                   
                   // Too much POST data, kill the connection!
                   // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                   if (body.length > 1e6)
                   request.connection.destroy();
                   });
        
        request.on('end', function () {
                   var post = qs.parse(body);
                   // use post['blah'], etc.
                   });
        */
        var body = [];
        request.on('data', function(chunk) {
                   body.push(chunk);
                   console.log(body);
        }).on('end', function() {
              body = Buffer.concat(body).toString();
              
              console.log(body);
        // at this point, `body` has the entire request body stored in it as a string
        });
    }
    response.statusCode = 404;
    response.end();
}).listen(process.env.PORT || 5000);

console.log("\nHello World");
