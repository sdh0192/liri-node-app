//REQUIREMENTS

var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var request = require("request");
var command = process.argv[2];
var userInput = process.argv[3];
console.log(process.argv);

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

menuSelection(command);

function menuSelection(selection){
    switch(selection){
        case "concert-this": 
        searchBandsInTown(userInput);
        break;
        case "spotify-this-song":
        spotifyResults(userInput);
        break;
        case "movie-this":
        displayMovieInfo(userInput);
        break;
        case "do-what-it-says":
        randomSelection(userInput);
    }
}


function pullTxt(){

}


//BANDS IN TOWN FUNCTION ------------------------------------------------------------------------------------
function searchBandsInTown(artist) {
    


    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(url, function (error, response, body) {
        if (error) {
            console.log(error);
        }

        console.log(artist + "Upcoming Shows:");

        for (var i = 0; i < JSON.parse(body).length; i++) {
            // console.log(JSON.parse(body)[i].lineup);
            console.log(JSON.parse(body)[i].venue.name);
            console.log(JSON.parse(body)[i].datetime);
            console.log(JSON.parse(body)[i].venue.city);
        }
    });
}



// OMDB FUNCTION ----------------------------------------------------------------------------------------
function displayMovieInfo(movie) {
    var url = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        
        // console.log(JSON.parse(body));
        var movieTitle = JSON.parse(body).Title;
        var movieYear = JSON.parse(body).Year;
        var movieRatingIMDB = JSON.parse(body).imdbRating;
        var movieRatingMetacritic = JSON.parse(body).Metascore;
        var movieCountry = JSON.parse(body).Country;
        var movieLanguage = JSON.parse(body).Language;
        var moviePlot = JSON.parse(body).Plot;
        var movieActors = JSON.parse(body).Actors;

        console.log("Movie Title: " + movieTitle);
        console.log("Year Released: " + movieYear);
        console.log("IMDB Rating: " + movieRatingIMDB);
        console.log("Rotten Tomatoes Rating: " + movieRatingMetacritic);
        console.log("Country: " + movieCountry);
        console.log("Movie's Language(s): " + movieLanguage);
        console.log("Plot: " + moviePlot);
        console.log("Actors: " + movieActors);


    })

}




// SPOTIFY FUNCTION 
function spotifyResults(song) {
    console.log(song);
  
    spotify.search({ type: "track", query: song }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      var results = data.tracks.items.length;
    //   fs.appendFile("log.txt", "\n\nlog date: " + Date.now() + "\n", function(
    //     err
    //   ) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //   });
      for (var i = -0; i < results; i++) {
        var spotifyOutput =
          "\n\nartist: " +
          data.tracks.items[i].album.artists[0].name +
          "\nalbum: " +
          data.tracks.items[i].album.name +
          "\ntrack: " +
              data.tracks.items[i].name +
              "\npreview: " +
              data.tracks.items[i].preview_url;
        console.log(spotifyOutput);
        // fs.appendFile("log.txt", spotifyOutput, function(err) {
        //   // If the code experiences any errors it will log the error to the console.
        //   if (err) {
        //     return console.log(err);
        //   }
        // });
      }
  
    //   if (source === "do-this") {
    //     mainMenu();
    //   } else {
    //     spotifyMenu();
    //   }
    });
  }

//  spotifyResults("Happy Song");
//  displayMovieInfo("Frozen");
// searchBandsInTown("Blink-182");