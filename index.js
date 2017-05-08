var http = require('http');
var HTTPS = require('https');

// To send text into the Groupme chat
var options = {
    host: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
};
// To retrieve information from the movie DB
var movieOptions = {
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": "/3/movie/upcoming?region=US&page=1&language=en-US&api_key=059eb0be9524d13c1469b5ed1e1155f1",
    "headers": {}
};
// Bot_id and initial text for the groupme message
var groupmeRequest =
{
    bot_id: "2ae846f9593ef32b98600483ea",
    text: "Upcoming releases:\n"
};

var body;
var chunks;
// Run server to listen for groupme messages
var server = http.createServer(handleListening).listen(process.env.PORT || 5000);
function handleListening (servReq, servRep) {
    body = '';
    console.log("request");
    // Has there been a post?
    if (servReq.method == 'POST') {
        servReq.on('data', addData);
        servReq.on('end',processMessage(), servRep.end());
    }
    else {
        servRep.end();
    }
}
function addData (data) { // Add the data to the list
    body += data;
    console.log("New data is: " + data.toString());
}
function processMessage() {
    // make all message text lower case for easy comparison
    var text = JSON.parse(body).text.toLocaleLowerCase();
    // If "movie" is in the text...
    if (text.search("movie") != -1) {
        var movieReq = HTTPS.request(movieOptions, handleMDB);
        movieReq.write("{}"); // Complete the request
        movieReq.end();
        var gmReq = HTTPS.request(options);
        var toWrite = JSON.stringify(groupmeRequest);
        console.log(toWrite);
        gmReq.write(toWrite); // Write the POST to the groupme chat
        gmReq.end();
    }
}
function handleMDB(movieRes) {
    chunks = [];
    movieRes.on("data", addChunk);
    movieRes.on("end", prepareMessage);
}
function addChunk(chunk) {
    chunks.push(chunk);
}
function prepareMessage() {
    var movieBody = Buffer.concat(chunks);
    var res = JSON.parse(movieBody.toString());   // Format as JSON
    var numResults = res.results.length;          // Get number of movies
    for (var i = 0; i < numResults; i++) {        // Iterate over movies for title, date
        groupmeRequest.text += res.results[i].release_date
        + ": "
        + res.results[i].title
        + "\n";
    }
}
