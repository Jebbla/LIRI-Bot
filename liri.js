//require("dotenv").config('../LIRI-Bot/.env');

var fs = require("fs");
// Spotify package
//var Spotify = require('node-spotify-api');
//require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
// Axios package
var axios = require("axios");
// Moment package
var moment = require('moment');

var nodeArgs = process.argv;
var command = nodeArgs[2];
// Get additional user input
var input = nodeArgs.slice(3);


var bandsInTown = function (band) {
  var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
  console.log("in bands");
  axios.get(queryURL).then(
      function (response) {
          var res = response.data;
          for (var i = 0; i < res.length; i++) {
              var concert = res[i];
              console.log(concert.venue.name);
              console.log(concert.venue.city);
              console.log(moment(concert.datetime).format("MM/DD/YYYY"))
          }
      })
};

function movieSearch(searchTerm) {
  axios
    .get(`http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`)
    .then(function(response) {
      const data = response.data;
      movieArr = [
        `title: ${data.Title}`,
        `year: ${data.Year}`,
        `imdb rating: ${data.imdbRating}`,
        `plot: ${data.Plot}`,
        `actors: ${data.Actors}\n`
      ];
      appendResults(movieArr.join(`\n------------\n`));
      console.log(`\n---------YOUR MOVIE RESULTS-------\n`);
      console.log(movieArr.join("\n----------\n"));
      //console.log(data)
    });
}

