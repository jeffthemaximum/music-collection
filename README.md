# Music collection

### what is this?
- This is my attempt at completing [this prompt](https://gist.github.com/jgoulah/fc742e8512ff730a86d262c25bbf549b)

### configuration
- Run using node 8.9.4
    - Really anything above 7.6 should work, however, this has only been tested with 8.9.4
    - This is because the program uses async/await, and node versions < 7.6 don't support async/await

### before running
- In the root of the repo, run
    - `npm install`

### run tests
`npm test`

### run the program
`npm start`

### future directions
- It's my understanding that we're not to take more than about two evenings to complete the assingment, and I'm nearing that time cutoff.
- With that time restriction in mind, there's other things I would complete here:
- Testing
    - I've tried to demonstrate how I would build out tests here.
    - `helpers/index.test.js` should demonstrate a basic set of tests without any mocks or spys.
    - `index.test.js` should demonstrate how I could test functions which only make calls to `logger.log`.
    - `index.test.js` should demonstrate how we can test if the main loop exits or continues.
    - `helpers/handleLoop.test.js` should start to demonstrate how I can test the functionality of different command line inputs.
    - `handlers/handleAdd.test.js` should demonstrate how I can test how different input interact with the database.
    - future tests I'd like to add here include (but are not limited to):
        - tests for `handlers/handlePlay.js` and `handlers/handleShow.js`.
        - tests for all functions in `validators/`.
- Error handling
  - I try to handle errors in the function in `validators/`, by catching known error conditions.
  - each of my individial functions (such as `handlers/handleAdd.test.js`, for example) do not include any error handling.
  - I would like to add error handling to all those individual functions, too, so that they don't depend on perfect inputs.
