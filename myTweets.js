// Twitter NPM package and my keys
var twitter = require("twitter");
var myKeys = require("./keys.js");

var myTweets = function(client, params) {

  this.client = new twitter({
    consumer_key: myKeys.twitterKeys.consumer_key,
    consumer_secret: myKeys.twitterKeys.consumer_secret,
    access_token_key: myKeys.twitterKeys.access_token_key,
    access_token_secret: myKeys.twitterKeys.access_token_secret
  });

  this.params = {screen_name: 'hhsaito'};

  this.myLiriTweets = function() {
    this.client.get('statuses/user_timeline', this.params, function(error, tweets, response) {
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
}

module.exports = myTweets;