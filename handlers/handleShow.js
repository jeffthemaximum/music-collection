const database = require('../database')

const handleShow = data => {
  const [command, artist] = data
  database.collection.show(command, artist)
}

module.exports = handleShow
