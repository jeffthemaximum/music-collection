const logger = require('./logger')

describe('index', () => {
  describe('run', () => {
    describe('when handleLoop returns false', () => {
      let index

      beforeEach(() => {
        index = require('./index')
        jest.spyOn(logger, 'log')
        jest.mock('./helpers/handleLoop', () => ({
          handleLoop: jest.fn(() => false)
        }))
      })

      afterEach(() => {
        jest.resetModules()
      })

      it('logs greeting', async () => {
        await index.run()
        expect(logger.log).toBeCalledWith(index.GREETING)
      })

      it('exits loop and returns true', async () => {
        const value = await index.run()
        expect(value).toBe(true)
      })
    })
  })
})
