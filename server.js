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
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
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
  apis: ['./routes/*.js'],// pass all in array
}
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const port = 3000
const healthEndPointPath = "/health"
const userRegistrationEndPointPath = "/register"

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', (req, res) => res.send("User Profiling Service"))

app.listen(process.env.PORT || applicationPort, () => console.log(`user profiling service started at ${applicationPort}`))

module.exports = app