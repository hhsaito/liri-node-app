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
    message: "Tweet?",
    choices: ['Tweet', 'Spotify', 'OMDB']
  }

// After the prompt, store the user's response in a variable called location.
]).then(function(choices) {

  // console.log(location.userInput);
  if (choices.userInput === "Tweet") {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for ( var i = 0; i < tweets.length; i++ ) {
          console.log(tweets[i].created_at, tweets[i].text);
        }
        //console.log(response);
      }
    });
  }

  if (choices.userInput === "Spotify") {
    spotify.search({ type: 'track', query: 'the sign' }, function(err, data) {
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
  }
  if (choices.userInput === 'OMDB') {
    request('http://www.omdbapi.com/?t=Ran&y=&plot=short&r=json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body[0].Title) // Show the HTML for the Google homepage. 
      }
      console.log('OK');
    });
  }
});
