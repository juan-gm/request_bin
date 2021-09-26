const parseRequest = require("parse-request");
const router = require('express').Router();
const model = require('../models/model');

router.post("/bins", async (req, res) => {
  // Creates a new random bin id in the database and redirect to new bin
  const path = model.generateRandomAlphanumericLength30()
  await model.createBin(path, res);
  //res.redirect(`/bins/${path}/inspect`)
  res.status(200).json({ urlForward : `/bins/${path}/inspect`})
});

router.get('/', (req, res) => {
  // Renders the index page
  res.render('main', {layout : 'index'}) 
})

router.get('/bins/:path/inspect', async (req, res) => {
  const path = req.params.path;
  const validPath = await model.queryBin(path);

  if (validPath) {
    // TODO: render page and pass array of objects

    const requests = (await model.getBinRequests(path)).reverse();

    if (requests.length < 1) {
      res.render('empty', {layout : 'index', binURL: `requestbin.site/bins/${path}`}) 
    } else {
      res.render('existing', {layout : 'index', binURL: `requestbin.site/bins/${path}`, listOfRequests: requests})
    }
    
  } else {
    // Idea: when redirected to home, raise an error so the user's aware?
    res.redirect('/');
  }
});

router.all('/bins/:path', async (req, res) => {
  // Cause of error: passing query string
  // bins/:path?hello=goodbye

  const path = req.params.path;
  const validPath = await model.queryBin(path);

  if (validPath) {
    const parsedRequest = parseRequest({ req });
    const binId = await model.queryBinId(path);

    const requestData = {
      binId,
      rawBody: String(JSON.stringify(parsedRequest.request.body)),
      rawHeaders: JSON.stringify(parsedRequest.request.headers),
      query: JSON.stringify(parsedRequest.request.query),
      path: parsedRequest.request.url,
      method: parsedRequest.request.method
    }

    await model.insertParsedRequest(requestData);

    // TODO: redirect to bin display
    // Maybe send back with a 200 OK and a "We got it, thanks!"
    res.redirect(`/bins/${path}/inspect`);
  } else {
    res.redirect("/")
  }
});

module.exports = router;
