const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios').default;
let command = process.argv[2]
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
let input = []
    for(i = 3; i < process.argv.length; i++) {
        input.push(process.argv[i])
    }
// require("dotenv").config(); this is the shorter but harder to understand version. always opt for readability

switch(command) {
    case "concert-this":
            newConcert(input);
            break;
    
    case "spotify-this-song":
            findSong(input);
            break;
    
    case "movie-this":
            movieTime(input);
            break;
    case "do-what-it-says":
            doNow();
            break;
        
}

function newConcert() {
    const queryUrl = "https://rest.bandsintown.com/artists/" + input.join(" ") + "/events?app_id=codingbootcamp"
    axios
        .get(queryUrl)
        .then(function(response) {

        console.log(response.data);
  })
    
}