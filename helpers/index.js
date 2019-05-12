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

const stripQuotes = text => text.replace(/"/g, '')

module.exports = {
  getFirstWordAndRest,
  parse,
  stripQuotes
}
