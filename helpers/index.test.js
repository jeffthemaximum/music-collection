const { stripQuotes } = require('./index')

describe('stripQuotes', () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  describe('when string contains double quotes', () => {
    it('removes quotes from string', () => {
      expect(stripQuotes('Jeff"')).toBe('Jeff')
    })
  })

  describe('when string doesnt contain double quotes', () => {
    it('returns original string', () => {
      expect(stripQuotes('Jeff')).toBe('Jeff')
    })
  })

  describe('when string contains escaped quotes', () => {
    it('removes quotes from string', () => {
      expect(stripQuotes('Jeff\"Maxim')).toBe('JeffMaxim')
    })
  })
})
