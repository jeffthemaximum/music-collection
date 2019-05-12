const prompt = require('@jeffthemaximum/prompt')

const handle = require('./handlers')
const helpers = require('./helpers')
const logger = require('./logger')
const validate = require('./validators')

const GREETING = 'Welcome to your music collection!'

async function run () {
  logger.log(GREETING)

  do {
    this.input = await prompt('')
    const parsedInput = helpers.parse(this.input)
    const { data, error, message } = validate(parsedInput)

    if (error) {
      logger.log(message)
      break
    } else if (message) {
      logger.log(message)
    } else {
      handle(parsedInput.command, data)
    }
  } while (true)
}

run()
  .then(() => {
    const status = 0
    logger.log(`Exiting with status: ${status}`)
    process.exit(status)
  })
  .catch(e => {
    console.log(e)
    const status = 1
    logger.log(`Exiting with status: ${status}`)
    process.exit(status)
  })
