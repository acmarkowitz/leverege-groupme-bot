var qs = require('querystring');
var http = require('http');

var options = {
    host: 'api.groupme.com',
    path: '/v3/bots/post',
    port: '80',
    method: 'POST',
    headers: {'custom': 'Custom Header Demo works'}
};

var server = http.createServer(function (req, response) {
    console.log("Request method is: " + req.method);
    var body;
                               
    if (req.method == 'POST') {
       req.on('data', function (data) {
          body = JSON.parse(data);
       });
       req.on('end', function () {
          var text = body.text.toLocaleLowerCase();
          if (text.search("movie") != -1) {
              console.log("Yes");
              var req = http.request(options); //, callback);
              req.write(JSON.stringify({ bot_id: "2ae846f9593ef32b98600483ea", text: "Hello World" }));
              req.end();
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
