// TODO
// In this file we will write the route handlers,
// also called controllers
// We could also write them all in app.js
// because that's where they will be used
// but here they can be better structured

const exampleRouter = require('express').Router()


exampleRouter.get('/', (req, res) => {
  res.render('main', {layout : 'index'})
})

exampleRouter.get('/r/:url', (req, res) => {
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
    // TODO
    // This counts as a request then. It should be added to the database
    console.log('add this request')
    res.render('newRequest', {layout : ''})
  }

  /*
    Check if any request has been made for this particular url
    If no request has been made yet, load the page for
    when it is empty with al the examples

    If a request has been made, load the page which
    shows all the requests
  */
  if (requestsExist(req.url)) {
    res.render('existing', {layout : 'index', binURL: getBin(req.url), listOfRequests: getListOfRequests(req.url)})
  } else {
    res.render('empty', {layout : 'index', binURL: getBin(req.url)})
  }
})

// TODO
// Try to find in the database if requests already exist.
requestsExist = (url) => {
  return true
}

getBin = (url) => 'https://requestbin.net' + url

//TODO
// Get a list of all the requests associated witha URL from the database
getListOfRequests = (url) => {
  // data: URL, HTTP method, time, post parameters??, header

  let json1 = {
    "url": url,
    "method": 'get',
    "time": '8h ago',
    "post parameters": "i don't know yet",
    "header": "no idea also"
  }

  return [json1, json1]
}

module.exports = exampleRouter