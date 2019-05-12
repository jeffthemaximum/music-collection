const addValidator = require('./addValidator')
const playValidator = require('./playValidator')
const showValidator = require('./showValidator')

const validate = ({ command, data }) => {
  switch (command) {
    case 'add':
      return addValidator(data)
    case 'play':
      return playValidator(data)
    case 'quit':
      return { error: true, message: 'Bye!' }
    case 'show':
      return showValidator(data)
    default:
      return { error: false, message: 'invalid request' }
  }
}

module.exports = validate
