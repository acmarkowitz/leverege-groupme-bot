/* HTTP-post input handling from answer 2 at 
 http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
 */
var qs = require('querystring');
//var http = require('http');

function (request, response) {
    console.log(request.method);
                               
    if (request.method == 'POST') {
        var body = '';
        
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
    }
    console.log(post.text);
}

console.log("\nHello World");
