const Collection = require('../models/Collection')

class Database {
  constructor () {
    if (!this.collection) {
      this.collection = new Collection()
    }
  }
}

module.exports = new Database()
