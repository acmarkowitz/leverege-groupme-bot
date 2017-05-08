var http = require("https");

var movieOptions = {
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": "/3/movie/upcoming?region=US&page=1&language=en-US&api_key=059eb0be9524d13c1469b5ed1e1155f1",
    "headers": {}
};

var movieReq = http.request(movieOptions, function (movieRes) {
   var chunks = [];
                       
   movieRes.on("data", function (chunk) {
      chunks.push(chunk);
   });
                       
   movieRes.on("end", function () {
      var movieBody = Buffer.concat(chunks);
               var res = JSON.parse(movieBody.toString());
               var numResults = res.results.length;
               for (var i = 0; i < numResults; i++) {
               console.log(res.results[i].release_date + ": " + res.results[i].title);
               }
               //console.log(JSON.parse(movieBody.toString()).results.length);
   });
});

movieReq.write("{}");
movieReq.end();
