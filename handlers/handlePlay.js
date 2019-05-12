const database = require('../database')

const handlePlay = name => {
  database.collection.play(name)
}

module.exports = handlePlay
