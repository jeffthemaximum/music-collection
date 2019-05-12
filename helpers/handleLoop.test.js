let prompt = require('@jeffthemaximum/prompt')
jest.mock('@jeffthemaximum/prompt')

const { handleLoop } = require('./handleLoop')

describe('handleLoop', () => {
  describe('when prompt returns "quit"', () => {
    it('returns false', async () => {
      prompt.mockImplementationOnce(() => Promise.resolve('quit'))
      const value = await handleLoop()
      expect(value).toBe(false)
    })
  })

  describe('when prompt return `add "elmos songs" by "teddy"`', () => {
    it('returns true', async () => {
      prompt.mockImplementationOnce(() => Promise.resolve(`add "elmos songs" by "teddy"`))
      const value = await handleLoop()
      expect(value).toBe(true)
    })
  })
})
