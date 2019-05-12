const { handleLoop } = require('./helpers/handleLoop')
const logger = require('./logger')

const GREETING = 'Welcome to your music collection!'

async function run () {
  logger.log(GREETING)

  let shouldLoop = true

  while (shouldLoop) {
    shouldLoop = await handleLoop()
  }

  return true
}

if (require.main === module) {
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
}

module.exports = {
  GREETING,
  handleLoop,
  run
}
