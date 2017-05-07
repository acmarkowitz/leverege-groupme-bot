/* HTTP-post input handling from answer 2 at 
 http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
 */
var qs = require('querystring');
var http = require('http');

var server = http.createServer(function (request, response) {
    console.log(request.method);
    var body = '';
                               
    if (request.method == 'POST') {
        var headers = request.headers;
        console.log(headers);
                               
 
        request.on('data', function (data) {
                   body += data;
                   console.log("\nreceiving data\n");
                   console.log(data);
                   // Too much POST data, kill the connection!
                   // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                   /*if (body.length > 1e9)
                   request.connection.destroy();
                    */
                   });
                    
        
        request.on('end', function () {
                   console.log("Data end");
                   var post = qs.parse(body);
                   // use post['blah'], etc.
                   });
 
    }
    response.statusCode = 404;
    response.end();
}).listen(process.env.PORT || 5000);

/*http.createServer(function(request, response) {
                  var headers = request.headers;
                  var method = request.method;
                  var url = request.url;
                  var body = [];
                  request.on('error', function(err) {
                             console.error(err);
                             }).on('data', function(chunk) {
                                   body.push(chunk);
                                   }).on('end', function() {
                                         body = Buffer.concat(body).toString();
                                         // BEGINNING OF NEW STUFF
                                         
                                         response.on('error', function(err) {
                                                     console.error(err);
                                                     });
                                         
                                         response.statusCode = 200;
                                         response.setHeader('Content-Type', 'application/json');
                                         // Note: the 2 lines above could be replaced with this next one:
                                         // response.writeHead(200, {'Content-Type': 'application/json'})
                                         
                                         var responseBody = {
                                         //headers: headers,
                                         //method: method,
                                         url: 'https://api.groupme.com/v3/bots/post',
                                         body: {"bot_id" : "2ae846f9593ef32b98600483ea",
                                         "text" : "Hello World"}
                                         };
                                         
                                         response.write(JSON.stringify(responseBody));
                                         response.end();
                                         // Note: the 2 lines above could be replaced with this next one:
                                         // response.end(JSON.stringify(responseBody))
                                         
                                         // END OF NEW STUFF
                                         });
                  }).listen(process.env.PORT || 5000);
*/
console.log("\nHello World");
