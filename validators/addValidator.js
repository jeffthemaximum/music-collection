const database = require('../database')
const helpers = require('../helpers')

const addValidator = data => {
  let error = false
  let message = null

  let splitStrings = data.match(/"(.*?)"/g)

  if (!splitStrings || splitStrings.length !== 2) {
    message = 'invalid input'
  } else {
    splitStrings = splitStrings.map(string => helpers.stripQuotes(string))
    const isDuplicateAlbum = database.collection.checkDuplicate(splitStrings[0])
    if (isDuplicateAlbum) {
      message = 'Album title already exists'
    } else {
      data = splitStrings
    }
  }

  return { data, error, message }
}

module.exports = addValidator
