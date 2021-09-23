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

router.get('/bins/:path/inspect', async (req, res) => {
  const path = req.params.path;
  const validPath = await model.queryBin(path);

  if (validPath) {
    // Render display page of this bin

    // Get all requests from this bin in reverse order
    // Pass data as an array of requests in reverse order: enforce in-memory

    //res.render(requestsInReverseOrder, ¿payload?)
    res.send("Valid path!")
  } else {
    // Idea: when redirected to home, raise an error so the user's aware?
    res.send("Invalid path!")
    // res.redirect('/');
  }
});

router.all('/bins/:path', async (req, res) => {
  const path = req.params.path;
  const validPath = await model.queryBin(path);

  if (validPath) {
    // console.log(req.rawHeaders)
    // console.log(req.method)
    // console.log(req.url)
    console.log(JSON.stringify(req))
    res.send("Valid path!")

    // Convert request to JSONB and inserting into raw_request; return raw_request id
    // Also parse request and insert into request
    // Connect request to previous raw_request id

  } else {
    res.send("Invalid path!")
    // res.redirect('/');
  }
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