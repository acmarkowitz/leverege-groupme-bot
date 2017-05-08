var qs = require('querystring');
var http = require('http');
var HTTPS = require('https');

var options = {
    host: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
};
var movieOptions = {
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": "/3/movie/upcoming?page=1&language=en-US&api_key=059eb0be9524d13c1469b5ed1e1155f1",
    "headers": {}
};
var groupmeRequest =
{
    bot_id: "2ae846f9593ef32b98600483ea",
    text: "Hello World"
};

var server = http.createServer(function (request, response) {
    console.log("Request method is: " + request.method);
    var body;
    var movieReq = http.request(movieOptions, function (movieRes) {
       var chunks = [];
                                                           
       movieRes.on("data", function (chunk) {
          chunks.push(chunk);
       });
                                                           
       movieRes.on("end", function () {
          var movieBody = Buffer.concat(chunks);
          console.log(JSON.stringify(movieBody));
       });
    });
                               
    movieReq.write("{}");
    movieReq.end();
                               
    if (request.method == 'POST') {
       request.on('data', function (data) {
          body = JSON.parse(data);
       });
       request.on('end', function () {
          var text = body.text.toLocaleLowerCase();
          if (text.search("movie") != -1) {
              //console.log("Yes");
              var req = HTTPS.request(options); //, callback);
              var toWrite = JSON.stringify(groupmeRequest);
              req.write(toWrite);
              //console.log(toWrite);
              req.end();
          }
          else {
             //console.log("No");
          }
       });
    }
    //response.statusCode = 400;
    response.end();
}).listen(process.env.PORT || 5000);

//console.log("Hello World");
