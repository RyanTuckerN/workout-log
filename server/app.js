//*** MODULES ***//
require('dotenv').config()
const express = require("express")
const app = express()
const db = require('./db')

//*** CONTROLLERS ***//
const user = require("./controllers/userController")
const log = require("./controllers/logController")

app.use(require('./Middleware/headers'))
app.use(express.json())

//*** ENDPOINTS ***//
app.use('/user', user)
app.use('/log', log)


db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The app is listening on port ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.error(`Something went wrong!`, err)
  })



