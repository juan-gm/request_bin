const config = require('./utils/config')
const express = require('express')
const app = express()

// TODO
// Do we need cors??
//const cors = require('cors')

// TODO
// Change the name of this todoRouter and file
//This is the controller that handles the routes
// For now it is TODO.js file.
const todoRouter = require('./controllers/TODO')


// TODO
// This is to connect to the database
//const mongoose = require('mongoose')

// TODO
// Do we need cors?
// app.use(cors())

app.use(express.static('build'))
app.use(express.json())

// TODO
// Change the name of this variable
app.use(todoRouter)

module.exports = app