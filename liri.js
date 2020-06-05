const dotenv = require('dotenv');
dotenv.config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// require("dotenv").config(); this is the shorter but harder to understand version. always opt for readability

switch(command) {
    case "concert-this":
            newConcert();
            break;
    
    case "spotify-this-song":
            findSong();
            break;
    
    case "movie-this":
            movieTime();
            break;
    case "do-what-it-says":
            doNow();
            break;
        
}

function concert() {

}