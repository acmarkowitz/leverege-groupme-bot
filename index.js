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
       });
       request.on('end', function () {
          var text = body.text.toLocaleLowerCase();
          if (text.search("movie") != -1) {
              console.log("Yes");
              // Configure the request
              var options = {
              url: 'https://api.groupme.com/v3/bots/post',
              method: 'POST',
              headers: 'Content-Type: application/json',
              form: {'bot_id': '2ae846f9593ef32b98600483ea',
                  'text': 'Yes, movie'}
              // Start the request
              request(options, function (error, resp, bd) {
                    if (!error && resp.statusCode == 200) {
                    // Print out the response body
                    console.log(bd)
                    }
              })
          }
          }
          else {
             console.log("No");
          }
       });
    }
    response.statusCode = 400;
    response.end();
}).listen(process.env.PORT || 5000);

console.log("Hello World");
