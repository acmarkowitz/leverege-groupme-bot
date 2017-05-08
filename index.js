var qs = require('querystring');
var http = require('http');
var HTTPS = require('https');

var options = {
    host: 'https://api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
};

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
              var req = HTTPS.request(options); //, callback);
              var toWrite = JSON.stringify({ bot_id: "2ae846f9593ef32b98600483ea",
                                           text: "Hello World" })
              req.write(toWrite);
              console.log(toWrite);
              req.end();
          }
          else {
             console.log("No");
          }
       });
    }
    //response.statusCode = 400;
    response.end();
}).listen(process.env.PORT || 5000);

console.log("Hello World");
