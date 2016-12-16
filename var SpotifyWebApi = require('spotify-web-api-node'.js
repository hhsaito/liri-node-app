var SpotifyWebApi = require('spotify-web-api-node');

findTheSign = function () {
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.searchTracks('track:The Sign artist:Ace of Base')
  .then(function(data) {
    console.log('The Sign: ', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

module.exports = findTheSign;