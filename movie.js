var http = require("https");

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
text: ""
};

function getMovies() {
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
                                            groupmeRequest.text += res.results[i].release_date + ": " + res.results[i].title + "\n";
                                            }
                                            console.log(groupmeRequest.text);
                                            //console.log(JSON.parse(movieBody.toString()).results.length);
                                            });
                                });
    
    movieReq.write("{}");
    movieReq.end();
}

getMovies();
