var http = require("https");

var movieOptions = {
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": "/3/movie/upcoming?page=1&language=en-US&api_key=059eb0be9524d13c1469b5ed1e1155f1",
    "headers": {}
};

var movieReq = http.request(movieOptions, function (movieRes) {
   var chunks = [];
                       
   movieRes.on("data", function (chunk) {
      chunks.push(chunk);
   });
                       
   movieRes.on("end", function () {
      var movieBody = Buffer.concat(chunks);
      console.log(movieBody.toString());
   });
});

movieReq.write("{}");
movieReq.end();
