const config = require('./utils/config')
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')



// TODO
// Do we need cors??
//const cors = require('cors')

// TODO
// Change the name of this todoRouter and file
//This is the controller that handles the routes
// For now it is TODO.js file.
const router = require('./controllers/router')


// TODO
// This is to connect to the database
//const mongoose = require('mongoose')

// TODO
// Do we need cors?
// app.use(cors())

app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'hbs')

app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
  }));

// TODO
// Change the name of this variable
app.use(router)

module.exports = app
