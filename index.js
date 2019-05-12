const prompt = require('@jeffthemaximum/prompt')

const Album = require('./models/Album')
const Collection = require('./models/Collection')
const logger = require('./logger')

const COLLECTION = new Collection()
const GREETING = 'Welcome to your music collection!'

const stripQuotes = text => text.replace(/"/g, '')
const getFirstWordAndRest = string => {
  let firstWord
  let rest

  if (string.length === 0) {
    return { firstWord, rest }
  }

  const splitIndex = string.indexOf(' ')
  if (splitIndex === -1) {
    firstWord = string
    return { firstWord, rest }
  }

  firstWord = string.substring(0, splitIndex)
  rest = string.substring(splitIndex + 1)
  return { firstWord, rest }
}

const parse = input => {
  const { firstWord: command, rest: data } = getFirstWordAndRest(input)
  return { command, data }
}

const validator = () => {
  const _addValidator = data => {
    let error = false
    let message = null

    let splitStrings = data.match(/"(.*?)"/g)

    if (!splitStrings || splitStrings.length !== 2) {
      message = 'invalid input'
    } else {
      splitStrings = splitStrings.map(string => stripQuotes(string))
      const isDuplicateAlbum = COLLECTION.checkDuplicate(splitStrings[0])
      if (isDuplicateAlbum) {
        message = 'Album title already exists'
      } else {
        data = splitStrings
      }
    }

    return { data, error, message }
  }

  const _playValidator = data => {
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
      data = stripQuotes(data)
      return { data, error, message }
    }
  }

  const _showValidator = data => {
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

    const { firstWord: command, rest } = getFirstWordAndRest(data)
    if (rest) {
      let { firstWord, rest: artist } = getFirstWordAndRest(rest)
      if (firstWord !== 'by') {
        error = false
        message = 'invalid request'
        return { data, error, message }
      } else {
        artist = stripQuotes(artist)
        data = [command, artist]
      }
    } else {
      data = [command]
    }

    return { data, error, message }
  }

  const validate = ({ command, data }) => {
    switch (command) {
      case 'add':
        return _addValidator(data)
      case 'play':
        return _playValidator(data)
      case 'quit':
        return { error: true, message: 'Bye!' }
      case 'show':
        return _showValidator(data)
      default:
        return { error: false, message: 'invalid request' }
    }
  }

  return { validate }
}

const handler = () => {
  const _handleAdd = data => {
    const [name, artist] = data
    const album = new Album(name, artist)
    COLLECTION.add(album)
    logger.log(`Added "${album.name}" by ${album.artist}`)
    return album
  }

  const _handlePlay = name => {
    COLLECTION.play(name)
  }

  const _handleShow = data => {
    const [command, artist] = data
    COLLECTION.show(command, artist)
  }

  const handle = (command, data) => {
    switch (command) {
      case 'add':
        return _handleAdd(data)
      case 'play':
        return _handlePlay(data)
      case 'show':
        return _handleShow(data)
      default:
        return false
    }
  }

  return { handle }
}

class Runner {
  constructor () {
    this.input = null
  }

  async run () {
    logger.log(GREETING)
    const validate = validator().validate
    const handle = handler().handle

    do {
      this.input = await prompt('')
      const parsedInput = parse(this.input)
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
}

async function main () {
  const runner = new Runner()
  await runner.run()
}

main()
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
