const express = require('express')
require('express-di')
const app = express()
const bodyParser = require('body-parser')
const MongoClientProvider = require('./dao/MongoClientProvider')
const userRouter = require('./routes/User')
const healthRouter = require('./routes/Health')
const config = require('config')
const applicationPort = config.get('applicationPort')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// dependency injection using express-di
app.factory('mongoClientPromise', (req, res, next) => {
  const mongoClientProvider = new MongoClientProvider()
  next(null, mongoClientProvider.getMongoClient())
})

app.use('/v1', healthRouter)
app.use('/v1', userRouter)

app.listen(process.env.PORT || applicationPort, () => console.log(`user profiling service started at ${applicationPort}`))

module.exports = app