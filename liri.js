// Include the NPM packages
var inquirer = require("inquirer");
var spotify = require('spotify');
var request = require('request');
var FS = require("fs");
// External js file for tweets
var myTweets = require("./myTweets");

// Twitter exported module
var tryTweeting = new myTweets();

// Give intial choices using Inquirer
inquirer.prompt([
  {
    type: "list",
    name: "userInput",
    message: "Please select what you would like to do",
    choices: ['My Tweets', 'Search Spotify', 'Search OMDB', 'Do what it says?']
  }
]).then(function(choices) {

  if (choices.userInput === "My Tweets") {
    tryTweeting.myLiriTweets();
  }
  if (choices.userInput === "Search Spotify") {
    spotifyThisSong();
  }
  if (choices.userInput === 'Search OMDB') {
    checkOMDB();
  }
  if (choices.userInput === 'Do what it says?') {
    FS.readFile('./random.txt', 'utf8', function(error, data) {
      if (error) {
        console.log('Error occured: ' + error);
      }
      // divide text line at comma
      data = data.split(",");
      
      if ( data[0] === 'spotify-this-song' ){
        spotifySong(data[1]);
      }
    });
  }
});

function spotifyThisSong() {
  var songName = [];
  // Get song name using Inquirer
  inquirer.prompt([
    {
      name: "songName",
      message: "Song name?"
    }
  ]).then(function(songs) {
    // If the song name is blank look up the Sign
    if ( songs.songName != '' ) {
      songName = songs.songName;
    }
    else {
      songName = 'The Sign';
    }
    spotifySong(songName);
  });
}
function spotifySong(songName) {
  // Spotify API call using song name
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
      // console log if there's an error
      console.log('Error occurred: ' + err);
      return;
    }
    // Loop through returned objects to get song data
    for ( var i = 0; i < data.tracks.items.length; i++ ) {
      console.log('Artist: ', data.tracks.items[i].artists[0].name);
      console.log('Track: ', data.tracks.items[i].name);
      console.log('Preview URL: ', data.tracks.items[i].preview_url);
      console.log('Album: ', data.tracks.items[i].album.name);
    }
  });
}
function checkOMDB() {
  var movieTitle = [];
  inquirer.prompt([
    {
      // Get movie name using Inquirer
      name: "movieTitle",
      message: "Movie name?"
    }
  ]).then(function(movies) {
    // If movie is blank search for Mr. Nobody
    if ( movies.movieTitle != '' ) {
      movieTitle = movies.movieTitle;
    }
    else {
      movieTitle = 'Mr. Nobody';
    }
    // OMDB API call using movie title
    var url = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&tomatoes=true&r=json';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // parse data into an object
        var parsedData = JSON.parse(body);

        console.log('Title: ' + parsedData.Title);
        console.log('Year: ' + parsedData.Year); 
        console.log('Rating: ' + parsedData.Rated);
        console.log('Country: ' + parsedData.Country);
        console.log('Language: ' + parsedData.Language); 
        console.log('Plot Summary: ' + parsedData.Plot);
        console.log('Actors: ' + parsedData.Actors);
        console.log('Rotten Tomato Rating: ' + parsedData.tomatoRating);
        console.log('Rotten Tomato URL: ' + parsedData.tomatoURL);
      }
      else {
        // console log if there's an error
        console.log('Error occurred: ' + error);
      }
    });
  });
}