const helpers = require('../helpers')

const playValidator = data => {
  const isValid = (
    data.length > 0 &&
    data[0] === '"' &&
    data[data.length - 1] === '"'
  )

  let error = false
  let message
  if (!isValid) {
    error = false
    message = 'invalid request'
    return { data, error, message }
  } else {
    data = helpers.stripQuotes(data)
    return { data, error, message }
  }
}

module.exports = playValidator
