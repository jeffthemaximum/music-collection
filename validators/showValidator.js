const helpers = require('../helpers')

const showValidator = data => {
  let error = false
  let message = null

  if (
    !data.startsWith('all') &&
    !data.startsWith('played') &&
    !data.startsWith('unplayed')
  ) {
    error = false
    message = 'invalid request'
    return { data, error, message }
  }

  const { firstWord: command, rest } = helpers.getFirstWordAndRest(data)
  if (rest) {
    let { firstWord, rest: artist } = helpers.getFirstWordAndRest(rest)
    if (firstWord !== 'by') {
      error = false
      message = 'invalid request'
      return { data, error, message }
    } else {
      artist = helpers.stripQuotes(artist)
      data = [command, artist]
    }
  } else {
    data = [command]
  }

  return { data, error, message }
}

module.exports = showValidator
