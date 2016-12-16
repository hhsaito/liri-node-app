var SpotifyWebApi = require('spotify-web-api-node');

var findTheSign = function () {
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.searchTracks('track:The Sign artist:Ace of Base')
  .then(function(data) {
    console.log('Artist: ', data.body.tracks.items[0].album.artists[0].name);
    console.log('Preview URL: ', data.body.tracks.items[0].preview_url);
    console.log('Album: ', data.body.tracks.items[0].album.name);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

module.exports = findTheSign;