const logger = require('../logger')

class Album {
  constructor (name, artist, played = false) {
    this.name = name
    this.artist = artist
    this.played = played
  }

  play () {
    logger.log(`You're listening to ${this.name}`)
    this.played = true
  }

  toString (config) {
    const withPlayed = config.withPlayed

    let playedCopy = ''
    if (withPlayed) {
      if (this.played) {
        playedCopy = ' (played)'
      } else {
        playedCopy = ' (unplayed)'
      }
    }
    return `"${this.name}" by ${this.artist}${playedCopy}`
  }
}

module.exports = Album
