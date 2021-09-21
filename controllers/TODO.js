// TODO
// In this file we will write the route handlers,
// also called controllers
// We could also write them all in app.js
// because that's where they will be used
// but here they can be better structured

const exampleRouter = require('express').Router()

exampleRouter.get('/', (req, res) => {
  res.send("Hey, this is working! \n Congrats")
})

module.exports = exampleRouter