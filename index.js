var http = require('http');
var HTTPS = require('https');

// To send text into the Groupme chat
var groupMeOptions = {
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
var groupmeRequest = {
    bot_id: "2ae846f9593ef32b98600483ea",
    text: "Upcoming releases:\n"
};
var MovieReq;
// Run server to listen for groupme messages
var server = http.createServer(handleListening).listen(process.env.PORT || 5000);
function handleListening (servReq, servRep) {
    // Has there been a post?
    if (servReq.method == 'POST') {
        servReq.on('data', wantMovies);
        setTimeout(function() {;
                   servRep.end();
                   }, 10000);
    }
    else {
        servRep.end();
    }
}
function wantMovies (data) {
    var groupMeMessage = JSON.parse(data).text.toLocaleLowerCase();
    // If "movie" is in the text...
    if (groupMeMessage.search("movie") != -1) {
        groupmeRequest.text = "Upcoming releases:\n";
        movieReq = HTTPS.request(movieOptions, handleMDB);
        movieReq.write("{}"); // Complete the request
        movieReq.end();
    }
}
function handleMDB(movieRes) {
    movieRes.on("data", prepareMessage);
}
function prepareMessage(chunk) {
    var res = JSON.parse(chunk.toString());       // Format as JSON
    var numResults = res.results.length;          // Get number of movies
    for (var i = 0; i < numResults; i++) {        // Iterate over movies for title, date
        groupmeRequest.text += res.results[i].release_date
        + ": "
        + res.results[i].title
        + "\n";
    }
    sendMovies();
    console.log("Done formatting");
}
function sendMovies () {
    console.log("getting ready to send movies");
    var gmReq = HTTPS.request(groupMeOptions);
    var toWrite = JSON.stringify(groupmeRequest);
    console.log("Sending this to GroupMe" + toWrite);
    gmReq.write(toWrite); // Write the POST to the groupme chat
    gmReq.end();
}
