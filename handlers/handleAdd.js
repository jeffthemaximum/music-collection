const Album = require('../models/Album')
const database = require('../database')
const logger = require('../logger')

const handleAdd = data => {
  const [name, artist] = data
  const album = new Album(name, artist)
  database.collection.add(album)
  logger.log(`Added "${album.name}" by ${album.artist}`)
  return album
}

module.exports = handleAdd
