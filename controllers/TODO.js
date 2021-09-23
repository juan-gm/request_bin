const exampleRouter = require('express').Router()

router.post("/bins", (req, res) => {
  // Creates a new random bin id in the database
  // redirects the user to their new bin
  url = generateRandomAlphanumericLength30()
  res.redirect(`/bins/${url}`)
})

exampleRouter.get('/', (req, res) => {
  // Renders the index page
  res.render('main', {layout : 'index'})
})

exampleRouter.get('/bins/:url', (req, res) => {
  // TODO
  // Check if the URL exists in the database
  // For now we will suppose that it exists

  /*
    Check if the request has the '?inspect' at the end.
    If it doesn't, it means that the GET request should
    be added to the database.
  */
  const inspection = req.query.inspect

  if (inspection == null) {
    // This GET request should be collected because it doesn't inspect
    // After collection, redirect to inpect page
    // Assumes the user will want to inspect their most recent request to the bin

    // res.render('newRequest', {layout : ''})
    res.send(`This is ${req.query.test}`)
  }

  if (requestsExist(req.url)) {
    // Load page which shows existing requests
    res.render('existing', {layout : 'index', binURL: getBin(req.url)})
  } else {
    // Since they have no requests
    // Load page to show user how to make requests
    res.render('empty', {layout : 'index', binURL: getBin(req.url)})
  }
})

// TODO
// Try to find in the database if requests already exist.
requestsExist = (url) => {
  return false
}

// Should extract this function to a file?
function generateRandomAlphanumericLength30() {
  // Generates an alphanumeric string of length 30
  // Makes duplicate strings extremely unlikely
  return Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

getBin = (path) => 'https://requestbin.net' + path

module.exports = exampleRouter