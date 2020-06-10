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

function movieTime(input) {

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

