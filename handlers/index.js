const handleAdd = require('./handleAdd')
const handlePlay = require('./handlePlay')
const handleShow = require('./handleShow')

const handle = (command, data) => {
  switch (command) {
    case 'add':
      return handleAdd(data)
    case 'play':
      return handlePlay(data)
    case 'show':
      return handleShow(data)
    default:
      return false
  }
}

module.exports = { handle }
