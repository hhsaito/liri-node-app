// Include the NPM packages
var twitter = require("twitter");
var inquirer = require("inquirer");
var myKeys = require("./keys.js");

// Prompt the user to provide location information.

var client = new twitter({
  consumer_key: myKeys.twitterKeys.consumer_key,
  consumer_secret: myKeys.twitterKeys.consumer_secret,
  access_token_key: myKeys.twitterKeys.access_token_key,
  access_token_secret: myKeys.twitterKeys.access_token_secret
});


var params = {screen_name: 'hhsaito'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for ( var i = 0; i < tweets.length; i++ ) {
  		console.log(tweets[i].created_at, tweets[i].text);
  	}
    //console.log(response);
  }
});

inquirer.prompt([

  {
    type: "list",
    name: "userInput",
    message: "Tweet?",
    choices: ['Tweet', 'Spotify']
  }

// After the prompt, store the user's response in a variable called location.
]).then(function(choices) {

  // console.log(location.userInput);
if (choices.userInput === "Tweet") {
  // Then use the Google Geocoder to Geocode the address
    console.log('Twwet');

   }
});
