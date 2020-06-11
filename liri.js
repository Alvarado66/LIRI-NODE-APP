const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
const axios = require('axios').default;
var fs = require("fs");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
let inputArr = []
for (i = 3; i < process.argv.length; i++) {
    inputArr.push(process.argv[i])
}

// require("dotenv").config(); this is the shorter but harder to understand version. always opt for readability

// This switch-case will allow the user to switch between different cases based on the keyword.
function runCommand(command = process.argv[2], input = inputArr.join(" ")) {
    switch (command) {
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
}

// This function will be used to serach concerts by using key term/phrase "concert-this"
function newConcert(input) {
    const queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    console.log(queryUrl);
    console.log(input);
    axios
        .get(queryUrl)
        .then(function (response) {

            // console.log(response.data);

            for (let j = 0; j < response.data.length; j++) {
                console.log("\nVenue Location: " + response.data[j].venue.location)
                console.log("Venue Name: " + response.data[j].venue.name)
                console.log("Date: " + moment(response.data[j].datetime).format('MM/DD/YYYY'))
            }
        })
        .catch(function (err) {
            //console.log(err)
        })
}

// this function will allow a user to search a song using SPOTIFY-API by using the keyword/phrase "spotify-this-song"
function findSong(input) {
    if (!input) {
        input = "The Sign, Ace of Base";
    }

    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("\nArtist(s) Name: ", data.tracks.items[0].artists[0].name);
        console.log("Song Name: ", data.tracks.items[0].name)
        console.log("Album: ", data.tracks.items[0].album.name)
        console.log("Link: ", data.tracks.items[0].preview_url)
    });
}

// This function will allow a user to look up movie details with the keyword/phrase "movie-this"
function movieTime(input) {

    if (!input) {
        input = "Mr.Nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("\nTitle: " + response.data.Title);
            console.log("Date Released: " + response.data.Released);
            console.log("Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Origin: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Main Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {

                console.log(error);

            }
        })

}

// This function will run at the beginning and read the file name (random.txt) and run accodingly to the keyword or phrase the user enters to run a function that is tied to keyword or phrase.
function doNow() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var dataArr = data.split(",");
        let commandOne = dataArr[0];
        let searchInput = dataArr[1].trim();

        if (err) {
            return console.log(err);
        }

        runCommand(commandOne, searchInput);

    })
}

runCommand();

