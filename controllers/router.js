const router = require('express').Router()

const model = require('../models/TODO')

router.post("/bins", (req, res) => {
  // Creates a new random bin id in the database and redirect to new bin
  model.createBin(res);
})

router.get('/', (req, res) => {
  // Renders the index page
  res.render('main', {layout : 'index'})
})

router.get('/bins/:url/inspect', (req, res) => {
  // if URL exists, render display page
  // else, redirect to home
  // implement via callbacks?
  // Any way to mimic synchronicity?

  // Idea: when redirected to home, raise an error so the user's aware?
});

router.all('/bins/:url', (req, res) => {
  // - If bin doesn't exist/url isn't in bin table: redirect to main
  // - If bin exists: save request and redirect to /bins/:url/inspect
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