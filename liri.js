// Include the NPM packages
var inquirer = require("inquirer");
var spotify = require('spotify');
var request = require('request');
var twitter = require("twitter");
var myKeys = require("./keys.js");

// Prompt the user to provide location information.

var client = new twitter({
  consumer_key: myKeys.twitterKeys.consumer_key,
  consumer_secret: myKeys.twitterKeys.consumer_secret,
  access_token_key: myKeys.twitterKeys.access_token_key,
  access_token_secret: myKeys.twitterKeys.access_token_secret
});

var params = {screen_name: 'hhsaito'};

inquirer.prompt([

  {
    type: "list",
    name: "userInput",
    message: "Please select what you would like to do",
    choices: ['My Tweets', 'Search Spotify', 'Search OMDB']
  }

// After the prompt, store the user's response in a variable called location.
]).then(function(choices) {

  // console.log(location.userInput);
  if (choices.userInput === "My Tweets") {
    myTweets();
  }

  if (choices.userInput === "Search Spotify") {
    spotifyThisSong();
  }
  if (choices.userInput === 'OMDB') {
    request('http://www.omdbapi.com/?t=Ran&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log(parsedData);
        // console.log(parsedData.Title);
        // console.log(parsedData.Year); 
        // console.log(parsedData.Rated, parsedData.Country, parsedData.Language, parsedData.Plot, parsedData.Actors);

        // Rotten Tomatoes Rating.
        // Rotten Tomatoes URL.// Show the HTML for the Google homepage. 
      }
      console.log('OK');
    });
  }
});

function myTweets() {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      if ( tweets.length < 20 ) {
        for ( var i = 0; i < tweets.length; i++ ) {
          console.log(tweets[i].created_at, tweets[i].text);
        }
      } 
      else {
        for ( var i = 0; i < 20; i++ ) {
          console.log(tweets[i].created_at, tweets[i].text);
        }
      }
    }
  });
}
function spotifyThisSong() {
  var songName = [];
  inquirer.prompt([
    {
      name: "songName",
      message: "Song name?"
    }
  ]).then(function(songs) {

    if ( songs.songName != '' ) {
      songName = songs.songName;
    }
    else {
      songName = 'The Sign';
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
      // Do something with 'data'
      for ( var i = 0; i < data.tracks.items.length; i++ ) {
        console.log('Artist: ', data.tracks.items[i].artists[0].name);
        console.log('Track: ', data.tracks.items[i].name);
        console.log('Track: ', data.tracks.items[i].preview_url);
        console.log('Album: ', data.tracks.items[i].album.name);
      }
    });
  });
}