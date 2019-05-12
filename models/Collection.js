const logger = require('../logger')

class Collection {
  constructor (albums = []) {
    this.albums = albums
  }

  add (album) {
    this.albums.push(album)
  }

  checkDuplicate (name) {
    for (let album of this.albums) {
      const isDuplicate = album.name === name
      if (isDuplicate) {
        return true
      }
    }

    return false
  }

  isEmpty (albums = this.albums) {
    return albums.length === 0
  }

  play (name) {
    const album = this.albums.find(album => album.name === name)
    if (!album) {
      logger.log('No album name matches request')
    } else {
      album.play()
    }
  }

  toString (albums = this.albums, config = {}) {
    if (this.isEmpty(albums)) {
      return 'Collection does not contain any albums meeting request'
    } else {
      return albums.map(album => `${album.toString(config)}`).join('\n')
    }
  }

  show (type, artist) {
    const validTypes = ['all', 'unplayed', 'played']
    if (!validTypes.includes(type)) {
      return logger.log('invalid request')
    }

    let albums = this.albums
    if (artist) {
      albums = albums.filter(album => album.artist === artist)
    }

    albums = albums.filter(album => {
      switch (type) {
        case 'all':
          return true
        case 'played':
          return album.played
        case 'unplayed':
          return !album.played
        default:
          return false
      }
    })

    let config = {}
    if (type === 'all') {
      config.withPlayed = true
    }

    logger.log(this.toString(albums, config))
  }
}

module.exports = Collection
