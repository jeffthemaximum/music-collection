const database = require('../database')
const handleAdd = require('./handleAdd')

describe('handleAdd', () => {
  it('adds album with name, title to database', () => {
    const data = ['elmos songs', 'elmo']
    handleAdd(data)
    const albums = database.collection.albums
    expect(albums.length).toBe(1)
    expect(albums[0].name).toEqual(data[0])
    expect(albums[0].artist).toEqual(data[1])
  })
})
