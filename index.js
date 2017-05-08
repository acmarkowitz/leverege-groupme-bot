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
    "path": "/3/movie/upcoming?region=US&page=1&language=en-US&api_key=059eb0be9524d13c1469b5ed1e1155f1",
    "headers": {}
};
var groupmeRequest =
{
    bot_id: "2ae846f9593ef32b98600483ea",
    text: "Upcoming releases:\n"
};

function getMovies() {
    var movieReq = HTTPS.request(movieOptions, function (movieRes) {
       var chunks = [];
       movieRes.on("data", function (chunk) {
          chunks.push(chunk);
       });
       movieRes.on("end", function () {
          var movieBody = Buffer.concat(chunks);
          var res = JSON.parse(movieBody.toString());
          var numResults = res.results.length;
          for (var i = 0; i < numResults; i++) {
             groupmeRequest.text += res.results[i].release_date
                                 + ": "
                                 + res.results[i].title
                                 + "\n";
          }
       });
    });
    movieReq.write("{}");
    movieReq.end();
}
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
              getMovies();
              var gmReq = HTTPS.request(options); //, callback);
              var toWrite = JSON.stringify(groupmeRequest);
              gmReq.write(toWrite);
              //console.log(toWrite);
              gmReq.end();
          }
          else {
             console.log("No");
          }
       });
    }
    //response.statusCode = 400;
    response.end();
}).listen(process.env.PORT || 5000);
