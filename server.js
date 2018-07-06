const express = require('express')
require('express-di')
const app = express()
const bodyParser = require('body-parser')
const userRegistrationController = require('./controllers/UserRegistrationController')
const MongoClientProvider = require('./dao/MongoClientProvider')
const port = 3000
const healthEndPointPath = "/health"
const userRegistrationEndPointPath = "/register"

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.factory('mongoClientPromise', (req, res, next) => {
  console.log("server mongoClientPromise")
  const mongoClientProvider = new MongoClientProvider()
  next(null, mongoClientProvider.getMongoClient())
})


app.get(healthEndPointPath, (req, res) => res.send('The user profiling service is healthy'))
app.post(userRegistrationEndPointPath, userRegistrationController)

app.listen(process.env.PORT || port, () => console.log(`user profiling service started at ${port}`))

module.exports = app