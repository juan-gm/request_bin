const router = require('express').Router()
const model = require('../models/model')

router.post("/bins", async (req, res) => {
  // Creates a new random bin id in the database and redirect to new bin
  const path = model.generateRandomAlphanumericLength30()
  await model.createBin(path, res);
  res.redirect(`/bins/${path}/inspect`)
});

router.get('/', (req, res) => {
  // Renders the index page
  res.render('main', {layout : 'index'})
})

router.get('/bins/:url/inspect', async (req, res) => {
  const url = req.params.url;
  const validURL = await model.queryBin(url);

  if (validURL) {
    // Render display page of this bin

    // Get all requests from this bin in reverse order
    // Pass data as an array of requests in reverse order: enforce in-memory

    //res.render(requestsInReverseOrder, ¿payload?)
  } else {
    // Idea: when redirected to home, raise an error so the user's aware?
    res.redirect('/');
  }
});

router.all('/bins/:url', (req, res) => {
  // - If bin doesn't exist/url isn't in bin table: redirect to main
  // - If bin exists: save request and redirect to /bins/:url/inspect
  // Q: how to async process raw_request to request?
  // implement by passing 2 callbacks to queryBin for success and failure?
});

module.exports = router

/*
  const inspection = req.query.inspect

  if (inspection == null) {
    // =============
    // TODO
    // =============

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
  */