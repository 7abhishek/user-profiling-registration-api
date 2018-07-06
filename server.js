const express = require('express')
require('express-di')
const app = express()
const bodyParser = require('body-parser')
const MongoClientProvider = require('./dao/MongoClientProvider')
const userRouter = require('./routes/User')
const healthRouter = require('./routes/Health')
const config = require('config')
const applicationPort = config.get('applicationPort')
const swaggerUi = require('swagger-ui-express')
//const swaggerDocument = require('./swagger.json')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'API documentation for User Profiling System',
  },
  host: 'localhost:3000',
  basePath: '/',
};
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./server.js'],// pass all in array
}
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const port = 3000
const healthEndPointPath = "/health"
const userRegistrationEndPointPath = "/register"

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// dependency injection using express-di
app.factory('mongoClientPromise', (req, res, next) => {
  const mongoClientProvider = new MongoClientProvider()
  next(null, mongoClientProvider.getMongoClient())
})

app.use('/v1', healthRouter)
app.use('/v1', userRouter)
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.listen(process.env.PORT || applicationPort, () => console.log(`user profiling service started at ${applicationPort}`))

module.exports = app