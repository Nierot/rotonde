// https://github.com/tastejs/todomvc/blob/master/examples/backbone/src/collections/todos.js

var app = app || {};

(function () {
  const Playlists = Backbone.Collection.extend({
    model: app.Playlist,
    url: 'playlist',
    parse: function (data) {
      return data.Data
    },

    play(playlistId) {
      // Start playing the playlist
      console.log('Playlists::play', playlistId)
      // Get the playlist
      const playlist = this.get(playlistId)

      // Set the old playlist as not currently playing
      const oldPlaylist = this.where({ IsCurrentlyPlaying: true })

      if (oldPlaylist.length > 0) {
        _.each(oldPlaylist, function (playlist) {
          playlist.set('IsCurrentlyPlaying', false)
          playlist.save()
        })
      }

      // Set the playlist as the currently playing playlist
      playlist.set('IsCurrentlyPlaying', true)

      // Persist on the server
      playlist.save()
    }
  })

  app.Playlists = new Playlists()
})()