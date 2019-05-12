const prompt = require('@jeffthemaximum/prompt')

const handler = require('../handlers')
const logger = require('../logger')
const { parse } = require('./index')
const validate = require('../validators')

const handleLoop = async function () {
  const input = await prompt('')
  const parsedInput = parse(input)
  const { data, error, message } = validate(parsedInput)

  if (error) {
    logger.log(message)
    return false
  } else if (message) {
    logger.log(message)
  } else {
    handler.handle(parsedInput.command, data)
  }

  return true
}

module.exports = { handleLoop }
